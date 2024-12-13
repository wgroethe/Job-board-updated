import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { createBillingPortalSession } from '../../services/stripeService';

export function UpdatePaymentMethod() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePayment = async () => {
    try {
      setIsLoading(true);
      await createBillingPortalSession();
    } catch (error) {
      console.error('Error updating payment method:', error);
      alert('Failed to update payment method. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleUpdatePayment}
      disabled={isLoading}
      className="btn btn-secondary flex items-center gap-2"
    >
      <CreditCard className="w-4 h-4" />
      {isLoading ? 'Redirecting...' : 'Update Payment Method'}
    </button>
  );
}