import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  X, 
  Star, 
  DollarSign, 
  Clock, 
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CourseFilter } from '@/types/course';

interface CourseFiltersProps {
  filters: CourseFilter;
  onFiltersChange: (filters: CourseFilter) => void;
  categories: string[];
  difficulties: string[];
  onClearFilters: () => void;
  totalCourses: number;
  filteredCount: number;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  difficulties,
  onClearFilters,
  totalCourses,
  filteredCount
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    difficulty: true,
    price: true,
    rating: true,
    duration: true,
    features: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (key: keyof CourseFilter, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    updateFilter('categories', newCategories);
  };

  const handleDifficultyToggle = (difficulty: string) => {
    const currentDifficulties = filters.difficulties || [];
    const newDifficulties = currentDifficulties.includes(difficulty)
      ? currentDifficulties.filter(d => d !== difficulty)
      : [...currentDifficulties, difficulty];
    updateFilter('difficulties', newDifficulties);
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = filters.features || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    updateFilter('features', newFeatures);
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.difficulties && filters.difficulties.length > 0) ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.minRating !== undefined ||
      filters.maxDuration !== undefined ||
      (filters.features && filters.features.length > 0)
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories?.length) count += filters.categories.length;
    if (filters.difficulties?.length) count += filters.difficulties.length;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count++;
    if (filters.minRating !== undefined) count++;
    if (filters.maxDuration !== undefined) count++;
    if (filters.features?.length) count += filters.features.length;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters() && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 mb-6">
        Showing {filteredCount} of {totalCourses} courses
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Categories
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories?.includes(category) || false}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('difficulty')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Difficulty Level
          {expandedSections.difficulty ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.difficulty && (
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={`difficulty-${difficulty}`}
                  checked={filters.difficulties?.includes(difficulty) || false}
                  onCheckedChange={() => handleDifficultyToggle(difficulty)}
                />
                <label
                  htmlFor={`difficulty-${difficulty}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {difficulty}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price Range
          </div>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Min Price</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Max Price</label>
                <Input
                  type="number"
                  placeholder="500"
                  value={filters.maxPrice || ''}
                  onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="mt-1"
                />
              </div>
            </div>
            <Slider
              value={[filters.minPrice || 0, filters.maxPrice || 500]}
              onValueChange={([min, max]) => {
                updateFilter('minPrice', min);
                updateFilter('maxPrice', max);
              }}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>$500</span>
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Minimum Rating
          </div>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.rating && (
          <div className="space-y-3">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.minRating === rating}
                  onCheckedChange={() => updateFilter('minRating', filters.minRating === rating ? undefined : rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm text-gray-700 cursor-pointer flex items-center gap-1"
                >
                  <span>{rating}+</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Duration */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('duration')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Maximum Duration
          </div>
          {expandedSections.duration ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.duration && (
          <div className="space-y-3">
            {[
              { value: 60, label: '1 hour' },
              { value: 180, label: '3 hours' },
              { value: 360, label: '6 hours' },
              { value: 720, label: '12 hours' }
            ].map((duration) => (
              <div key={duration.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration.value}`}
                  checked={filters.maxDuration === duration.value}
                  onCheckedChange={() => updateFilter('maxDuration', filters.maxDuration === duration.value ? undefined : duration.value)}
                />
                <label
                  htmlFor={`duration-${duration.value}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {duration.label} or less
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('features')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Features
          </div>
          {expandedSections.features ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.features && (
          <div className="space-y-2">
            {[
              'Certificate',
              'Lifetime Access',
              'Mobile App',
              'Quizzes',
              'Assignments',
              '1-on-1 Support'
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature}`}
                  checked={filters.features?.includes(feature) || false}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                />
                <label
                  htmlFor={`feature-${feature}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="text-xs">
                Search: "{filters.search}"
                <button
                  onClick={() => updateFilter('search', '')}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.categories?.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.difficulties?.map((difficulty) => (
              <Badge key={difficulty} variant="secondary" className="text-xs">
                {difficulty}
                <button
                  onClick={() => handleDifficultyToggle(difficulty)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <Badge variant="secondary" className="text-xs">
                ${filters.minPrice || 0} - ${filters.maxPrice || 500}
                <button
                  onClick={() => {
                    updateFilter('minPrice', undefined);
                    updateFilter('maxPrice', undefined);
                  }}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.minRating !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {filters.minRating}+ stars
                <button
                  onClick={() => updateFilter('minRating', undefined)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.features?.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
                <button
                  onClick={() => handleFeatureToggle(feature)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFilters;
