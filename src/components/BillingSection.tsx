import React from 'react';
import { Check, Crown, Sparkles, Rocket } from 'lucide-react';
import { UpdatePaymentMethod } from './billing/UpdatePaymentMethod';

interface BillingTier {
  name: string;
  icon: JSX.Element;
  price: string;
  features: string[];
  current: boolean;
  minPosts: number;
}

const tiers: BillingTier[] = [
  {
    name: 'Basic',
    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
    price: '$99/job post',
    features: [
      'Single job posting',
      'Basic applicant tracking',
      'Standard job listing visibility',
      'Email support',
      '30-day listing duration'
    ],
    current: false,
    minPosts: 1
  },
  {
    name: 'Professional',
    icon: <Rocket className="w-6 h-6 text-purple-500" />,
    price: '$89/job post',
    features: [
      'Minimum 2 live job posts',
      'Advanced applicant tracking',
      'Featured job listing',
      'Priority support',
      '45-day listing duration',
      'Custom hiring workflow'
    ],
    current: true,
    minPosts: 2
  },
  {
    name: 'Enterprise',
    icon: <Crown className="w-6 h-6 text-rose-500" />,
    price: '$79/job post',
    features: [
      'Minimum 5 live job posts',
      'Full applicant management suite',
      'Premium job listing placement',
      'Dedicated account manager',
      '60-day listing duration',
      'Custom branding options',
      'API access'
    ],
    current: false,
    minPosts: 5
  }
];

export function BillingSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Billing & Plan</h2>
        <UpdatePaymentMethod />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`bg-white rounded-xl overflow-hidden border-2 transition-shadow hover:shadow-lg ${
              tier.current ? 'border-rose-500' : 'border-gray-100'
            }`}
          >
            {tier.current && (
              <div className="bg-rose-500 text-white text-center text-sm py-1">
                Current Plan
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  <p className="text-gray-500 text-sm">Plan</p>
                </div>
                {tier.icon}
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">{tier.price}</span>
                {tier.minPosts > 1 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum {tier.minPosts} active job posts required
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {!tier.current && (
                <button className="w-full btn btn-primary">
                  Upgrade to {tier.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p>
          Need a custom plan? Contact our sales team at{' '}
          <a href="mailto:sales@injectorjobs.com" className="text-rose-500 hover:text-rose-600">
            sales@injectorjobs.com
          </a>
        </p>
      </div>
    </div>
  );
}