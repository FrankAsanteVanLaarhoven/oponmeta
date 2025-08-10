import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Clock, HelpCircle as HelpCircleIcon, FileText, MessageSquare, Users, BookOpen } from 'lucide-react';

const Support = () => {
  const supportChannels = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      responseTime: 'Under 2 minutes',
      action: 'Start Chat'
    },
    {
      icon: <Mail className="h-8 w-8 text-green-600" />,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: '24/7',
      responseTime: 'Within 4 hours',
      action: 'Send Email'
    },
    {
      icon: <Phone className="h-8 w-8 text-purple-600" />,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      availability: 'Mon-Fri, 9AM-6PM GMT',
      responseTime: 'Immediate',
      action: 'Call Now'
    }
  ];

  const faqCategories = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: 'Getting Started',
      count: 12
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: 'Account & Billing',
      count: 8
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
      title: 'Technical Issues',
      count: 15
    },
    {
      icon: <FileText className="h-6 w-6 text-orange-600" />,
      title: 'Course Access',
      count: 10
    }
  ];

  const contactInfo = {
    email: 'support@oponmeta.com',
    phone: '+1 (555) 123-4567',
    address: '123 Learning Street, Education City, EC 12345',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM GMT'
  };

  return (
    <div className="bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MessageCircle className="h-20 w-20 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Support Center
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            We're here to help you succeed. Get the support you need through multiple channels, 
            comprehensive resources, and our dedicated team of experts.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                {channel.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#0a174e] mb-3">{channel.title}</h3>
              <p className="text-gray-600 mb-4">{channel.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Availability:</span>
                  <span className="font-semibold text-[#0a174e]">{channel.availability}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Response Time:</span>
                  <span className="font-semibold text-[#0a174e]">{channel.responseTime}</span>
                </div>
              </div>
              
              <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a174e] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200">
                {channel.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faqCategories.map((category, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex justify-center mb-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0a174e] mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.count} articles</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-[#0a174e] text-white font-bold rounded-lg hover:bg-[#11235a] transition-all duration-200">
              Browse All FAQs
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-semibold text-[#0a174e]">Email</p>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-[#0a174e]">Phone</p>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-semibold text-[#0a174e]">Address</p>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-semibold text-[#0a174e]">Business Hours</p>
                  <p className="text-gray-600">{contactInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Submit a Ticket</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Please describe your issue in detail..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a174e] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Help Resources */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Additional Help Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <HelpCircleIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="font-semibold text-[#0a174e] mb-2">Help Center</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive guides, tutorials, and step-by-step instructions for all our features
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="font-semibold text-[#0a174e] mb-2">Community Forum</h4>
              <p className="text-gray-600 text-sm">
                Connect with other learners, share experiences, and get help from the community
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="font-semibold text-[#0a174e] mb-2">Video Tutorials</h4>
              <p className="text-gray-600 text-sm">
                Watch detailed video guides and demonstrations for all platform features
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-[#0a174e] mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is committed to helping you succeed. Don't hesitate to reach out 
              through any of our support channels - we're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a174e] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200">
                Contact Support
              </button>
              <button className="px-8 py-3 bg-[#0a174e] text-white font-bold rounded-lg hover:bg-[#11235a] transition-all duration-200">
                Browse Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
