import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  BookOpen, 
  Award, 
  BarChart3, 
  MessageCircle,
  Zap,
  Headphones,
  TrendingUp,
  Shield
} from 'lucide-react';

const CourseBrowsingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] text-white">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Access Your Learning Hub
        </h1>
        <p className="text-lg md:text-xl text-center max-w-3xl text-gray-300 leading-relaxed">
          Manage your learning journey, track progress, and unlock premium features with our comprehensive student portal and subscription management.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Portal Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-gray-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Student Portal</h2>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Access your personalised dashboard, track course progress, manage certificates, and connect with your learning community.
            </p>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Course Progress Tracking</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Certificate Management</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Learning Analytics</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Community Features</span>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <Link 
              to="/student-portal"
              className="inline-flex items-center justify-center w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
            >
              Access Student Portal
            </Link>
          </div>

          {/* Subscription Management Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-gray-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Subscription Management</h2>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Upgrade your learning experience with AI companions, premium features, and advanced analytics. Manage your subscription with ease.
            </p>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                <span className="text-gray-300">AI Learning Companions</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Premium Course Access</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Advanced Analytics</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Priority Support</span>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <Link 
              to="/subscription"
              className="inline-flex items-center justify-center w-full bg-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-pink-600 transition-all duration-200 transform hover:scale-105"
            >
              Manage Subscription
            </Link>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose OponMeta?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold mb-2">Comprehensive Courses</h4>
              <p className="text-gray-300 text-sm">Access to thousands of high-quality courses across all disciplines</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">AI-Powered Learning</h4>
                              <p className="text-gray-300 text-sm">Personalised learning experiences with AI companions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold mb-2">Certified Programs</h4>
              <p className="text-gray-300 text-sm">Industry-recognized certificates and credentials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-400" />
              </div>
              <h4 className="font-semibold mb-2">Community Support</h4>
              <p className="text-gray-300 text-sm">Connect with learners and experts worldwide</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of learners worldwide and unlock your potential with OponMeta's comprehensive learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/courses"
              className="inline-flex items-center justify-center bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105"
            >
              Browse All Courses
            </Link>
            <Link 
              to="/signup"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBrowsingPage;
