import { useState, useEffect } from 'react';
import { getUpcomingInterviews } from '../services/interviewService';

export function useInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      setIsLoading(true);
      const data = await getUpcomingInterviews();
      setInterviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    interviews,
    isLoading,
    error,
    refreshInterviews: loadInterviews
  };
}