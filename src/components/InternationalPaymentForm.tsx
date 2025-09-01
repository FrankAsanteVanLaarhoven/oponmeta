import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { 
  Globe, 
  CreditCard, 
  ShoppingCart, 
  ArrowRight, 
  MapPin,
  TrendingDown,
  Shield,
  CheckCircle,
  Clock,
  Users,
  Star,
  Award,
  X
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  image: string;
  category: string;
  level: string;
}

interface UserLocation {
  country: string;
  countryCode: string;
  currencyCode: string;
  currencySymbol: string;
}

interface InternationalPaymentFormProps {
  course: Course;
  onPurchaseSuccess?: () => void;
  onClose?: () => void;
}

// Mock data and configurations
const CURRENCIES = {
  GBP: { name: 'British Pound', symbol: '£', gateway: 'stripe' },
  USD: { name: 'US Dollar', symbol: '$', gateway: 'stripe' },
  EUR: { name: 'Euro', symbol: '€', gateway: 'stripe' },
  NGN: { name: 'Nigerian Naira', symbol: '₦', gateway: 'paystack' },
  GHS: { name: 'Ghanaian Cedi', symbol: '₵', gateway: 'paystack' },
  KES: { name: 'Kenyan Shilling', symbol: 'KSh', gateway: 'flutterwave' },
  ZAR: { name: 'South African Rand', symbol: 'R', gateway: 'flutterwave' }
};

const PAYMENT_GATEWAYS = {
  stripe: { name: 'Stripe', supportedMethods: ['card', 'paypal', 'apple_pay', 'google_pay'] },
  paystack: { name: 'Paystack', supportedMethods: ['card', 'bank_transfer', 'mobile_money'] },
  flutterwave: { name: 'Flutterwave', supportedMethods: ['card', 'bank_transfer', 'mobile_money'] }
};

const PRICING_STRATEGIES = {
  africa: {
    name: 'Africa Regional Pricing',
    countries: ['NG', 'GH', 'KE', 'ZA', 'EG', 'MA', 'TN'],
    multiplier: 0.7
  },
  asia: {
    name: 'Asia Regional Pricing',
    countries: ['IN', 'PK', 'BD', 'LK', 'NP', 'MM', 'KH'],
    multiplier: 0.6
  },
  europe: {
    name: 'Europe Standard Pricing',
    countries: ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE'],
    multiplier: 1.0
  }
};

const formatPrice = (price: number, currency: string) => {
  const config = CURRENCIES[currency as keyof typeof CURRENCIES];
  if (!config) return `£${price.toFixed(2)}`;
  
  return `${config.symbol}${price.toFixed(2)}`;
};

const getLocalizedPrice = (basePrice: number, countryCode: string) => {
  const strategy = Object.values(PRICING_STRATEGIES).find(s => 
    s.countries.includes(countryCode)
  );
  
  if (strategy) {
    return basePrice * strategy.multiplier;
  }
  
  return basePrice;
};

const getGatewayForCurrency = (currency: string) => {
  const config = CURRENCIES[currency as keyof typeof CURRENCIES];
  return config ? config.gateway : 'stripe';
};

const getSupportedPaymentMethods = (countryCode: string) => {
  // Mock implementation - in real app, this would be based on country/currency
  return ['card', 'paypal', 'apple_pay', 'google_pay'];
};

const getUserLocationWithFallback = async (): Promise<UserLocation> => {
  // Mock implementation - in real app, this would use geolocation API
  return {
    country: 'United Kingdom',
    countryCode: 'GB',
    currencyCode: 'GBP',
    currencySymbol: '£'
  };
};

const courseService = {
  processPurchase: async (courseId: string, student: any, payment: any) => {
    // Mock implementation - in real app, this would call the backend
    console.log('Processing purchase:', { courseId, student, payment });
    return { success: true, transactionId: 'txn_' + Date.now() };
  }
};

