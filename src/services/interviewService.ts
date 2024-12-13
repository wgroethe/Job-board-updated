import { supabase } from '../lib/supabase';

interface ScheduleInterviewData {
  applicationId: number;
  jobId: number;
  scheduledAt: string;
  interviewType: 'video' | 'in-person';
  location?: string;
  meetingLink?: string;
  interviewerName?: string;
  notes?: string;
}

export async function scheduleInterview(data: ScheduleInterviewData) {
  try {
    // Get the current employer
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Get the candidate ID from the application
    const { data: application, error: applicationError } = await supabase
      .from('applications')
      .select('user_id')
      .eq('id', data.applicationId)
      .single();

    if (applicationError) throw applicationError;

    // Create the interview
    const { data: interview, error } = await supabase
      .from('interviews')
      .insert([{
        application_id: data.applicationId,
        employer_id: user?.id,
        candidate_id: application.user_id,
        job_id: data.jobId,
        scheduled_at: data.scheduledAt,
        interview_type: data.interviewType,
        location: data.location,
        meeting_link: data.meetingLink,
        interviewer_name: data.interviewerName,
        notes: data.notes
      }])
      .select()
      .single();

    if (error) throw error;
    return interview;
  } catch (error) {
    console.error('Error scheduling interview:', error);
    throw error;
  }
}

export async function getUpcomingInterviews() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { data, error } = await supabase
      .from('interviews')
      .select(`
        *,
        jobs (
          title,
          company,
          location
        )
      `)
      .eq('candidate_id', user?.id)
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching upcoming interviews:', error);
    throw error;
  }
}

export async function updateInterviewStatus(interviewId: number, status: 'completed' | 'cancelled') {
  try {
    const { error } = await supabase
      .from('interviews')
      .update({ status })
      .eq('id', interviewId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating interview status:', error);
    throw error;
  }
}