-- Create job views table
create table if not exists job_views (
  id bigint primary key generated always as identity,
  job_id bigint references jobs(id) not null,
  viewer_id uuid references auth.users(id),
  viewed_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Create indexes for better query performance
create index job_views_job_id_idx on job_views(job_id);
create index job_views_viewed_at_idx on job_views(viewed_at);

-- Enable RLS
alter table job_views enable row level security;

-- Create policies
create policy "Anyone can insert job views"
  on job_views for insert
  with check (true);

create policy "Employers can view their job views"
  on job_views for select
  using (
    exists (
      select 1 from jobs
      where jobs.id = job_views.job_id
      and jobs.employer_id = auth.uid()
    )
  );

-- Create function to get job views count
create or replace function get_job_views_count(
  p_job_id bigint,
  p_days int default 7
)
returns bigint
language sql
security definer
as $$
  select count(*)
  from job_views
  where job_id = p_job_id
  and viewed_at >= now() - (p_days || ' days')::interval;
$$;

-- Create function to get employer views count
create or replace function get_employer_views_count(
  p_employer_id uuid,
  p_days int default 7
)
returns bigint
language sql
security definer
as $$
  select count(*)
  from job_views jv
  join jobs j on j.id = jv.job_id
  where j.employer_id = p_employer_id
  and jv.viewed_at >= now() - (p_days || ' days')::interval;
$$;