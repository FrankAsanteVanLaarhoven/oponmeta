import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Copy,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Percent,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Crown,
  Gift,
  Timer,
  UserCheck,
  Star,
  Award,
  Shield,
  Lock,
  Unlock,
  EyeOff,
  Eye as EyeIcon,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Minus,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  Share2,
  Heart,
  BookOpen,
  Play,
  Pause,
  StopCircle,
  PlayCircle,
  PauseCircle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List as ListIcon,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Video,
  File,
  Folder,
  FolderOpen,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FilePresentation,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileZip,
  FileRar,
  File7z,
  FileTxt,
  FileCsv,
  FileJson,
  FileXml,
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
  FileVue,
  FileReact,
  FileAngular,
  FileNode,
  FilePython,
  FileJava,
  FileCpp,
  FileC,
  FileCsharp,
  FilePhp,
  FileRuby,
  FileGo,
  FileRust,
  FileSwift,
  FileKotlin,
  FileScala,
  FileHaskell,
  FileClojure,
  FileElixir,
  FileErlang,
  FileLua,
  FilePerl,
  FileR,
  FileMatlab,
  FileJulia,
  FileDart,
  FileFlutter,
  FileReactNative,
  FileIonic,
  FileElectron,
  FileNext,
  FileNuxt,
  FileGatsby,
  FileSvelte,
  FileSolid,
  FilePreact,
  FileAlpine,
  FileLit,
  FileStencil,
  FileAurelia,
  FileBackbone,
  FileEmber,
  FileMeteor,
  FileMithril,
  FilePolymer,
  FileRiot,
  FileVanilla,
  FileJquery,
  FileBootstrap,
  FileTailwind,
  FileBulma,
  FileFoundation,
  FileSemantic,
  FileMaterial,
  FileAnt,
  FileElement,
  FileVuetify,
  FileQuasar,
  FileNuxt3,
  FileVue3,
  FileReact18,
  FileNext13,
  FileRemix,
  FileAstro,
  FileSvelteKit,
  FileSolidStart,
  FileQwik,
  FileFresh,
  FileDeno,
  FileBun,
  FileVite,
  FileWebpack,
  FileRollup,
  FileParcel,
  FileEsbuild,
  FileSwc,
  FileTurbopack,
  FileNx,
  FileLerna,
  FileYarn,
  FileNpm,
  FilePnpm,
  FileBunPackage,
  FileDocker,
  FileKubernetes,
  FileTerraform,
  FileAnsible,
  FileChef,
  FilePuppet,
  FileJenkins,
  FileGitlab,
  FileGithub,
  FileBitbucket,
  FileGit,
  FileGitHub,
  FileGitLab,
  FileBitbucket2,
  FileGit2,
  FileGitHub2,
  FileGitLab2,
  FileBitbucket3,
  FileGit3,
  FileGitHub3,
  FileGitLab3,
  FileBitbucket4,
  FileGit4,
  FileGitHub4,
  FileGitLab4,
  FileBitbucket5,
  FileGit5,
  FileGitHub5,
  FileGitLab5,
  FileBitbucket6,
  FileGit6,
  FileGitHub6,
  FileGitLab6,
  FileBitbucket7,
  FileGit7,
  FileGitHub7,
  FileGitLab7,
  FileBitbucket8,
  FileGit8,
  FileGitHub8,
  FileGitLab8,
  FileBitbucket9,
  FileGit9,
  FileGitHub9,
  FileGitLab9,
  FileBitbucket10,
  FileGit10,
  FileGitHub10,
  FileGitLab10
} from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  currency: string;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableCourses: string[];
  description: string;
  createdBy: string;
  createdAt: Date;
  lastUsed?: Date;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  autoApply: boolean;
  firstTimeOnly: boolean;
  emailRestriction?: string[];
  ipRestriction?: string[];
  deviceRestriction?: string[];
  timeRestriction?: {
    startTime: string;
    endTime: string;
    daysOfWeek: number[];
  };
  usageAnalytics: {
    dailyUsage: { date: string; count: number }[];
    weeklyUsage: { week: string; count: number }[];
    monthlyUsage: { month: string; count: number }[];
    topUsers: { userId: string; usageCount: number }[];
    topCourses: { courseId: string; usageCount: number }[];
  };
}

interface Course {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  instructor: string;
}

