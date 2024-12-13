import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function useQuickApply() {
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();

  const applyToJob = async (jobId: number) => {
    try {
      setIsApplying(true);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        navigate('/login');
        return;
      }

      // Check if user has completed their profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('resume_url, is_profile_complete')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profile?.is_profile_complete) {
        navigate('/injector/profile');
        return;
      }

      // Submit application
      const { error: applicationError } = await supabase
        .from('applications')
        .insert([
          {
            job_id: jobId,
            user_id: user.id,
            status: 'submitted',
            resume_url: profile.resume_url,
          }
        ]);

      if (applicationError) throw applicationError;

      // Show success message
      alert('Application submitted successfully!');

    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  return { applyToJob, isApplying };
}