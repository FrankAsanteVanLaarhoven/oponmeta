import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  X
} from 'lucide-react';
import { coursesData, Course } from '../data/coursesData';

const CoursePurchase: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    agreeToTerms: false,
  });
  const [purchaseStep, setPurchaseStep] = useState<'details' | 'payment' | 'success'>('details');

  useEffect(() => {
    if (courseId) {
      const foundCourse = coursesData.find(c => c.id === parseInt(courseId));
      setCourse(foundCourse || null);
      setLoading(false);
    }
  }, [courseId]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'OPONMETA2025') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Please try again.');
      setCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePurchase = async () => {
    if (!course) return;
    
    // Simulate payment processing
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful purchase
    setPurchaseStep('success');
    setLoading(false);
    
    // Store enrollment in localStorage for demo purposes
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    enrollments.push({
      courseId: course.id,
      courseTitle: course.title,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      status: 'enrolled'
    });
    localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));
  };

  const handleContinueLearning = () => {
    navigate(`/student-portal`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a174e] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/programme')}
            className="px-6 py-3 bg-[#0a174e] text-white font-semibold rounded-lg hover:bg-[#1a2a6b] transition-colors"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  if (purchaseStep === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#0a174e] mb-4">Enrollment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Congratulations! You're now enrolled in <strong>{course.title}</strong>. 
            You can start learning immediately.
          </p>
          <button
            onClick={handleContinueLearning}
            className="w-full bg-[#FFD700] text-[#0a174e] font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors mb-4"
          >
            Continue to Learning Portal
          </button>
          <button
            onClick={() => navigate('/programme')}
            className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Browse More Courses
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-[#0a174e] hover:text-[#FFD700] transition-colors mb-4"
          >
            <X className="w-5 h-5 mr-2" />
            Back to Course
          </button>
          <h1 className="text-3xl font-bold text-[#0a174e]">Complete Your Enrollment</h1>
          <p className="text-gray-600 mt-2">You're just a few steps away from accessing your course</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Summary */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#0a174e] mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-3">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold text-[#0a174e] mb-6">Payment Information</h3>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#0a174e] bg-[#0a174e] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    Credit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-[#0a174e] bg-[#0a174e] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .825-.352 1.335-.844 1.65-.492.315-1.18.315-1.672 0-.492-.315-.844-.825-.844-1.65 0-.653.352-1.163.844-1.478.492-.315 1.18-.315 1.672 0zm-8.478 0c.492.315.844.825.844 1.478 0 .825-.352 1.335-.844 1.65-.492.315-1.18.315-1.672 0-.492-.315-.844-.825-.844-1.65 0-.653.352-1.163.844-1.478.492-.315 1.18-.315 1.672 0z"/>
                    </svg>
                    PayPal
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a174e] focus:border-transparent"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a174e] focus:border-transparent"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a174e] focus:border-transparent"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a174e] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a174e] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .825-.352 1.335-.844 1.65-.492.315-1.18.315-1.672 0-.492-.315-.844-.825-.844-1.65 0-.653.352-1.163.844-1.478.492-.315 1.18-.315 1.672 0zm-8.478 0c.492.315.844.825.844 1.478 0 .825-.352 1.335-.844 1.65-.492.315-1.18.315-1.672 0-.492-.315-.844-.825-.844-1.65 0-.653.352-1.163.844-1.478.492-.315 1.18-.315 1.672 0z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600">You will be redirected to PayPal to complete your payment.</p>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="mt-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#0a174e] border-gray-300 rounded focus:ring-[#0a174e] focus:ring-2"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-[#0a174e] hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-[#0a174e] hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={!formData.agreeToTerms || loading}
                className="w-full bg-[#FFD700] text-[#0a174e] font-bold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0a174e]"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Complete Enrollment - ${couponApplied ? 'FREE' : course.price}
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 sticky top-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Price</span>
                  <span className="font-medium">${course.price}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-${course.price}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-[#0a174e]">
                      ${couponApplied ? '0' : course.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a174e] focus:border-transparent"
                  />
                  {couponApplied ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      className="px-3 py-2 bg-[#0a174e] text-white rounded-lg hover:bg-[#1a2a6b] transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {couponError && (
                  <p className="text-red-500 text-sm mt-1">{couponError}</p>
                )}
                {couponApplied && (
                  <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>
                )}
              </div>

              {/* Security Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-gray-500">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePurchase; 