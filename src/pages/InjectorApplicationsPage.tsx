import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Building2 } from 'lucide-react';

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
}

const mockApplications: Application[] = [
  {
    id: 1,
    jobTitle: "Lead Aesthetic Nurse",
    company: "Elite Medical Spa",
    location: "Beverly Hills, CA",
    appliedDate: "2024-03-15"
  },
  {
    id: 2,
    jobTitle: "Senior Injector",
    company: "Luxury Aesthetics",
    location: "Los Angeles, CA",
    appliedDate: "2024-03-14"
  },
  {
    id: 3,
    jobTitle: "Aesthetic Nurse Practitioner",
    company: "Beauty Med",
    location: "Santa Monica, CA",
    appliedDate: "2024-03-13"
  }
];

export function InjectorApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications] = useState<Application[]>(mockApplications);

  const filteredApplications = applications.filter(app =>
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.location.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredApplications.map((application) => (
            <div key={application.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {application.jobTitle}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{application.company} • {application.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Applied {new Date(application.appliedDate).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/jobs/${application.id}`}
                    className="btn btn-primary"
                  >
                    View Job
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