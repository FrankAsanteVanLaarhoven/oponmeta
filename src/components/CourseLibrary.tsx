import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  Download, 
  Filter, 
  Search, 
  Plus, 
  Upload, 
  Settings, 
  Grid3X3, 
  List, 
  CheckCircle, 
  Info,
  Book,
  TrendingUp
} from "lucide-react";
import { toast } from 'sonner';

const CourseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const navigate = useNavigate();

  const categories = ["All", "Technology", "Business", "Marketing", "Design", "Leadership", "Data Science", "AI & ML"];

  const sortOptions = [
    "Most Popular",
    "Newest First", 
    "Highest Rated",
    "Price: Low to High",
    "Price: High to Low",
    "Duration: Short to Long",
    "Duration: Long to Short"
  ];

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockCourses = [
      {
        id: 1,
        title: "Advanced JavaScript Development",
        description: "Master modern JavaScript concepts and frameworks",
        category: "Technology",
        level: "Advanced",
        duration: "8 hours",
        lessons: 24,
        students: 15420,
        rating: 4.8,
        instructor: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
        downloadable: true,
        certificate: true,
        price: 89.99,
        isFree: false,
        createdAt: "2024-01-15"
      },
      {
        id: 2,
        title: "Digital Marketing Strategy",
        description: "Comprehensive digital marketing course for modern businesses",
        category: "Marketing",
        level: "Intermediate",
        duration: "6 hours",
        lessons: 18,
        students: 8920,
        rating: 4.7,
        instructor: "Michael Chen",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        downloadable: false,
        certificate: true,
        price: 0,
        isFree: true,
        createdAt: "2024-02-01"
      },
      {
        id: 3,
        title: "UI/UX Design Fundamentals",
        description: "Learn the principles of user interface and experience design",
        category: "Design",
        level: "Beginner",
        duration: "10 hours",
        lessons: 32,
        students: 12340,
        rating: 4.9,
        instructor: "Emma Davis",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
        downloadable: true,
        certificate: true,
        price: 0,
        isFree: true,
        createdAt: "2024-01-20"
      },
      {
        id: 4,
        title: "Data Science Essentials",
        description: "Introduction to data science and machine learning",
        category: "Data Science",
        level: "Intermediate",
        duration: "12 hours",
        lessons: 36,
        students: 9870,
        rating: 4.6,
        instructor: "Dr. Alex Rodriguez",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        downloadable: true,
        certificate: true,
        price: 129.99,
        isFree: false,
        createdAt: "2024-01-10"
      },
      {
        id: 5,
        title: "Leadership in the Digital Age",
        description: "Develop leadership skills for the modern workplace",
        category: "Leadership",
        level: "Advanced",
        duration: "5 hours",
        lessons: 15,
        students: 5670,
        rating: 4.8,
        instructor: "Lisa Thompson",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
        downloadable: false,
        certificate: true,
        price: 0,
        isFree: true,
        createdAt: "2024-02-05"
      },
      {
        id: 6,
        title: "AI and Machine Learning Basics",
        description: "Understanding artificial intelligence and machine learning concepts",
        category: "AI & ML",
        level: "Beginner",
        duration: "9 hours",
        lessons: 28,
        students: 11230,
        rating: 4.7,
        instructor: "Dr. James Wilson",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
        downloadable: true,
        certificate: true,
        price: 149.99,
        isFree: false,
        createdAt: "2024-01-25"
      }
    ];
    setCourses(mockCourses);
  }, []);

  // Calculate metrics
  const totalCourses = courses.length;
  const freeCourses = courses.filter(course => course.isFree).length;
  const averageRating = courses.length > 0 
    ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
    : "0.0";

  // Sort courses based on selected option
  const getSortedCourses = (coursesToSort: any[]) => {
    switch (sortBy) {
      case "Most Popular":
        return [...coursesToSort].sort((a, b) => b.students - a.students);
      case "Newest First":
        return [...coursesToSort].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "Highest Rated":
        return [...coursesToSort].sort((a, b) => b.rating - a.rating);
      case "Price: Low to High":
        return [...coursesToSort].sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return [...coursesToSort].sort((a, b) => b.price - a.price);
      case "Duration: Short to Long":
        return [...coursesToSort].sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      case "Duration: Long to Short":
        return [...coursesToSort].sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
      default:
        return coursesToSort;
    }
  };

  const filteredCourses = getSortedCourses(courses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }));

  // Action handlers
  const handleAddNewCourse = () => {
    setShowAddCourseModal(true);
    toast.success("Add Course modal opened");
  };

  const handleExportCatalogue = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Category,Level,Duration,Students,Rating,Price\n" +
      filteredCourses.map(course => 
        `${course.title},${course.category},${course.level},${course.duration},${course.students},${course.rating},${course.price}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "course_catalogue.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Course catalogue exported successfully!");
  };

  const handleCustomiseView = () => {
    setShowCustomizeModal(true);
    toast.success("Customise View modal opened");
  };

  const handleAddToLibrary = (courseId: number) => {
    toast.success(`Course added to library!`);
  };

  const handlePreviewCourse = (courseId: number) => {
    navigate(`/courses/${courseId}/preview`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalogue</h1>
              <p className="text-gray-600">Discover {totalCourses} courses to advance your skills.</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
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
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Courses Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">{totalCourses}</div>
                  <div className="text-blue-700 font-medium">Total Courses</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Free Courses Card */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-900 mb-1">{freeCourses}</div>
                  <div className="text-green-700 font-medium">Free Courses</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Average Rating Card */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-900 mb-1">{averageRating}</div>
                  <div className="text-purple-700 font-medium">Average Rating</div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={handleAddNewCourse}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300"
          >
            <Plus className="w-4 h-4 mr-2 text-orange-500" />
            Add New Course
          </Button>
          
          <Button 
            onClick={handleExportCatalogue}
            className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
          >
            <Upload className="w-4 h-4 mr-2" />
            Export Catalogue
          </Button>
          
          <Button 
            onClick={handleCustomiseView}
            className="bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Customise View
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search courses by title or description"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid/List */}
        <div className="mb-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
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
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">{course.category}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white text-gray-900 border-gray-300">
                          {course.level}
                        </Badge>
                      </div>
                      {course.isFree && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-green-600 text-white">Free</Badge>
                        </div>
                      )}
                    </div>
                    
                    {/* Course Content */}
                    <div className={viewMode === "grid" ? "p-6" : "flex-1 p-6"}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {course.lessons} lessons
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-gray-900">{course.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">by {course.instructor}</div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {course.downloadable && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            <Download className="h-3 w-3 mr-1" />
                            Downloadable
                          </Badge>
                        )}
                        {course.certificate && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            Certificate
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleAddToLibrary(course.id)}
                          className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Add to Library
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePreviewCourse(course.id)}
                          className="text-gray-900 border-gray-300 hover:bg-gray-50"
                        >
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Localization Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">UK English Localisation Active</h4>
                <p className="text-blue-700 text-sm">
                  All text, numbers, and formatting use British English conventions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modals Placeholder */}
        {showAddCourseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Add New Course</h3>
              <p className="text-gray-600 mb-4">Course creation form would be implemented here.</p>
              <div className="flex gap-2">
                <Button onClick={() => setShowAddCourseModal(false)}>Cancel</Button>
                <Button onClick={() => {
                  setShowAddCourseModal(false);
                  toast.success("Course creation form opened!");
                }}>Continue</Button>
              </div>
            </div>
          </div>
        )}

        {showCustomizeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Customise View</h3>
              <p className="text-gray-600 mb-4">View customization options would be implemented here.</p>
              <div className="flex gap-2">
                <Button onClick={() => setShowCustomizeModal(false)}>Cancel</Button>
                <Button onClick={() => {
                  setShowCustomizeModal(false);
                  toast.success("View customization opened!");
                }}>Continue</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLibrary;
