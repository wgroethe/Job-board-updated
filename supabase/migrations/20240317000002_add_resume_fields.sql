-- Add resume fields to profiles table
alter table profiles
add column if not exists resume_url text,
add column if not exists resume_updated_at timestamp with time zone;

-- Create storage bucket for resumes
insert into storage.buckets (id, name)
values ('resumes', 'resumes')
on conflict do nothing;

-- Set up storage policies
create policy "Users can upload their own resumes"
  on storage.objects for insert
  with check (
    bucket_id = 'resumes' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own resumes"
  on storage.objects for update
  using (
    bucket_id = 'resumes' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can read their own resumes"
  on storage.objects for select
  using (
    bucket_id = 'resumes' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own resumes"
  on storage.objects for delete
  using (
    bucket_id = 'resumes' and
    auth.uid()::text = (storage.foldername(name))[1]
  );