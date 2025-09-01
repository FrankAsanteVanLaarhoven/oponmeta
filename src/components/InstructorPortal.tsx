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
  Tablet,
  CreditCard,
  Crown,
  Wallet,
  Key,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Building,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Shield,
  X,
  CheckSquare,
  Square,
  Circle,
  Minus,
  Info,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronLeft,
  MoreVertical,
  Menu,
  Grid,
  List,
  PieChart,
  TrendingDown,
  AlertTriangle,
  XCircle,
  Home,
  Briefcase,
  Laptop,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Printer,
  Copy,
  Save,
  RefreshCw,
  RotateCcw,
  Heart,
  ShoppingCart,
  Bell,
  User,
  HelpCircle,
  LogOut
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

  // Enhanced state for comprehensive functionality
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showCourseAnalyticsModal, setShowCourseAnalyticsModal] = useState(false);
  const [showStudentManagementModal, setShowStudentManagementModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const [showAICourseCreatorModal, setShowAICourseCreatorModal] = useState(false);
  const [showCertificateTemplateModal, setShowCertificateTemplateModal] = useState(false);

  // Account Data
  const [accountData, setAccountData] = useState({
    firstName: 'John',
    lastName: 'Vendor',
    email: 'john.vendor@example.com',
    phone: '+1 (555) 987-6543',
    country: 'United States',
    timezone: 'UTC-5',
    language: 'English',
    currency: 'USD',
    bio: 'Senior Software Engineer with 10+ years of experience in React, Node.js, and cloud technologies.',
    expertise: ['React', 'Node.js', 'TypeScript', 'AWS', 'AI/ML'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johnvendor',
      twitter: 'https://twitter.com/johnvendor',
      github: 'https://github.com/johnvendor',
      website: 'https://johnvendor.com'
    },
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  // Billing Data
  const [billingData, setBillingData] = useState({
    subscription: {
      plan: 'Pro',
      status: 'active',
      nextBilling: '2024-02-15',
      amount: 49.99,
      currency: 'USD'
    },
    paymentMethods: [
      {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiry: '12/25',
        isDefault: true
      }
    ],
    billingHistory: [
      {
        id: '1',
        date: '2024-01-15',
        amount: 49.99,
        currency: 'USD',
        status: 'paid',
        description: 'Pro Instructor Subscription'
      }
    ]
  });

  // Wallet Data
  const [walletData, setWalletData] = useState({
    balance: 28400.00,
    currency: 'USD',
    pendingBalance: 4200.00,
    totalEarnings: 156800.00,
    transactions: [
      {
        id: '1',
        type: 'credit',
        amount: 4200.00,
        description: 'Course earnings - January 2024',
        date: '2024-01-31',
        status: 'completed'
      },
      {
        id: '2',
        type: 'debit',
        amount: 500.00,
        description: 'Withdrawal to bank account',
        date: '2024-01-25',
        status: 'completed'
      }
    ]
  });

  // Student Management Data
  const [studentData, setStudentData] = useState({
    totalStudents: 1247,
    activeStudents: 892,
    completedStudents: 623,
    studentsThisMonth: 45,
    topStudents: [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        coursesEnrolled: 3,
        completionRate: 95,
        lastActive: '2024-01-30'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        coursesEnrolled: 2,
        completionRate: 88,
        lastActive: '2024-01-29'
      }
    ]
  });



  // Form States
  const [newCourseData, setNewCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    language: 'English'
  });

  const [editCourseData, setEditCourseData] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    language: 'English'
  });

  const [aiCoursePrompt, setAiCoursePrompt] = useState('');
  const [certificateTemplate, setCertificateTemplate] = useState({
    title: '',
    description: '',
    design: 'modern'
  });

  // Revenue Data
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 156800.00,
    thisMonth: 4200.00,
    lastMonth: 3800.00,
    projectedThisYear: 50400.00,
    topCourses: [
      {
        id: '1',
        title: 'Modern React Development',
        revenue: 112230.00,
        students: 1247,
        completionRate: 78
      },
      {
        id: '2',
        title: 'AI for Business Leaders',
        revenue: 133800.00,
        students: 892,
        completionRate: 70
      }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 4200 },
      { month: 'Dec', revenue: 3800 },
      { month: 'Nov', revenue: 3500 },
      { month: 'Oct', revenue: 3200 },
      { month: 'Sep', revenue: 2900 },
      { month: 'Aug', revenue: 2600 }
    ]
  });

  // CRUD Functions
  const createCourse = (courseData: any) => {
    const newCourse = {
      id: Date.now().toString(),
      ...courseData,
      createdAt: new Date(),
      published: false,
      students: 0,
      rating: 0,
      reviews: 0,
      earnings: 0,
      completions: 0
    };
    setCourses([...courses, newCourse]);
    setShowCreateCourseModal(false);
    setNewCourseData({ title: '', description: '', category: '', level: 'beginner', price: 0, language: 'English' });
  };

  const updateCourse = (id: string, courseData: any) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, ...courseData, lastUpdated: new Date() } : course
    ));
    setShowEditCourseModal(false);
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    setShowDeleteCourseModal(false);
  };

  const togglePublish = (id: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, published: !course.published } : course
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

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



  return (
    <div className="min-h-screen bg-gray-50 instructor-portal">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                  alt="Instructor"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Instructor Portal</h1>
                <p className="text-sm text-gray-600">Manage your courses, earnings, and student success</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(analytics.totalEarnings)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-lg font-bold text-blue-600">{analytics.totalCourses}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-[#0a174e] shadow-sm border-r border-[#1a2a6b] transition-all duration-300 sidebar-white-text ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <div className="p-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 text-white hover:text-blue-100 rounded-lg hover:bg-[#1a2a6b]"
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          <nav className="mt-4">
            <div className="px-4 space-y-2">
              {/* Main Navigation */}
              <div className="mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`} style={{color: 'white !important'}}>
                  Main
                </h3>
              </div>
              
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Home className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Dashboard</span>}
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'courses'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>My Courses</span>}
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'students'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Users className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Students</span>}
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Analytics</span>}
              </button>

              <button
                onClick={() => setActiveTab('revenue')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'revenue'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <DollarSign className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Revenue</span>}
              </button>

              <Link
                to="/stripe-connect"
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <CreditCard className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Stripe Connect</span>}
              </Link>

              {/* Course Management */}
              <div className="mt-6 mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`} style={{color: 'white !important'}}>
                  Course Management
                </h3>
              </div>

              <button
                onClick={() => setActiveTab('create')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'create'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
              <Plus className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Create Course</span>}
              </button>

              <button
                onClick={() => setActiveTab('ai-creator')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'ai-creator'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Zap className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>AI Course Creator</span>}
              </button>

              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'certificates'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Award className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Certificates</span>}
              </button>

              {/* Financial Management */}
              <div className="mt-6 mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`} style={{color: 'white !important'}}>
                  Financial
                </h3>
              </div>

              <button
                onClick={() => setActiveTab('wallet')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'wallet'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Wallet className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Wallet</span>}
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'billing'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Billing</span>}
              </button>

              <button
                onClick={() => setActiveTab('subscription')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'subscription'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Crown className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Subscription</span>}
              </button>

              {/* Account & Settings */}
              <div className="mt-6 mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`} style={{color: 'white !important'}}>
                  Account
                </h3>
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <User className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Profile</span>}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Settings className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Settings</span>}
              </button>

              <button
                onClick={() => setActiveTab('help')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'help'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white" style={{color: 'white !important'}}>Help</span>}
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Dashboard Overview</h2>
                <p className="text-black">Welcome back! Here's your instructor performance summary</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                      <CardTitle className="text-sm font-medium text-black">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-black" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{analytics.totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-black">
                    +{analytics.recentEnrollments} this week
                  </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{analytics.averageRating}</div>
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
                    <div className="text-2xl font-bold text-black">{analytics.completionRate}%</div>
                    <p className="text-xs text-black">
                      Student success rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Monthly Growth</CardTitle>
                    <TrendingUp className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">+{analytics.monthlyGrowth}%</div>
                    <p className="text-xs text-black">
                      Revenue growth
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-bold text-black !important" style={{color: 'black !important'}}>New enrollment in React Development</span>
                        <span className="text-xs font-bold text-black !important" style={{color: 'black !important'}}>2 min ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-bold text-black !important" style={{color: 'black !important'}}>Course completion: AI for Business</span>
                        <span className="text-xs font-bold text-black !important" style={{color: 'black !important'}}>1 hour ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-bold text-black !important" style={{color: 'black !important'}}>New review: 5 stars</span>
                        <span className="text-xs font-bold text-black !important" style={{color: 'black !important'}}>3 hours ago</span>
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
                      <Button variant="outline" className="h-20 flex-col border-black hover:bg-gray-100">
                        <Video className="h-6 w-6 mb-2 text-black" />
                        <span className="text-sm font-bold text-black !important" style={{color: 'black !important'}}>Upload Video</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col border-black hover:bg-gray-100">
                        <FileText className="h-6 w-6 mb-2 text-black" />
                        <span className="text-sm font-bold text-black !important" style={{color: 'black !important'}}>Add Resource</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col border-black hover:bg-gray-100">
                        <MessageSquare className="h-6 w-6 mb-2 text-black" />
                        <span className="text-sm font-bold text-black !important" style={{color: 'black !important'}}>Respond to Q&A</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col border-black hover:bg-gray-100">
                        <BarChart3 className="h-6 w-6 mb-2 text-black" />
                        <span className="text-sm font-bold text-black !important" style={{color: 'black !important'}}>View Reports</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">My Courses</h2>
                  <p className="text-black">Manage and track your course performance</p>
                </div>
                <Button onClick={() => setActiveTab('create')} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="relative">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={course.published ? "default" : "secondary"}>
                          {course.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      {course.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Featured
                          </Badge>
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
            </div>
          )}

          {/* Create Course Tab */}
          {activeTab === 'create' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Create a New Course</h2>
                <p className="text-black">Use AI to generate course content or create manually with our advanced course builder</p>
              </div>

              <Card>
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
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">Student Management</h2>
                  <p className="text-black">Manage your students, track progress, and provide support</p>
                </div>
                <Button onClick={() => setShowStudentManagementModal(true)} className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>

              {/* Student Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{studentData.totalStudents.toLocaleString()}</div>
                    <p className="text-xs text-black">+{studentData.studentsThisMonth} this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Active Students</CardTitle>
                    <UserCheck className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{studentData.activeStudents.toLocaleString()}</div>
                    <p className="text-xs text-black">Currently enrolled</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Completed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{studentData.completedStudents.toLocaleString()}</div>
                    <p className="text-xs text-black">Graduated students</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Avg Completion</CardTitle>
                    <Target className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">78%</div>
                    <p className="text-xs text-black">Success rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Students */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Top Performing Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentData.topStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-black">{student.name}</h4>
                            <p className="text-sm text-black">{student.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-black">{student.coursesEnrolled} courses</p>
                          <p className="text-xs text-black">{student.completionRate}% completion</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Analytics Dashboard</h2>
                <p className="text-black">Comprehensive insights into your course performance and student engagement</p>
              </div>

              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Course Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-black">Total Views</span>
                        <span className="font-semibold text-black">45,230</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Avg Watch Time</span>
                        <span className="font-semibold text-black">23 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Completion Rate</span>
                        <span className="font-semibold text-black">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Student Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-black">Active Students</span>
                        <span className="font-semibold text-black">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Avg Rating</span>
                        <span className="font-semibold text-black">4.7/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Reviews</span>
                        <span className="font-semibold text-black">342</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Revenue Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-black">Monthly Revenue</span>
                        <span className="font-semibold text-black">$4,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Total Revenue</span>
                        <span className="font-semibold text-black">$156,800</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Growth</span>
                        <span className="font-semibold text-green-600">+23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={() => setShowCourseAnalyticsModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          )}

          {/* Revenue Tab */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">Revenue Management</h2>
                  <p className="text-black">Track earnings, manage payouts, and analyze revenue trends</p>
                </div>
                <Button onClick={() => setShowRevenueModal(true)} className="bg-green-600 hover:bg-green-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Request Payout
                </Button>
              </div>

              {/* Revenue Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{formatCurrency(revenueData.totalRevenue)}</div>
                    <p className="text-xs text-black">All time earnings</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">This Month</CardTitle>
                    <TrendingUp className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{formatCurrency(revenueData.thisMonth)}</div>
                    <p className="text-xs text-black">+{((revenueData.thisMonth - revenueData.lastMonth) / revenueData.lastMonth * 100).toFixed(1)}% vs last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Available Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{formatCurrency(walletData.balance)}</div>
                    <p className="text-xs text-black">Ready for withdrawal</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-black">Projected 2024</CardTitle>
                    <Target className="h-4 w-4 text-black" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">{formatCurrency(revenueData.projectedThisYear)}</div>
                    <p className="text-xs text-black">Based on current trends</p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Earning Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Top Earning Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.topCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-black">{course.title}</h4>
                          <p className="text-sm text-black">{course.students} students • {course.completionRate}% completion</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-black">{formatCurrency(course.revenue)}</p>
                          <p className="text-xs text-black">Total revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* AI Course Creator Tab */}
          {activeTab === 'ai-course-creator' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">AI Course Creator</h2>
                <p className="text-black">Generate comprehensive course content using advanced AI</p>
              </div>

              <Card>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Course Topic</label>
                      <Input
                        placeholder="e.g., Advanced React Patterns, Machine Learning Fundamentals, Digital Marketing Strategy"
                        value={aiCoursePrompt}
                        onChange={(e) => setAiCoursePrompt(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Target Audience</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Course Duration</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>2-4 hours</option>
                          <option>5-8 hours</option>
                          <option>10-15 hours</option>
                          <option>20+ hours</option>
                        </select>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setShowAICourseCreatorModal(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      size="lg"
                    >
                      <Brain className="h-5 w-5 mr-2" />
                      Generate Course with AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">Certificate Management</h2>
                  <p className="text-black">Create and manage course completion certificates</p>
                </div>
                <Button onClick={() => setShowCertificateTemplateModal(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Award className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Modern Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-black mb-4">Clean, professional design with modern typography</p>
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Classic Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                      <p className="text-black mb-4">Traditional certificate design with elegant borders</p>
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Minimal Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <p className="text-black mb-4">Simple, clean design focusing on content</p>
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">Wallet & Payments</h2>
                  <p className="text-black">Manage your earnings and payment methods</p>
                </div>
                <Button onClick={() => setShowWithdrawalModal(true)} className="bg-green-600 hover:bg-green-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Withdraw Funds
                </Button>
              </div>

              {/* Wallet Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Available Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-black mb-2">{formatCurrency(walletData.balance)}</div>
                    <p className="text-sm text-black">Ready for withdrawal</p>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Withdraw Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Pending Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-black mb-2">{formatCurrency(walletData.pendingBalance)}</div>
                    <p className="text-sm text-black">Processing payments</p>
                    <p className="text-xs text-black mt-2">Available in 3-5 business days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-black mb-2">{formatCurrency(walletData.totalEarnings)}</div>
                    <p className="text-sm text-black">All time earnings</p>
                    <Button variant="outline" className="w-full mt-4">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View History
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {walletData.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-black">{transaction.description}</h4>
                            <p className="text-sm text-black">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-black ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-xs text-black">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Billing & Payments</h2>
                <p className="text-black">Manage your subscription and payment methods</p>
              </div>

              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-black">{billingData.subscription.plan} Plan</h3>
                      <p className="text-black">Next billing: {billingData.subscription.nextBilling}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">{formatCurrency(billingData.subscription.amount)}/month</p>
                      <Badge className="bg-green-100 text-green-800">{billingData.subscription.status}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setShowPaymentModal(true)}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Update Payment
                    </Button>
                    <Button variant="outline" onClick={() => setShowSubscriptionModal(true)}>
                      <Crown className="h-4 w-4 mr-2" />
                      Change Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {billingData.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-black">{method.brand} •••• {method.last4}</h4>
                            <p className="text-sm text-black">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.isDefault && <Badge>Default</Badge>}
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Subscription Management</h2>
                <p className="text-black">Manage your instructor subscription and plan features</p>
              </div>

              {/* Plan Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Basic</CardTitle>
                    <CardDescription className="text-black">Perfect for getting started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-black mb-4">$19<span className="text-lg">/month</span></div>
                    <ul className="space-y-2 text-black">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Up to 5 courses
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Basic analytics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Email support
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-black">Pro</CardTitle>
                    <CardDescription className="text-black">Most popular choice</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-black mb-4">$49<span className="text-lg">/month</span></div>
                    <ul className="space-y-2 text-black">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Unlimited courses
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Priority support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        AI course creator
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Enterprise</CardTitle>
                    <CardDescription className="text-black">For large organizations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-black mb-4">$199<span className="text-lg">/month</span></div>
                    <ul className="space-y-2 text-black">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Everything in Pro
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Custom branding
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Dedicated support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        API access
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">Profile Settings</h2>
                  <p className="text-black">Manage your instructor profile and personal information</p>
                </div>
                <Button onClick={() => setShowUpdateProfileModal(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-12 w-12 text-blue-600" />
                      </div>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-black">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                        <p className="text-black">{accountData.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Email</label>
                        <p className="text-black">{accountData.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Bio</label>
                        <p className="text-black">{accountData.bio}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Expertise</label>
                        <div className="flex flex-wrap gap-2">
                          {accountData.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Phone</label>
                      <p className="text-black">{accountData.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Country</label>
                      <p className="text-black">{accountData.country}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Timezone</label>
                      <p className="text-black">{accountData.timezone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Language</label>
                      <p className="text-black">{accountData.language}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Account Settings</h2>
                <p className="text-black">Manage your account preferences and security settings</p>
              </div>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-black">Password</h4>
                        <p className="text-sm text-black">Last changed 30 days ago</p>
                      </div>
                      <Button variant="outline" onClick={() => setShowChangePasswordModal(true)}>
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-black">Two-Factor Authentication</h4>
                        <p className="text-sm text-black">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-black">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black">Push Notifications</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black">SMS Notifications</span>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-black">Delete Account</h4>
                        <p className="text-sm text-black">Permanently delete your account and all data</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={() => setShowDeleteAccountModal(true)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Tab */}
          {activeTab === 'help' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Help & Support</h2>
                <p className="text-black">Get help with your instructor account and course creation</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Getting Started Guide
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Video className="h-4 w-4 mr-2" />
                        Video Tutorials
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        API Documentation
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Contact Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Live Chat
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default InstructorPortal;
