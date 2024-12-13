import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Star,
  Clock,
  Bell,
  FileText,
  Settings,
  ArrowRight
} from 'lucide-react';
import { DocumentSection } from '../components/profile/DocumentSection';

export function InjectorDashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg p-6 mb-8 text-white">
        <h1 className="text-2xl font-bold">Welcome back, Sarah!</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          to="/injector/applications"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Briefcase className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Applications</p>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </Link>

        <Link
          to="/injector/saved-jobs"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Saved Jobs</p>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </Link>

        <Link
          to="/injector/interviews"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Upcoming Interviews</p>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </Link>

        <Link
          to="/injector/notifications"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Bell className="w-8 h-8 text-rose-500" />
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-gray-600 mb-1">New Notifications</p>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Documents Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Documents</h2>
            <div className="space-y-8">
              <DocumentSection
                title="Professional License"
                type="license"
                description="Upload your current nursing or medical professional license"
              />
              <DocumentSection
                title="Certifications"
                type="certification"
                description="Upload relevant certifications (Botox, fillers, etc.)"
              />
              <DocumentSection
                title="Insurance"
                type="insurance"
                description="Upload your professional liability insurance"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/injector/profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-rose-500" />
                <span>Update Resume</span>
              </Link>
              <Link
                to="/injector/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-rose-500" />
                <span>Account Settings</span>
              </Link>
            </div>
          </div>

          {/* Job Matches */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Jobs</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Aesthetic Nurse Manager",
                  company: "Premier Med Spa",
                  location: "San Francisco, CA"
                },
                {
                  title: "Senior Injector",
                  company: "Radiance Aesthetics",
                  location: "Los Angeles, CA"
                }
              ].map((job, index) => (
                <Link
                  key={index}
                  to={`/jobs/${index + 1}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}