const CouponManagement: React.FC = () => {
  // State Management
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // Form States
  const [newCouponData, setNewCouponData] = useState({
    code: '',
    type: 'percentage' as const,
    value: 0,
    currency: 'USD',
    minPurchase: 0,
    maxDiscount: 0,
    usageLimit: 100,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    description: '',
    applicableCourses: [] as string[],
    tags: [] as string[],
    priority: 'medium' as const,
    autoApply: false,
    firstTimeOnly: false,
    emailRestriction: [] as string[],
    timeRestriction: {
      startTime: '00:00',
      endTime: '23:59',
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
    }
  });

  // Sample data initialization
  useEffect(() => {
    const sampleCoupons: Coupon[] = [
      {
        id: '1',
        code: 'WELCOME20',
        type: 'percentage',
        value: 20,
        currency: 'USD',
        minPurchase: 50,
        maxDiscount: 100,
        usageLimit: 1000,
        usedCount: 245,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2024-12-31'),
        isActive: true,
        applicableCourses: ['1', '2', '3'],
        description: 'Welcome discount for new students',
        createdBy: 'instructor-1',
        createdAt: new Date('2024-01-01'),
        lastUsed: new Date('2024-01-15'),
        totalRevenue: 24500,
        averageOrderValue: 98.5,
        conversionRate: 12.5,
        tags: ['welcome', 'new-users', 'high-value'],
        priority: 'high',
        autoApply: true,
        firstTimeOnly: true,
        usageAnalytics: {
          dailyUsage: [
            { date: '2024-01-15', count: 15 },
            { date: '2024-01-16', count: 12 },
            { date: '2024-01-17', count: 18 }
          ],
          weeklyUsage: [
            { week: '2024-W03', count: 85 },
            { week: '2024-W02', count: 92 },
            { week: '2024-W01', count: 68 }
          ],
          monthlyUsage: [
            { month: '2024-01', count: 245 },
            { month: '2023-12', count: 198 },
            { month: '2023-11', count: 156 }
          ],
          topUsers: [
            { userId: 'user-1', usageCount: 5 },
            { userId: 'user-2', usageCount: 3 },
            { userId: 'user-3', usageCount: 2 }
          ],
          topCourses: [
            { courseId: '1', usageCount: 120 },
            { courseId: '2', usageCount: 85 },
            { courseId: '3', usageCount: 40 }
          ]
        }
      },
      {
        id: '2',
        code: 'FLASH50',
        type: 'fixed',
        value: 50,
        currency: 'USD',
        minPurchase: 100,
        usageLimit: 500,
        usedCount: 123,
        validFrom: new Date('2024-01-15'),
        validUntil: new Date('2024-01-31'),
        isActive: true,
        applicableCourses: ['1'],
        description: 'Flash sale discount',
        createdBy: 'instructor-1',
        createdAt: new Date('2024-01-15'),
        lastUsed: new Date('2024-01-20'),
        totalRevenue: 6150,
        averageOrderValue: 50,
        conversionRate: 8.2,
        tags: ['flash-sale', 'limited-time', 'high-value'],
        priority: 'high',
        autoApply: false,
        firstTimeOnly: false,
        usageAnalytics: {
          dailyUsage: [
            { date: '2024-01-20', count: 25 },
            { date: '2024-01-19', count: 18 },
            { date: '2024-01-18', count: 22 }
          ],
          weeklyUsage: [
            { week: '2024-W03', count: 123 },
            { week: '2024-W02', count: 0 },
            { week: '2024-W01', count: 0 }
          ],
          monthlyUsage: [
            { month: '2024-01', count: 123 },
            { month: '2023-12', count: 0 },
            { month: '2023-11', count: 0 }
          ],
          topUsers: [
            { userId: 'user-4', usageCount: 2 },
            { userId: 'user-5', usageCount: 1 },
            { userId: 'user-6', usageCount: 1 }
          ],
          topCourses: [
            { courseId: '1', usageCount: 123 },
            { courseId: '2', usageCount: 0 },
            { courseId: '3', usageCount: 0 }
          ]
        }
      },
      {
        id: '3',
        code: 'LOYALTY10',
        type: 'percentage',
        value: 10,
        currency: 'USD',
        usageLimit: 2000,
        usedCount: 456,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2024-12-31'),
        isActive: true,
        applicableCourses: ['1', '2', '3', '4', '5'],
        description: 'Loyalty discount for returning customers',
        createdBy: 'instructor-1',
        createdAt: new Date('2024-01-01'),
        lastUsed: new Date('2024-01-18'),
        totalRevenue: 18240,
        averageOrderValue: 40,
        conversionRate: 15.8,
        tags: ['loyalty', 'returning-customers', 'moderate-value'],
        priority: 'medium',
        autoApply: false,
        firstTimeOnly: false,
        usageAnalytics: {
          dailyUsage: [
            { date: '2024-01-18', count: 8 },
            { date: '2024-01-17', count: 12 },
            { date: '2024-01-16', count: 15 }
          ],
          weeklyUsage: [
            { week: '2024-W03', count: 95 },
            { week: '2024-W02', count: 88 },
            { week: '2024-W01', count: 102 }
          ],
          monthlyUsage: [
            { month: '2024-01', count: 456 },
            { month: '2023-12', count: 423 },
            { month: '2023-11', count: 398 }
          ],
          topUsers: [
            { userId: 'user-7', usageCount: 8 },
            { userId: 'user-8', usageCount: 6 },
            { userId: 'user-9', usageCount: 4 }
          ],
          topCourses: [
            { courseId: '1', usageCount: 180 },
            { courseId: '2', usageCount: 120 },
            { courseId: '3', usageCount: 90 }
          ]
        }
      }
    ];

    const sampleCourses: Course[] = [
      {
        id: '1',
        title: 'Advanced React Development',
        price: 89.99,
        currency: 'USD',
        category: 'Programming',
        instructor: 'Dr. John Vendor'
      },
      {
        id: '2',
        title: 'AI for Business Leaders',
        price: 149.99,
        currency: 'USD',
        category: 'Business',
        instructor: 'Dr. John Vendor'
      },
      {
        id: '3',
        title: 'Data Science Fundamentals',
        price: 79.99,
        currency: 'USD',
        category: 'Data Science',
        instructor: 'Dr. John Vendor'
      }
    ];

    setCoupons(sampleCoupons);
    setCourses(sampleCourses);
  }, []);

  // CRUD Functions
  const createCoupon = (couponData: any) => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      ...couponData,
      usedCount: 0,
      isActive: true,
      createdBy: 'instructor-1',
      createdAt: new Date(),
      totalRevenue: 0,
      averageOrderValue: 0,
      conversionRate: 0,
      usageAnalytics: {
        dailyUsage: [],
        weeklyUsage: [],
        monthlyUsage: [],
        topUsers: [],
        topCourses: []
      }
    };
    setCoupons([...coupons, newCoupon]);
    setShowCreateModal(false);
    setNewCouponData({
      code: '',
      type: 'percentage',
      value: 0,
      currency: 'USD',
      minPurchase: 0,
      maxDiscount: 0,
      usageLimit: 100,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      description: '',
      applicableCourses: [],
      tags: [],
      priority: 'medium',
      autoApply: false,
      firstTimeOnly: false,
      emailRestriction: [],
      timeRestriction: {
        startTime: '00:00',
        endTime: '23:59',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
      }
    });
  };

  const updateCoupon = (id: string, couponData: any) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id ? { ...coupon, ...couponData } : coupon
    ));
    setShowEditModal(false);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
    setShowDeleteModal(false);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon
    ));
  };

  const duplicateCoupon = (coupon: Coupon) => {
    const duplicatedCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
      code: `${coupon.code}_COPY`,
      isActive: false,
      createdAt: new Date(),
      usedCount: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      conversionRate: 0,
      usageAnalytics: {
        dailyUsage: [],
        weeklyUsage: [],
        monthlyUsage: [],
        topUsers: [],
        topCourses: []
      }
    };
    setCoupons([...coupons, duplicatedCoupon]);
  };

  // Utility Functions
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (isActive: boolean, validUntil: Date) => {
    if (!isActive) return 'bg-gray-100 text-gray-800';
    if (new Date() > validUntil) return 'bg-red-100 text-red-800';
    return 'bg-green-100 text-green-800';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'percentage': return 'bg-blue-100 text-blue-800';
      case 'fixed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateUsagePercentage = (usedCount: number, usageLimit: number) => {
    return Math.round((usedCount / usageLimit) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Filtered and sorted coupons
  const filteredCoupons = coupons
    .filter(coupon => 
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus === 'all' || 
        (selectedStatus === 'active' && coupon.isActive) ||
        (selectedStatus === 'inactive' && !coupon.isActive) ||
        (selectedStatus === 'expired' && new Date() > coupon.validUntil)) &&
      (selectedType === 'all' || coupon.type === selectedType)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'usage-high': return b.usedCount - a.usedCount;
        case 'usage-low': return a.usedCount - b.usedCount;
        case 'revenue-high': return b.totalRevenue - a.totalRevenue;
        case 'revenue-low': return a.totalRevenue - b.totalRevenue;
        case 'conversion-high': return b.conversionRate - a.conversionRate;
        case 'conversion-low': return a.conversionRate - b.conversionRate;
        default: return 0;
      }
    });

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(c => c.isActive).length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.usedCount, 0);
  const totalRevenue = coupons.reduce((sum, c) => sum + c.totalRevenue, 0);
  const averageConversionRate = coupons.length > 0 
    ? coupons.reduce((sum, c) => sum + c.conversionRate, 0) / coupons.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Coupon Management</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {filteredCoupons.length} Coupons
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Coupons</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCoupons}</p>
                </div>
                <Tag className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Coupons</p>
                  <p className="text-2xl font-bold text-green-600">{activeCoupons}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Usage</p>
                  <p className="text-2xl font-bold text-purple-600">{totalUsage}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search coupons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="usage-high">Most Used</option>
                <option value="usage-low">Least Used</option>
                <option value="revenue-high">Highest Revenue</option>
                <option value="revenue-low">Lowest Revenue</option>
                <option value="conversion-high">Highest Conversion</option>
                <option value="conversion-low">Lowest Conversion</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon) => (
              <Card key={coupon.id} className="relative group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold">{coupon.code}</CardTitle>
                      <CardDescription className="mt-1">{coupon.description}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setShowAnalyticsModal(true);
                        }}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateCoupon(coupon)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Coupon Details */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {coupon.type === 'percentage' ? (
                        <Percent className="h-4 w-4 text-blue-600" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-purple-600" />
                      )}
                      <span className="font-semibold">
                        {coupon.type === 'percentage' ? `${coupon.value}%` : formatCurrency(coupon.value, coupon.currency)}
                      </span>
                    </div>
                    <Badge variant="secondary" className={getTypeColor(coupon.type)}>
                      {coupon.type}
                    </Badge>
                  </div>

                  {/* Usage Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Usage:</span>
                      <span className="font-medium">
                        {coupon.usedCount} / {coupon.usageLimit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(calculateUsagePercentage(coupon.usedCount, coupon.usageLimit))}`}
                        style={{
                          width: `${Math.min(calculateUsagePercentage(coupon.usedCount, coupon.usageLimit), 100)}%`,
                          backgroundColor: calculateUsagePercentage(coupon.usedCount, coupon.usageLimit) >= 90 
                            ? '#dc2626' 
                            : calculateUsagePercentage(coupon.usedCount, coupon.usageLimit) >= 75 
                              ? '#d97706' 
                              : '#059669'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-semibold text-green-600">{formatCurrency(coupon.totalRevenue, coupon.currency)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversion</p>
                      <p className="font-semibold text-blue-600">{coupon.conversionRate.toFixed(1)}%</p>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valid From:</span>
                      <span>{formatDate(coupon.validFrom)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valid Until:</span>
                      <span>{formatDate(coupon.validUntil)}</span>
                    </div>
                  </div>

                  {/* Tags and Priority */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {coupon.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {coupon.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{coupon.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className={getPriorityColor(coupon.priority)}>
                      {coupon.priority}
                    </Badge>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <Badge variant="secondary" className={getStatusColor(coupon.isActive, coupon.validUntil)}>
                      {!coupon.isActive ? 'Inactive' : new Date() > coupon.validUntil ? 'Expired' : 'Active'}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        variant={coupon.isActive ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleCouponStatus(coupon.id)}
                      >
                        {coupon.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCoupons.map((coupon) => (
              <Card key={coupon.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">{coupon.code}</h3>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {coupon.type === 'percentage' ? (
                          <Percent className="h-4 w-4 text-blue-600" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-purple-600" />
                        )}
                        <span className="font-semibold">
                          {coupon.type === 'percentage' ? `${coupon.value}%` : formatCurrency(coupon.value, coupon.currency)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Usage</p>
                        <p className="font-semibold">{coupon.usedCount} / {coupon.usageLimit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-semibold text-green-600">{formatCurrency(coupon.totalRevenue, coupon.currency)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCoupon(coupon);
                            setShowAnalyticsModal(true);
                          }}
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCoupon(coupon);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => duplicateCoupon(coupon)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCoupon(coupon);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modals will be implemented in the next part */}
    </div>
  );
};

export default CouponManagement;
