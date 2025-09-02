import React from 'react';
import { Shield, Eye, Lock, Database, Globe, UserCheck, FileText, Calendar, Mail, Phone } from 'lucide-react';

const Privacy = () => {
  const lastUpdated = 'December 15, 2024';
  const effectiveDate = 'January 1, 2025';

  const privacyPrinciples = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Data Protection',
      description: 'We implement industry-standard security measures to protect your personal information'
    },
    {
      icon: <Eye className="h-8 w-8 text-green-600" />,
      title: 'Transparency',
      description: 'We clearly communicate how we collect, use, and share your information'
    },
    {
      icon: <Lock className="h-8 w-8 text-purple-600" />,
      title: 'User Control',
      description: 'You have full control over your data and can manage your privacy settings'
    },
    {
      icon: <Database className="h-8 w-8 text-orange-600" />,
      title: 'Minimal Collection',
      description: 'We only collect the information necessary to provide our services'
    }
  ];

  const dataCategories = [
    {
      title: 'Personal Information',
      examples: ['Name, email address, phone number', 'Profile information and preferences', 'Account credentials'],
      purpose: 'Account creation, authentication, and personalization'
    },
    {
      title: 'Learning Data',
      examples: ['Course progress and completion', 'Assessment results and certificates', 'Learning preferences and behavior'],
      purpose: 'Educational content delivery and progress tracking'
    },
    {
      title: 'Technical Data',
      examples: ['IP address and device information', 'Browser type and version', 'Usage analytics and performance data'],
      purpose: 'Platform optimization and security'
    },
    {
      title: 'Communication Data',
      examples: ['Support tickets and inquiries', 'Feedback and survey responses', 'Marketing preferences'],
      purpose: 'Customer service and communication'
    }
  ];

  const dataRights = [
    {
      title: 'Access',
      description: 'Request a copy of your personal data',
      icon: <FileText className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'Correction',
      description: 'Update or correct inaccurate information',
      icon: <UserCheck className="h-5 w-5 text-green-600" />
    },
    {
      title: 'Deletion',
      description: 'Request deletion of your personal data',
      icon: <Lock className="h-5 w-5 text-red-600" />
    },
    {
      title: 'Portability',
      description: 'Export your data in a portable format',
      icon: <Database className="h-5 w-5 text-purple-600" />
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect 
            your personal information when you use OponMeta's learning platform.
          </p>
          <div className="mt-6 text-gray-300">
            <p className="text-sm">Last updated: {lastUpdated}</p>
            <p className="text-sm">Effective date: {effectiveDate}</p>
          </div>
        </div>

        {/* Privacy Principles */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Our Privacy Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyPrinciples.map((principle, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0a174e] mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Information We Collect
          </h2>
          <div className="space-y-8">
            {dataCategories.map((category, index) => (
              <div key={index} className="border-l-4 border-yellow-400 pl-6">
                <h3 className="text-xl font-bold text-[#0a174e] mb-3">{category.title}</h3>
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-700 mb-2">Examples:</h4>
                  <ul className="text-gray-600 space-y-1">
                    {category.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Purpose:</h4>
                  <p className="text-gray-600">{category.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Primary Uses</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Provide and maintain our learning platform and services
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Personalise your learning experience and content recommendations
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Process payments and manage your account
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Communicate with you about our services and updates
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Improve our platform and develop new features
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Data Sharing</h3>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                With your explicit consent
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                To comply with legal obligations
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                With trusted service providers who assist in our operations
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                To protect our rights and safety
              </li>
            </ul>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Your Data Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataRights.map((right, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  {right.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0a174e] mb-2">{right.title}</h3>
                <p className="text-gray-600 text-sm">{right.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@oponmeta.com" className="text-blue-600 hover:underline">
                privacy@oponmeta.com
              </a>
            </p>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Data Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="font-semibold text-[#0a174e] mb-2">Encryption</h4>
              <p className="text-gray-600 text-sm">
                All data is encrypted in transit and at rest using industry-standard protocols
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="font-semibold text-[#0a174e] mb-2">Access Controls</h4>
              <p className="text-gray-600 text-sm">
                Strict access controls and authentication measures protect your information
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="font-semibold text-[#0a174e] mb-2">Regular Audits</h4>
              <p className="text-gray-600 text-sm">
                We conduct regular security audits and assessments to maintain protection
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-[#0a174e] mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we handle your information, 
              please don't hesitate to contact our privacy team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@oponmeta.com"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a174e] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
              >
                Email Privacy Team
              </a>
              <a
                href="/support"
                className="px-8 py-3 bg-[#0a174e] text-white font-bold rounded-lg hover:bg-[#11235a] transition-all duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
