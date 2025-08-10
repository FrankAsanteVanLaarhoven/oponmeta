import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    level: true,
    duration: true,
    price: true,
    rating: true,
    language: true,
    features: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, children, sectionKey }: { 
    title: string; 
    children: React.ReactNode; 
    sectionKey: keyof typeof expandedSections;
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
      >
        {title}
        {expandedSections[sectionKey] ? 
          <ChevronUp className="h-4 w-4" /> : 
          <ChevronDown className="h-4 w-4" />
        }
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg lg:shadow-none
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Category Filter */}
          <FilterSection title="Category" sectionKey="category">
            <div className="space-y-2">
              {[
                'Web Development',
                'Data Science',
                'Mobile Development',
                'Design',
                'Business',
                'Marketing',
                'Photography',
                'Music',
                'Language Learning'
              ].map((category) => (
                <label key={category} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Level Filter */}
          <FilterSection title="Level" sectionKey="level">
            <div className="space-y-2">
              {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level) => (
                <label key={level} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Duration Filter */}
          <FilterSection title="Duration" sectionKey="duration">
            <div className="space-y-2">
              {[
                '0-2 hours',
                '3-6 hours',
                '7-17 hours',
                '17+ hours'
              ].map((duration) => (
                <label key={duration} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">{duration}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Filter */}
          <FilterSection title="Price" sectionKey="price">
            <div className="space-y-2">
              {['Free', 'Paid', '$0-$50', '$50-$100', '$100+'].map((price) => (
                <label key={price} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">{price}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection title="Rating" sectionKey="rating">
            <div className="space-y-2">
              {[
                { stars: 5, label: '5 stars' },
                { stars: 4, label: '4 stars & up' },
                { stars: 3, label: '3 stars & up' },
                { stars: 2, label: '2 stars & up' }
              ].map((rating) => (
                <label key={rating.stars} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <div className="ml-2 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < rating.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-700">{rating.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Language Filter */}
          <FilterSection title="Language" sectionKey="language">
            <div className="space-y-2">
              {['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'].map((language) => (
                <label key={language} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">{language}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Features Filter */}
          <FilterSection title="Features" sectionKey="features">
            <div className="space-y-2">
              {[
                'Closed Captions',
                'Quizzes',
                'Coding Exercises',
                'Practice Tests',
                'Downloadable Resources',
                'Certificate of Completion'
              ].map((feature) => (
                <label key={feature} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Clear Filters Button */}
          <button className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;