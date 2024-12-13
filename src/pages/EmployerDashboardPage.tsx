import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  BarChart2,
  Star,
  ArrowRight,
  TrendingUp,
  Eye,
  Clock,
  MapPin,
  CreditCard
} from 'lucide-react';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { getEmployerAnalytics } from '../services/analyticsService';
import { getTopLocations } from '../services/locationAnalyticsService';
import { getCurrentPlan } from '../services/billingService';
import { supabase } from '../lib/supabase';

export function EmployerDashboardPage() {
  const [analytics, setAnalytics] = useState({
    views: [] as number[],
    applications: [] as number[],
    dates: [] as string[]
  });
  const [topLocations, setTopLocations] = useState<{ city: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    newToday: 0,
    shortlisted: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load analytics data
      const analyticsData = await getEmployerAnalytics(user.id);
      setAnalytics(analyticsData);

      // Load top locations
      const locationsData = await getTopLocations(user.id);
      setTopLocations(locationsData);

      // Get current plan
      const planData = await getCurrentPlan();
      setCurrentPlan(planData);

      // Get dashboard stats
      const [
        { count: activeJobs },
        { count: totalApplications },
        { count: newToday },
        { count: shortlisted }
      ] = await Promise.all([
        supabase.from('jobs').select('*', { count: 'exact' }).eq('employer_id', user.id).eq('status', 'active'),
        supabase.from('applications').select('*', { count: 'exact' }).eq('employer_id', user.id),
        supabase.from('applications').select('*', { count: 'exact' })
          .eq('employer_id', user.id)
          .gte('created_at', new Date().toISOString().split('T')[0]),
        supabase.from('applications').select('*', { count: 'exact' })
          .eq('employer_id', user.id)
          .eq('status', 'shortlisted')
      ]);

      setDashboardStats({
        activeJobs: activeJobs || 0,
        totalApplications: totalApplications || 0,
        newToday: newToday || 0,
        shortlisted: shortlisted || 0
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
        <p className="text-gray-600">Track your job listings and applications</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CreditCard className="w-8 h-8 text-rose-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Current Plan: {currentPlan?.plan?.name || 'Basic'}</h2>
              <p className="text-gray-600">${currentPlan?.plan?.price || '99'}/job post</p>
            </div>
          </div>
          <Link 
            to="/employers/settings"
            className="btn btn-primary"
          >
            Manage Billing
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          to="/employers/active-jobs"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Briefcase className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
          <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeJobs}</p>
        </Link>

        <Link
          to="/employers/applications"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalApplications}</p>
        </Link>

        <Link
          to="/employers/new-applications"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <BarChart2 className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">New Today</p>
          <p className="text-2xl font-bold text-gray-900">{dashboardStats.newToday}</p>
        </Link>

        <Link
          to="/employers/shortlisted"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Shortlisted</p>
          <p className="text-2xl font-bold text-gray-900">{dashboardStats.shortlisted}</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span className="text-sm text-gray-600">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-600">Applications</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <AnalyticsChart data={analytics} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Applicant Locations</h2>
          <div className="space-y-4">
            {topLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{location.city}</span>
                </div>
                <span className="text-gray-600">{location.count} applicants</span>
              </div>
            ))}
            {topLocations.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No application data available yet
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}