import { supabase } from '../lib/supabase';

export async function uploadResume(file: File) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Only allow PDF files
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are allowed');
    }

    // Maximum file size: 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    const fileName = `${user.id}/resume_${Date.now()}.pdf`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    // Update user profile with resume URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        resume_url: publicUrl,
        resume_updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
}

export async function getResumeUrl() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('resume_url, resume_updated_at')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting resume URL:', error);
    return null;
  }
}