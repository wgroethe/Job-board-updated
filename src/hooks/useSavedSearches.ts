import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SavedSearch {
  id: number;
  name: string;
  query: string;
  location: string;
  filters: {
    jobType: string[];
    experience: string[];
    salary: string[];
    treatments: string[];
  };
}

export function useSavedSearches() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedSearches();
  }, []);

  const loadSavedSearches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setSavedSearches(data);
    } catch (error) {
      console.error('Error loading saved searches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSearch = async (name: string, query: string, location: string, filters: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      const { data, error } = await supabase
        .from('saved_searches')
        .insert([{
          user_id: user.id,
          name,
          query,
          location,
          filters
        }])
        .select();

      if (error) throw error;

      setSavedSearches(prev => [...prev, data[0]]);
      return data[0];
    } catch (error) {
      console.error('Error saving search:', error);
      throw error;
    }
  };

  const deleteSearch = async (searchId: number) => {
    try {
      const { error } = await supabase
        .from('saved_searches')
        .delete()
        .eq('id', searchId);

      if (error) throw error;

      setSavedSearches(prev => prev.filter(search => search.id !== searchId));
    } catch (error) {
      console.error('Error deleting saved search:', error);
      throw error;
    }
  };

  return {
    savedSearches,
    saveSearch,
    deleteSearch,
    isLoading
  };
}