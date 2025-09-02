import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  BookOpen,
  Crown,
  Gift,
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Heart,
  Sparkles,
  Download,
  Video,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Lock,
  Unlock,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Minus
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  description: string;
  savings?: string;
}

const SubscriptionPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'monthly',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-gray-400 to-gray-600',
      description: 'Perfect for getting started',
      features: [
        'Access to 5 courses per month',
        'Basic learning tools',
        'Community forum access',
        'Email support',
        'Mobile app access',
        'Course certificates'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 19.99 : 199.99,
      originalPrice: billingPeriod === 'monthly' ? 29.99 : 359.99,
      period: billingPeriod,
      icon: <Crown className="w-8 h-8" />,
      color: 'from-yellow-400 to-yellow-600',
      description: 'Most popular choice',
      popular: true,
      savings: billingPeriod === 'yearly' ? 'Save 33%' : undefined,
      features: [
        'Unlimited course access',
        'Priority support',
        'Advanced analytics',
        'Download courses offline',
        'Exclusive content',
        'Live webinars',
        'Personal learning path',
        'Progress tracking',
        'Certificate verification',
        'AI-powered recommendations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 49.99 : 499.99,
      originalPrice: billingPeriod === 'monthly' ? 79.99 : 899.99,
      period: billingPeriod,
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-700',
      description: 'For teams and organizations',
      savings: billingPeriod === 'yearly' ? 'Save 38%' : undefined,
      features: [
        'Everything in Pro',
        'Team management',
        'Custom branding',
        'API access',
        'Advanced reporting',
        'Dedicated support',
        'Custom integrations',
        'White-label options',
        'Bulk user management',
        'Compliance features',
        'SSO integration',
        'Advanced security'
      ]
    }
  ];

  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Unlimited Learning',
      description: 'Access thousands of courses across all categories'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and thought leaders'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Certified Courses',
      description: 'Earn recognized certificates to boost your career'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Community',
      description: 'Connect with learners from around the world'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Learning',
                      description: 'Personalised recommendations and adaptive learning'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      company: 'TechCorp',
      rating: 5,
      text: 'The Pro subscription transformed my learning experience. The unlimited access and AI recommendations helped me advance my career significantly.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Manager',
      company: 'GrowthCo',
      rating: 5,
      text: 'The Enterprise plan is perfect for our team. The analytics and team management features have improved our training ROI by 40%.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'DesignStudio',
      rating: 5,
                      text: 'I love the personalised learning paths and offline access. It fits perfectly with my busy schedule.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId !== 'free') {
      setShowPaymentModal(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <CreditCard className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Choose Your Plan
            </h1>
          </div>
          <p className="text-xl text-yellow-400 max-w-3xl mx-auto">
            Unlock your full learning potential with our flexible subscription plans. 
            Start free and upgrade anytime to access premium features and unlimited content.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-yellow-400/30">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  billingPeriod === 'monthly'
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 relative ${
                  billingPeriod === 'yearly'
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Yearly
                {billingPeriod === 'yearly' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Save
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-yellow-400 shadow-2xl shadow-yellow-400/20'
                  : 'border-white/20 hover:border-yellow-400/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.savings && (
                <div className="absolute -top-2 -right-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {plan.savings}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-yellow-400 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <div className="text-3xl font-bold text-white">Free</div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-white">
                          {formatPrice(plan.price)}
                        </span>
                        {plan.originalPrice && (
                          <span className="text-xl text-gray-400 line-through">
                            {formatPrice(plan.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="text-yellow-400">
                        per {billingPeriod === 'monthly' ? 'month' : 'year'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                  plan.popular
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg'
                    : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-yellow-400'
                }`}
              >
                {plan.price === 0 ? 'Get Started Free' : 'Choose Plan'}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose OponMeta?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-yellow-400">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-yellow-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Our Subscribers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-yellow-400 text-sm">{testimonial.role}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 30-day money-back guarantee for all paid subscriptions. If you\'re not satisfied, contact our support team.'
              },
              {
                question: 'Can I switch between plans?',
                answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes will be prorated based on your current billing cycle.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes! You can start with our free plan and upgrade anytime. We also offer a 7-day free trial for Pro and Enterprise plans.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-yellow-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-800 text-lg mb-6">
              Join thousands of learners who are already advancing their careers with OponMeta.
            </p>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-gray-900 text-yellow-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:text-yellow-300 transition-colors duration-200 flex items-center mx-auto border-2 border-yellow-400/50 hover:border-yellow-400 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Complete Your Subscription</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                You're about to subscribe to the <strong>{plans.find(p => p.id === selectedPlan)?.name}</strong> plan.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Plan:</span>
                  <span className="font-semibold">{plans.find(p => p.id === selectedPlan)?.name}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700">Billing:</span>
                  <span className="font-semibold capitalize">{billingPeriod}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700">Price:</span>
                  <span className="font-semibold text-lg">
                    {formatPrice(plans.find(p => p.id === selectedPlan)?.price || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Continue to Payment
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
