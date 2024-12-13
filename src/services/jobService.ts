import type { Job } from '../types';
import { supabase } from '../lib/supabase';
import { jobs as localJobs } from '../data/jobs';

export async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return localJobs; // Fallback to local data
    }

    return data.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company || '', // Default to empty string if null
      location: job.location || '',
      salary: job.salary || '',
      type: job.type || '',
      description: job.description || '',
      postedAt: job.created_at || '', // Ensure created_at exists
      companyLogo: job.company_logo || '',
      tags: job.tags || [],
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return localJobs; // Fallback to local data
  }
}

export async function addJob(jobData: Omit<Job, 'id'>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .insert([{
      title: jobData.title,
      company: jobData.company || '',
      location: jobData.location || '',
      salary: jobData.salary || '',
      type: jobData.type || '',
      description: jobData.description || '',
      company_logo: jobData.companyLogo || '',
      tags: jobData.tags || [],
    }])
    .select()
    .single();

  if (error) {
    console.error('Supabase error while adding job:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    company: data.company,
    location: data.location,
    salary: data.salary,
    type: data.type,
    description: data.description,
    postedAt: data.created_at,
    companyLogo: data.company_logo,
    tags: data.tags,
  };
}

export async function updateJob(id: number, jobData: Partial<Job>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .update({
      title: jobData.title,
      company: jobData.company || '',
      location: jobData.location || '',
      salary: jobData.salary || '',
      type: jobData.type || '',
      description: jobData.description || '',
      company_logo: jobData.companyLogo || '',
      tags: jobData.tags || [],
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase error while updating job:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    company: data.company,
    location: data.location,
    salary: data.salary,
    type: data.type,
    description: data.description,
    postedAt: data.created_at,
    companyLogo: data.company_logo,
    tags: data.tags,
  };
}

export async function deleteJob(id: number): Promise<void> {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase error while deleting job:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }
}