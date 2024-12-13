import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, Building2, Search, Filter, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProfileView {
  id: number;
  viewer: {
    name: string;
    company: string;
    title: string;
    avatar_url: string;
  };
  viewed_at: string;
  source: string;
}

export function ProfileViewsPage() {
  const [views, setViews] = useState<ProfileView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    loadProfileViews();
  }, [timeFilter]);

  const loadProfileViews = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('profile_views')
        .select(`
          id,
          viewed_at,
          source,
          viewer:viewer_id (
            id,
            full_name,
            company,
            title,
            avatar_url
          )
        `)
        .eq('profile_id', user.id)
        .order('viewed_at', { ascending: false });

      // Apply time filter
      if (timeFilter === '7days') {
        query = query.gte('viewed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
      } else if (timeFilter === '30days') {
        query = query.gte('viewed_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setViews(data || []);
    } catch (error) {
      console.error('Error loading profile views:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredViews = views.filter(view => 
    view.viewer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.viewer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.viewer.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/injector/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-rose-500" />
              <h1 className="text-2xl font-bold text-gray-900">Profile Views</h1>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search viewers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full md:w-64"
                />
              </div>

              <div className="relative">
                <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Time</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading profile views...</div>
        ) : filteredViews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No profile views found for the selected filters.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredViews.map((view) => (
              <div key={view.id} className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={view.viewer.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(view.viewer.name)}&background=f43f5e&color=fff`}
                    alt={view.viewer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-semibold text-gray-900">{view.viewer.name}</h2>
                        <p className="text-gray-600">{view.viewer.title}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(view.viewed_at).toLocaleDateString()} at{' '}
                        {new Date(view.viewed_at).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                      <Building2 className="w-4 h-4" />
                      {view.viewer.company}
                    </div>
                    {view.source && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Viewed from: {view.source}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}