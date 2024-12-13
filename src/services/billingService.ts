import { supabase } from '../lib/supabase';

export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year' | 'one-time';
  features: string[];
  stripeProductId: string;
  stripePriceId: string;
}

export async function getCurrentPlan() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting current plan:', error);
    return null;
  }
}

export async function updatePlan(planId: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('subscriptions')
      .update({ plan_id: planId })
      .eq('user_id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
}

export async function getBillingHistory() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('billing_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting billing history:', error);
    return [];
  }
}