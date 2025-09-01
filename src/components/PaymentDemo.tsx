import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Users, Star, Play } from 'lucide-react';
import InternationalPaymentForm from './InternationalPaymentForm';

const PaymentDemo = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const sampleCourse = {
    id: 'web-dev-bootcamp',
    title: 'Complete Web Development Bootcamp',
    price: 149.00,
    description: 'Master web development from beginner to advanced with hands-on projects',
    duration: '40-50 hours',
    lessons: 25,
    students: 15420,
    rating: 4.8,
    instructor: 'Dr. Angela Yu',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    category: 'Programming',
    level: 'Beginner to Advanced'
  };

  const handlePurchaseSuccess = () => {
    setShowPaymentForm(false);
    // In a real app, you would redirect to the course or show success message
    console.log('Purchase successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">International Payment Demo</h1>
          <p className="text-lg text-gray-600">
            Experience our global payment processing with automatic currency detection and regional pricing
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative">
              <img 
                src={sampleCourse.image} 
                alt={sampleCourse.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600 text-white">{sampleCourse.category}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-white text-gray-900 border-gray-300">
                  {sampleCourse.level}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{sampleCourse.title}</h2>
              <p className="text-gray-600 mb-4">{sampleCourse.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {sampleCourse.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  {sampleCourse.lessons} lessons
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {sampleCourse.students.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {sampleCourse.rating}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">by {sampleCourse.instructor}</div>
                <div className="text-2xl font-bold text-green-600">
                  £{sampleCourse.price.toFixed(2)}
                </div>
              </div>
              
              <Button 
                onClick={() => setShowPaymentForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                Purchase Course
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Global Payment Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatic Currency Detection</h3>
                <p className="text-gray-600 text-sm">
                  Automatically detects user location and suggests appropriate currency and payment methods
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Regional Pricing</h3>
                <p className="text-gray-600 text-sm">
                  Intelligent pricing strategies based on regional purchasing power and market conditions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Multiple Payment Gateways</h3>
                <p className="text-gray-600 text-sm">
                  Support for Stripe, Paystack, Flutterwave and other regional payment processors
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <InternationalPaymentForm
          course={sampleCourse}
          onPurchaseSuccess={handlePurchaseSuccess}
          onClose={() => setShowPaymentForm(false)}
        />
      )}
    </div>
  );
};

export default PaymentDemo;
