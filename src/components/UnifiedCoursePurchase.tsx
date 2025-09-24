import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Star, 
  Users, 
  Clock, 
  Award,
  Shield,
  ArrowRight,
  ShoppingCart,
  BookOpen,
  Play,
  CheckCircle2,
  X,
  Globe,
  Loader2,
  AlertCircle,
  ExternalLink,
  Heart,
  Share2,
  Download,
  Eye,
  MessageSquare,
  ThumbsUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard as CreditCardIcon,
  Banknote,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Video,
  FileText,
  Image,
  Music,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Percent,
  Gift,
  Crown,
  Rocket,
  Sparkles,
  Code,
  Palette,
  ChefHat,
  Microscope,
  Camera
} from 'lucide-react';
import { unifiedCourseService, Course } from '@/services/UnifiedCourseService';
import { createStripeCheckoutSession } from '../api/stripe';
import { toast } from 'sonner';

interface UnifiedCoursePurchaseProps {
  course?: Course;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: (courseId: string) => void;
  mode?: 'modal' | 'page' | 'embedded';
  showCourseDetails?: boolean;
  showInstructorInfo?: boolean;
  showReviews?: boolean;
  showRelatedCourses?: boolean;
}

const UnifiedCoursePurchase: React.FC<UnifiedCoursePurchaseProps> = ({
  course: propCourse,
  isOpen = true,
  onClose,
  onSuccess,
  mode = 'page',
  showCourseDetails = true,
  showInstructorInfo = true,
  showReviews = true,
  showRelatedCourses = true
}) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(propCourse || null);
  const [loading, setLoading] = useState(!propCourse);
  const [purchaseStep, setPurchaseStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank' | 'crypto'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    phone: '',
    billingAddress: '',
    city: '',
    country: '',
    zipCode: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  useEffect(() => {
    if (!propCourse && courseId) {
      loadCourse();
    }
  }, [courseId, propCourse]);

  const loadCourse = async () => {
    if (!courseId) return;
    
    setLoading(true);
    try {
      const { data, error } = await unifiedCourseService.getCourseById(courseId);
      if (error) {
        toast.error(error);
        navigate('/courses');
      } else {
        setCourse(data);
      }
    } catch (error) {
      console.error('Error loading course:', error);
      toast.error('Failed to load course');
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCouponApply = async () => {
    if (!couponCode.trim()) return;

    setProcessing(true);
    try {
      // Simulate coupon validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const validCoupons = ['SAVE20', 'WELCOME10', 'STUDENT50'];
      if (validCoupons.includes(couponCode.toUpperCase())) {
        const discountPercent = couponCode.toUpperCase() === 'STUDENT50' ? 50 : 
                              couponCode.toUpperCase() === 'SAVE20' ? 20 : 10;
        setDiscount(discountPercent);
        setCouponApplied(true);
        setCouponError('');
        toast.success(`Coupon applied! ${discountPercent}% discount`);
      } else {
        setCouponError('Invalid coupon code');
        toast.error('Invalid coupon code');
      }
    } catch (error) {
      setCouponError('Failed to apply coupon');
      toast.error('Failed to apply coupon');
    } finally {
      setProcessing(false);
    }
  };

  const calculatePrice = () => {
    if (!course) return 0;
    const basePrice = course.price;
    const discountAmount = (basePrice * discount) / 100;
    return Math.max(0, basePrice - discountAmount);
  };

  const handlePurchase = async () => {
    if (!course) return;

    // Validate form
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (course.accessType === 'paid' && !formData.cardNumber && paymentMethod === 'card') {
      toast.error('Please enter your payment details');
      return;
    }

    setProcessing(true);
    try {
      if (course.accessType === 'free') {
        // Handle free course enrollment
        const { error } = await unifiedCourseService.enrollInCourse(course.id, 'current-user-id');
        if (error) {
          toast.error(error);
        } else {
          setPurchaseStep('success');
          toast.success('Successfully enrolled in course!');
          if (onSuccess) onSuccess(course.id);
        }
      } else {
        // Handle paid course purchase
        if (paymentMethod === 'card') {
          const { data, error } = await createStripeCheckoutSession({
            courseId: course.id,
            price: calculatePrice(),
            currency: course.currency,
            couponCode: couponApplied ? couponCode : undefined
          });

          if (error) {
            toast.error(error);
          } else if (data?.url) {
            window.location.href = data.url;
          }
        } else {
          // Handle other payment methods
          toast.info('Redirecting to payment provider...');
          // Implement other payment methods here
        }
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Purchase failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };

  const formatDuration = (duration: string) => {
    return duration || 'Self-paced';
  };

  const getDifficultyColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
      all_levels: 'bg-blue-100 text-blue-800'
    };
    return colors[level as keyof typeof colors] || colors.beginner;
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
      'Language': <Globe className="w-5 h-5" />,
      'Health': <Heart className="w-5 h-5" />,
      'Fitness': <Activity className="w-5 h-5" />,
      'Cooking': <ChefHat className="w-5 h-5" />,
      'Art': <Palette className="w-5 h-5" />,
      'Science': <Microscope className="w-5 h-5" />,
      'Technology': <Laptop className="w-5 h-5" />
    };
    
    return icons[category] || <BookOpen className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Course not found</p>
          <Button onClick={() => navigate('/courses')} className="mt-4">
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  const finalPrice = calculatePrice();
  const originalPrice = course.price;
  const savings = originalPrice - finalPrice;

  const content = (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            {showCourseDetails && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      {getCategoryIcon(course.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getDifficultyColor(course.level)}>
                          {course.level.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{course.category}</Badge>
                        {course.isBestseller && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Bestseller
                          </Badge>
                        )}
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students.toLocaleString()} students
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDuration(course.duration)}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {course.rating.toFixed(1)} ({Math.floor(course.rating * 20)} reviews)
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {course.lessonsCount} lessons
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructor Info */}
            {showInstructorInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    About the Instructor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.instructor}</h3>
                      <p className="text-gray-600">Expert Instructor</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          5+ years experience
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          10,000+ students
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn?.slice(0, 8).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  )) || course.learningObjectives?.slice(0, 8).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  )) || (
                    <div className="col-span-2 text-gray-500">
                      Course objectives will be available after enrollment.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {showReviews && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Student Reviews</span>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{course.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">({Math.floor(course.rating * 20)} reviews)</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700">
                        Excellent course! The instructor explains everything clearly and the practical exercises are very helpful.
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
                          <div>
                            <p className="font-medium">Mike Chen</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">1 week ago</span>
                      </div>
                      <p className="text-gray-700">
                        Great content and well-structured. I learned a lot and would recommend this course to others.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Purchase Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                    {purchaseStep === 'details' && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {/* Price */}
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            {course.accessType === 'free' ? (
                              <span className="text-3xl font-bold text-green-600">Free</span>
                            ) : (
                              <>
                                {discount > 0 && (
                                  <span className="text-xl text-gray-500 line-through">
                                    {formatCurrency(originalPrice, course.currency)}
                                  </span>
                                )}
                                <span className="text-3xl font-bold text-gray-900">
                                  {formatCurrency(finalPrice, course.currency)}
                                </span>
                              </>
                            )}
                          </div>
                          {discount > 0 && (
                            <Badge className="bg-green-100 text-green-800">
                              Save {formatCurrency(savings, course.currency)} ({discount}% off)
                            </Badge>
                          )}
                        </div>

                        {/* Coupon Code */}
                        {course.accessType !== 'free' && (
                          <div>
                            <Label htmlFor="coupon">Coupon Code</Label>
                            <div className="flex space-x-2 mt-1">
                              <Input
                                id="coupon"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                disabled={couponApplied}
                              />
                              <Button
                                onClick={handleCouponApply}
                                disabled={!couponCode.trim() || processing || couponApplied}
                                variant="outline"
                              >
                                {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                              </Button>
                            </div>
                            {couponError && (
                              <p className="text-red-500 text-sm mt-1">{couponError}</p>
                            )}
                            {couponApplied && (
                              <p className="text-green-500 text-sm mt-1">Coupon applied successfully!</p>
                            )}
                          </div>
                        )}

                        {/* Payment Method */}
                        {course.accessType !== 'free' && (
                          <div>
                            <Label>Payment Method</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <Button
                                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                                onClick={() => setPaymentMethod('card')}
                                className="flex items-center justify-center"
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Card
                              </Button>
                              <Button
                                variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                                onClick={() => setPaymentMethod('paypal')}
                                className="flex items-center justify-center"
                              >
                                <Banknote className="w-4 h-4 mr-2" />
                                PayPal
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Payment Form */}
                        {course.accessType !== 'free' && paymentMethod === 'card' && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={formData.cardNumber}
                                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                  id="expiryDate"
                                  placeholder="MM/YY"
                                  value={formData.expiryDate}
                                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  value={formData.cvv}
                                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="cardholderName">Cardholder Name</Label>
                              <Input
                                id="cardholderName"
                                placeholder="John Doe"
                                value={formData.cardholderName}
                                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                              />
                            </div>

                            <div>
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {/* Terms and Conditions */}
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                              className="mt-1 mr-3"
                            />
                            <Label htmlFor="agreeToTerms" className="text-sm">
                              I agree to the{' '}
                              <a href="/terms" className="text-blue-600 hover:underline">
                                Terms and Conditions
                              </a>{' '}
                              and{' '}
                              <a href="/privacy" className="text-blue-600 hover:underline">
                                Privacy Policy
                              </a>
                            </Label>
                          </div>
                          
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="agreeToMarketing"
                              checked={formData.agreeToMarketing}
                              onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                              className="mt-1 mr-3"
                            />
                            <Label htmlFor="agreeToMarketing" className="text-sm">
                              I would like to receive marketing emails and updates
                            </Label>
                          </div>
                        </div>

                        {/* Purchase Button */}
                        <Button
                          onClick={handlePurchase}
                          disabled={processing}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="lg"
                        >
                          {processing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              {course.accessType === 'free' ? (
                                <>
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Enroll for Free
                                </>
                              ) : (
                                <>
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  Purchase Course
                                </>
                              )}
                            </>
                          )}
                        </Button>

                        {/* Security Badge */}
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <Shield className="w-4 h-4 mr-2" />
                          Secure payment with 256-bit SSL encryption
                        </div>
                      </motion.div>
                    )}

                    {purchaseStep === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center space-y-6"
                      >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {course.accessType === 'free' ? 'Enrolled Successfully!' : 'Purchase Complete!'}
                          </h3>
                          <p className="text-gray-600">
                            {course.accessType === 'free' 
                              ? 'You can now access all course materials.'
                              : 'Thank you for your purchase. You can now access the course.'
                            }
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Button
                            onClick={() => navigate(`/courses/${course.id}/learn`)}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Learning
                          </Button>
                          
                          <Button
                            onClick={() => navigate('/dashboard')}
                            variant="outline"
                            className="w-full"
                          >
                            Go to Dashboard
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">What's included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">{course.lessonsCount} video lessons</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">Downloadable resources</span>
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 text-purple-500 mr-3" />
                      <span className="text-sm">Mobile and desktop access</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-orange-500 mr-3" />
                      <span className="text-sm">Lifetime access</span>
                    </div>
                    {course.certificate && (
                      <div className="flex items-center">
                        <Award className="w-5 h-5 text-yellow-500 mr-3" />
                        <span className="text-sm">Certificate of completion</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (mode === 'modal') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
};

export default UnifiedCoursePurchase;
