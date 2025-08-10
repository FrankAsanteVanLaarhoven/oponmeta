import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, BookOpen, Users, Briefcase as BriefcaseIcon, Zap, Star, ArrowRight } from 'lucide-react';
import { searchService, SearchResult } from '@/services/searchService';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    searchService.getPopularSearches().then(setPopularSearches);
    searchService.getRecentSearches().then(setRecentSearches);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setSuggestions([]);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Handle search query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      setShowSuggestions(true);
      return;
    }

    setIsLoading(true);
    
    // Debounce search
    const timeoutId = setTimeout(async () => {
      const searchResults = await searchService.search({ query });
      const searchSuggestions = await searchService.getSearchSuggestions(query);
      setResults(searchResults);
      setSuggestions(searchSuggestions);
      setShowSuggestions(false);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = results.length + suggestions.length + popularSearches.length + recentSearches.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < totalItems - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : totalItems - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleItemSelect(selectedIndex);
        } else if (query.trim()) {
          handleSearch(query);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      searchService.saveSearch(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const handleItemSelect = (index: number) => {
    let currentIndex = 0;
    
    // Check recent searches
    if (index < recentSearches.length) {
      handleSearch(recentSearches[index]);
      return;
    }
    currentIndex += recentSearches.length;
    
    // Check popular searches
    if (index < currentIndex + popularSearches.length) {
      handleSearch(popularSearches[index - currentIndex]);
      return;
    }
    currentIndex += popularSearches.length;
    
    // Check suggestions
    if (index < currentIndex + suggestions.length) {
      handleSearch(suggestions[index - currentIndex]);
      return;
    }
    currentIndex += suggestions.length;
    
    // Check results
    if (index < currentIndex + results.length) {
      const result = results[index - currentIndex];
      navigate(result.url);
      onClose();
      return;
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'page':
        return <Star className="w-4 h-4" />;
      case 'tool':
        return <Zap className="w-4 h-4" />;
      case 'companion':
        return <Users className="w-4 h-4" />;
      case 'category':
        return <BriefcaseIcon className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getItemClassName = (index: number) => {
    const baseClasses = "flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors";
    return selectedIndex === index 
      ? `${baseClasses} bg-gray-100 dark:bg-gray-800` 
      : baseClasses;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
      <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden ${className}`}>
        {/* Search Header */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search courses, tools, features, or anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div ref={resultsRef} className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2">Searching...</p>
            </div>
          )}

          {!isLoading && query && results.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                Search Results
              </div>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={getItemClassName(index)}
                  onClick={() => {
                    navigate(result.url);
                    onClose();
                  }}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3 text-blue-500">
                      {getItemIcon(result.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {result.description}
                      </div>
                      {result.category && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          {result.category}
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-1">Try different keywords or browse our categories</p>
            </div>
          )}

          {/* Suggestions */}
          {!isLoading && showSuggestions && suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={getItemClassName(index)}
                  onClick={() => handleSearch(suggestion)}
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {suggestion}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!isLoading && showSuggestions && recentSearches.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <div
                  key={search}
                  className={getItemClassName(index)}
                  onClick={() => handleSearch(search)}
                >
                  <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {search}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {!isLoading && showSuggestions && popularSearches.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                Popular Searches
              </div>
              {popularSearches.map((search, index) => (
                <div
                  key={search}
                  className={getItemClassName(index + recentSearches.length)}
                  onClick={() => handleSearch(search)}
                >
                  <TrendingUp className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {search}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          {!isLoading && showSuggestions && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                Quick Actions
              </div>
              <div className="grid grid-cols-2 gap-2 p-4">
                <button
                  onClick={() => {
                    navigate('/courses');
                    onClose();
                  }}
                  className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Browse Courses</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/companion');
                    onClose();
                  }}
                  className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Users className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">AI Companion</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    onClose();
                  }}
                  className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Star className="w-5 h-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium">Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/authoring-tool');
                    onClose();
                  }}
                  className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Zap className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-sm font-medium">Create Course</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch; 