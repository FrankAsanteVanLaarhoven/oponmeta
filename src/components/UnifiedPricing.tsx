import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Check, 
  X, 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Zap, 
  Shield, 
  Headphones, 
  Globe, 
  Target, 
  TrendingUp,
  ArrowRight,
  Crown,
  Rocket,
  Heart,
  Sparkles
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  period: string;
  currency: string;
  features: string[];
  limitations?: string[];
  highlight: boolean;
  popular?: boolean;
  cta: string;
  ctaVariant: 'default' | 'outline' | 'secondary';
  icon: React.ReactNode;
  color: string;
  badge?: string;
  targetAudience: string;
  benefits: string[];
  included: {
    courses: string;
    support: string;
    certificates: boolean;
    mentorship: string;
    analytics: boolean;
    customization: boolean;
  };
}

interface UnifiedPricingProps {
  mode?: 'landing' | 'dashboard' | 'checkout';
  showTitle?: boolean;
  showDescription?: boolean;
  onPlanSelect?: (plan: PricingPlan) => void;
  selectedPlan?: string;
  className?: string;
}

const UnifiedPricing: React.FC<UnifiedPricingProps> = ({
  mode = 'landing',
  showTitle = true,
  showDescription = true,
  onPlanSelect,
  selectedPlan,
  className = ''
}) => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individual learners getting started',
      price: 'Free',
      period: 'forever',
      currency: 'USD',
      features: [
        'Access to selected digital courses',
        'Community forum participation',
        'Monthly newsletter and event invites',
        'Basic progress tracking',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 3 courses per month',
        'No certificates',
        'Community support only'
      ],
      highlight: false,
      cta: 'Get Started Free',
      ctaVariant: 'outline',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'blue',
      targetAudience: 'Individual learners',
      benefits: ['No commitment', 'Full community access', 'Mobile learning'],
      included: {
        courses: 'Limited selection',
        support: 'Community only',
        certificates: false,
        mentorship: 'None',
        analytics: false,
        customization: false
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For serious learners who want comprehensive access',
      price: billingPeriod === 'yearly' ? '$15' : '$19',
      originalPrice: billingPeriod === 'yearly' ? '$19' : undefined,
      period: billingPeriod === 'yearly' ? 'year' : 'month',
      currency: 'USD',
      features: [
        'Full access to all learning modules',
        'Live and recorded workshops',
        'Mentorship programme access',
        'Course completion certificates',
        'Advanced progress tracking',
        'Priority email support',
        'Downloadable resources',
        'Offline learning mode'
      ],
      highlight: false,
      popular: true,
      cta: 'Start Professional',
      ctaVariant: 'default',
      icon: <Award className="w-6 h-6" />,
      color: 'green',
      badge: 'Most Popular',
      targetAudience: 'Professional learners',
      benefits: ['Unlimited courses', 'Live workshops', 'Certificates', 'Mentorship'],
      included: {
        courses: 'All courses',
        support: 'Priority email',
        certificates: true,
        mentorship: 'Group sessions',
        analytics: true,
        customization: false
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For learners who want personalized guidance and exclusive content',
      price: billingPeriod === 'yearly' ? '$31' : '$39',
      originalPrice: billingPeriod === 'yearly' ? '$39' : undefined,
      period: billingPeriod === 'yearly' ? 'year' : 'month',
      currency: 'USD',
      features: [
        'Everything in Professional',
        '1-on-1 mentorship sessions',
        'Personalised learning path',
        'Career coaching and resume reviews',
        'Exclusive partner opportunities',
        'Advanced analytics dashboard',
        'Custom learning goals',
        '24/7 priority support',
        'Exclusive webinars',
        'Early access to new courses'
      ],
      highlight: true,
      cta: 'Go Premium',
      ctaVariant: 'default',
      icon: <Crown className="w-6 h-6" />,
      color: 'purple',
      badge: 'Best Value',
      targetAudience: 'Career-focused learners',
      benefits: ['1-on-1 mentorship', 'Career coaching', 'Exclusive content', '24/7 support'],
      included: {
        courses: 'All + exclusive',
        support: '24/7 priority',
        certificates: true,
        mentorship: '1-on-1 sessions',
        analytics: true,
        customization: true
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations looking for comprehensive training solutions',
      price: 'Custom',
      period: 'contact',
      currency: 'USD',
      features: [
        'Everything in Premium',
        'Team onboarding and admin dashboard',
        'Progress tracking and analytics',
        'Custom workshops and branded content',
        'Dedicated account manager',
        'SSO integration',
        'Custom learning paths',
        'Bulk user management',
        'API access',
        'White-label options',
        'Custom reporting',
        'Training compliance tracking'
      ],
      highlight: false,
      cta: 'Contact Sales',
      ctaVariant: 'outline',
      icon: <Rocket className="w-6 h-6" />,
      color: 'orange',
      targetAudience: 'Teams and organisations',
      benefits: ['Team management', 'Custom content', 'Dedicated support', 'Enterprise features'],
      included: {
        courses: 'All + custom',
        support: 'Dedicated manager',
        certificates: true,
        mentorship: 'Team sessions',
        analytics: true,
        customization: true
      }
    }
  ];

  const handlePlanSelect = (plan: PricingPlan) => {
    if (onPlanSelect) {
      onPlanSelect(plan);
    } else {
      // Default navigation behavior
      if (plan.id === 'enterprise') {
        navigate('/contact');
      } else {
        navigate('/signup', { state: { selectedPlan: plan.id } });
      }
    }
  };

  const getColorClasses = (color: string, highlight: boolean) => {
    const colorMap = {
      blue: highlight ? 'border-blue-500 bg-blue-50' : 'border-gray-200',
      green: highlight ? 'border-green-500 bg-green-50' : 'border-gray-200',
      purple: highlight ? 'border-purple-500 bg-purple-50' : 'border-gray-200',
      orange: highlight ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'border-gray-200';
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-gray-600';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      {showTitle && (
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {mode === 'landing' ? 'Flexible Pricing for Every Learner' : 'Choose Your Plan'}
          </motion.h2>
          {showDescription && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {mode === 'landing' 
                ? 'Start learning today with our flexible pricing options. Upgrade or downgrade at any time.'
                : 'Select the plan that best fits your learning goals and budget.'
              }
            </motion.p>
          )}
        </div>
      )}

      {/* Billing Toggle */}
      {mode === 'landing' && (
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 20%</Badge>
            </button>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={cardVariants}
            className={`relative ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
          >
            <Card className={`h-full transition-all duration-300 hover:shadow-lg ${getColorClasses(plan.color, plan.highlight)}`}>
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4 ${getIconColor(plan.color)}`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">{plan.originalPrice}</span>
                    )}
                    {plan.period !== 'forever' && plan.period !== 'contact' && (
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && plan.originalPrice && (
                    <p className="text-sm text-green-600 mt-1">Save 20% with yearly billing</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations */}
                {plan.limitations && plan.limitations.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start">
                        <X className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanSelect(plan)}
                  variant={plan.ctaVariant}
                  className={`w-full ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                      : ''
                  }`}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Target Audience */}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Perfect for {plan.targetAudience}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Information */}
      {mode === 'landing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Plans Include</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-500 mr-2" />
                <span>Access from anywhere</span>
              </div>
              <div className="flex items-center justify-center">
                <Headphones className="w-5 h-5 text-purple-500 mr-2" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* FAQ Section for Landing Mode */}
      {mode === 'landing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h4>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">All paid plans come with a 30-day money-back guarantee. No questions asked.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer student discounts?</h4>
              <p className="text-gray-600 text-sm">Yes, we offer 50% off for students with valid student ID. Contact support for details.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UnifiedPricing;
