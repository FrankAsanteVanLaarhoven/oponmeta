import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Plus, 
  Edit, 
  Eye, 
  BarChart3, 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Video,
  Settings,
  Target,
  Star,
  Clock,
  ArrowRight,
  Upload,
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
  Activity,
  Crown,
  Sparkles,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  X,
  Play,
  Pause,
  Archive,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { unifiedCourseService, Course } from '../services/UnifiedCourseService';
import { toast } from 'sonner';
import DashboardBackButton from "./ui/DashboardBackButton";

interface UnifiedCreatorsPortalProps {
  mode?: 'instructor' | 'admin' | 'creator';
  showBackButton?: boolean;
  title?: string;
}

const UnifiedCreatorsPortal: React.FC<UnifiedCreatorsPortalProps> = ({
  mode = 'creator',
  showBackButton = true,
  title
}) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    thisMonthRevenue: 0,
    totalViews: 0,
    completionRate: 0
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'analytics' | 'earnings' | 'settings'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load courses
      const { data: coursesData } = await unifiedCourseService.getCoursesByCreator('current-user-id');
      setCourses(coursesData);

      // Load stats
      const statsData = await unifiedCourseService.getCourseStats('current-user-id');
      setStats({
        ...statsData,
        totalViews: Math.floor(Math.random() * 10000) + 5000, // Mock data
        completionRate: Math.floor(Math.random() * 30) + 70 // Mock data
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
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

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Programming': <Code className="w-5 h-5" />,
      'Design': <Palette className="w-5 h-5" />,
      'Business': <TrendingUp className="w-5 h-5" />,
      'Marketing': <Target className="w-5 h-5" />,
      'Data Science': <BarChart3 className="w-5 h-5" />,
      'Photography': <Camera className="w-5 h-5" />,
      'Music': <Music className="w-5 h-5" />,
      'Writing': <FileText className="w-5 h-5" />,
      'Language': <Languages className="w-5 h-5" />,
      'Health': <Heart className="w-5 h-5" />,
      'Fitness': <Activity className="w-5 h-5" />,
      'Cooking': <ChefHat className="w-5 h-5" />,
      'Art': <Palette className="w-5 h-5" />,
      'Science': <Microscope className="w-5 h-5" />,
      'Technology': <Monitor className="w-5 h-5" />
    };
    
    return icons[category] || <BookOpen className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {showBackButton && <DashboardBackButton />}
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {title || 'Creators Portal'}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your courses, track performance, and grow your audience
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/dashboard/courses/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
              <Button onClick={() => navigate('/dashboard/analytics')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'courses', label: 'Courses', icon: BookOpen },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'earnings', label: 'Earnings', icon: DollarSign },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses.slice(0, 5).map((course) => (
                        <div key={course.id} className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(course.category)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{course.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              {getStatusBadge(course.status)}
                              <span className="text-sm text-gray-500">
                                {course.students} students
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(course.price, course.currency)}</p>
                            <p className="text-sm text-gray-500">
                              {course.rating.toFixed(1)} ⭐
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Course Views</span>
                        <span className="text-sm font-bold text-gray-900">{stats.totalViews.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Completion Rate</span>
                        <span className="text-sm font-bold text-gray-900">{stats.completionRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">This Month Revenue</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(stats.thisMonthRevenue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Published Courses</span>
                        <span className="text-sm font-bold text-gray-900">{stats.publishedCourses}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Courses</CardTitle>
                    <Button onClick={() => navigate('/dashboard/courses/create')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Course
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(course.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            {getStatusBadge(course.status)}
                            <span className="text-sm text-gray-500">
                              {course.students} students
                            </span>
                            <span className="text-sm text-gray-500">
                              {course.rating.toFixed(1)} ⭐
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(course.price, course.currency)}
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-gray-500">{course.students} students</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{course.rating.toFixed(1)} ⭐</p>
                            <p className="text-sm text-gray-500">{formatCurrency(course.revenue || 0)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Revenue analytics coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'earnings' && (
            <motion.div
              key="earnings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">
                        {formatCurrency(stats.totalRevenue)}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">All time</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">
                        {formatCurrency(stats.thisMonthRevenue)}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Current month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average per Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">
                        {formatCurrency(stats.totalCourses > 0 ? stats.totalRevenue / stats.totalCourses : 0)}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Per course</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Creator Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Display Name
                          </label>
                          <Input placeholder="Your display name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                          </label>
                          <Textarea placeholder="Tell us about yourself" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Email notifications</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">New student enrollments</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Course reviews</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Save Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UnifiedCreatorsPortal;
