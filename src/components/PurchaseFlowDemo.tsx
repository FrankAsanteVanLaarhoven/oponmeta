import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import CoursePurchaseFlow from './CoursePurchaseFlow';
import { 
  CreditCard, 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  ArrowRight,
  Shield,
  Lock,
  Globe,
  CheckCircle
} from 'lucide-react';

const PurchaseFlowDemo = () => {
  const [showPurchaseFlow, setShowPurchaseFlow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Demo course data
  const demoCourses = [
    {
      id: 1,
      title: "Advanced JavaScript Development",
      description: "Master modern JavaScript concepts, ES6+ features, async programming, and advanced frameworks. Perfect for developers looking to level up their JavaScript skills.",
      instructor: "Sarah Johnson",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      duration: "8 hours",
      lessons: 24,
      students: 15420,
      rating: 4.8,
      category: "Technology",
      level: "Advanced",
      isFree: false
    },
    {
      id: 2,
      title: "Digital Marketing Strategy",
      description: "Comprehensive digital marketing course covering SEO, social media, content marketing, and analytics. Learn to create effective marketing campaigns.",
      instructor: "Michael Chen",
      price: 0,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      duration: "6 hours",
      lessons: 18,
      students: 8920,
      rating: 4.7,
      category: "Marketing",
      level: "Intermediate",
      isFree: true
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Learn the principles of user interface and experience design. Master design thinking, wireframing, prototyping, and user research methodologies.",
      instructor: "Emma Davis",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      duration: "10 hours",
      lessons: 32,
      students: 12340,
      rating: 4.9,
      category: "Design",
      level: "Beginner",
      isFree: false
    }
  ];

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setShowPurchaseFlow(true);
  };

  const handlePurchaseSuccess = (courseId: string | number) => {
    console.log('Course purchased successfully:', courseId);
    // In a real app, you would redirect to the course or update the UI
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Enhanced Course Purchase Flow
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Experience our world-class Stripe-powered payment system with secure checkout, 
              multiple payment methods, and seamless course enrolment.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Bank-level security with Stripe's PCI DSS compliance</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Support</h3>
              <p className="text-gray-600">Accept payments from customers worldwide</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SSL Encrypted</h3>
              <p className="text-gray-600">End-to-end encryption for all transactions</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Demo Courses */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Try the Purchase Flow</h2>
            <p className="text-lg text-gray-600">
              Select a course below to experience our enhanced purchase flow with Stripe integration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {course.isFree && (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      Free
                    </Badge>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                      Instructor: <span className="font-medium">{course.instructor}</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {course.isFree ? 'Free' : `$${course.price}`}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleCourseSelect(course)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {course.isFree ? 'Enrol Now' : 'Purchase Course'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Purchase Flow Works</h2>
            <p className="text-lg text-gray-600">
              Simple, secure, and seamless course enrolment process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Select Course", description: "Choose from our extensive course library" },
              { step: 2, title: "Review Details", description: "See course information and pricing" },
              { step: 3, title: "Secure Checkout", description: "Complete payment via Stripe" },
              { step: 4, title: "Start Learning", description: "Access your course immediately" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stripe Integration Info */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            >
              <CreditCard className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Powered by Stripe</h2>
              <p className="text-xl mb-6 opacity-90">
                Industry-leading payment processing with 99.9%+ uptime and global reach
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-300" />
                  <p>PCI DSS Compliant</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-300" />
                  <p>200+ Countries</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-300" />
                  <p>135+ Currencies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Purchase Flow Component */}
      {selectedCourse && (
        <CoursePurchaseFlow
          course={selectedCourse}
          isOpen={showPurchaseFlow}
          onClose={() => setShowPurchaseFlow(false)}
          onSuccess={handlePurchaseSuccess}
        />
      )}
    </div>
  );
};

export default PurchaseFlowDemo;
