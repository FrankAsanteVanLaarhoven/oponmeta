import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  CreditCard,
  Apple,
  Smartphone,
  Globe,
  DollarSign,
  Euro,
  PoundSterling,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Minus,
  Plus,
  ShoppingCart,
  Gift,
  Percent,
  Timer,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Clock,
  Star,
  Award,
  Zap,
  Crown,
  Sparkles,
  TrendingUp,
  BarChart3,
  Target,
  Rocket,
  Brain,
  Heart,
  Share2,
  Download,
  BookOpen,
  Users,
  Clock as ClockIcon,
  Play,
  Pause,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  duration: number;
  lessons: number;
  instructor: {
    name: string;
    avatar: string;
  };
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
  type: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto';
  name: string;
  icon: string;
  isAvailable: boolean;
  processingFee?: number;
  currency: string;
  description: string;
  features: string[];
}

interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  supportedPaymentMethods: string[];
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const WorldClassCheckout: React.FC = () => {
  // State Management
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'US',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userCurrency, setUserCurrency] = useState('USD');
  const [userCountry, setUserCountry] = useState('US');

  // Available countries and currencies
  const [countries] = useState<Country[]>([
    {
      code: 'US',
      name: 'United States',
      currency: 'USD',
      currencySymbol: '$',
      taxRate: 0.08,
      supportedPaymentMethods: ['stripe', 'apple_pay', 'google_pay', 'paypal']
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      currency: 'GBP',
      currencySymbol: '£',
      taxRate: 0.20,
      supportedPaymentMethods: ['stripe', 'apple_pay', 'google_pay', 'paypal']
    },
    {
      code: 'EU',
      name: 'European Union',
      currency: 'EUR',
      currencySymbol: '€',
      taxRate: 0.21,
      supportedPaymentMethods: ['stripe', 'apple_pay', 'google_pay', 'paypal']
    },
    {
      code: 'JP',
      name: 'Japan',
      currency: 'JPY',
      currencySymbol: '¥',
      taxRate: 0.10,
      supportedPaymentMethods: ['stripe', 'paypal']
    },
    {
      code: 'CA',
      name: 'Canada',
      currency: 'CAD',
      currencySymbol: 'C$',
      taxRate: 0.13,
      supportedPaymentMethods: ['stripe', 'apple_pay', 'google_pay', 'paypal']
    },
    {
      code: 'AU',
      name: 'Australia',
      currency: 'AUD',
      currencySymbol: 'A$',
      taxRate: 0.10,
      supportedPaymentMethods: ['stripe', 'apple_pay', 'google_pay', 'paypal']
    }
  ]);

  // Payment Methods
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'stripe',
      type: 'stripe',
      name: 'Credit/Debit Card',
      icon: '💳',
      isAvailable: true,
      processingFee: 2.9,
      currency: 'USD',
      description: 'Secure payment with Visa, Mastercard, American Express',
      features: ['Instant processing', 'Secure encryption', 'Wide acceptance']
    },
    {
      id: 'apple_pay',
      type: 'apple_pay',
      name: 'Apple Pay',
      icon: '🍎',
      isAvailable: true,
      processingFee: 2.9,
      currency: 'USD',
      description: 'Quick and secure payment with Apple Pay',
      features: ['One-tap payment', 'Biometric security', 'Apple ecosystem']
    },
    {
      id: 'google_pay',
      type: 'google_pay',
      name: 'Google Pay',
      icon: '🤖',
      isAvailable: true,
      processingFee: 2.9,
      currency: 'USD',
      description: 'Fast and secure payment with Google Pay',
      features: ['Quick checkout', 'Android integration', 'Secure tokens']
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'PayPal',
      icon: '📧',
      isAvailable: true,
      processingFee: 3.5,
      currency: 'USD',
      description: 'Pay with your PayPal account or credit card',
      features: ['Buyer protection', 'No account required', 'Global acceptance']
    },
    {
      id: 'bank_transfer',
      type: 'bank_transfer',
      name: 'Bank Transfer',
      icon: '🏦',
      isAvailable: true,
      processingFee: 0,
      currency: 'USD',
      description: 'Direct bank transfer (3-5 business days)',
      features: ['No fees', 'Direct transfer', 'Secure banking']
    },
    {
      id: 'crypto',
      type: 'crypto',
      name: 'Cryptocurrency',
      icon: '₿',
      isAvailable: true,
      processingFee: 1.0,
      currency: 'USD',
      description: 'Pay with Bitcoin, Ethereum, and other cryptocurrencies',
      features: ['Decentralized', 'Low fees', 'Global access']
    }
  ]);

  // Sample data
  const [availableCoupons] = useState<Coupon[]>([
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
      description: 'Welcome discount for new students'
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
      description: 'Flash sale discount'
    }
  ]);

  useEffect(() => {
    // Sample cart data
    const sampleCart: CartItem[] = [
      {
        courseId: '1',
        course: {
          id: '1',
          title: 'Advanced React Development',
          description: 'Master React with advanced patterns and modern tooling',
          price: 89.99,
          originalPrice: 129.99,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
          duration: 15.5,
          lessons: 52,
          instructor: {
            name: 'Dr. John Vendor',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
          }
        },
        quantity: 1,
        finalPrice: 89.99
      },
      {
        courseId: '2',
        course: {
          id: '2',
          title: 'AI for Business Leaders',
          description: 'Harness the power of AI to drive innovation',
          price: 149.99,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
          duration: 8.5,
          lessons: 32,
          instructor: {
            name: 'Dr. John Vendor',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
          }
        },
        quantity: 1,
        finalPrice: 149.99
      }
    ];
    setCart(sampleCart);
  }, []);

  // Utility Functions
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    const country = countries.find(c => c.currency === currency);
    const symbol = country?.currencySymbol || '$';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };

  const getCurrentCountry = () => {
    return countries.find(c => c.code === userCountry) || countries[0];
  };

  const getAvailablePaymentMethods = () => {
    const country = getCurrentCountry();
    return paymentMethods.filter(method => 
      country.supportedPaymentMethods.includes(method.type)
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = calculateSubtotal();
    if (appliedCoupon.minPurchase && subtotal < appliedCoupon.minPurchase) return 0;
    
    let discount = 0;
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else {
      discount = appliedCoupon.value;
    }
    
    return Math.min(discount, subtotal);
  };

  const calculateTax = () => {
    const country = getCurrentCountry();
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return (subtotal - discount) * country.taxRate;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    return subtotal - discount + tax;
  };

  const applyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    
    if (!coupon.isActive) {
      setCouponError('Coupon is not active');
      return;
    }
    
    if (coupon.usedCount >= coupon.usageLimit) {
      setCouponError('Coupon usage limit reached');
      return;
    }
    
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      setCouponError('Coupon is expired or not yet valid');
      return;
    }
    
    const subtotal = calculateSubtotal();
    if (coupon.minPurchase && subtotal < coupon.minPurchase) {
      setCouponError(`Minimum purchase of ${formatCurrency(coupon.minPurchase, coupon.currency)} required`);
      return;
    }
    
    // Check if coupon applies to any course in cart
    const applicableItems = cart.filter(item => 
      coupon.applicableCourses.includes(item.courseId)
    );
    
    if (applicableItems.length === 0) {
      setCouponError('Coupon not applicable to items in cart');
      return;
    }
    
    setAppliedCoupon(coupon);
    setCouponSuccess(`Coupon applied! ${coupon.description}`);
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    setCouponSuccess('');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    // Handle success/failure logic here
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case 'stripe': return <CreditCard className="h-6 w-6" />;
      case 'apple_pay': return <Apple className="h-6 w-6" />;
      case 'google_pay': return <Smartphone className="h-6 w-6" />;
      case 'paypal': return <Globe className="h-6 w-6" />;
      case 'bank_transfer': return <Building className="h-6 w-6" />;
      case 'crypto': return <span className="text-2xl">₿</span>;
      default: return <CreditCard className="h-6 w-6" />;
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD': return <DollarSign className="h-4 w-4" />;
      case 'EUR': return <Euro className="h-4 w-4" />;
      case 'GBP': return <PoundSterling className="h-4 w-4" />;
      case 'JPY': return <span className="text-lg">¥</span>;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 checkout-page">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-black">Secure Checkout</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-black font-medium">Total</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(calculateTotal(), userCurrency)}</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Step {currentStep} of 3
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Cart Review */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Review Your Cart
                  </CardTitle>
                  <CardDescription>
                    Review your selected courses before proceeding to checkout
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.courseId} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.course.image}
                        alt={item.course.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.course.title}</h4>
                        <p className="text-sm text-black font-medium">{item.course.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-black font-medium">
                            <ClockIcon className="h-3 w-3 inline mr-1" />
                            {item.course.duration}h
                          </span>
                          <span className="text-sm text-black font-medium">
                            <BookOpen className="h-3 w-3 inline mr-1" />
                            {item.course.lessons} lessons
                          </span>
                          <span className="text-sm text-black font-medium">
                            <User className="h-3 w-3 inline mr-1" />
                            {item.course.instructor.name}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        {item.course.originalPrice && item.course.originalPrice > item.course.price ? (
                          <div>
                            <p className="text-lg font-bold text-green-600">
                              {formatCurrency(item.course.price, item.course.currency)}
                            </p>
                            <p className="text-sm text-black font-medium line-through">
                              {formatCurrency(item.course.originalPrice, item.course.currency)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(item.course.price, item.course.currency)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end">
                    <Button onClick={() => setCurrentStep(2)} className="bg-blue-600 hover:bg-blue-700">
                      Continue to Payment
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <>
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Please provide your contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-black mb-1">First Name</label>
                        <Input
                          value={userProfile.firstName}
                          onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-black mb-1">Last Name</label>
                        <Input
                          value={userProfile.lastName}
                          onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-black mb-1">Email</label>
                        <Input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-black mb-1">Phone</label>
                        <Input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div>
                                              <label className="block text-sm font-bold text-black mb-1">Country</label>
                      <select
                        value={userCountry}
                        onChange={(e) => {
                          setUserCountry(e.target.value);
                          const country = countries.find(c => c.code === e.target.value);
                          if (country) {
                            setUserCurrency(country.currency);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name} ({country.currency})
                          </option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Address Information
                    </CardTitle>
                    <CardDescription>
                      Please provide your billing address
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                                              <label className="block text-sm font-bold text-black mb-1">Street Address</label>
                      <Input
                        value={userProfile.address.street}
                        onChange={(e) => setUserProfile({
                          ...userProfile, 
                          address: {...userProfile.address, street: e.target.value}
                        })}
                        placeholder="Enter your street address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-black mb-1">City</label>
                        <Input
                          value={userProfile.address.city}
                          onChange={(e) => setUserProfile({
                            ...userProfile, 
                            address: {...userProfile.address, city: e.target.value}
                          })}
                          placeholder="Enter your city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-black mb-1">State/Province</label>
                        <Input
                          value={userProfile.address.state}
                          onChange={(e) => setUserProfile({
                            ...userProfile, 
                            address: {...userProfile.address, state: e.target.value}
                          })}
                          placeholder="Enter your state"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-black mb-1">ZIP/Postal Code</label>
                        <Input
                          value={userProfile.address.zipCode}
                          onChange={(e) => setUserProfile({
                            ...userProfile, 
                            address: {...userProfile.address, zipCode: e.target.value}
                          })}
                          placeholder="Enter your ZIP code"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>
                      Choose your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getAvailablePaymentMethods().map((method) => (
                        <div
                          key={method.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedPaymentMethod === method.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {getPaymentMethodIcon(method)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{method.name}</h4>
                              <p className="text-sm text-black font-medium">{method.description}</p>
                              {method.processingFee && (
                                <p className="text-xs text-black font-medium">
                                  Processing fee: {method.processingFee}%
                                </p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={selectedPaymentMethod === method.id}
                                onChange={() => setSelectedPaymentMethod(method.id)}
                                className="h-4 w-4 text-blue-600"
                              />
                            </div>
                          </div>
                          {method.features && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {method.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)} 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!selectedPaymentMethod}
                  >
                    Continue to Review
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Review and Confirm */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Review and Confirm
                  </CardTitle>
                  <CardDescription>
                    Please review your order before completing the purchase
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Order Summary</h4>
                    {cart.map((item) => (
                      <div key={item.courseId} className="flex justify-between items-center py-2">
                        <span className="text-sm text-black font-medium">{item.course.title}</span>
                        <span className="text-sm font-bold text-black">
                          {formatCurrency(item.finalPrice, item.course.currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Information */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Payment Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black font-medium">Payment Method:</span>
                        <span className="font-bold text-black">
                          {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black font-medium">Currency:</span>
                        <span className="font-bold text-black">{userCurrency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800">Secure Payment</h4>
                        <p className="text-sm text-green-700">
                          Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Payment
                    </Button>
                    <Button 
                      onClick={handlePayment} 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Complete Purchase
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                {cart.map((item) => (
                  <div key={item.courseId} className="flex items-center space-x-3">
                    <img
                      src={item.course.image}
                      alt={item.course.title}
                      className="w-12 h-8 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.course.title}</h4>
                      <p className="text-xs text-black font-medium">{item.course.instructor.name}</p>
                    </div>
                    <span className="text-sm font-bold text-black">
                      {formatCurrency(item.finalPrice, item.course.currency)}
                    </span>
                  </div>
                ))}

                {/* Coupon Section */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={applyCoupon}
                        variant="outline"
                        size="sm"
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-600 font-bold flex items-center">
                        <XCircle className="h-4 w-4 mr-1" />
                        {couponError}
                      </p>
                    )}
                    {couponSuccess && (
                      <p className="text-sm text-green-600 font-bold flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {couponSuccess}
                      </p>
                    )}
                    {appliedCoupon && (
                      <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                        <div className="flex items-center space-x-2">
                          <Gift className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-bold text-black">{appliedCoupon.code}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeCoupon}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-black font-medium">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal(), userCurrency)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({appliedCoupon.code}):</span>
                      <span>-{formatCurrency(calculateDiscount(), userCurrency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-black font-medium">
                    <span>Tax ({getCurrentCountry().taxRate * 100}%):</span>
                    <span>{formatCurrency(calculateTax(), userCurrency)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-black">
                      <span>Total:</span>
                      <span className="text-lg text-green-600 font-bold">
                        {formatCurrency(calculateTotal(), userCurrency)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-black font-bold">SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-black font-bold">PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-black font-bold">30-Day Money Back</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-black font-bold">Lifetime Access</span>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-black font-medium">
                  Our support team is available 24/7 to help you with any questions.
                </p>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldClassCheckout;
