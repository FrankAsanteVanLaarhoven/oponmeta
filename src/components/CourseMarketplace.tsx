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
  Play, 
  Pause, 
  DollarSign,
  Tag,
  Users,
  Star,
  Clock,
  BookOpen,
  MoreHorizontal,
  Search,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Heart,
  Share2,
  Download,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Settings,
  Calendar,
  Globe,
  CreditCard,
  Gift,
  Percent,
  Timer,
  UserCheck,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Brain,
  Rocket,
  Crown,
  Shield,
  Lock,
  Unlock,
  EyeOff,
  Eye as EyeIcon,
  Copy,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Minus,
  Plus as PlusIcon
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  duration: number;
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
  coupons?: Coupon[];
  status: 'draft' | 'published' | 'paused' | 'archived';
  visibility: 'public' | 'private' | 'unlisted';
  enrollmentLimit?: number;
  currentEnrollments: number;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

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
}

interface CartItem {
  courseId: string;
  course: Course;
  quantity: number;
  appliedCoupon?: Coupon;
  finalPrice: number;
}

interface PaymentMethod {
  id: string;
  type: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer';
  name: string;
  icon: string;
  isAvailable: boolean;
  processingFee?: number;
  currency: string;
}

const CourseMarketplace: React.FC = () => {
  // State Management
  const [courses, setCourses] = useState<Course[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const [showCreateCouponModal, setShowCreateCouponModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [userCurrency, setUserCurrency] = useState('USD');
  const [userCountry, setUserCountry] = useState('US');

  // Form States
  const [newCourseData, setNewCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner' as const,
    price: 0,
    currency: 'USD',
    language: 'English',
    tags: [] as string[],
    requirements: [] as string[],
    learningOutcomes: [] as string[]
  });

  const [newCouponData, setNewCouponData] = useState({
    code: '',
    type: 'percentage' as const,
    value: 0,
    currency: 'USD',
    minPurchase: 0,
    maxDiscount: 0,
    usageLimit: 100,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    description: '',
    applicableCourses: [] as string[]
  });

  // Payment Methods
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'stripe',
      type: 'stripe',
      name: 'Credit/Debit Card',
      icon: '💳',
      isAvailable: true,
      processingFee: 2.9,
      currency: 'USD'
    },
    {
      id: 'apple_pay',
      type: 'apple_pay',
      name: 'Apple Pay',
      icon: '🍎',
      isAvailable: true,
      processingFee: 2.9,
      currency: 'USD'
    },
    {
      id: 'google_pay',
      type: 'google_pay',
      name: 'Google Pay',
      icon: '🤖',
      isAvailable: true,
      processingFee: 2.9,
      currency: 'USD'
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'PayPal',
      icon: '📧',
      isAvailable: true,
      processingFee: 3.5,
      currency: 'USD'
    }
  ]);

  // Sample data initialization
  useEffect(() => {
    const sampleCourses: Course[] = [
      {
        id: '1',
        title: 'Advanced React Development',
        description: 'Master React with advanced patterns, performance optimization, and modern tooling.',
        category: 'Programming',
        level: 'advanced',
        price: 89.99,
        originalPrice: 129.99,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
        duration: 15.5,
        lessons: 52,
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
        },
        status: 'published',
        visibility: 'public',
        currentEnrollments: 1247,
        isActive: true
      },
      {
        id: '2',
        title: 'AI for Business Leaders',
        description: 'Harness the power of artificial intelligence to drive innovation and growth.',
        category: 'Business',
        level: 'beginner',
        price: 149.99,
        currency: 'USD',
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
        },
        status: 'published',
        visibility: 'public',
        currentEnrollments: 892,
        isActive: true
      }
    ];

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
        applicableCourses: ['1', '2'],
        description: 'Welcome discount for new students',
        createdBy: 'instructor-1',
        createdAt: new Date('2024-01-01')
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
        createdAt: new Date('2024-01-15')
      }
    ];

    setCourses(sampleCourses);
    setCoupons(sampleCoupons);
  }, []);

  // CRUD Functions
  const createCourse = (courseData: any) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      ...courseData,
      createdAt: new Date(),
      lastUpdated: new Date(),
      published: false,
      featured: false,
      students: 0,
      rating: 0,
      reviews: 0,
      earnings: 0,
      completions: 0,
      tags: courseData.tags || [],
      requirements: courseData.requirements || [],
      learningOutcomes: courseData.learningOutcomes || [],
      instructor: {
        name: 'Dr. John Vendor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        bio: 'Senior Software Engineer with 10+ years of experience',
        expertise: ['React', 'Node.js', 'TypeScript', 'AWS']
      },
      status: 'draft',
      visibility: 'private',
      currentEnrollments: 0,
      isActive: false
    };
    setCourses([...courses, newCourse]);
    setShowCreateCourseModal(false);
    setNewCourseData({
      title: '',
      description: '',
      category: '',
      level: 'beginner',
      price: 0,
      currency: 'USD',
      language: 'English',
      tags: [],
      requirements: [],
      learningOutcomes: []
    });
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

  const toggleCourseStatus = (id: string, status: Course['status']) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status, lastUpdated: new Date() } : course
    ));
  };

  const toggleCourseVisibility = (id: string, visibility: Course['visibility']) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, visibility, lastUpdated: new Date() } : course
    ));
  };

  // Coupon Management
  const createCoupon = (couponData: any) => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      ...couponData,
      usedCount: 0,
      isActive: true,
      createdBy: 'instructor-1',
      createdAt: new Date()
    };
    setCoupons([...coupons, newCoupon]);
    setShowCreateCouponModal(false);
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
      applicableCourses: []
    });
  };

  const updateCoupon = (id: string, couponData: any) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id ? { ...coupon, ...couponData } : coupon
    ));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon
    ));
  };

  // Cart Management
  const addToCart = (course: Course) => {
    const existingItem = cart.find(item => item.courseId === course.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.courseId === course.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        courseId: course.id,
        course,
        quantity: 1,
        finalPrice: course.price
      }]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCart(cart.filter(item => item.courseId !== courseId));
  };

  const updateCartQuantity = (courseId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
    } else {
      setCart(cart.map(item => 
        item.courseId === courseId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const applyCouponToCart = (couponCode: string) => {
    const coupon = coupons.find(c => c.code === couponCode && c.isActive);
    if (!coupon) return false;

    const cartTotal = cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
    if (coupon.minPurchase && cartTotal < coupon.minPurchase) return false;

    // Apply coupon to eligible items
    setCart(cart.map(item => {
      if (coupon.applicableCourses.includes(item.courseId)) {
        let discount = 0;
        if (coupon.type === 'percentage') {
          discount = (item.finalPrice * coupon.value) / 100;
          if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount);
          }
        } else {
          discount = coupon.value;
        }
        return {
          ...item,
          appliedCoupon: coupon,
          finalPrice: Math.max(0, item.finalPrice - discount)
        };
      }
      return item;
    }));

    return true;
  };

  // Utility Functions
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-gray-100 text-gray-800';
      case 'unlisted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filtered and sorted courses
  const filteredCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || course.category === selectedCategory) &&
      (selectedLevel === 'all' || course.level === selectedLevel)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'students': return b.students - a.students;
        default: return 0;
      }
    });

  const cartTotal = cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Course Marketplace</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {filteredCourses.length} Courses
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowCreateCourseModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
              <Button onClick={() => setShowCreateCouponModal(true)} variant="outline">
                <Tag className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
              <Button onClick={() => setShowCheckoutModal(true)} className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="students">Most Popular</option>
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

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="relative group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge variant={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                    <Badge variant={getVisibilityColor(course.visibility)}>
                      {course.visibility}
                    </Badge>
                  </div>
                  {course.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    </div>
                  )}
                  {course.originalPrice && course.originalPrice > course.price && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="destructive">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(course)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedCourse(course);
                        setShowEditCourseModal(true);
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedCourse(course);
                        setShowDeleteCourseModal(true);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.students} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-gray-600">({course.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.duration}h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.lessons} lessons</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      <Badge variant="secondary" className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                      {course.certificate && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      {course.originalPrice && course.originalPrice > course.price ? (
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(course.price, course.currency)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatCurrency(course.originalPrice, course.currency)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(course.price, course.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant={course.status === 'published' ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleCourseStatus(course.id, course.status === 'published' ? 'paused' : 'published')}
                      className="flex-1"
                    >
                      {course.status === 'published' ? (
                        <>
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Publish
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToCart(course)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-48 h-32 object-cover rounded-l-lg"
                />
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{course.students} students</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{course.duration}h</span>
                        </div>
                        <Badge variant="secondary" className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(course.price, course.currency)}
                      </span>
                      <Button
                        variant={course.status === 'published' ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleCourseStatus(course.id, course.status === 'published' ? 'paused' : 'published')}
                      >
                        {course.status === 'published' ? 'Pause' : 'Publish'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addToCart(course)}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modals will be implemented in the next part */}
    </div>
  );
};

export default CourseMarketplace;
