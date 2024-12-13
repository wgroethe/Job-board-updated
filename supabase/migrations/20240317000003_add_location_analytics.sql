-- Create function to get top applicant locations
create or replace function get_top_applicant_locations(
  p_employer_id uuid,
  p_limit int default 4
)
returns table (
  city text,
  count bigint
)
language plpgsql
security definer
as $$
begin
  return query
    select 
      a.location as city,
      count(*) as count
    from applications a
    join jobs j on j.id = a.job_id
    where j.employer_id = p_employer_id
    group by a.location
    order by count(*) desc
    limit p_limit;
end;
$$;