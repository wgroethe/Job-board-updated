import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Mail, Star } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  experience: string;
  shortlistedDate: string;
  notes: string;
  resume: string;
}

const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    jobTitle: "Lead Aesthetic Nurse Injector",
    experience: "5 years",
    shortlistedDate: "2024-03-15",
    notes: "Excellent experience with advanced injection techniques",
    resume: "resume_1.pdf"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    jobTitle: "Senior Injector",
    experience: "7 years",
    shortlistedDate: "2024-03-14",
    notes: "Strong leadership background and great patient reviews",
    resume: "resume_2.pdf"
  }
];

export function ShortlistedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates] = useState<Candidate[]>(mockCandidates);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <h1 className="text-2xl font-bold text-gray-900">Shortlisted Candidates</h1>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {candidate.name}
                    </h2>
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-gray-600 mb-2">{candidate.jobTitle}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span>{candidate.experience} experience</span>
                    <span>Shortlisted on {new Date(candidate.shortlistedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                    <p className="text-gray-600">{candidate.notes}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <a
                    href={`/resumes/${candidate.resume}`}
                    className="text-rose-500 hover:text-rose-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                  <a
                    href={`mailto:${candidate.email}`}
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