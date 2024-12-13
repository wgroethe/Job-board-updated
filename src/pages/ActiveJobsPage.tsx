import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Calendar, DollarSign } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  applicants: number;
  status: 'active' | 'expired' | 'draft';
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Lead Aesthetic Nurse Injector",
    location: "Beverly Hills, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    postedDate: "2024-03-15",
    applicants: 12,
    status: 'active'
  },
  {
    id: 2,
    title: "Aesthetic Nurse Practitioner",
    location: "Miami, FL",
    type: "Part-time",
    salary: "$90k - $110k",
    postedDate: "2024-03-14",
    applicants: 8,
    status: 'active'
  },
  {
    id: 3,
    title: "Senior Injector",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $160k",
    postedDate: "2024-03-13",
    applicants: 15,
    status: 'active'
  }
];

export function ActiveJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/employers/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Active Job Listings</h1>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search jobs..."
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Posted {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{job.applicants} applicants</span>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="btn btn-primary"
                  >
                    View Public Listing
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}