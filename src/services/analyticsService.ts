import { supabase } from '../lib/supabase';

interface AnalyticsData {
  dates: string[];
  views: number[];
  applications: number[];
}

// Track a new job view
export async function trackJobView(jobId: number) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('job_views')
      .insert([{
        job_id: jobId,
        viewer_id: user?.id || null,
        viewed_at: new Date().toISOString()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking job view:', error);
  }
}

// Get analytics for a specific job
export async function getJobAnalytics(jobId: number, days: number = 7): Promise<AnalyticsData> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get views data
    const { data: viewsData, error: viewsError } = await supabase
      .from('job_views')
      .select('viewed_at')
      .eq('job_id', jobId)
      .gte('viewed_at', startDate.toISOString())
      .lte('viewed_at', endDate.toISOString());

    if (viewsError) throw viewsError;

    // Get applications data
    const { data: applicationsData, error: applicationsError } = await supabase
      .from('applications')
      .select('created_at')
      .eq('job_id', jobId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (applicationsError) throw applicationsError;

    // Generate date labels and initialize counts
    const dateLabels: string[] = [];
    const viewsCount: number[] = [];
    const applicationsCount: number[] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      dateLabels.unshift(dateStr);
      viewsCount.unshift(viewsData?.filter(v => v.viewed_at.startsWith(dateStr)).length || 0);
      applicationsCount.unshift(applicationsData?.filter(a => a.created_at.startsWith(dateStr)).length || 0);
    }

    return {
      dates: dateLabels,
      views: viewsCount,
      applications: applicationsCount
    };
  } catch (error) {
    console.error('Error fetching job analytics:', error);
    return { dates: [], views: [], applications: [] };
  }
}

// Get analytics for all jobs of an employer
export async function getEmployerAnalytics(employerId: string, days: number = 7): Promise<AnalyticsData> {
  try {
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('id')
      .eq('employer_id', employerId);

    if (jobsError) throw jobsError;

    if (!jobs || jobs.length === 0) {
      return { dates: [], views: [], applications: [] };
    }

    const jobIds = jobs.map(job => job.id);

    // Get aggregated views data
    const { data: viewsData, error: viewsError } = await supabase
      .from('job_views')
      .select('viewed_at')
      .in('job_id', jobIds)
      .gte('viewed_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (viewsError) throw viewsError;

    // Get aggregated applications data
    const { data: applicationsData, error: applicationsError } = await supabase
      .from('applications')
      .select('created_at')
      .in('job_id', jobIds)
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (applicationsError) throw applicationsError;

    // Generate date labels and initialize counts
    const dateLabels: string[] = [];
    const viewsCount: number[] = [];
    const applicationsCount: number[] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      dateLabels.unshift(dateStr);
      viewsCount.unshift(viewsData?.filter(v => v.viewed_at.startsWith(dateStr)).length || 0);
      applicationsCount.unshift(applicationsData?.filter(a => a.created_at.startsWith(dateStr)).length || 0);
    }

    return {
      dates: dateLabels,
      views: viewsCount,
      applications: applicationsCount
    };
  } catch (error) {
    console.error('Error fetching employer analytics:', error);
    return { dates: [], views: [], applications: [] };
  }
}