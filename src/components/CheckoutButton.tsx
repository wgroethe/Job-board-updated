import React, { useState } from 'react';
import { stripePromise } from '../lib/stripe';
import { supabase } from '../lib/supabase';

interface CheckoutButtonProps {
  priceId: string;
  buttonText: string;
  buttonClass?: string;
}

export function CheckoutButton({ priceId, buttonText, buttonClass = 'btn-primary' }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to continue');
        return;
      }

      // Create a Checkout Session through Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId,
          userId: user.id,
          successUrl: `${window.location.origin}/employers/success`,
          cancelUrl: `${window.location.origin}/employers`,
        },
      });

      if (error) throw error;
      if (!data?.sessionId) throw new Error('No session ID returned');

      // Redirect to Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        throw result.error;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full ${buttonClass} py-3 text-center transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? 'Loading...' : buttonText}
    </button>
  );
}