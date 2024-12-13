import { supabase } from '../lib/supabase';

export async function getTopLocations(employerId: string, limit: number = 4) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        location,
        count
      `)
      .eq('employer_id', employerId)
      .not('location', 'is', null)
      .group('location')
      .order('count', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data?.map(item => ({
      city: item.location,
      count: parseInt(item.count)
    })) || [];
  } catch (error) {
    console.error('Error fetching top locations:', error);
    return [];
  }
}