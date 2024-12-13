import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ChevronDown, Mail } from 'lucide-react';

interface Application {
  id: number;
  jobTitle: string;
  candidateName: string;
  email: string;
  appliedDate: string;
  experience: string;
  resume: string;
}

const mockApplications: Application[] = [
  {
    id: 1,
    jobTitle: "Lead Aesthetic Nurse Injector",
    candidateName: "Sarah Johnson",
    email: "sarah.j@example.com",
    appliedDate: "2024-03-15",
    experience: "5 years",
    resume: "resume_1.pdf"
  },
  {
    id: 2,
    jobTitle: "Aesthetic Nurse Practitioner",
    candidateName: "Michael Chen",
    email: "m.chen@example.com",
    appliedDate: "2024-03-15",
    experience: "7 years",
    resume: "resume_2.pdf"
  }
];

export function NewApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications] = useState<Application[]>(mockApplications);

  const filteredApplications = applications.filter(app =>
    app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold text-gray-900">New Applications Today</h1>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                    {application.candidateName}
                  </h2>
                  <p className="text-gray-600 mb-2">{application.jobTitle}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>{application.experience} experience</span>
                    <span>Applied {new Date(application.appliedDate).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={`/resumes/${application.resume}`}
                    className="text-rose-500 hover:text-rose-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                  <a
                    href={`mailto:${application.email}`}
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}