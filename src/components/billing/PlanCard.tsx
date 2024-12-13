import React from 'react';
import { Check, Crown, Sparkles, Rocket } from 'lucide-react';
import type { BillingPlan } from '../../services/billingService';

interface PlanCardProps {
  plan: BillingPlan;
  isCurrentPlan: boolean;
  onSelect: (planId: string) => void;
}

export function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  const icons = {
    basic: <Sparkles className="w-6 h-6 text-blue-500" />,
    professional: <Rocket className="w-6 h-6 text-purple-500" />,
    enterprise: <Crown className="w-6 h-6 text-rose-500" />
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden border-2 transition-shadow hover:shadow-lg ${
      isCurrentPlan ? 'border-rose-500' : 'border-gray-100'
    }`}>
      {isCurrentPlan && (
        <div className="bg-rose-500 text-white text-center text-sm py-1">
          Current Plan
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <p className="text-gray-500 text-sm">Plan</p>
          </div>
          {icons[plan.name.toLowerCase() as keyof typeof icons]}
        </div>

        <div className="mb-6">
          <span className="text-2xl font-bold text-gray-900">
            ${plan.price}/{plan.interval === 'one-time' ? 'job post' : plan.interval}
          </span>
        </div>

        <ul className="space-y-3 mb-6">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {!isCurrentPlan && (
          <button 
            onClick={() => onSelect(plan.id)}
            className="w-full btn btn-primary"
          >
            Upgrade to {plan.name}
          </button>
        )}
      </div>
    </div>
  );
}