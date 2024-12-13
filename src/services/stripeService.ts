import { supabase } from '../lib/supabase';
import { stripePromise } from '../lib/stripe';

export async function createCheckoutSession(priceId: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    // Get user's email for pre-filling checkout
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_id', user.id)
      .single();

    // Create checkout session through Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId,
        userId: user.id,
        email: profile?.email,
        successUrl: `${window.location.origin}/employers/settings?success=true`,
        cancelUrl: `${window.location.origin}/employers/settings?canceled=true`,
      },
    });

    if (error) throw error;
    if (!data?.sessionId) throw new Error('No session ID returned');

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (result.error) throw result.error;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createBillingPortalSession() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Create billing portal session through Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-billing-portal-session', {
      body: { 
        userId: user.id,
        returnUrl: `${window.location.origin}/employers/settings` 
      }
    });

    if (error) throw error;
    if (!data?.url) throw new Error('No portal URL returned');

    // Redirect to Stripe Billing Portal
    window.location.href = data.url;
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    throw error;
  }
}