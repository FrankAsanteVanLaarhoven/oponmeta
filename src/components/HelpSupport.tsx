import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Clock,
  Star,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  AlertCircle,
  CheckCircle,
  Info,
  Send,
  Paperclip
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: any;
  action: string;
  availability: string;
  responseTime: string;
}

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const categories = [
    { id: 'all', label: 'All Topics', count: 25 },
    { id: 'account', label: 'Account & Billing', count: 8 },
    { id: 'courses', label: 'Courses & Learning', count: 10 },
    { id: 'technical', label: 'Technical Issues', count: 7 }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your inbox. You can also change your password from your profile settings.',
      category: 'account'
    },
    {
      id: '2',
      question: 'How do I enroll in a course?',
      answer: 'Browse our course catalog and click on any course that interests you. Click the "Enroll" button and follow the payment process. Once enrolled, you can access the course content immediately.',
      category: 'courses'
    },
    {
      id: '3',
      question: 'Can I download course materials for offline viewing?',
      answer: 'Yes! Most course materials can be downloaded for offline viewing. Look for the download icon next to each lesson. Note that some interactive content may require an internet connection.',
      category: 'courses'
    },
    {
      id: '4',
      question: 'How do I get a certificate of completion?',
      answer: 'Certificates are automatically generated when you complete a course with a passing grade. You can download your certificate from the course completion page or from your profile achievements section.',
      category: 'courses'
    },
    {
      id: '5',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners.',
      category: 'account'
    },
    {
      id: '6',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. Go to Settings > Billing and click "Cancel Subscription". Your access will continue until the end of your current billing period.',
      category: 'account'
    },
    {
      id: '7',
      question: 'The video player is not working properly',
      answer: 'Try refreshing your browser and clearing your cache. Make sure you have a stable internet connection. If the issue persists, try using a different browser or contact our technical support.',
      category: 'technical'
    },
    {
      id: '8',
      question: 'How do I update my profile information?',
      answer: 'Go to your profile page and click the "Edit" button. You can update your personal information, profile picture, and preferences. Don\'t forget to save your changes.',
      category: 'account'
    }
  ];

  const contactMethods: ContactMethod[] = [
    {
      id: 'live-chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      availability: '24/7',
      responseTime: 'Instant'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      icon: Phone,
      action: 'Call Now',
      availability: 'Mon-Fri, 9AM-6PM EST',
      responseTime: 'Immediate'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      action: 'Send Email',
      availability: '24/7',
      responseTime: 'Within 24 hours'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the contact form data
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setShowContactForm(false);
    setContactForm({ name: '', email: '', subject: '', message: '', priority: 'medium' });
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/student-portal')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <X className="h-4 w-4 mr-2 rotate-45" />
            Back to Student Portal
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-2">Find answers to your questions and get the help you need</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-colors ${
                      activeCategory === category.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{category.label}</p>
                    <p className="text-sm text-gray-600">{category.count} articles</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => window.open('/user-guide.pdf', '_blank')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">User Guide</h3>
                    <p className="text-sm text-gray-600">Download our comprehensive user guide</p>
                  </div>
                </button>
                <button
                  onClick={() => window.open('/video-tutorials', '_blank')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Video className="h-8 w-8 text-green-600 mr-3" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Video Tutorials</h3>
                    <p className="text-sm text-gray-600">Watch step-by-step tutorials</p>
                  </div>
                </button>
                <button
                  onClick={() => window.open('/system-status', '_blank')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">System Status</h3>
                    <p className="text-sm text-gray-600">Check if our services are running</p>
                  </div>
                </button>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-8 w-8 text-purple-600 mr-3" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Contact Support</h3>
                    <p className="text-sm text-gray-600">Send us a message</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Icon className="h-5 w-5 text-blue-600 mr-2" />
                        <h4 className="font-medium text-gray-900">{method.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>Available: {method.availability}</span>
                        <span>Response: {method.responseTime}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (method.id === 'live-chat') {
                            alert('Live chat would be initiated here');
                          } else if (method.id === 'phone') {
                            window.location.href = 'tel:+1-555-123-4567';
                          } else if (method.id === 'email') {
                            setShowContactForm(true);
                          }
                        }}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        {method.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* System Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Monitor className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Desktop</p>
                    <p className="text-sm text-gray-600">Chrome, Firefox, Safari, Edge</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Smartphone className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Mobile</p>
                    <p className="text-sm text-gray-600">iOS 12+, Android 8+</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Tablet className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Tablet</p>
                    <p className="text-sm text-gray-600">iPad, Android tablets</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open('/community-forum', '_blank')}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-900">Community Forum</span>
                </button>
                <button
                  onClick={() => window.open('/discord', '_blank')}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-900">Discord Server</span>
                </button>
                <button
                  onClick={() => window.open('/facebook-group', '_blank')}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Globe className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-900">Facebook Group</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Contact Support</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleContactSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={contactForm.priority}
                  onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your issue or question in detail..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;
