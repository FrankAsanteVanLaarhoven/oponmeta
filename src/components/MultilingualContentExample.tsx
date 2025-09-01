import React, { useState } from 'react';
import { useMultilingualContent, useContentStats } from '../hooks/useMultilingualContent';

export default function MultilingualContentExample() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedType, setSelectedType] = useState<'page' | 'blog' | 'rto-qualification'>('page');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useContentStats();
  const { content, getAvailableLanguages, totalCount } = useMultilingualContent({
    language: selectedLanguage,
    type: selectedType,
    search: searchQuery || undefined,
    limit: 10
  });

  const availableLanguages = getAvailableLanguages();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Multilingual Content Explorer</h1>
      
      {/* Statistics */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Content Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Files</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.languages.length}</div>
            <div className="text-sm text-gray-600">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.types.length}</div>
            <div className="text-sm text-gray-600">Content Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{totalCount}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="page">Pages</option>
              <option value="blog">Blog Posts</option>
              <option value="rto-qualification">RTO Qualifications</option>
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Content ({totalCount} results)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {selectedType} content in {selectedLanguage.toUpperCase()}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {content.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No content found with the current filters.
            </div>
          ) : (
            content.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {item.type}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {item.language.toUpperCase()}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {item.slug}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-xs text-gray-500">
                    {item.content.length > 200 ? (
                      <span>{item.content.substring(0, 200)}...</span>
                    ) : (
                      <span>{item.content}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 