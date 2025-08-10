import React, { useState, useMemo } from 'react';
import { Course } from '@/types/course';
import CourseCard from './CourseCard';
import CourseFilters from './CourseFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Grid,
  LayoutGrid
} from 'lucide-react';
import { CourseFilter } from '@/types/course';

interface CourseGridProps {
  courses: Course[];
  onEnroll?: (courseId: number) => void;
  onFavorite?: (courseId: number) => void;
  showFilters?: boolean;
  showSorting?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  variant?: 'grid' | 'list' | 'compact';
}

type SortOption = 'title' | 'price' | 'rating' | 'duration' | 'enrolledStudents' | 'lastUpdated';
type SortDirection = 'asc' | 'desc';

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  onEnroll,
  onFavorite,
  showFilters = true,
  showSorting = true,
  showPagination = true,
  itemsPerPage = 12,
  variant = 'grid'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>(variant);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<CourseFilter>({});

  // Extract unique categories and difficulties for filters
  const categories = useMemo(() => {
    const cats = new Set<string>();
    courses.forEach(course => {
      course.categories?.forEach(cat => cats.add(cat));
    });
    return Array.from(cats).sort();
  }, [courses]);

  const difficulties = useMemo(() => {
    const diffs = new Set<string>();
    courses.forEach(course => {
      if (course.difficulty) diffs.add(course.difficulty);
    });
    return Array.from(diffs).sort();
  }, [courses]);

  // Apply filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          course.title.toLowerCase().includes(searchTerm) ||
          course.description?.toLowerCase().includes(searchTerm) ||
          course.instructor.toLowerCase().includes(searchTerm) ||
          course.categories?.some(cat => cat.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        const hasMatchingCategory = course.categories?.some(cat => 
          filters.categories!.includes(cat)
        );
        if (!hasMatchingCategory) return false;
      }

      // Difficulty filter
      if (filters.difficulties && filters.difficulties.length > 0) {
        if (!course.difficulty || !filters.difficulties.includes(course.difficulty)) {
          return false;
        }
      }

      // Price filter
      if (filters.minPrice !== undefined && course.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && course.price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating !== undefined && course.rating < filters.minRating) {
        return false;
      }

      // Duration filter
      if (filters.maxDuration !== undefined && course.duration && course.duration > filters.maxDuration) {
        return false;
      }

      // Features filter
      if (filters.features && filters.features.length > 0) {
        const hasMatchingFeature = filters.features.some(feature => {
          switch (feature) {
            case 'Certificate':
              return course.certificate;
            case 'Lifetime Access':
              return course.accessType === 'lifetime';
            case 'Mobile App':
              return true; // Assume all courses have mobile access
            case 'Quizzes':
              return true; // Assume all courses have quizzes
            case 'Assignments':
              return true; // Assume all courses have assignments
            case '1-on-1 Support':
              return true; // Assume all courses have support
            default:
              return false;
          }
        });
        if (!hasMatchingFeature) return false;
      }

      return true;
    });
  }, [courses, filters]);

  // Apply sorting
  const sortedCourses = useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'duration':
          aValue = a.duration || 0;
          bValue = b.duration || 0;
          break;
        case 'enrolledStudents':
          aValue = a.enrolledStudents || 0;
          bValue = b.enrolledStudents || 0;
          break;
        case 'lastUpdated':
          aValue = new Date(a.lastUpdated || '');
          bValue = new Date(b.lastUpdated || '');
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredCourses, sortBy, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return null;
    return sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
  };

  const getGridCols = () => {
    switch (viewMode) {
      case 'compact':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 'list':
        return 'grid-cols-1';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center border rounded-lg p-1 bg-white">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'compact' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('compact')}
              className="h-8 w-8 p-0"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>

          {/* Sort dropdown */}
          {showSorting && (
            <div className="relative">
              <select
                value={`${sortBy}-${sortDirection}`}
                onChange={(e) => {
                  const [option, direction] = e.target.value.split('-') as [SortOption, SortDirection];
                  setSortBy(option);
                  setSortDirection(direction);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="price-asc">Price Low to High</option>
                <option value="price-desc">Price High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
                <option value="duration-asc">Shortest Duration</option>
                <option value="duration-desc">Longest Duration</option>
                <option value="enrolledStudents-desc">Most Popular</option>
                <option value="lastUpdated-desc">Recently Updated</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {Object.keys(filters).length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.search && (
            <Badge variant="secondary" className="text-xs">
              Search: "{filters.search}"
            </Badge>
          )}
          {filters.categories?.map(category => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {filters.difficulties?.map(difficulty => (
            <Badge key={difficulty} variant="secondary" className="text-xs">
              {difficulty}
            </Badge>
          ))}
          {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
            <Badge variant="secondary" className="text-xs">
              ${filters.minPrice || 0} - ${filters.maxPrice || 500}
            </Badge>
          )}
          {filters.minRating !== undefined && (
            <Badge variant="secondary" className="text-xs">
              {filters.minRating}+ stars
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-red-600 hover:text-red-700"
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-80 flex-shrink-0">
            <CourseFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              difficulties={difficulties}
              onClearFilters={clearFilters}
              totalCourses={courses.length}
              filteredCount={filteredCourses.length}
            />
          </div>
        )}

        {/* Course grid */}
        <div className="flex-1">
          {paginatedCourses.length > 0 ? (
            <>
              <div className={`grid ${getGridCols()} gap-6`}>
                {paginatedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEnroll={onEnroll}
                    onFavorite={onFavorite}
                    variant={viewMode === 'compact' ? 'compact' : viewMode === 'list' ? 'featured' : 'default'}
                    showProgress={false}
                  />
                ))}
              </div>

              {/* Pagination */}
              {showPagination && totalPages > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, sortedCourses.length)} of {sortedCourses.length} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
