import { supabase } from '../lib/supabase';

interface EmailData {
  type: 'applicationUpdate' | 'newMessage' | 'interviewReminder' | 'jobAlert';
  data: any;
  recipient: string;
}

export async function sendEmail(emailData: EmailData) {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendApplicationUpdateEmail(applicationId: number, status: string) {
  try {
    const { data: application } = await supabase
      .from('applications')
      .select(`
        *,
        candidate:user_id (
          email,
          full_name
        ),
        job:job_id (
          title,
          company
        )
      `)
      .eq('id', applicationId)
      .single();

    if (!application) throw new Error('Application not found');

    const messages = {
      reviewed: 'Your application has been reviewed by the employer.',
      shortlisted: 'Congratulations! You have been shortlisted for this position.',
      interview: 'Great news! The employer would like to schedule an interview.',
      rejected: 'Thank you for your interest. The employer has decided to move forward with other candidates.'
    };

    await sendEmail({
      type: 'applicationUpdate',
      recipient: application.candidate.email,
      data: {
        candidateName: application.candidate.full_name,
        jobTitle: application.job.title,
        company: application.job.company,
        message: messages[status],
        applicationUrl: `${window.location.origin}/injector/applications`
      }
    });
  } catch (error) {
    console.error('Error sending application update email:', error);
    throw error;
  }
}

export async function sendInterviewReminderEmail(interviewId: number) {
  try {
    const { data: interview } = await supabase
      .from('interviews')
      .select(`
        *,
        candidate:candidate_id (
          email,
          full_name
        ),
        job:job_id (
          title,
          company
        )
      `)
      .eq('id', interviewId)
      .single();

    if (!interview) throw new Error('Interview not found');

    await sendEmail({
      type: 'interviewReminder',
      recipient: interview.candidate.email,
      data: {
        candidateName: interview.candidate.full_name,
        jobTitle: interview.job.title,
        company: interview.job.company,
        date: new Date(interview.scheduled_at).toLocaleDateString(),
        time: new Date(interview.scheduled_at).toLocaleTimeString(),
        meetingLink: interview.meeting_link
      }
    });
  } catch (error) {
    console.error('Error sending interview reminder email:', error);
    throw error;
  }
}

export async function sendJobAlertEmail(userId: string, jobs: any[]) {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('user_id', userId)
      .single();

    if (!profile) throw new Error('Profile not found');

    await sendEmail({
      type: 'jobAlert',
      recipient: profile.email,
      data: {
        userName: profile.full_name,
        jobs: jobs.map(job => ({
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          url: `${window.location.origin}/jobs/${job.id}`
        }))
      }
    });
  } catch (error) {
    console.error('Error sending job alert email:', error);
    throw error;
  }
}