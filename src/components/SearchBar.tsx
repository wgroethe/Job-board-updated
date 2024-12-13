import React, { useState, useEffect } from 'react';
import { Search, MapPin, BookmarkPlus } from 'lucide-react';
import { SaveSearchDialog } from './SaveSearchDialog';
import { useSavedSearches } from '../hooks/useSavedSearches';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  initialQuery?: string;
  initialLocation?: string;
}

export function SearchBar({ onSearch, initialQuery = '', initialLocation = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { saveSearch } = useSavedSearches();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query, location);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, location, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  const handleSaveSearch = async (name: string) => {
    try {
      await saveSearch(name, query, location, {});
      alert('Search saved successfully!');
    } catch (error) {
      alert('Failed to save search. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md">
          <div className="flex-1 flex items-center gap-2 px-4">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-gray-700 min-h-[40px]"
            />
          </div>
          
          <div className="flex-1 flex items-center gap-2 px-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none text-gray-700 min-h-[40px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="btn btn-secondary flex items-center gap-2"
              title="Save this search"
            >
              <BookmarkPlus className="w-5 h-5" />
              <span className="hidden md:inline">Save</span>
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 md:flex-none px-6 py-2"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </form>

      <SaveSearchDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveSearch}
      />
    </>
  );
}