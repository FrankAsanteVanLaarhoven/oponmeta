import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Clock, 
  Eye, 
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Download,
  Share2,
  Settings,
  BarChart3,
  Calendar,
  Target,
  Award,
  Zap,
  Globe,
  Video,
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
  Target as TargetIcon,
  BookMarked,
  GraduationCap,
  Users2,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Lightbulb,
  MoreHorizontal,
  Filter,
  Search,
  Upload,
  Link,
  ExternalLink,
  Save,
  Send,
  X,
  PlusCircle,
  MinusCircle,
  Move,
  GripVertical,
  FileVideo,
  FileAudio,
  FilePdf,
  FileCode,
  FileArchive,
  Mail,
  Phone,
  MapPin,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Globe as GlobeIcon,
  Award as AwardIcon,
  TrendingDown,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  ScatterChart
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  originalPrice?: number;
  students: number;
  revenue: number;
  rating: number;
  reviews: number;
  status: 'draft' | 'published' | 'archived';
  lastUpdated: string;
  completionRate: number;
  thumbnail: string;
  duration: number; // in hours
  lessons: number;
  language: string;
  certificate: boolean;
  featured: boolean;
  tags: string[];
}

interface CreatorStats {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  monthlyGrowth: number;
  completionRate: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  topPerformingCourse: string;
  recentEnrollments: number;
  activeStudents: number;
  totalEarnings: number;
}

interface CreatorProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  expertise: string[];
  location: string;
  website: string;
  socialMedia: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
  joinDate: string;
  verified: boolean;
  featured: boolean;
}

const CreatorsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete Web Development Bootcamp 2024',
      description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.',
      category: 'Programming',
      level: 'beginner',
      price: 89.99,
      originalPrice: 129.99,
      students: 1247,
      revenue: 18705,
      rating: 4.8,
      reviews: 342,
      status: 'published',
      lastUpdated: '2024-01-15',
      completionRate: 78,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
      duration: 45.5,
      lessons: 156,
      language: 'English',
      certificate: true,
      featured: true,
      tags: ['Web Development', 'JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    {
      id: '2',
      title: 'Advanced JavaScript: From ES6+ to Modern Patterns',
      description: 'Master modern JavaScript with ES6+, async/await, functional programming, design patterns, and advanced concepts for professional development.',
      category: 'Programming',
      level: 'advanced',
      price: 69.99,
      students: 892,
      revenue: 13380,
      rating: 4.9,
      reviews: 156,
      status: 'published',
      lastUpdated: '2024-01-10',
      completionRate: 85,
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80',
      duration: 32.0,
      lessons: 89,
      language: 'English',
      certificate: true,
      featured: false,
      tags: ['JavaScript', 'ES6+', 'Functional Programming', 'Design Patterns']
    },
    {
      id: '3',
      title: 'Digital Marketing Masterclass: From Zero to Hero',
      description: 'Comprehensive digital marketing course covering SEO, social media, email marketing, PPC, content marketing, and analytics.',
      category: 'Marketing',
      level: 'intermediate',
      price: 79.99,
      students: 567,
      revenue: 8505,
      rating: 4.7,
      reviews: 89,
      status: 'draft',
      lastUpdated: '2024-01-20',
      completionRate: 0,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
      duration: 28.5,
      lessons: 112,
      language: 'English',
      certificate: true,
      featured: false,
      tags: ['Digital Marketing', 'SEO', 'Social Media', 'Email Marketing', 'Analytics']
    },
    {
      id: '4',
      title: 'UI/UX Design Fundamentals: Create Beautiful Interfaces',
      description: 'Learn the fundamentals of UI/UX design, user research, wireframing, prototyping, and creating beautiful, functional interfaces.',
      category: 'Design',
      level: 'beginner',
      price: 59.99,
      students: 423,
      revenue: 6345,
      rating: 4.6,
      reviews: 67,
      status: 'published',
      lastUpdated: '2024-01-12',
      completionRate: 72,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80',
      duration: 24.0,
      lessons: 78,
      language: 'English',
      certificate: true,
      featured: false,
      tags: ['UI/UX', 'Design', 'Figma', 'Prototyping', 'User Research']
    }
  ]);

  const [stats, setStats] = useState<CreatorStats>({
    totalCourses: 4,
    totalStudents: 3129,
    totalRevenue: 46935,
    averageRating: 4.75,
    monthlyGrowth: 23,
    completionRate: 78,
    revenueThisMonth: 8500,
    revenueLastMonth: 6900,
    topPerformingCourse: 'Complete Web Development Bootcamp 2024',
    recentEnrollments: 45,
    activeStudents: 2456,
    totalEarnings: 42241.5 // After platform fee
  });

  const [profile, setProfile] = useState<CreatorProfile>({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
    bio: 'Senior Software Engineer and Educator with 8+ years of experience in web development, JavaScript, and modern frameworks. Passionate about teaching and helping students succeed.',
    expertise: ['Web Development', 'JavaScript', 'React', 'Node.js', 'UI/UX Design', 'Digital Marketing'],
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    socialMedia: {
      twitter: '@sarahjohnson',
      linkedin: 'linkedin.com/in/sarahjohnson',
      youtube: 'youtube.com/@sarahjohnson',
      instagram: '@sarahjohnson.dev'
    },
    joinDate: '2022-03-15',
    verified: true,
    featured: true
  });

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['Programming', 'Marketing', 'Design', 'Business', 'Music', 'Photography'];
  const statuses = ['published', 'draft', 'archived'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-black">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black mb-1">{profile.name}</h1>
                <p className="text-black text-lg">Creator Portal Dashboard</p>
                <div className="flex items-center space-x-2 mt-1">
                  {profile.verified && <Badge className="bg-blue-100 text-blue-800">Verified Creator</Badge>}
                  {profile.featured && <Badge className="bg-purple-100 text-purple-800">Featured</Badge>}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-black">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalEarnings)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-black">Active Students</p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeStudents.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.totalCourses}</div>
              <p className="text-xs text-black">
                {stats.monthlyGrowth > 0 ? '+' : ''}{stats.monthlyGrowth}% this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Students</CardTitle>
              <Users className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-black">
                +{stats.recentEnrollments} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.averageRating}</div>
              <p className="text-xs text-black">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Completion Rate</CardTitle>
              <Target className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.completionRate}%</div>
              <p className="text-xs text-black">
                Student success rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Creation CTA */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center">
              <Rocket className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">Ready to Create Your Next Course?</h3>
              <p className="text-black mb-6 max-w-2xl mx-auto">
                Use our comprehensive course creation wizard with AI assistance, step-by-step guidance, 
                and all the tools you need to build world-class courses that students love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => window.location.href = '/resources/create-course'}
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Start Course Creation Wizard
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-black border-black hover:bg-black hover:text-white"
                  onClick={() => window.location.href = '/ai-course-creator'}
                >
                  <Brain className="h-5 w-5 mr-2" />
                  AI Course Generator
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-black">New enrollment in Web Development Bootcamp</span>
                      <span className="text-xs text-black">2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-black">Course completion: Advanced JavaScript</span>
                      <span className="text-xs text-black">1 hour ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-black">New review: 5 stars on UI/UX Design</span>
                      <span className="text-xs text-black">3 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-black">Revenue milestone: $50k total earnings</span>
                      <span className="text-xs text-black">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-black hover:text-white">
                      <Video className="h-6 w-6 mb-2" />
                      <span className="text-sm">Upload Video</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-black hover:text-white">
                      <FileText className="h-6 w-6 mb-2" />
                      <span className="text-sm">Add Resource</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-black hover:text-white">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span className="text-sm">Respond to Q&A</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-black hover:text-white">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      <span className="text-sm">View Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-black">Top Performing Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=100&q=80"
                    alt="Course thumbnail"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">{stats.topPerformingCourse}</h4>
                    <div className="flex items-center space-x-4 text-sm text-black mt-2">
                      <span>{courses[0].students} students</span>
                      <span>{formatCurrency(courses[0].revenue)} revenue</span>
                      <span>{courses[0].rating} ⭐ rating</span>
                    </div>
                    <Progress value={courses[0].completionRate} className="h-2 mt-2" />
                    <p className="text-xs text-black mt-1">{courses[0].completionRate}% completion rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-black">My Courses</h3>
                <p className="text-black">Manage and optimise your course offerings</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-black border-black hover:bg-black hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="text-black border-black hover:bg-black hover:text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-black"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48 text-black">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48 text-black">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {course.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    {course.status === 'draft' && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg line-clamp-2 text-black">{course.title}</h4>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4 text-black" />
                      </Button>
                    </div>
                    
                    <p className="text-black text-sm mb-3 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-black" />
                        <span className="text-sm text-black">{course.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-black">{course.rating}</span>
                        <span className="text-sm text-black">({course.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-black" />
                        <span className="text-sm text-black">{course.duration}h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-black" />
                        <span className="text-sm text-black">{course.lessons} lessons</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(course.price)}
                      </span>
                      <span className="text-sm text-black">
                        {formatCurrency(course.revenue)} earned
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant={course.status === 'published' ? "outline" : "default"}
                        size="sm"
                        className="flex-1"
                      >
                        {course.status === 'published' ? (
                          <>
                            <Pause className="h-4 w-4 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="text-black border-black hover:bg-black hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-black border-black hover:bg-black hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-black">This Month</span>
                      <span className="font-semibold text-black">{formatCurrency(stats.revenueThisMonth)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Last Month</span>
                      <span className="font-semibold text-black">{formatCurrency(stats.revenueLastMonth)}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-sm text-black">+{stats.monthlyGrowth}% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-black">Completion Rate</span>
                      <span className="font-semibold text-black">{stats.completionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Average Rating</span>
                      <span className="font-semibold text-black">{stats.averageRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Active Students</span>
                      <span className="font-semibold text-black">{stats.activeStudents}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Student Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-black">Total Students</span>
                    <span className="font-semibold text-black">{stats.totalStudents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Active Students</span>
                    <span className="font-semibold text-black">{stats.activeStudents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Completion Rate</span>
                    <span className="font-semibold text-black">{stats.completionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Creator Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="text-black">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-black">{profile.name}</h3>
                      <p className="text-black">{profile.bio}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {profile.verified && <Badge className="bg-blue-100 text-blue-800">Verified</Badge>}
                        {profile.featured && <Badge className="bg-purple-100 text-purple-800">Featured</Badge>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-black mb-3">Contact Information</h4>
                      <div className="space-y-2 text-black">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4" />
                          <span>{profile.website}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-black mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.expertise.map((skill, index) => (
                          <Badge key={index} className="bg-gray-100 text-black">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorsPortal;
