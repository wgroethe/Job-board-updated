import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Building2, MapPin, Timer, DollarSign, Tag, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Job } from '../types';
import { useQuickApply } from '../hooks/useQuickApply';
import { useSavedJobs } from '../hooks/useSavedJobs';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { applyToJob, isApplying } = useQuickApply();
  const { toggleSaveJob, isSaved } = useSavedJobs();

  const handleQuickApply = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    try {
      await applyToJob(job.id);
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to apply. Please try again or apply directly through the job page.');
    }
  };

  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    try {
      toggleSaveJob(job.id);
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job. Please try again.');
    }
  };

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow border border-transparent hover:border-purple-100"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={job.companyLogo}
          alt={`${job.company} logo`}
          className="w-16 h-16 rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/64x64?text=Logo';
          }}
        />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <Building2 className="w-4 h-4 shrink-0" />
                <span>{job.company}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveJob}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={isSaved(job.id) ? "Remove from saved jobs" : "Save job"}
              >
                {isSaved(job.id) ? (
                  <BookmarkCheck className="w-5 h-5 text-rose-500" />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button
                onClick={handleQuickApply}
                disabled={isApplying}
                className="btn btn-primary text-sm py-2"
              >
                {isApplying ? 'Applying...' : 'Quick Apply'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Timer className="w-4 h-4 shrink-0" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4 shrink-0" />
              <span>{job.salary}</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 line-clamp-2">{job.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-600"
              >
                <Tag className="w-3 h-3 shrink-0" />
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </Link>
  );
}