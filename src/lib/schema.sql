-- Create email logs table
create table if not exists email_logs (
  id bigint primary key generated always as identity,
  recipient text not null,
  type text not null,
  data jsonb not null,
  sent_at timestamp with time zone default now(),
  status text not null default 'sent'
);

-- Create email preferences table
create table if not exists email_preferences (
  user_id uuid references auth.users(id) primary key,
  application_updates boolean default true,
  messages boolean default true,
  interview_reminders boolean default true,
  job_alerts boolean default true,
  marketing_emails boolean default true,
  updated_at timestamp with time zone default now()
);

-- Create function to check email preferences
create or replace function should_send_email(
  user_id uuid,
  email_type text
) returns boolean
language plpgsql
as $$
declare
  preferences record;
begin
  select * from email_preferences
  where email_preferences.user_id = $1
  into preferences;

  if not found then
    return true; -- Default to sending if no preferences set
  end if;

  case email_type
    when 'application_update' then return preferences.application_updates;
    when 'message' then return preferences.messages;
    when 'interview_reminder' then return preferences.interview_reminders;
    when 'job_alert' then return preferences.job_alerts;
    when 'marketing' then return preferences.marketing_emails;
    else return true;
  end case;
end;
$$;