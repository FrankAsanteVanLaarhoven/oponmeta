import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Settings, 
  BarChart3, 
  Users, 
  DollarSign, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Archive,
  Upload,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  Video,
  Target,
  Clock,
  ArrowRight,
  Download,
  Share2,
  Globe,
  FileText,
  Image,
  Music,
  Brain,
  Rocket,
  Trophy,
  Gift,
  Headphones,
  Mic,
  Camera,
  Monitor,
  Smartphone,
  Tablet,
  Palette,
  Languages,
  BookMarked,
  GraduationCap,
  Zap,
  Target as TargetIcon,
  Code,
  ChefHat,
  Microscope,
  Heart,
  Activity
} from 'lucide-react';
import { unifiedCourseService, Course, CourseFilters, CourseFormData } from '@/services/UnifiedCourseService';
import { toast } from 'sonner';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

interface UnifiedCourseManagementProps {
  mode?: 'instructor' | 'admin' | 'creator';
  showBackButton?: boolean;
  title?: string;
}

const UnifiedCourseManagement: React.FC<UnifiedCourseManagementProps> = ({
  mode = 'instructor',
  showBackButton = true,
  title
}) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'rating' | 'students' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    thisMonthRevenue: 0
  });

  // Feature flags for different modes
  const features = {
    canCreate: mode === 'instructor' || mode === 'admin' || mode === 'creator',
    canEdit: mode === 'instructor' || mode === 'admin' || mode === 'creator',
    canDelete: mode === 'admin' || mode === 'creator',
    canPublish: mode === 'instructor' || mode === 'admin' || mode === 'creator',
    canViewAnalytics: mode === 'instructor' || mode === 'admin' || mode === 'creator',
    canManageAll: mode === 'admin'
  };

  useEffect(() => {
    loadCourses();
    loadStats();
  }, [mode]);

  useEffect(() => {
    loadCourses();
  }, [searchTerm, filterStatus, filterCategory, filterLevel, sortBy, sortOrder]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const filters: CourseFilters = {
        searchTerm: searchTerm || undefined,
        status: filterStatus === 'all' ? undefined : filterStatus,
        category: filterCategory === 'all' ? undefined : filterCategory,
        level: filterLevel === 'all' ? undefined : filterLevel,
        sortBy,
        sortOrder,
        limit: 50
      };

      // If not admin, only show courses for current user
      if (!features.canManageAll) {
        filters.instructorId = 'current-user-id'; // This should come from auth context
      }

      const { data, error } = await unifiedCourseService.getCourses(filters);
      
      if (error) {
        toast.error(error);
      } else {
        setCourses(data);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const creatorId = features.canManageAll ? undefined : 'current-user-id';
      const statsData = await unifiedCourseService.getCourseStats(creatorId);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleCreateCourse = () => {
    if (features.canCreate) {
      navigate('/dashboard/courses/create');
    }
  };

  const handleEditCourse = (course: Course) => {
    if (features.canEdit) {
      navigate(`/dashboard/courses/edit/${course.id}`);
    }
  };

  const handleViewCourse = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  const handleDeleteCourse = async (course: Course) => {
    if (!features.canDelete) return;

    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      try {
        const { error } = await unifiedCourseService.deleteCourse(course.id);
        if (error) {
          toast.error(error);
        } else {
          toast.success('Course deleted successfully');
          loadCourses();
          loadStats();
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      }
    }
  };

  const handlePublishCourse = async (course: Course) => {
    if (!features.canPublish) return;

    try {
      const { error } = await unifiedCourseService.publishCourse(course.id);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Course published successfully');
        loadCourses();
        loadStats();
      }
    } catch (error) {
      console.error('Error publishing course:', error);
      toast.error('Failed to publish course');
    }
  };

  const handleUnpublishCourse = async (course: Course) => {
    if (!features.canPublish) return;

    try {
      const { error } = await unifiedCourseService.unpublishCourse(course.id);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Course unpublished successfully');
        loadCourses();
        loadStats();
      }
    } catch (error) {
      console.error('Error unpublishing course:', error);
      toast.error('Failed to unpublish course');
    }
  };

  const handleArchiveCourse = async (course: Course) => {
    if (!features.canDelete) return;

    try {
      const { error } = await unifiedCourseService.archiveCourse(course.id);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Course archived successfully');
        loadCourses();
        loadStats();
      }
    } catch (error) {
      console.error('Error archiving course:', error);
      toast.error('Failed to archive course');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      draft: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      archived: { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = variants[status as keyof typeof variants] || variants.draft;
    return (
      <Badge {...config}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getLevelBadge = (level: string) => {
    const variants = {
      beginner: { className: 'bg-blue-100 text-blue-800' },
      intermediate: { className: 'bg-orange-100 text-orange-800' },
      advanced: { className: 'bg-red-100 text-red-800' },
      all_levels: { className: 'bg-purple-100 text-purple-800' }
    };
    
    const config = variants[level as keyof typeof variants] || variants.beginner;
    return (
      <Badge variant="outline" {...config}>
        {level.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Programming': <Code className="w-4 h-4" />,
      'Design': <Palette className="w-4 h-4" />,
      'Business': <TrendingUp className="w-4 h-4" />,
      'Marketing': <Target className="w-4 h-4" />,
      'Data Science': <BarChart3 className="w-4 h-4" />,
      'Photography': <Camera className="w-4 h-4" />,
      'Music': <Music className="w-4 h-4" />,
      'Writing': <FileText className="w-4 h-4" />,
      'Language': <Languages className="w-4 h-4" />,
      'Health': <Heart className="w-4 h-4" />,
      'Fitness': <Activity className="w-4 h-4" />,
      'Cooking': <ChefHat className="w-4 h-4" />,
      'Art': <Palette className="w-4 h-4" />,
      'Science': <Microscope className="w-4 h-4" />,
      'Technology': <Monitor className="w-4 h-4" />
    };
    
    return icons[category] || <BookOpen className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {showBackButton && <DashboardBackButton />}
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {title || `${mode.charAt(0).toUpperCase() + mode.slice(1)} Course Management`}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and monitor your courses with advanced analytics
              </p>
            </div>
            {features.canCreate && (
              <Button onClick={handleCreateCourse} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="all_levels">All Levels</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="createdAt">Date Created</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="w-full lg:w-auto"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Courses ({courses.length})</span>
              {features.canViewAnalytics && (
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {courses.map((course) => (
                      <motion.tr
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              {getCategoryIcon(course.category)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{course.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {course.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {getLevelBadge(course.level)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(course.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-gray-400" />
                            {course.students.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            {course.rating.toFixed(1)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {course.accessType === 'free' ? 'Free' : formatCurrency(course.price, course.currency)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDate(course.createdAt || course.lastUpdated)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewCourse(course)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            
                            {features.canEdit && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditCourse(course)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}

                            {features.canPublish && course.status === 'draft' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePublishCourse(course)}
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                            )}

                            {features.canPublish && course.status === 'published' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUnpublishCourse(course)}
                              >
                                <Pause className="w-4 h-4" />
                              </Button>
                            )}

                            {features.canDelete && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCourse(course)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {courses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filterStatus !== 'all' || filterCategory !== 'all' || filterLevel !== 'all'
                    ? 'Try adjusting your filters to see more courses.'
                    : 'Get started by creating your first course.'}
                </p>
                {features.canCreate && (
                  <Button onClick={handleCreateCourse} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnifiedCourseManagement;
