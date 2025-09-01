import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Star, 
  Check, 
  X, 
  Zap, 
  Shield, 
  Download, 
  Video, 
  BookOpen, 
  Users,
  MessageCircle,
  Award,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  ArrowRight,
  Play,
  Lock,
  Unlock,
  Gift,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  excludedFeatures?: string[];
  popular?: boolean;
  color: string;
  icon: any;
}

const GetPremium: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      period: 'month',
      features: [
        'Access to 100+ courses',
        'Basic course certificates',
        'Community forum access',
        'Email support',
        'Mobile app access',
        'Progress tracking'
      ],
      excludedFeatures: [
        'Live instructor sessions',
        'Advanced certificates',
        'Priority support',
        'Offline downloads',
        'AI-powered learning',
        'Career coaching'
      ],
      color: 'from-blue-500 to-blue-600',
      icon: BookOpen
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      originalPrice: 29.99,
      period: 'month',
      features: [
        'Everything in Basic',
        'Access to 500+ courses',
        'Live instructor sessions',
        'Advanced certificates',
        'Priority support',
        'Offline downloads',
        'AI-powered learning',
        'Progress analytics'
      ],
      excludedFeatures: [
        'Career coaching',
        'Personal mentor',
        'Custom learning paths',
        'Enterprise features'
      ],
      popular: true,
      color: 'from-purple-500 to-purple-600',
      icon: Crown
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Unlimited course access',
        'Personal career coach',
        'Custom learning paths',
        'Enterprise integrations',
        'Team management',
        'Advanced analytics',
        'Dedicated support'
      ],
      color: 'from-yellow-500 to-yellow-600',
      icon: Star
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Accelerated Learning',
      description: 'Learn 3x faster with AI-powered personalized learning paths'
    },
    {
      icon: Shield,
      title: 'Verified Certificates',
      description: 'Industry-recognized certificates that boost your career'
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with industry experts and like-minded learners'
    },
    {
      icon: Globe,
      title: 'Global Recognition',
      description: 'Certificates recognized by employers worldwide'
    },
    {
      icon: Smartphone,
      title: 'Learn Anywhere',
      description: 'Access courses on any device, anytime, anywhere'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your progress and advance your career goals'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      company: 'TechCorp',
      content: 'OponMeta Premium transformed my career. The AI-powered learning helped me master digital marketing in just 3 months!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Software Developer',
      company: 'InnovateTech',
      content: 'The live sessions with industry experts and personalized learning paths made all the difference in my skill development.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      company: 'DataFlow Inc',
      content: 'Premium features like offline downloads and career coaching helped me balance learning with my busy schedule.',
      rating: 5
    }
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would typically redirect to payment processing
    alert(`Redirecting to payment for ${planId} plan...`);
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.8); // 20% discount
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1834] via-[#11204a] to-[#16203a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Unlock Your Full Potential
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto mb-8">
              Join thousands of learners who have accelerated their careers with OponMeta Premium. 
              Get unlimited access to expert-led courses, AI-powered learning, and career coaching.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingPeriod === 'yearly' ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
                Yearly
                <span className="ml-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Save 20%
                </span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const displayPrice = billingPeriod === 'yearly' ? getYearlyPrice(plan.price) : plan.price;
            const displayPeriod = billingPeriod === 'yearly' ? 'year' : plan.period;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-yellow-400 shadow-2xl shadow-yellow-400/20' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">${displayPrice}</span>
                    <span className="text-yellow-400">/{displayPeriod}</span>
                  </div>
                  {plan.originalPrice && billingPeriod === 'yearly' && (
                    <p className="text-gray-400 line-through">
                      ${plan.originalPrice * 12}/year
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-white font-semibold mb-3">What's included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-yellow-400 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.excludedFeatures && (
                    <>
                      <h4 className="text-white font-semibold mb-3 mt-6">Not included:</h4>
                      {plan.excludedFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <X className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {plan.popular ? 'Get Started Now' : 'Choose Plan'}
                  <ArrowRight className="h-4 w-4 ml-2 inline" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Premium?</h2>
            <p className="text-xl text-yellow-400">
              Experience the difference with our advanced learning features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <Icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-yellow-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Premium Members Say</h2>
            <p className="text-xl text-yellow-400">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-yellow-400 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-gray-800 text-xl mb-8">
              Start your premium journey today and unlock unlimited learning potential
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleSubscribe('pro')}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetPremium;
