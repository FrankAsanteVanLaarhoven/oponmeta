import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Download, 
  Apple, 
  Play, 
  Globe, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  QrCode,
  Share2,
  Mail,
  MessageCircle,
  Video,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles,
  Wifi,
  WifiOff,
  Cloud,
  Sync
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppFeature {
  icon: any;
  title: string;
  description: string;
}

interface PlatformInfo {
  name: string;
  icon: any;
  version: string;
  size: string;
  rating: number;
  downloads: string;
  requirements: string;
  downloadUrl: string;
  qrCode: string;
}

const DownloadAppPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | 'web'>('ios');
  const [showQRCode, setShowQRCode] = useState(false);

  const platforms: Record<string, PlatformInfo> = {
    ios: {
      name: 'iOS App',
      icon: Apple,
      version: '2.1.0',
      size: '45.2 MB',
      rating: 4.8,
      downloads: '50K+',
      requirements: 'iOS 13.0 or later',
      downloadUrl: 'https://apps.apple.com/app/oponmeta',
      qrCode: '/api/qr-code/ios'
    },
    android: {
      name: 'Android App',
      icon: Play,
      version: '2.1.0',
      size: '38.7 MB',
      rating: 4.7,
      downloads: '75K+',
      requirements: 'Android 8.0 or later',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.oponmeta.app',
      qrCode: '/api/qr-code/android'
    },
    web: {
      name: 'Web App',
      icon: Globe,
      version: '2.1.0',
      size: 'PWA',
      rating: 4.9,
      downloads: '100K+',
      requirements: 'Modern browser',
      downloadUrl: 'https://oponmeta.com',
      qrCode: '/api/qr-code/web'
    }
  };

  const features: AppFeature[] = [
    {
      icon: BookOpen,
      title: 'Offline Learning',
      description: 'Download courses and learn anywhere, even without internet'
    },
    {
      icon: Video,
      title: 'Video Streaming',
      description: 'High-quality video lessons with adaptive streaming'
    },
    {
      icon: Target,
      title: 'Progress Tracking',
      description: 'Monitor your learning progress with detailed analytics'
    },
    {
      icon: Users,
      title: 'Community Features',
      description: 'Connect with fellow learners and instructors'
    },
    {
      icon: Zap,
      title: 'AI-Powered Learning',
                      description: 'Personalised recommendations and adaptive content'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    }
  ];

  const benefits = [
                    'Learn on the go with mobile-optimised content',
    'Sync progress across all your devices',
    'Access to exclusive mobile-only features',
    'Push notifications for course updates',
    'Offline mode for uninterrupted learning',
    'Faster loading times and better performance'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Student',
      content: 'The mobile app is amazing! I can study during my commute and the offline feature is a lifesaver.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Professional',
      content: 'Perfect for busy professionals. I can squeeze in learning sessions anywhere, anytime.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Instructor',
      content: 'As an instructor, I love how easy it is to create and manage courses on mobile.',
      rating: 5
    }
  ];

  const handleDownload = (platform: string) => {
    const platformInfo = platforms[platform];
    window.open(platformInfo.downloadUrl, '_blank');
  };

  const handleShareApp = () => {
    const shareText = 'Check out the OponMeta learning app! Download now and start your learning journey.';
    const shareUrl = 'https://oponmeta.com/download';
    
    if (navigator.share) {
      navigator.share({
        title: 'OponMeta Learning App',
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      alert('App link copied to clipboard!');
    }
  };

  const currentPlatform = platforms[selectedPlatform];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1834] via-[#11204a] to-[#16203a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Smartphone className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Download OponMeta App
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto">
              Take your learning anywhere with our powerful mobile app. 
              Access courses, track progress, and learn offline with our feature-rich platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* App Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <Smartphone className="h-24 w-24 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">OponMeta</h3>
                  <p className="text-lg opacity-80">Learning Platform</p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <span className="text-sm ml-2">{currentPlatform.rating}</span>
                    </div>
                    <p className="text-sm opacity-80">{currentPlatform.downloads} downloads</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                NEW
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                FREE
              </div>
            </div>
          </motion.div>

          {/* Download Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Choose Your Platform</h2>
              <p className="text-yellow-400 mb-6">
                Download the OponMeta app for your preferred platform and start learning today.
              </p>
            </div>

            {/* Platform Selection */}
            <div className="space-y-4">
              {Object.entries(platforms).map(([key, platform]) => {
                const Icon = platform.icon;
                return (
                  <div
                    key={key}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      selectedPlatform === key
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                    onClick={() => setSelectedPlatform(key as 'ios' | 'android' | 'web')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Icon className="h-8 w-8 text-yellow-400" />
                        <div>
                          <h3 className="text-white font-semibold">{platform.name}</h3>
                          <p className="text-yellow-400 text-sm">
                            Version {platform.version} • {platform.size}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(platform.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-yellow-400 text-sm">{platform.rating}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download Button */}
            <div className="space-y-4">
              <button
                onClick={() => handleDownload(selectedPlatform)}
                className="w-full flex items-center justify-center px-6 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors"
              >
                <Download className="h-6 w-6 mr-2" />
                Download for {currentPlatform.name}
              </button>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowQRCode(true)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </button>
                <button
                  onClick={handleShareApp}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share App
                </button>
              </div>
            </div>

            {/* Platform Requirements */}
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-2">System Requirements</h4>
              <p className="text-yellow-400 text-sm">{currentPlatform.requirements}</p>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">App Features</h2>
            <p className="text-xl text-yellow-400">
              Everything you need for seamless learning on the go
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <Icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-yellow-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Download the App?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-400">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Users Say</h2>
            <p className="text-xl text-yellow-400">
              Join thousands of satisfied learners using our mobile app
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
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
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-800 text-xl mb-8">
              Download the OponMeta app now and transform your learning experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleDownload('ios')}
                className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors shadow-lg"
              >
                <Apple className="h-5 w-5 mr-2" />
                Download for iOS
              </button>
              <button
                onClick={() => handleDownload('android')}
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Download for Android
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Free to download • No hidden fees • Available worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadAppPage;
