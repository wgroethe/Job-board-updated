import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Bookmark, MapPin, Building2, Clock } from 'lucide-react';
import { useSavedJobs } from '../hooks/useSavedJobs';

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  type: string;
  isActive: boolean;
}

const mockSavedJobs: SavedJob[] = [
  {
    id: 1,
    title: "Lead Aesthetic Nurse",
    company: "Elite Medical Spa",
    location: "Beverly Hills, CA",
    salary: "$120k - $150k",
    postedDate: "2024-03-15",
    type: "Full-time",
    isActive: true
  },
  {
    id: 2,
    title: "Senior Injector",
    company: "Luxury Aesthetics",
    location: "Los Angeles, CA",
    salary: "$100k - $130k",
    postedDate: "2024-03-14",
    type: "Full-time",
    isActive: true
  },
  {
    id: 3,
    title: "Aesthetic Nurse Practitioner",
    company: "Beauty Med",
    location: "Santa Monica, CA",
    salary: "$110k - $140k",
    postedDate: "2024-03-13",
    type: "Part-time",
    isActive: false
  }
];

export function SavedJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleSaveJob } = useSavedJobs();

  const filteredJobs = mockSavedJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Bookmark className="w-6 h-6 text-rose-500" />
              <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search saved jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      Saved {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  {!job.isActive && (
                    <span className="text-sm text-red-500">This job is no longer active</span>
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      Remove
                    </button>
                    {job.isActive && (
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn btn-primary"
                      >
                        View Job
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}