-- Create profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id),
  first_name text,
  last_name text,
  email text unique not null,
  role text not null check (role in ('injector', 'employer')),
  company text,
  title text,
  location text,
  phone text,
  bio text,
  avatar_url text,
  cover_image_url text,
  resume_url text,
  resume_updated_at timestamp with time zone,
  is_verified boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Create function to handle user creation
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    new.raw_user_meta_data->>'role'
  );
  return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();