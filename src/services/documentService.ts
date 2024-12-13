import { supabase } from '../lib/supabase';

export async function uploadDocument(file: File, type: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const fileName = `${user.id}/${type}_${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    // Update user profile with document URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        [`${type}_url`]: publicUrl,
        [`${type}_updated_at`]: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function getDocumentUrl(type: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select(`${type}_url, ${type}_updated_at`)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return {
      url: data[`${type}_url`],
      updatedAt: data[`${type}_updated_at`]
    };
  } catch (error) {
    console.error('Error getting document URL:', error);
    return null;
  }
}