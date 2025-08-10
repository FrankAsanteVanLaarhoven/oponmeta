import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Clock, 
  Globe, 
  BookOpen,
  TrendingUp,
  Award,
  Play,
  Heart,
  Share2,
  ShoppingCart,
  Eye,
  Tag,
  User,
  Calendar,
  DollarSign,
  Languages,
  Building,
  Grid,
  List
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
    rating: number;
    students: number;
  };
  category: string;
  sector: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in hours
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  image: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  certificate: boolean;
  lastUpdated: string;
  lessons: number;
  quizzes: number;
  projects: number;
}

interface FilterState {
  category: string;
  sector: string;
  language: string;
  level: string;
  priceRange: [number, number];
  rating: number;
  duration: string;
  features: string[];
}

const CourseMarketplace: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    sector: '',
    language: '',
    level: '',
    priceRange: [0, 1000],
    rating: 0,
    duration: '',
    features: []
  });

  // Mock data
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer',
      instructor: {
        name: 'Dr. Angela Yu',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        students: 125000
      },
      category: 'Programming',
      sector: 'Technology',
      language: 'English',
      level: 'Beginner',
      duration: 44,
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 12543,
      students: 125000,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      tags: ['Web Development', 'JavaScript', 'React', 'Node.js'],
      isFeatured: true,
      isNew: false,
      isBestseller: true,
      certificate: true,
      lastUpdated: '2024-01-15',
      lessons: 185,
      quizzes: 45,
      projects: 12
    },
    {
      id: '2',
      title: 'Data Science and Machine Learning',
      description: 'Master Python, pandas, numpy, scikit-learn and build ML models',
      instructor: {
        name: 'Jose Portilla',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.7,
        students: 89000
      },
      category: 'Data Science',
      sector: 'Technology',
      language: 'English',
      level: 'Intermediate',
      duration: 22,
      price: 94.99,
      originalPrice: 189.99,
      rating: 4.7,
      reviews: 8921,
      students: 89000,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['Python', 'Machine Learning', 'Data Analysis', 'AI'],
      isFeatured: true,
      isNew: false,
      isBestseller: true,
      certificate: true,
      lastUpdated: '2024-01-10',
      lessons: 156,
      quizzes: 38,
      projects: 8
    },
    {
      id: '3',
      title: 'UI/UX Design Masterclass',
      description: 'Learn modern design principles, Figma, and create stunning user interfaces',
      instructor: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        students: 67000
      },
      category: 'Design',
      sector: 'Creative',
      language: 'English',
      level: 'Beginner',
      duration: 18,
      price: 79.99,
      originalPrice: 159.99,
      rating: 4.9,
      reviews: 5432,
      students: 67000,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      tags: ['UI/UX', 'Figma', 'Design', 'Prototyping'],
      isFeatured: false,
      isNew: true,
      isBestseller: false,
      certificate: true,
      lastUpdated: '2024-01-20',
      lessons: 98,
      quizzes: 25,
      projects: 6
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      description: 'Master SEO, social media marketing, and digital advertising',
      instructor: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 4.6,
        students: 45000
      },
      category: 'Marketing',
      sector: 'Business',
      language: 'English',
      level: 'Intermediate',
      duration: 15,
      price: 69.99,
      originalPrice: 139.99,
      rating: 4.6,
      reviews: 3214,
      students: 45000,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['Digital Marketing', 'SEO', 'Social Media', 'Advertising'],
      isFeatured: false,
      isNew: false,
      isBestseller: false,
      certificate: true,
      lastUpdated: '2024-01-05',
      lessons: 87,
      quizzes: 22,
      projects: 4
    }
  ];

  const categories = [
    'All Categories',
    'Programming',
    'Data Science',
    'Design',
    'Marketing',
    'Business',
    'Finance',
    'Health & Fitness',
    'Music',
    'Photography',
    'Language Learning'
  ];

  const sectors = [
    'All Sectors',
    'Technology',
    'Business',
    'Creative',
    'Healthcare',
    'Education',
    'Finance',
    'Marketing',
    'Sales',
    'Human Resources',
    'Operations'
  ];

  const languages = [
    'All Languages',
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Korean',
    'Portuguese',
    'Italian',
    'Russian'
  ];

  const levels = [
    'All Levels',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  const features = [
    'Certificate',
    'Quizzes',
    'Projects',
    'Live Sessions',
    '1-on-1 Support',
    'Downloadable Resources'
  ];

  useEffect(() => {
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Sector filter
    if (filters.sector && filters.sector !== 'All Sectors') {
      filtered = filtered.filter(course => course.sector === filters.sector);
    }

    // Language filter
    if (filters.language && filters.language !== 'All Languages') {
      filtered = filtered.filter(course => course.language === filters.language);
    }

    // Level filter
    if (filters.level && filters.level !== 'All Levels') {
      filtered = filtered.filter(course => course.level === filters.level);
    }

    // Price range filter
    filtered = filtered.filter(course => 
      course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(course => course.rating >= filters.rating);
    }

    // Duration filter
    if (filters.duration) {
      switch (filters.duration) {
        case '0-5':
          filtered = filtered.filter(course => course.duration <= 5);
          break;
        case '5-10':
          filtered = filtered.filter(course => course.duration > 5 && course.duration <= 10);
          break;
        case '10-20':
          filtered = filtered.filter(course => course.duration > 10 && course.duration <= 20);
          break;
        case '20+':
          filtered = filtered.filter(course => course.duration > 20);
          break;
      }
    }

    // Features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(course => {
        if (filters.features.includes('Certificate') && !course.certificate) return false;
        if (filters.features.includes('Quizzes') && course.quizzes === 0) return false;
        if (filters.features.includes('Projects') && course.projects === 0) return false;
        return true;
      });
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, filters, sortBy]);

  const handlePurchase = (courseId: string) => {
    // Handle course purchase
    console.log('Purchasing course:', courseId);
  };

  const handleWishlist = (courseId: string) => {
    // Handle wishlist toggle
    console.log('Toggling wishlist for course:', courseId);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDuration = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${hours}h`;
    const days = Math.round(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Marketplace</h1>
          <p className="text-gray-600">Discover thousands of courses from expert instructors worldwide</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <GridIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <ListIcon size={20} />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={filters.level}
                    onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]] 
                    }))}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value) || 1000] 
                    }))}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <div className="flex flex-wrap gap-2">
                  {features.map(feature => (
                    <label key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({ ...prev, features: [...prev.features, feature] }));
                          } else {
                            setFilters(prev => ({ 
                              ...prev, 
                              features: prev.features.filter(f => f !== feature) 
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <TrendingUp size={16} />
            <span>Trending courses updated daily</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Course Image */}
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                {course.isFeatured && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
                {course.isNew && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    New
                  </div>
                )}
                {course.isBestseller && (
                  <div className="absolute bottom-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Bestseller
                  </div>
                )}
                <button
                  onClick={() => handleWishlist(course.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Course Content */}
              <div className="p-4">
                {/* Instructor */}
                <div className="flex items-center space-x-2 mb-3">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{course.instructor.name}</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{course.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({course.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Course Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen size={14} />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{course.tags.length - 2} more</span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">{formatPrice(course.price)}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(course.originalPrice)}
                      </span>
                    )}
                  </div>
                  {course.certificate && (
                    <Award size={16} className="text-blue-600" title="Certificate included" />
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePurchase(course.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Enroll Now
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Grid and List icons
const GridIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

export default CourseMarketplace; 