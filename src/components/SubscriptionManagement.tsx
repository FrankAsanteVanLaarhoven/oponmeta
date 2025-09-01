import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CreditCard, 
  Bot, 
  BookOpen, 
  BarChart3, 
  HeadphonesIcon,
  Settings,
  Calendar,
  DollarSign,
  Shield,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const SubscriptionManagement = () => {
  const [isLoading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    name: 'AI Learning Companion Pro',
    price: 9.99,
    period: 'monthly',
    status: 'active',
    nextBilling: '2025-01-15',
    features: ['AI Learning Companions', 'Premium Course Access', 'Advanced Analytics', 'Priority Support']
  });

  const benefits = [
    'AI Learning Companions',
    'Premium Course Access', 
    'Advanced Analytics',
    'Priority Support'
  ];

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Redirecting to subscription management portal...');
    } catch (error) {
      toast.error('Failed to access subscription management. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = () => {
    toast.info('Cancellation feature would be implemented here');
  };

  const handleUpgradePlan = () => {
    toast.info('Plan upgrade feature would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
        </div>

        {/* Description */}
        <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
          Upgrade your learning experience with AI companions, premium features, and advanced analytics. 
          Manage your subscription with ease.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Current Plan Details */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{currentPlan.name}</h3>
                  <p className="text-gray-400">${currentPlan.price}/{currentPlan.period}</p>
                </div>
                <Badge className="bg-green-600 text-white">
                  {currentPlan.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Next billing date:</span>
                  <span>{new Date(currentPlan.nextBilling).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Billing cycle:</span>
                  <span className="capitalize">{currentPlan.period}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <h4 className="font-semibold mb-3">Plan Features:</h4>
                <div className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits List */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Your Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleManageSubscription}
            disabled={isLoading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 text-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Manage Subscription
              </div>
            )}
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={handleUpgradePlan}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancelSubscription}
              className="border-red-600 text-red-400 hover:bg-red-900/20"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Cancel Subscription
            </Button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Secure Billing</h3>
              <p className="text-sm text-gray-400">
                Your payment information is encrypted and secure
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Flexible Plans</h3>
              <p className="text-sm text-gray-400">
                Change or cancel your plan at any time
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <HeadphonesIcon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-400">
                Get help whenever you need it
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Statistics */}
        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Usage This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">47</div>
                <div className="text-sm text-gray-400">AI Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">12</div>
                <div className="text-sm text-gray-400">Courses Accessed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">8.5h</div>
                <div className="text-sm text-gray-400">Learning Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">92%</div>
                <div className="text-sm text-gray-400">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
