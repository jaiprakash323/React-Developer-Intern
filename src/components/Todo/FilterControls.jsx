import React from 'react';
import { Filter } from 'lucide-react';
import { FILTER_OPTIONS } from '../../utils/constants';

const FilterControls = ({ currentFilter, onFilterChange, onClearCompleted, hasCompletedTasks }) => {
  const filters = [
    { key: FILTER_OPTIONS.ALL, label: 'All' },
    { key: FILTER_OPTIONS.ACTIVE, label: 'Active' },
    { key: FILTER_OPTIONS.COMPLETED, label: 'Completed' }
  ];
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter:</span>
      </div>
      
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentFilter === filter.key
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {hasCompletedTasks && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default FilterControls;