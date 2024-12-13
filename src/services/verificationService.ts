import { supabase } from '../lib/supabase';

interface VerificationDocument {
  id: number;
  user_id: string;
  document_type: 'license' | 'certification' | 'insurance';
  document_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
  reviewer_notes?: string;
}

export async function submitVerificationDocument(
  documentType: 'license' | 'certification' | 'insurance',
  file: File
) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Upload document to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${documentType}_${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('verification-documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Create verification record
    const { data: verificationData, error: verificationError } = await supabase
      .from('verification_documents')
      .insert([{
        user_id: user.id,
        document_type: documentType,
        document_url: uploadData.path,
        status: 'pending',
        submitted_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (verificationError) throw verificationError;

    return verificationData;
  } catch (error) {
    console.error('Error submitting verification document:', error);
    throw error;
  }
}

export async function getVerificationStatus() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('verification_documents')
      .select('*')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting verification status:', error);
    throw error;
  }
}

export async function checkVerificationStatus() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('profiles')
      .select('is_verified')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data?.is_verified || false;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return false;
  }
}