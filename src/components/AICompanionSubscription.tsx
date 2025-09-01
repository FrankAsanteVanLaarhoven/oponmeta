import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Crown, 
  Star, 
  Mic, 
  Brain, 
  Globe, 
  Clock, 
  Shield, 
  Zap, 
  CheckCircle, 
  Lock,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const AICompanionSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setLoading] = useState(false);

  const features = [
    {
      icon: Mic,
      title: 'Voice-Driven Learning',
      description: 'Real-time voice interactions with AI companions.'
    },
    {
      icon: Brain,
      title: 'Personalised Paths',
      description: 'AI adapts to your learning style and pace.'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Learn in 10+ languages with native speakers.'
    },
    {
      icon: Clock,
      title: 'Progress Tracking',
      description: 'Detailed analytics and session history.'
    },
    {
      icon: Shield,
      title: 'Unlimited Sessions',
      description: 'No limits on learning time or sessions.'
    },
    {
      icon: Zap,
      title: 'Advanced AI Features',
      description: 'Latest AI models for optimal learning.'
    }
  ];

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 9.99,
      period: 'per month',
      selected: selectedPlan === 'monthly',
      popular: false
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 99.99,
      period: 'per year',
      selected: selectedPlan === 'yearly',
      popular: true,
      savings: 17
    }
  ];

  const handlePlanSelect = (planId: 'monthly' | 'yearly') => {
    setSelectedPlan(planId);
    toast.success(`${planId === 'monthly' ? 'Monthly' : 'Yearly'} plan selected!`);
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Subscription activated! Welcome to AI Learning Companion!');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold">Unlock Your AI Learning Companion</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience personalised, voice-driven learning with AI companions that adapt to your pace and style. 
            Join thousands of learners worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Section - What You'll Get */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">What You'll Get</h2>
            </div>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-blue-800 border-blue-700 hover:bg-blue-750 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-blue-200" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-blue-200">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Section - Choose Your Plan */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Choose Your Plan</h2>
            
            <div className="space-y-4 mb-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    plan.selected 
                      ? 'bg-blue-800 border-blue-500 ring-2 ring-blue-500' 
                      : 'bg-blue-800 border-blue-700 hover:bg-blue-750'
                  }`}
                  onClick={() => handlePlanSelect(plan.id as 'monthly' | 'yearly')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          plan.selected 
                            ? 'border-green-400 bg-green-400' 
                            : 'border-blue-300'
                        }`}>
                          {plan.selected && <CheckCircle className="w-4 h-4 text-blue-900" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{plan.name}</h3>
                            {plan.popular && (
                              <Badge className="bg-blue-600 text-white text-xs">
                                Most Popular
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold">${plan.price}</span>
                            <span className="text-blue-200">{plan.period}</span>
                            {plan.savings && (
                              <Badge className="bg-green-600 text-white text-xs">
                                Save {plan.savings}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {plan.selected && (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <Button 
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold mb-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Start Learning with AI Companion
                </div>
              )}
            </Button>

            <p className="text-center text-blue-200 text-sm mb-8">
              Cancel anytime. No commitment required.
            </p>

            {/* Customer Reviews */}
            <Card className="bg-blue-800 border-blue-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 from 2,847 reviews</span>
                </div>
                <blockquote className="text-blue-100 italic">
                  "The AI companion has transformed how I learn. It's like having a personal tutor available 24/7!"
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Guarantees */}
        <div className="mt-12 pt-8 border-t border-blue-700">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-300" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanionSubscription;
