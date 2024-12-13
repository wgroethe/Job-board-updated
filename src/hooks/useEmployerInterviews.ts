import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Interview } from '../types/interview';
import { createNotification } from '../services/notificationService';

export function useEmployerInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInterviews();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('employer-interviews')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'interviews'
      }, () => {
        loadInterviews();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadInterviews = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('interviews')
        .select(`
          *,
          job:jobs (
            title,
            company
          ),
          candidate:profiles (
            first_name,
            last_name,
            email,
            avatar_url
          )
        `)
        .eq('employer_id', user.id)
        .eq('status', 'scheduled')
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true });

      if (error) throw error;

      const formattedInterviews: Interview[] = data.map(interview => ({
        id: interview.id,
        jobId: interview.job_id,
        candidateId: interview.candidate_id,
        employerId: interview.employer_id,
        scheduledAt: interview.scheduled_at,
        type: interview.type,
        status: interview.status,
        location: interview.location,
        meetingLink: interview.meeting_link,
        notes: interview.notes,
        job: {
          title: interview.job.title,
          company: interview.job.company
        },
        candidate: {
          name: `${interview.candidate.first_name} ${interview.candidate.last_name}`,
          email: interview.candidate.email,
          avatar: interview.candidate.avatar_url
        }
      }));

      setInterviews(formattedInterviews);
    } catch (err) {
      console.error('Error loading interviews:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleInterview = async (data: Omit<Interview, 'id' | 'status' | 'job' | 'candidate'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: interview, error } = await supabase
        .from('interviews')
        .insert([{
          job_id: data.jobId,
          candidate_id: data.candidateId,
          employer_id: user.id,
          scheduled_at: data.scheduledAt,
          type: data.type,
          location: data.location,
          meeting_link: data.meetingLink,
          notes: data.notes,
          status: 'scheduled'
        }])
        .select()
        .single();

      if (error) throw error;

      // Create notification for candidate
      await createNotification(
        data.candidateId,
        'interview_scheduled',
        'Interview Scheduled',
        `You have a new interview scheduled for ${new Date(data.scheduledAt).toLocaleDateString()}`,
        { interviewId: interview.id },
        `/injector/interviews`
      );

      await loadInterviews();
      return interview;
    } catch (err) {
      console.error('Error scheduling interview:', err);
      throw err;
    }
  };

  const updateInterviewStatus = async (id: number, status: Interview['status']) => {
    try {
      const { error } = await supabase
        .from('interviews')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await loadInterviews();
    } catch (err) {
      console.error('Error updating interview status:', err);
      throw err;
    }
  };

  return {
    interviews,
    isLoading,
    error,
    scheduleInterview,
    updateInterviewStatus,
    refresh: loadInterviews
  };
}