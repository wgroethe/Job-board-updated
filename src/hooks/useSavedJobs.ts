import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSavedJobs() {
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setSavedJobIds(data.map(item => item.job_id));
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSaveJob = async (jobId: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      if (isSaved(jobId)) {
        // Remove from saved jobs
        await supabase
          .from('saved_jobs')
          .delete()
          .eq('user_id', user.id)
          .eq('job_id', jobId);

        setSavedJobIds(prev => prev.filter(id => id !== jobId));
      } else {
        // Add to saved jobs
        await supabase
          .from('saved_jobs')
          .insert([{ user_id: user.id, job_id: jobId }]);

        setSavedJobIds(prev => [...prev, jobId]);
      }
    } catch (error) {
      console.error('Error toggling saved job:', error);
    }
  };

  const isSaved = (jobId: number) => savedJobIds.includes(jobId);

  return {
    savedJobIds,
    toggleSaveJob,
    isSaved,
    isLoading
  };
}