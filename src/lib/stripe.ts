import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      '1 resume',
      '3 AI generations per month',
      'Basic templates',
      'PDF export',
    ],
    resumeLimit: 1,
    aiGenerationsLimit: 3,
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? '',
    features: [
      'Unlimited resumes',
      'Unlimited AI generations',
      'All premium templates',
      'PDF export',
      'Priority support',
      'Custom domains',
    ],
    resumeLimit: Infinity,
    aiGenerationsLimit: Infinity,
  },
};
