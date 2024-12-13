import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) {
  throw new Error('Missing Stripe publishable key');
}

export const stripePromise = loadStripe(stripeKey);

export const PRICE_IDS = {
  BASIC: import.meta.env.VITE_STRIPE_BASIC_PRICE_ID,
  PROFESSIONAL: import.meta.env.VITE_STRIPE_PROFESSIONAL_PRICE_ID,
  ENTERPRISE: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID,
};