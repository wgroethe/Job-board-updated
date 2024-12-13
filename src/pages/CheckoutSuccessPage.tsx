import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function CheckoutSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to post job form after 5 seconds
    const timeout = setTimeout(() => {
      navigate('/employers/post-job');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. You'll be redirected to post your job in a few seconds.
        </p>
        <div className="space-x-4">
          <Link to="/employers/post-job" className="btn btn-primary">
            Post Job Now
          </Link>
          <Link to="/employers" className="btn btn-secondary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}