import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  BookOpen, 
  BarChart3, 
  Heart, 
  Sparkles, 
  Leaf, 
  Zap, 
  Briefcase, 
  Globe, 
  Target, 
  Music, 
  Star, 
  Award, 
  Bell, 
  Heart as HeartIcon, 
  Wrench, 
  Users,
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  Play,
  Star as StarIcon,
  ThumbsUp,
  Bookmark,
  ShoppingCart
} from 'lucide-react';
import { toast } from 'sonner';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: number;
  originalPrice?: number;
  image: string;
  isFree: boolean;
  isBestseller: boolean;
  lastUpdated: string;
  progress?: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  courseCount: number;
}

const CourseBrowsing = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Categories with icons and colors
  const categories: Category[] = [
    { id: 'technology', name: 'Technology and Digital Skills', icon: BookOpen, color: 'text-blue-600', courseCount: 0 },
    { id: 'data', name: 'Data and Analytics', icon: BarChart3, color: 'text-blue-600', courseCount: 0 },
    { id: 'health', name: 'Health and Healthcare Innovation', icon: Heart, color: 'text-green-600', courseCount: 0 },
    { id: 'cleaning', name: 'Cleaning and Sanitation Services', icon: Sparkles, color: 'text-blue-400', courseCount: 0 },
    { id: 'environment', name: 'Environment and Sustainability', icon: Leaf, color: 'text-green-400', courseCount: 0 },
    { id: 'engineering', name: 'Engineering and Construction', icon: Zap, color: 'text-green-600', courseCount: 0 },
    { id: 'business', name: 'Business, Strategy and Innovation', icon: Briefcase, color: 'text-purple-600', courseCount: 0 },
    { id: 'agriculture', name: 'Agriculture and Food System', icon: Globe, color: 'text-green-600', courseCount: 0 },
    { id: 'leadership', name: 'Professional Development and Leadership', icon: Target, color: 'text-orange-600', courseCount: 0 },
    { id: 'music', name: 'Music and Sound Production', icon: Music, color: 'text-pink-600', courseCount: 0 },
    { id: 'art', name: 'Art Design and Creative Media', icon: Star, color: 'text-purple-600', courseCount: 0 },
    { id: 'drama', name: 'Drama, Theatre and Performance', icon: Award, color: 'text-yellow-600', courseCount: 0 },
    { id: 'hospitality', name: 'Hospitality, Tourism and Events', icon: Bell, color: 'text-orange-600', courseCount: 0 },
    { id: 'sports', name: 'Sports, Fitness and Wellness', icon: HeartIcon, color: 'text-red-600', courseCount: 0 },
    { id: 'vocational', name: 'Vocational and Technical Training', icon: Wrench, color: 'text-gray-600', courseCount: 0 },
    { id: 'education', name: 'Childhood Studies and Early Year Education', icon: Users, color: 'text-blue-400', courseCount: 0 }
  ];

  // Mock course data
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: 1,
        title: 'FOOD',
        description: 'Learn food preparation and culinary arts',
        instructor: 'Current User Food',
        category: 'Finance and Accounting',
        level: 'Beginner',
        duration: '10-15 hours',
        lessons: 12,
        students: 0,
        rating: 0,
        price: 99,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        isFree: false,
        isBestseller: false,
        lastUpdated: '03/08/2025'
      },
      {
        id: 2,
        title: 'Complete Web Development Bootcamp',
        description: 'Learn web development from scratch with HTML, CSS, JavaScript, and modern frameworks',
        instructor: 'Current User',
        category: 'Technology',
        level: 'Beginner',
        duration: '40-50 hours',
        lessons: 25,
        students: 0,
        rating: 0,
        price: 149,
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
        isFree: false,
        isBestseller: true,
        lastUpdated: '03/08/2025'
      },
      {
        id: 3,
        title: 'Advanced React Development',
        description: 'Master React with hooks, context, and advanced patterns',
        instructor: 'Sarah Johnson',
        category: 'Technology',
        level: 'Advanced',
        duration: '20-25 hours',
        lessons: 18,
        students: 15420,
        rating: 4.8,
        price: 129,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        isFree: false,
        isBestseller: true,
        lastUpdated: '02/15/2025'
      },
      {
        id: 4,
        title: 'Data Science Fundamentals',
        description: 'Introduction to data science and machine learning',
        instructor: 'Dr. Michael Chen',
        category: 'Data and Analytics',
        level: 'Intermediate',
        duration: '30-35 hours',
        lessons: 22,
        students: 8920,
        rating: 4.7,
        price: 179,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        isFree: false,
        isBestseller: false,
        lastUpdated: '01/20/2025'
      }
    ];
    setCourses(mockCourses);
  }, []);

  // Filter and sort courses
  useEffect(() => {
    let filtered = courses;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => 
        course.category.toLowerCase().includes(selectedCategory)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort courses
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
  }, [courses, selectedCategory, searchTerm, sortBy]);

  // Action handlers
  const handleFavorite = (courseId: number) => {
    toast.success('Course added to favorites!');
  };

  const handleWishlist = (courseId: number) => {
    toast.success('Course added to wishlist!');
  };

  const handleLike = (courseId: number) => {
    toast.success('Course liked!');
  };

  const handlePurchase = (course: Course) => {
    toast.success(`Redirecting to purchase ${course.title}`);
  };

  const handlePreview = (course: Course) => {
    toast.success(`Opening preview for ${course.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Your Courses Now</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Categories */}
          <div className="lg:w-1/4">
                          <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-700 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                                          <span className="text-sm text-white">({category.courseCount} Courses)</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            
            {/* Search and Filters */}
                            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Available Courses Section */}
            <div className="mb-6">
                              <h2 className="text-2xl font-bold text-white mb-4">Available Courses</h2>
            </div>

            {/* Course Grid */}
            {filteredCourses.length === 0 ? (
                              <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-white text-lg">No courses found matching your criteria.</p>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid md:grid-cols-2 gap-6" 
                : "space-y-4"
              }>
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow overflow-hidden">
                    <div className={viewMode === "grid" ? "relative" : "flex"}>
                      {/* Course Image */}
                      <div className={viewMode === "grid" ? "relative" : "w-48 flex-shrink-0"}>
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className={viewMode === "grid" 
                            ? "w-full h-48 object-cover" 
                            : "w-full h-32 object-cover"
                          }
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-600 text-white text-xs">
                            {course.category}
                          </Badge>
                        </div>

                        {/* Interactive Icons */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full bg-gray-700/80 backdrop-blur-md hover:bg-gray-600"
                            onClick={() => handleFavorite(course.id)}
                          >
                            <Heart className="h-4 w-4 text-white" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full bg-gray-700/80 backdrop-blur-md hover:bg-gray-600"
                            onClick={() => handleWishlist(course.id)}
                          >
                            <Bookmark className="h-4 w-4 text-white" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full bg-gray-700/80 backdrop-blur-md hover:bg-gray-600"
                            onClick={() => handleLike(course.id)}
                          >
                            <ThumbsUp className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className={viewMode === "grid" ? "p-6" : "flex-1 p-6"}>
                        <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                        <p className="text-sm text-white mb-2">Instructor: {course.instructor}</p>
                        {viewMode === "grid" && (
                                                      <p className="text-sm text-white mb-4 line-clamp-2">{course.description}</p>
                        )}

                        {/* Course Stats */}
                        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                          <div className="flex items-center space-x-1 text-white">
                            <Clock className="h-3 w-3" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-white">
                            <Play className="h-3 w-3" />
                            <span>{course.lessons} modules</span>
                          </div>
                          <div className="flex items-center space-x-1 text-white">
                            <Users className="h-3 w-3" />
                            <span>{course.students}</span>
                          </div>
                          <div className="text-white">
                            <Badge variant="outline" className="border-white text-white text-xs">
                              {course.level}
                            </Badge>
                          </div>
                        </div>

                        {/* Rating and Update Info */}
                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center space-x-1">
                            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-white font-medium">{course.rating} / 5</span>
                            <span className="text-white">({course.students} learners)</span>
                          </div>
                          <div className="text-xs text-white">
                            Updated {course.lastUpdated}
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-white">
                            ${course.price}
                          </div>
                          <Button 
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => handlePurchase(course)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBrowsing;
