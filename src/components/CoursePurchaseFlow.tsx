import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CreditCard, 
  X, 
  CheckCircle, 
  Lock, 
  Shield, 
  Globe, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { createStripeCheckoutSession } from '../api/stripe';
import { toast } from 'sonner';

interface Course {
  id: string | number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  image: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  isFree?: boolean;
  category?: string;
  level?: string;
}

interface CoursePurchaseFlowProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (courseId: string | number) => void;
}

const CoursePurchaseFlow: React.FC<CoursePurchaseFlowProps> = ({
  course,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'stripe' | 'paystack' | 'mobile'>('stripe');

  const processingFee = 2.99;
  const totalAmount = course.isFree ? 0 : course.price + processingFee;

  const handleStripeCheckout = async () => {
    if (course.isFree) {
      // Handle free course enrolment
      setCurrentStep('processing');
      setTimeout(() => {
        setCurrentStep('success');
        toast.success(`${course.title} enrolled successfully!`);
        if (onSuccess) onSuccess(course.id);
      }, 2000);
      return;
    }

    setIsProcessing(true);
    setCurrentStep('processing');

    try {
      const result = await createStripeCheckoutSession({
        courseId: course.id.toString(),
        courseTitle: course.title,
        amount: totalAmount * 100, // Convert to cents
        currency: 'usd',
        successUrl: `${window.location.origin}/course-library?success=true&courseId=${course.id}`,
        cancelUrl: `${window.location.origin}/course-library?canceled=true`,
        metadata: {
          courseId: course.id.toString(),
          courseTitle: course.title,
          instructor: course.instructor,
          amount: totalAmount.toString()
        },
        customerEmail: '', // Will be collected by Stripe
        billingAddressCollection: 'required',
        allowPromotionCodes: true,
        phoneNumberCollection: true
      });

      if (result && result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create checkout session. Please try again.');
      setCurrentStep('details');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (currentStep === 'processing') return; // Prevent closing during processing
    setCurrentStep('details');
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Complete Purchase</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                disabled={currentStep === 'processing'}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {currentStep === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Course Details */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Instructor</p>
                  <p className="font-semibold text-blue-900">{course.instructor}</p>
                </div>

                {/* Pricing */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Course Price</span>
                      <span className="font-medium">
                        {course.isFree ? 'Free' : formatPrice(course.price)}
                      </span>
                    </div>
                    
                    {!course.isFree && (
                      <div className="flex justify-between text-sm">
                        <span>Processing Fee</span>
                        <span className="font-medium">{formatPrice(processingFee)}</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-600">
                          {course.isFree ? 'Free' : formatPrice(totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security & Trust */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-medium text-green-900">Secure Payment</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Lock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs font-medium text-blue-900">SSL Encrypted</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Globe className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs font-medium text-purple-900">Global Access</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleStripeCheckout}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {course.isFree ? 'Enrol Now (Free)' : 'Pay with Card'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Stripe Trust Badge */}
                {!course.isFree && (
                  <div className="text-center pt-4 border-t">
                    <p className="text-xs text-gray-500 mb-2">Powered by</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
                        Stripe
                      </div>
                      <span className="text-xs text-gray-500">Secure Payment Processing</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 'processing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.isFree ? 'Enrolling you in the course...' : 'Preparing your checkout...'}
                </h3>
                <p className="text-gray-600">
                  {course.isFree 
                    ? 'Please wait while we enrol you in the course.'
                    : 'Redirecting you to our secure payment processor...'
                  }
                </p>
                
                {!course.isFree && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <ExternalLink className="w-4 h-4 inline mr-2" />
                      You'll be redirected to Stripe's secure checkout page
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Enrolment Successful!
                </h3>
                <p className="text-gray-600 mb-6">
                  You're now enrolled in "{course.title}". Start learning right away!
                </p>
                
                <Button
                  onClick={handleClose}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Continue to Course
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CoursePurchaseFlow;
