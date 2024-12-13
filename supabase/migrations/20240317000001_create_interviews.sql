-- Create interviews table
create table if not exists interviews (
  id bigint primary key generated always as identity,
  job_id bigint references jobs(id) not null,
  candidate_id uuid references auth.users(id) not null,
  employer_id uuid references auth.users(id) not null,
  scheduled_at timestamp with time zone not null,
  type text not null check (type in ('video', 'in-person')),
  status text not null check (status in ('scheduled', 'completed', 'cancelled')),
  location text,
  meeting_link text,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes
create index interviews_employer_id_idx on interviews(employer_id);
create index interviews_candidate_id_idx on interviews(candidate_id);
create index interviews_scheduled_at_idx on interviews(scheduled_at);
create index interviews_status_idx on interviews(status);

-- Enable RLS
alter table interviews enable row level security;

-- Create policies
create policy "Employers can view their own interviews"
  on interviews for select
  using (auth.uid() = employer_id);

create policy "Candidates can view their own interviews"
  on interviews for select
  using (auth.uid() = candidate_id);

create policy "Employers can create interviews"
  on interviews for insert
  with check (auth.uid() = employer_id);

create policy "Employers can update their own interviews"
  on interviews for update
  using (auth.uid() = employer_id);

-- Create updated_at trigger
create trigger set_interviews_updated_at
  before update on interviews
  for each row
  execute function set_updated_at();

-- Create function to get upcoming interviews count
create or replace function get_upcoming_interviews_count(p_user_id uuid)
returns bigint
language sql
security definer
as $$
  select count(*)
  from interviews
  where employer_id = p_user_id
  and status = 'scheduled'
  and scheduled_at >= now();
$$;