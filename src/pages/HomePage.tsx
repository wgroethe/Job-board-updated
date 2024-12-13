import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { JobCard } from '../components/JobCard';
import { Pagination } from '../components/Pagination';
import { useJobs } from '../hooks/useJobs';
import { Filter, X, AlertCircle } from 'lucide-react';

export function HomePage() {
  const { 
    paginatedJobs, 
    totalJobs, 
    totalPages, 
    currentPage, 
    setCurrentPage, 
    searchJobs, 
    filterJobs, 
    isLoading, 
    error 
  } = useJobs();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      {/* Search Section */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Find Your Dream Injector Job
            </h2>
            <p className="text-rose-100">
              Connect with top medical spas, dermatology clinics, and plastic surgery centers
            </p>
          </div>
          <SearchBar onSearch={searchJobs} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <Filters onFilterChange={filterJobs} />
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">
                {isLoading ? 'Loading...' : `${totalJobs} Positions Available`}
              </h3>
              <button 
                className="md:hidden btn btn-secondary flex items-center gap-2"
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-8">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-[300px] bg-white p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <Filters onFilterChange={filterJobs} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}