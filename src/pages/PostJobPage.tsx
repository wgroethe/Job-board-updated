import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JobForm } from '../components/JobForm';
import { addJob } from '../services/jobService';
import { ArrowLeft } from 'lucide-react';

export function PostJobPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (jobData) => {
    try {
      setIsLoading(true);
      await addJob(jobData);
      navigate('/employers');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/employers')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>
        <JobForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </main>
  );
}