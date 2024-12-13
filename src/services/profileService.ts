import { supabase } from '../lib/supabase';

export async function trackProfileView(profileId: string, source: string = 'direct') {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Don't track if viewing own profile
    if (user.id === profileId) return;

    const { error } = await supabase
      .from('profile_views')
      .insert([{
        profile_id: profileId,
        viewer_id: user.id,
        source
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking profile view:', error);
  }
}

export async function getProfileViewsCount(profileId: string, days: number = 7) {
  try {
    const { data, error } = await supabase.rpc(
      'get_profile_views_count',
      { profile_id: profileId, days }
    );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting profile views:', error);
    return 0;
  }
}

export async function updateProfileImage(userId: string, file: File, type: 'avatar' | 'cover') {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${type}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        [type === 'avatar' ? 'avatar' : 'cover_image']: publicUrl
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error('Error updating profile image:', error);
    throw error;
  }
}

export async function getProfileCompletionStatus(userId: string) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    const sections = {
      basicInfo: !!profile.first_name && !!profile.last_name && !!profile.title,
      experience: profile.experience && profile.experience.length > 0,
      education: profile.education && profile.education.length > 0,
      certifications: profile.certifications && profile.certifications.length > 0,
      portfolio: profile.portfolio && profile.portfolio.length > 0,
    };

    const completedSections = Object.values(sections).filter(Boolean).length;
    const totalSections = Object.keys(sections).length;

    return {
      sections,
      percentage: (completedSections / totalSections) * 100,
      isComplete: completedSections === totalSections
    };
  } catch (error) {
    console.error('Error getting profile completion status:', error);
    throw error;
  }
}