import React, { useState } from 'react';

const LearningTiers = () => {
  const [selectedTier, setSelectedTier] = useState('beginner');

  const tiers = [
    {
      id: 'beginner',
      name: 'Foundation Tier',
      level: 'Beginner',
      color: 'green',
      description: 'Perfect for those starting their learning journey',
      duration: '3-6 months',
      courses: 15,
      price: 'Free',
      features: [
        'Access to foundational courses',
        'Basic skill assessments',
        'Community forum access',
        'Certificate of completion',
        'Email support',
        'Mobile app access'
      ],
      skills: ['Basic concepts', 'Fundamental tools', 'Industry terminology', 'Best practices'],
      nextTier: 'intermediate',
      icon: '🌱'
    },
    {
      id: 'intermediate',
      name: 'Professional Tier',
      level: 'Intermediate',
      color: 'blue',
      description: 'For learners ready to advance their skills',
      duration: '6-12 months',
      courses: 35,
      price: '$29/month',
      features: [
        'All Foundation Tier features',
        'Advanced course library',
        '1-on-1 mentorship sessions',
        'Project-based learning',
        'Career guidance',
        'Priority support',
        'Exclusive workshops',
        'Industry networking events'
      ],
      skills: ['Advanced techniques', 'Project management', 'Problem-solving', 'Team collaboration'],
      nextTier: 'advanced',
      icon: '🚀'
    },
    {
      id: 'advanced',
      name: 'Expert Tier',
      level: 'Advanced',
      color: 'purple',
      description: 'For professionals seeking mastery and leadership',
      duration: '12+ months',
      courses: 50,
      price: '$79/month',
      features: [
        'All Professional Tier features',
        'Exclusive expert courses',
        'Personalized learning path',
        'Executive coaching',
        'Industry certification',
        'Job placement assistance',
        'Speaking opportunities',
        'Advisory board access',
        'Custom curriculum design'
      ],
      skills: ['Leadership', 'Strategic thinking', 'Innovation', 'Mentoring others'],
      nextTier: null,
      icon: '👑'
    }
  ];

  const selectedTierData = tiers.find(tier => tier.id === selectedTier);

  const progressionPath = [
    { stage: 1, title: 'Foundation', description: 'Build core skills and knowledge', duration: '3-6 months' },
    { stage: 2, title: 'Specialization', description: 'Focus on specific areas of interest', duration: '6-9 months' },
    { stage: 3, title: 'Advanced Practice', description: 'Master complex concepts and techniques', duration: '9-12 months' },
    { stage: 4, title: 'Leadership', description: 'Develop leadership and mentoring skills', duration: '12+ months' }
  ];

  return (
    <div className="bg-[#f6f9fc] min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Learning Tiers & Progression</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Choose your learning path and progress through our structured tiers designed to take you from beginner to expert.
          </p>
        </div>

        {/* Tier Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map(tier => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedTier === tier.id ? 'ring-4 ring-[#FFD700]' : ''
              }`}
            >
              <div className={`bg-white rounded-lg shadow-lg p-6 border-t-4 border-${tier.color}-500`}>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{tier.icon}</div>
                  <h3 className="text-xl font-bold text-[#0a174e]">{tier.name}</h3>
                  <p className="text-gray-600">{tier.level}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <p className="text-gray-700 text-sm">{tier.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Duration: {tier.duration}</span>
                    <span>{tier.courses} courses</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0a174e]">{tier.price}</div>
                </div>

                <div className="space-y-2">
                  {tier.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="text-[#FFD700] mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {tier.features.length > 4 && (
                    <div className="text-sm text-gray-500">+{tier.features.length - 4} more features</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Tier Information */}
        {selectedTierData && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{selectedTierData.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0a174e]">{selectedTierData.name}</h2>
                    <p className="text-gray-600">{selectedTierData.level} Level</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{selectedTierData.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-[#0a174e]">{selectedTierData.duration}</div>
                    <div className="text-sm text-gray-600">Typical Duration</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-[#0a174e]">{selectedTierData.courses}</div>
                    <div className="text-sm text-gray-600">Available Courses</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-3">Skills You'll Develop</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTierData.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedTierData.nextTier && (
                  <div className="bg-gradient-to-r from-[#0a174e] to-[#1a2a6b] text-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Ready to advance?</h4>
                    <p className="text-sm mb-3">Upgrade to the next tier to unlock more advanced features and opportunities.</p>
                    <button className="px-4 py-2 bg-[#FFD700] text-[#0a174e] font-semibold rounded-md hover:bg-yellow-300 transition">
                      Upgrade Now
                    </button>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0a174e] mb-4">All Features Included</h3>
                <div className="space-y-3">
                  {selectedTierData.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#FFD700] mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Pricing</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">{selectedTierData.price}</div>
                    <p className="text-gray-600 text-sm mb-4">
                      {selectedTierData.price === 'Free' 
                        ? 'Start learning immediately with no cost' 
                        : 'Cancel anytime, no long-term commitment'
                      }
                    </p>
                    <button className="w-full py-3 bg-[#0a174e] text-white font-semibold rounded-md hover:bg-[#11235a] transition">
                      {selectedTierData.price === 'Free' ? 'Get Started Free' : 'Start Free Trial'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Progression Path */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#0a174e] mb-8 text-center">Your Learning Journey</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full"></div>
            
            <div className="space-y-8">
              {progressionPath.map((stage, index) => (
                <div key={stage.stage} className="relative flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold z-10 ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-blue-500' : 
                    index === 2 ? 'bg-purple-500' : 'bg-[#FFD700] text-[#0a174e]'
                  }`}>
                    {stage.stage}
                  </div>
                  <div className="ml-8 bg-gray-50 p-6 rounded-lg flex-1">
                    <h3 className="text-lg font-semibold text-[#0a174e] mb-2">{stage.title}</h3>
                    <p className="text-gray-700 mb-2">{stage.description}</p>
                    <span className="text-sm text-gray-500">Duration: {stage.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-[#0a174e] mb-2">95%</div>
            <div className="text-gray-600">Completion Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-[#0a174e] mb-2">87%</div>
            <div className="text-gray-600">Career Advancement</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-[#0a174e] mb-2">4.8/5</div>
            <div className="text-gray-600">Student Satisfaction</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-[#0a174e] mb-2">50K+</div>
            <div className="text-gray-600">Graduates Worldwide</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#0a174e] to-[#1a2a6b] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with OponMeta. Choose your tier and begin your path to success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#FFD700] text-[#0a174e] font-bold rounded-lg hover:bg-yellow-300 transition">
              Start Free Trial
            </button>
            <button className="px-8 py-3 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white hover:text-[#0a174e] transition">
              Compare All Tiers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningTiers; 