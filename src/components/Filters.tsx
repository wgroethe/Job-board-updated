import React from 'react';
import { Briefcase, Clock, DollarSign, Syringe } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: {
    jobType: string[];
    experience: string[];
    salary: string[];
    treatments: string[];
  }) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = React.useState({
    jobType: [],
    experience: [],
    salary: [],
    treatments: [],
  });

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const FilterSection = ({ title, icon, options, category }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters[category].includes(option)}
              onChange={() => handleFilterChange(category, option)}
              className="rounded text-rose-500 focus:ring-rose-400"
            />
            <span className="text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      
      <FilterSection
        title="Position Type"
        icon={<Briefcase className="w-5 h-5 text-gray-400" />}
        options={['Full-time', 'Part-time', 'Contract', 'PRN']}
        category="jobType"
      />

      <FilterSection
        title="Experience Level"
        icon={<Clock className="w-5 h-5 text-gray-400" />}
        options={['1-2 Years', '3-5 Years', '5+ Years', 'Lead']}
        category="experience"
      />

      <FilterSection
        title="Salary Range"
        icon={<DollarSign className="w-5 h-5 text-gray-400" />}
        options={['$80k-100k', '$100k-130k', '$130k-160k', '$160k+']}
        category="salary"
      />

      <FilterSection
        title="Treatments"
        icon={<Syringe className="w-5 h-5 text-gray-400" />}
        options={[
          'Botox/Neurotoxins',
          'Dermal Fillers',
          'PDO Threads',
          'Chemical Peels',
          'Laser Treatments',
          'Microneedling',
          'PRP/PRF',
          'Body Contouring'
        ]}
        category="treatments"
      />
    </div>
  );
}