import React from 'react';
import { Check, Sparkles, Rocket, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createCheckoutSession } from '../services/stripeService';
import { PRICE_IDS } from '../lib/stripe';

const plans = [
  {
    name: 'Basic',
    icon: <Sparkles className="w-12 h-12 text-blue-500" />,
    price: '$99',
    period: 'per job post',
    description: 'Perfect for small practices',
    features: [
      'Single job posting',
      'Basic applicant tracking',
      'Standard job listing visibility',
      'Email support',
      '30-day listing duration',
    ],
    priceId: PRICE_IDS.BASIC,
    buttonText: 'Get Started',
    buttonClass: 'btn-secondary',
    minPosts: 1
  },
  {
    name: 'Professional',
    icon: <Rocket className="w-12 h-12 text-purple-500" />,
    price: '$89',
    period: 'per job post',
    description: 'Ideal for growing medical spas',
    features: [
      'Minimum 2 live job posts',
      'Advanced applicant tracking',
      'Featured job listing',
      'Priority support',
      '45-day listing duration',
      'Custom hiring workflow',
    ],
    priceId: PRICE_IDS.PROFESSIONAL,
    buttonText: 'Get Started',
    buttonClass: 'btn-primary',
    popular: true,
    minPosts: 2
  },
  {
    name: 'Enterprise',
    icon: <Crown className="w-12 h-12 text-rose-500" />,
    price: '$79',
    period: 'per job post',
    description: 'For large aesthetic clinics',
    features: [
      'Minimum 5 live job posts',
      'Full applicant management suite',
      'Premium job listing placement',
      'Dedicated account manager',
      '60-day listing duration',
      'Custom branding options',
      'API access',
    ],
    priceId: PRICE_IDS.ENTERPRISE,
    buttonText: 'Get Started',
    buttonClass: 'btn-secondary',
    minPosts: 5
  }
];

export function PricingSection() {
  const handleUpgrade = async (priceId: string) => {
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    }
  };

  return (
    <section id="get-started" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to connect with top aesthetic nursing talent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-rose-500 md:-translate-y-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-rose-500 text-white text-center text-sm py-1">
                  Most Popular
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                  {plan.icon}
                </div>

                <div className="mb-6">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                  {plan.minPosts > 1 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum {plan.minPosts} active job posts required
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.priceId)}
                  className={`w-full ${plan.buttonClass} py-3 text-center block transition-transform hover:scale-105`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>Need a custom plan? Contact our sales team for more information.</p>
        </div>
      </div>
    </section>
  );
}