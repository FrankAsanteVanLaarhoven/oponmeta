import React, { useState } from 'react';
import { useUKEnglishContext } from '../context/UKEnglishContext';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  expanded: boolean;
}

interface EnhancedSidebarProps {
  className?: string;
}

/**
 * Enhanced sidebar component with improved text visibility
 * Demonstrates the black text on white background styling
 */
export const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({ className = '' }) => {
  const { formatText } = useUKEnglishContext();
  
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    {
      id: 'category',
      title: 'Category',
      expanded: true,
      options: [
        { id: 'web-dev', label: 'Web Development', count: 12, checked: false },
        { id: 'data-science', label: 'Data Science', count: 8, checked: false },
        { id: 'mobile-dev', label: 'Mobile Development', count: 6, checked: false },
        { id: 'design', label: 'Design', count: 15, checked: true },
        { id: 'business', label: 'Business', count: 10, checked: false },
        { id: 'marketing', label: 'Marketing', count: 7, checked: false },
        { id: 'photography', label: 'Photography', count: 5, checked: false },
        { id: 'music', label: 'Music', count: 4, checked: false },
        { id: 'language', label: 'Language Learning', count: 9, checked: false }
      ]
    },
    {
      id: 'level',
      title: 'Level',
      expanded: true,
      options: [
        { id: 'beginner', label: 'Beginner', count: 25, checked: false },
        { id: 'intermediate', label: 'Intermediate', count: 18, checked: false },
        { id: 'advanced', label: 'Advanced', count: 12, checked: false }
      ]
    },
    {
      id: 'duration',
      title: 'Duration',
      expanded: false,
      options: [
        { id: '0-2h', label: '0-2 hours', count: 15, checked: false },
        { id: '2-5h', label: '2-5 hours', count: 20, checked: false },
        { id: '5-10h', label: '5-10 hours', count: 12, checked: false },
        { id: '10h+', label: '10+ hours', count: 8, checked: false }
      ]
    },
    {
      id: 'price',
      title: 'Price',
      expanded: false,
      options: [
        { id: 'free', label: 'Free', count: 18, checked: false },
        { id: 'paid', label: 'Paid', count: 37, checked: false }
      ]
    },
    {
      id: 'rating',
      title: 'Rating',
      expanded: false,
      options: [
        { id: '4.5+', label: '4.5+ stars', count: 25, checked: false },
        { id: '4.0+', label: '4.0+ stars', count: 20, checked: false },
        { id: '3.5+', label: '3.5+ stars', count: 10, checked: false }
      ]
    },
    {
      id: 'language',
      title: 'Language',
      expanded: false,
      options: [
        { id: 'en', label: 'English', count: 45, checked: true },
        { id: 'es', label: 'Spanish', count: 8, checked: false },
        { id: 'fr', label: 'French', count: 6, checked: false },
        { id: 'de', label: 'German', count: 4, checked: false }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      expanded: false,
      options: [
        { id: 'certificate', label: 'Certificate', count: 35, checked: false },
        { id: 'quizzes', label: 'Quizzes', count: 28, checked: false },
        { id: 'projects', label: 'Projects', count: 22, checked: false },
        { id: 'discussions', label: 'Discussions', count: 18, checked: false }
      ]
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setFilterSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  const toggleOption = (sectionId: string, optionId: string) => {
    setFilterSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              options: section.options.map(option => 
                option.id === optionId 
                  ? { ...option, checked: !option.checked }
                  : option
              )
            }
          : section
      )
    );
  };

  const clearAllFilters = () => {
    setFilterSections(prev => 
      prev.map(section => ({
        ...section,
        options: section.options.map(option => ({ ...option, checked: false }))
      }))
    );
  };

  const getActiveFilterCount = () => {
    return filterSections.reduce((total, section) => 
      total + section.options.filter(option => option.checked).length, 0
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 p-6 w-80 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
        </svg>
        <span className="text-gray-500 font-medium">Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {getActiveFilterCount()} active
          </span>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {filterSections.map((section) => (
          <div key={section.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-left mb-3 group"
            >
              <h3 className="text-black font-semibold text-base font-montserrat">
                {formatText(section.title)}
              </h3>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  section.expanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {section.expanded && (
              <div className="space-y-2">
                {section.options.map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => toggleOption(section.id, option.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-black font-medium text-sm font-open-sans flex-1">
                      {formatText(option.label)}
                    </span>
                    <span className="text-gray-500 text-xs font-medium">
                      ({option.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clear All Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={clearAllFilters}
          disabled={getActiveFilterCount() === 0}
          className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg font-medium font-montserrat
                     hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear All Filters
        </button>
      </div>

      {/* Language Note */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-black text-sm font-medium font-open-sans">
              UK English Localisation Active
            </p>
            <p className="text-gray-700 text-xs mt-1 font-open-sans">
              All text is displayed using British English conventions and formatting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSidebar;
