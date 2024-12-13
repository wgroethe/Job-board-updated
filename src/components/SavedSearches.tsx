import React from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useSavedSearches } from '../hooks/useSavedSearches';

interface SavedSearchesProps {
  onApplySearch: (search: any) => void;
}

export function SavedSearches({ onApplySearch }: SavedSearchesProps) {
  const { savedSearches, deleteSearch, isLoading } = useSavedSearches();

  if (isLoading) {
    return <div className="text-center py-4">Loading saved searches...</div>;
  }

  if (savedSearches.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No saved searches yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {savedSearches.map((search) => (
        <div
          key={search.id}
          className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between"
        >
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{search.name}</h3>
            <div className="text-sm text-gray-500">
              {search.query && <span>Keywords: {search.query}</span>}
              {search.location && <span> • Location: {search.location}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onApplySearch(search)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Apply search"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => deleteSearch(search.id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Delete search"
            >
              <Trash2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}