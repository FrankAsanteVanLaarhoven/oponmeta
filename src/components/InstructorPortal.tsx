import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Plus, 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Video,
  FileText,
  Image,
  Settings,
  BarChart3,
  MessageSquare,
  Award,
  Target,
  Zap,
  Brain,
  Palette,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Download,
  Share2,
  Filter,
  Search,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Lightbulb,
  Rocket,
  Trophy,
  Gift,
  Headphones,
  Mic,
  Camera,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  originalPrice?: number;
  image: string;
  videoUrl?: string;
  duration: number; // in hours
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  published: boolean;
  featured: boolean;
  certificate: boolean;
  language: string;
  lastUpdated: Date;
  createdAt: Date;
  earnings: number;
  completions: number;
  tags: string[];
  requirements: string[];
  learningOutcomes: string[];
  instructor: {
    name: string;
    avatar: string;
    bio: string;
    expertise: string[];
  };
}

interface Analytics {
  totalEarnings: number;
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  monthlyGrowth: number;
  completionRate: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  topPerformingCourse: string;
  recentEnrollments: number;
}

const InstructorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [createMode, setCreateMode] = useState<'manual' | 'ai'>('ai');
  const [aiPrompt, setAIPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalEarnings: 28400,
    totalStudents: 1247,
    totalCourses: 8,
    averageRating: 4.7,
    monthlyGrowth: 23,
    completionRate: 78,
    revenueThisMonth: 4200,
    revenueLastMonth: 3800,
    topPerformingCourse: 'Modern React Development',
    recentEnrollments: 45
  });

  // Sample courses data
  useEffect(() => {
    const sampleCourses: Course[] = [
      {
        id: '1',
        title: 'Modern React Development',
        description: 'Build scalable web applications with React, Hooks, and modern tooling. Learn best practices, state management, and deployment strategies.',
        category: 'Programming',
        level: 'intermediate',
        price: 89.99,
        originalPrice: 129.99,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
        duration: 12.5,
        lessons: 45,
        students: 1247,
        rating: 4.8,
        reviews: 342,
        published: true,
        featured: true,
        certificate: true,
        language: 'English',
        lastUpdated: new Date('2024-01-15'),
        createdAt: new Date('2023-06-10'),
        earnings: 112230,
        completions: 892,
        tags: ['React', 'JavaScript', 'Web Development', 'Frontend'],
        requirements: ['Basic JavaScript knowledge', 'HTML & CSS fundamentals'],
        learningOutcomes: ['Build full-stack React applications', 'Master state management', 'Deploy to production'],
        instructor: {
          name: 'Dr. John Vendor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
          bio: 'Senior Software Engineer with 10+ years of experience',
          expertise: ['React', 'Node.js', 'TypeScript', 'AWS']
        }
      },
      {
        id: '2',
        title: 'AI for Business Leaders',
        description: 'Harness the power of artificial intelligence to drive innovation and growth in your organization.',
        category: 'Business',
        level: 'beginner',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        duration: 8.5,
        lessons: 32,
        students: 892,
        rating: 4.7,
        reviews: 156,
        published: true,
        featured: false,
        certificate: true,
        language: 'English',
        lastUpdated: new Date('2024-01-10'),
        createdAt: new Date('2023-08-20'),
        earnings: 133800,
        completions: 623,
        tags: ['AI', 'Business', 'Strategy', 'Innovation'],
        requirements: ['No technical background required'],
        learningOutcomes: ['Understand AI applications', 'Implement AI strategies', 'Measure AI ROI'],
        instructor: {
          name: 'Dr. John Vendor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
          bio: 'Senior Software Engineer with 10+ years of experience',
          expertise: ['React', 'Node.js', 'TypeScript', 'AWS']
        }
      },
      {
        id: '3',
        title: 'Digital Marketing Mastery',
        description: 'Master SEO, social media marketing, and analytics to grow your business and reach more customers.',
        category: 'Marketing',
        level: 'intermediate',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
        duration: 15.0,
        lessons: 58,
        students: 0,
        rating: 0,
        reviews: 0,
        published: false,
        featured: false,
        certificate: true,
        language: 'English',
        lastUpdated: new Date('2024-01-20'),
        createdAt: new Date('2024-01-15'),
        earnings: 0,
        completions: 0,
        tags: ['Marketing', 'SEO', 'Social Media', 'Analytics'],
        requirements: ['Basic computer skills', 'Social media accounts'],
        learningOutcomes: ['Create marketing campaigns', 'Analyze performance data', 'Grow online presence'],
        instructor: {
          name: 'Dr. John Vendor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
          bio: 'Senior Software Engineer with 10+ years of experience',
          expertise: ['React', 'Node.js', 'TypeScript', 'AWS']
        }
      }
    ];
    setCourses(sampleCourses);
  }, []);

  // AI Course Generation
  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newCourse: Course = {
        id: Date.now().toString(),
        title: `${aiPrompt} - Complete Course`,
        description: `A comprehensive course on ${aiPrompt.toLowerCase()}. This AI-generated course covers all essential topics and provides hands-on experience.`,
        category: 'Technology',
        level: 'beginner',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        duration: 10.0,
        lessons: 40,
        students: 0,
        rating: 0,
        reviews: 0,
        published: false,
        featured: false,
        certificate: true,
        language: 'English',
        lastUpdated: new Date(),
        createdAt: new Date(),
        earnings: 0,
        completions: 0,
        tags: [aiPrompt, 'AI Generated', 'Technology'],
        requirements: ['No prerequisites required'],
        learningOutcomes: [`Master ${aiPrompt}`, 'Apply practical skills', 'Build real projects'],
        instructor: {
          name: 'Dr. John Vendor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
          bio: 'Senior Software Engineer with 10+ years of experience',
          expertise: ['React', 'Node.js', 'TypeScript', 'AWS']
        }
      };
      
      setCourses([newCourse, ...courses]);
      setAIPrompt('');
      setIsGenerating(false);
      setShowCreateCourse(false);
    }, 3000);
  };

  // Course actions
  const togglePublish = (courseId: string) => {
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, published: !c.published } : c
    ));
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                  alt="Instructor"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">Welcome, Dr. John Vendor!</h1>
                <p className="text-black">Manage your courses, earnings, and student success</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-black">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(analytics.totalEarnings)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-black">Courses</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.totalCourses}</p>
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
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{analytics.recentEnrollments} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageRating}</div>
              <p className="text-xs text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                Student success rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{analytics.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">
                Revenue growth
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Creation Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create a New Course</span>
            </CardTitle>
            <CardDescription>
              Use AI to generate course content or create manually with our advanced course builder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Rocket className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">Ready to Create Your Course?</h3>
              <p className="text-black mb-6 max-w-2xl mx-auto">
                Use our comprehensive course creation wizard with AI assistance, step-by-step guidance, 
                and all the tools you need to build world-class courses that students love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => window.location.href = '/resources/create-course'}
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Start Course Creation Wizard
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
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
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New enrollment in React Development</span>
                      <span className="text-xs text-black">2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Course completion: AI for Business</span>
                      <span className="text-xs text-black">1 hour ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">New review: 5 stars</span>
                      <span className="text-xs text-black">3 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Video className="h-6 w-6 mb-2" />
                      <span className="text-sm">Upload Video</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <FileText className="h-6 w-6 mb-2" />
                      <span className="text-sm">Add Resource</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span className="text-sm">Respond to Q&A</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      <span className="text-sm">View Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">My Courses</h3>
                <p className="text-black">Manage and optimize your course offerings</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.image}
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
                    {!course.published && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg line-clamp-2">{course.title}</h4>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
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
                        <span className="text-sm font-medium">{course.rating}</span>
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
                        {formatCurrency(course.earnings)} earned
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant={course.published ? "outline" : "default"}
                        size="sm"
                        onClick={() => togglePublish(course.id)}
                        className="flex-1"
                      >
                        {course.published ? (
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
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCourse(course.id)}
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
                      <span className="font-semibold text-black">{formatCurrency(analytics.revenueThisMonth)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Last Month</span>
                      <span className="font-semibold text-black">{formatCurrency(analytics.revenueLastMonth)}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-sm text-black">+{analytics.monthlyGrowth}% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold">{analytics.topPerformingCourse}</h4>
                    <div className="flex justify-between text-sm">
                      <span>Enrollments</span>
                      <span>1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revenue</span>
                      <span>{formatCurrency(112230)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rating</span>
                      <span>4.8 ⭐</span>
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
                <CardTitle>Student Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Students</span>
                    <span className="font-semibold">{analytics.totalStudents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Students</span>
                    <span className="font-semibold">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completion Rate</span>
                    <span className="font-semibold">{analytics.completionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Earnings</span>
                    <span className="font-semibold text-green-600">{formatCurrency(analytics.totalEarnings)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-semibold">{formatCurrency(analytics.revenueThisMonth)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Platform Fee (10%)</span>
                    <span className="text-red-600">-{formatCurrency(analytics.totalEarnings * 0.1)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-semibold">Net Earnings</span>
                    <span className="font-semibold text-green-600">{formatCurrency(analytics.totalEarnings * 0.9)}</span>
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

export default InstructorPortal;
