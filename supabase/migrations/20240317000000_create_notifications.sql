-- Create notifications table
create table if not exists notifications (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users(id) not null,
  type text not null,
  title text not null,
  message text not null,
  data jsonb,
  link text,
  is_read boolean default false,
  created_at timestamp with time zone default now(),
  
  constraint valid_notification_type check (
    type in (
      'application_update',
      'new_message',
      'interview_scheduled',
      'job_alert',
      'profile_view'
    )
  )
);

-- Create index for faster queries
create index notifications_user_id_idx on notifications(user_id);
create index notifications_created_at_idx on notifications(created_at desc);
create index notifications_unread_idx on notifications(user_id) where not is_read;

-- Enable Row Level Security
alter table notifications enable row level security;

-- Create policies
create policy "Users can view their own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "System can insert notifications"
  on notifications for insert
  with check (true);

create policy "Users can update their own notifications"
  on notifications for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notifications"
  on notifications for delete
  using (auth.uid() = user_id);

-- Create function to get unread count
create or replace function get_unread_notifications_count(p_user_id uuid)
returns bigint
language sql
security definer
as $$
  select count(*)
  from notifications
  where user_id = p_user_id
  and not is_read;
$$;