import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Building2, MapPin, Video, Users, ExternalLink } from 'lucide-react';

interface Interview {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  interviewer?: string;
  notes?: string;
}

const mockInterviews: Interview[] = [
  {
    id: 1,
    jobTitle: "Lead Aesthetic Nurse",
    company: "Elite Medical Spa",
    location: "Beverly Hills, CA",
    date: "2024-03-20",
    time: "10:00 AM",
    type: "video",
    status: "upcoming",
    meetingLink: "https://zoom.us/j/123456789",
    interviewer: "Dr. Sarah Johnson",
    notes: "Please prepare a brief presentation about your injection techniques"
  },
  {
    id: 2,
    jobTitle: "Senior Injector",
    company: "Luxury Aesthetics",
    location: "Los Angeles, CA",
    date: "2024-03-22",
    time: "2:00 PM",
    type: "in-person",
    status: "upcoming",
    interviewer: "Michael Chen, Clinical Director",
    notes: "Bring your portfolio and certifications"
  }
];

const statusColors = {
  upcoming: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700'
};

export function InterviewsPage() {
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
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-rose-500" />
            <h1 className="text-2xl font-bold text-gray-900">Upcoming Interviews</h1>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockInterviews.map((interview) => (
            <div key={interview.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {interview.jobTitle}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[interview.status]}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="w-4 h-4" />
                        {interview.company}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {interview.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {interview.type === 'video' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <Users className="w-4 h-4" />
                        )}
                        {interview.type === 'video' ? 'Video Interview' : 'In-Person Interview'}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(interview.date).toLocaleDateString()} at {interview.time}
                      </div>
                      {interview.interviewer && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          Interviewer: {interview.interviewer}
                        </div>
                      )}
                    </div>
                  </div>

                  {interview.notes && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h3 className="font-medium text-gray-900 mb-2">Interview Notes</h3>
                      <p className="text-gray-600">{interview.notes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    {interview.meetingLink && (
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary inline-flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </a>
                    )}
                    <Link
                      to={`/jobs/${interview.id}`}
                      className="btn btn-secondary inline-flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Job Details
                    </Link>
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