import React, { useState, useMemo } from 'react';
import { Search, Users, AlertCircle } from 'lucide-react';
import { SAMPLE_NAMES } from '../../utils/constants';
import { getHighlightedText } from '../../utils/helpers';

const SearchList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  
  // Filter names based on search query
  const filteredNames = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_NAMES;
    
    const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    
    return SAMPLE_NAMES.filter(name => {
      const searchIn = caseSensitive ? name : name.toLowerCase();
      return searchIn.includes(query);
    });
  }, [searchQuery, caseSensitive]);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Search className="w-8 h-8 text-primary-600" />
          Live Search with Highlighting
        </h1>
        <p className="text-gray-600">Real-time search with match highlighting</p>
      </div>
      
      {/* Search Controls */}
      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search names..."
            className="input-field pl-10"
            autoFocus
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={() => setCaseSensitive(!caseSensitive)}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm text-gray-700">Case sensitive</span>
            </label>
          </div>
          
          <div className="text-sm text-gray-600">
            {searchQuery && (
              <span className="font-medium">
                Found {filteredNames.length} result{filteredNames.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Search Results
          </h3>
          <span className="text-sm font-medium px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
            {filteredNames.length} names
          </span>
        </div>
        
        {filteredNames.length > 0 ? (
          <div className="space-y-2">
            {filteredNames.map((name, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg">
                    {getHighlightedText(name, searchQuery)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Match #{index + 1}
                  </div>
                </div>
                {searchQuery && (
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Matches found:</span>{' '}
                    {caseSensitive 
                      ? name.split(searchQuery).length - 1
                      : name.toLowerCase().split(searchQuery.toLowerCase()).length - 1
                    } occurrence(s)
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No matches found
            </h3>
            <p className="text-gray-600">
              No names match "{searchQuery}". Try a different search term.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start searching
            </h3>
            <p className="text-gray-600">
              Enter a search term above to find names
            </p>
          </div>
        )}
      </div>
      
      {/* Statistics */}
      {searchQuery && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Search Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{filteredNames.length}</p>
              <p className="text-sm text-blue-700">Matches Found</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {((filteredNames.length / SAMPLE_NAMES.length) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-green-700">Match Rate</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {searchQuery.length}
              </p>
              <p className="text-sm text-yellow-700">Query Length</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {caseSensitive ? 'On' : 'Off'}
              </p>
              <p className="text-sm text-purple-700">Case Sensitivity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;