const InternationalPaymentForm: React.FC<InternationalPaymentFormProps> = ({
  course,
  onPurchaseSuccess,
  onClose
}) => {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('GBP');
  const [localizedPrice, setLocalizedPrice] = useState<number>(course.price);
  const [paymentGateway, setPaymentGateway] = useState<string>('stripe');
  const [email, setEmail] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const location = await getUserLocationWithFallback();
        setUserLocation(location);
        
        // Set currency based on location
        const currency = location.currencyCode;
        if (CURRENCIES[currency as keyof typeof CURRENCIES]) {
          setSelectedCurrency(currency);
          const price = getLocalizedPrice(course.price, location.countryCode);
          setLocalizedPrice(price);
          setPaymentGateway(getGatewayForCurrency(currency));
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
        // Default to GBP
        setSelectedCurrency('GBP');
        setLocalizedPrice(course.price);
        setPaymentGateway('stripe');
      }
    };

    detectLocation();
  }, [course.price]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    const price = getLocalizedPrice(course.price, userLocation?.countryCode || 'GB');
    setLocalizedPrice(price);
    setPaymentGateway(getGatewayForCurrency(currency));
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'OPONMETA2025') {
      setCouponApplied(true);
      toast.success('Coupon applied! Your course is now free!');
    } else {
      setCouponError('Invalid coupon code. Please try again.');
      setCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
    toast.info('Coupon removed');
  };

  const handlePaymentSuccess = async (paymentResult: any) => {
    try {
      // Process the purchase
      const sale = await courseService.processPurchase(
        course.id,
        {
          id: 'student-' + Date.now(),
          name: paymentResult.customer?.name || 'Student',
          email: email,
        },
        {
          amount: couponApplied ? 0 : localizedPrice,
          currency: selectedCurrency,
          paymentMethod: couponApplied ? 'coupon' : paymentGateway,
          transactionId: paymentResult.transactionId || paymentResult.id,
        }
      );

      toast.success('Course purchased successfully! You can now access your course.');
      onPurchaseSuccess?.();
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Purchase failed. Please try again.');
    }
  };

  const handlePaymentError = (error: string) => {
    toast.error(error);
  };

  const getPricingStrategy = () => {
    if (!userLocation) return null;
    
    return Object.values(PRICING_STRATEGIES).find(s => 
      s.countries.includes(userLocation.countryCode)
    );
  };

  const pricingStrategy = getPricingStrategy();
  const currencyConfig = CURRENCIES[selectedCurrency as keyof typeof CURRENCIES];
  const gatewayConfig = PAYMENT_GATEWAYS[paymentGateway as keyof typeof PAYMENT_GATEWAYS];
  const finalPrice = couponApplied ? 0 : localizedPrice;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Complete Your Purchase</h2>
              <p className="text-gray-300">Secure payment processing for global markets</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-800">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Course Summary */}
            <div>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Course Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Course Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {course.title.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{course.title}</h3>
                      <p className="text-sm text-gray-300">Current User</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Original Price:</span>
                      <span className="line-through text-gray-400">{formatPrice(course.price, 'GBP')}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Coupon Discount:</span>
                        <Badge variant="destructive" className="bg-red-600 text-white">
                          -100%
                        </Badge>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total:</span>
                      <span className="text-2xl font-bold text-green-400">
                        {formatPrice(finalPrice, selectedCurrency)}
                      </span>
                    </div>
                    
                    {/* Pricing Strategy Badge */}
                    {pricingStrategy && (
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="w-4 h-4 text-green-600" />
                        <Badge variant="secondary" className="text-green-700 bg-green-50">
                          {pricingStrategy.multiplier < 1 ? 
                            `${Math.round((1 - pricingStrategy.multiplier) * 100)}% Regional Discount` : 
                            'Standard Pricing'
                          }
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Course Attributes */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{course.students} students enrolled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{course.rating} rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Certificate of completion</span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-semibold text-white mb-3">What's Included</h4>
                    <div className="space-y-2">
                      {[
                        'Lifetime access to course content',
                        `${course.lessons} lessons with video content`,
                        'Downloadable resources and materials',
                        'Mobile and desktop access',
                        'Certificate of completion',
                        '30-day money-back guarantee'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Payment Information */}
            <div>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location Detection */}
                  {userLocation && (
                    <div className="flex items-center space-x-2 p-3 bg-blue-900 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-200">
                        Detected location: {userLocation.country} ({userLocation.currencyCode})
                      </span>
                    </div>
                  )}

                  {/* Currency Selection */}
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Currency & Payment Gateway
                    </label>
                    <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {Object.entries(CURRENCIES).map(([code, config]) => (
                          <SelectItem key={code} value={code} className="text-white hover:bg-gray-700">
                            <div className="flex items-center space-x-2">
                              <span>{config.symbol}</span>
                              <span>{config.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {PAYMENT_GATEWAYS[config.gateway as keyof typeof PAYMENT_GATEWAYS].name}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="text-sm font-medium text-white">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-300 mt-1">
                      We'll send your receipt and course access to this email
                    </p>
                  </div>

                  {/* Coupon Code Section */}
                  <div>
                    <label className="text-sm font-medium text-white">Have a coupon code?</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        disabled={couponApplied}
                      />
                      {couponApplied ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="text-red-400 border-red-400 hover:bg-red-900"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim()}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-400 mt-1">{couponError}</p>
                    )}
                    {couponApplied && (
                      <div className="flex items-center gap-2 text-sm text-green-400 mt-1">
                        <CheckCircle className="w-4 h-4" />
                        Coupon applied! Course is now free.
                      </div>
                    )}
                  </div>

                  {/* Payment Gateway Info */}
                  <div className="p-4 border border-gray-600 rounded-lg bg-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{gatewayConfig?.name} Payment</h4>
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {gatewayConfig?.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {gatewayConfig?.name} provides secure payment processing for {currencyConfig?.name}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {getSupportedPaymentMethods(userLocation?.countryCode || 'GB').map((method) => (
                        <Badge key={method} variant="secondary" className="text-xs bg-gray-600 text-white">
                          {method.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Payment Form Placeholder */}
                  {showPaymentForm && email && (
                    <div className="border-t pt-4">
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Payment Processing</h4>
                        <p className="text-sm text-gray-300 mb-4">
                          Payment form would be integrated here for {gatewayConfig?.name}
                        </p>
                        <Button
                          onClick={() => handlePaymentSuccess({ id: 'mock_payment_' + Date.now() })}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Complete Mock Payment
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Continue Button */}
                  {!showPaymentForm && (
                    <Button
                      onClick={() => setShowPaymentForm(true)}
                      disabled={!email}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Continue to Payment - {formatPrice(localizedPrice, selectedCurrency)}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </Button>
                  )}

                  {/* Security Notice */}
                  <div className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                    <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Secure Payment</h4>
                      <p className="text-sm text-gray-300">
                        Your payment information is encrypted and secure. 
                        Powered by {gatewayConfig?.name} - PCI DSS compliant.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalPaymentForm; 