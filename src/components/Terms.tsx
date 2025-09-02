import React from 'react';
import { FileText, Shield, UserCheck, CreditCard, Globe, AlertTriangle, CheckCircle, XCircle as XCircleIcon, Info } from 'lucide-react';

const Terms = () => {
  const lastUpdated = 'December 15, 2024';
  const effectiveDate = 'January 1, 2025';

  const keyTerms = [
    {
      icon: <UserCheck className="h-6 w-6 text-blue-600" />,
      title: 'Account Registration',
      description: 'You must provide accurate information and maintain the security of your account'
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: 'Acceptable Use',
      description: 'Use our services only for lawful purposes and in accordance with these terms'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-600" />,
      title: 'Payment Terms',
      description: 'All fees are non-refundable unless otherwise specified in our refund policy'
    },
    {
      icon: <Globe className="h-6 w-6 text-orange-600" />,
      title: 'Intellectual Property',
      description: 'Our content and platform are protected by copyright and other intellectual property laws'
    }
  ];

  const userObligations = [
    'Provide accurate and complete information during registration',
    'Maintain the confidentiality of your account credentials',
    'Use the platform only for educational and lawful purposes',
    'Respect intellectual property rights of content creators',
    'Report any security concerns or violations',
    'Comply with all applicable laws and regulations'
  ];

  const prohibitedActivities = [
    'Sharing account credentials with others',
            'Attempting to gain unauthorised access to the platform',
    'Uploading malicious content or software',
    'Harassing or bullying other users',
    'Violating intellectual property rights',
    'Using the platform for commercial purposes without permission'
  ];

  const serviceLimitations = [
    {
      title: 'Availability',
      description: 'We strive for 99.9% uptime but cannot guarantee uninterrupted service',
      icon: <Info className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'Content Accuracy',
      description: 'While we review content, we cannot guarantee complete accuracy',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />
    },
    {
      title: 'Third-Party Services',
      description: 'We may use third-party services that have their own terms',
      icon: <Globe className="h-5 w-5 text-green-600" />
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <FileText className="h-20 w-20 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            These terms govern your use of OponMeta's learning platform and services. 
            By using our platform, you agree to be bound by these terms.
          </p>
          <div className="mt-6 text-gray-300">
            <p className="text-sm">Last updated: {lastUpdated}</p>
            <p className="text-sm">Effective date: {effectiveDate}</p>
          </div>
        </div>

        {/* Key Terms */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Key Terms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyTerms.map((term, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mr-3">
                  {term.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a174e] mb-1">{term.title}</h3>
                  <p className="text-gray-600 text-sm">{term.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Obligations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Your Obligations</h3>
            <ul className="space-y-3">
              {userObligations.map((obligation, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{obligation}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Prohibited Activities</h3>
            <ul className="space-y-3">
              {prohibitedActivities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <XCircleIcon className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service Limitations */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Service Limitations & Disclaimers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceLimitations.map((limitation, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-3">
                  {limitation.icon}
                </div>
                <h4 className="font-semibold text-[#0a174e] mb-2">{limitation.title}</h4>
                <p className="text-gray-600 text-sm">{limitation.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Refunds */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Payment Terms & Refund Policy
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#0a174e] mb-4">Payment Terms</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  All fees are charged in advance and are non-refundable unless otherwise specified
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Subscription fees are automatically renewed unless cancelled before the renewal date
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  We reserve the right to change our pricing with 30 days notice
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Failed payments may result in service suspension
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-[#0a174e] mb-4">Refund Policy</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Course purchases: 30-day money-back guarantee if not satisfied
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Subscription cancellations: No refunds for partial months
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Technical issues: Full refund if we cannot resolve within 48 hours
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Refund requests must be submitted within the specified timeframes
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Account Termination
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#0a174e] mb-4">You May Terminate</h3>
              <p className="text-gray-600 mb-4">
                You may cancel your account at any time through your account settings or by contacting support.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Immediate access termination
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data deletion within 30 days
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  No further charges
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-[#0a174e] mb-4">We May Terminate</h3>
              <p className="text-gray-600 mb-4">
                We may suspend or terminate your account for violations of these terms.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  Terms of service violations
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  Fraudulent or illegal activity
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  Extended non-payment
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-[#0a174e] mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service or need clarification on any provision, 
              please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@oponmeta.com"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a174e] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
              >
                Email Legal Team
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

export default Terms;
