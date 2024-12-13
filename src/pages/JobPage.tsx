import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Building2, MapPin, Timer, DollarSign, Tag, ArrowLeft, Mail } from 'lucide-react';
import { jobs } from '../data/jobs';

export function JobPage() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === Number(id));

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
        <Link to="/" className="text-rose-500 hover:text-rose-600 mt-4 inline-block">
          Return to job listings
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start gap-6 border-b pb-8">
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Building2 className="w-5 h-5" />
              <span className="text-lg">{job.company}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Timer className="w-5 h-5" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5" />
                <span>{job.salary}</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </div>
        </div>

        <div className="py-8 border-b">
          <h2 className="text-xl font-semibold mb-4">About the Role</h2>
          <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="py-8">
          <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm bg-purple-50 text-purple-600"
              >
                <Tag className="w-4 h-4" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to={`/jobs/${id}/apply`}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Apply for this position
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
        <p className="text-gray-600">
          {job.company} is a leading aesthetic medicine provider committed to delivering exceptional patient care and outstanding results. We offer a collaborative work environment, competitive compensation, and opportunities for professional growth.
        </p>
      </div>
    </main>
  );
}