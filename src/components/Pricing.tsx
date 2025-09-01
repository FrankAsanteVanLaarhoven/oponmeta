import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    features: [
      'Access to selected digital courses',
      'Community forum participation',
      'Monthly newsletter and event invites',
    ],
    cta: 'Join Free',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$19/mo',
    features: [
      'Full access to all learning modules',
      'Live and recorded workshops',
      'Mentorship programme access',
      'Course completion certificates',
    ],
    cta: 'Start Professional',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$39/mo',
    features: [
      '1-on-1 mentorship sessions',
      'Personalized learning path',
      'Career coaching and resume reviews',
      'Exclusive partner opportunities',
    ],
    cta: 'Go Premium',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Team onboarding and admin dashboard',
      'Progress tracking and analytics',
      'Custom workshops and branded content',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const Pricing = () => (
  <>
    <section className="w-full bg-[#f6f9fc] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a174e] mb-2">Flexible Plans for Every Learner</h2>
        <div className="w-16 h-1 bg-[#0a174e] mx-auto mb-8 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white border-2 min-h-[500px] ${
                plan.highlight 
                  ? 'border-[#FFD700] scale-105 shadow-2xl shadow-[#FFD700]/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFD700] text-[#0a174e] px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}
              
              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#0a174e] mb-3">{plan.name}</h3>
                <div 
                  className={`text-4xl lg:text-5xl font-extrabold mb-2 ${
                    plan.highlight ? 'text-[#FFD700]' : 'text-[#0a174e]'
                  }`}
                >
                  {plan.price}
                </div>
                {plan.price !== 'Free' && plan.price !== 'Custom' && (
                  <p className="text-sm text-gray-500">per month</p>
                )}
              </div>
              
              {/* Features List */}
              <ul className="flex-1 mb-8 text-gray-700 space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 mt-1 text-[#0a174e] flex-shrink-0">✓</span>
                    <span className="text-sm lg:text-base leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <button 
                className={`w-full py-3 px-4 rounded-lg font-bold text-base transition-all duration-300 transform hover:scale-105 mt-auto ${
                  plan.highlight 
                    ? 'bg-[#FFD700] text-[#0a174e] hover:bg-yellow-400 hover:shadow-lg' 
                    : 'bg-[#0a174e] text-white hover:bg-[#1a2a6b] hover:shadow-lg'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    {/* White Separator Line */}
    <div className="w-full h-1 bg-white"></div>
    
    {/* Ready to Unlock Your Potential Section - Outside constrained container */}
    <div className="w-full bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e] py-16 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-6 drop-shadow-lg">
          Ready to Unlock Your Potential?
        </h2>
        <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
          Join OponMeta today and access world-class courses, mentorship, and a global learning community—all at flexible, affordable prices.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-orange-500 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
          Start Learning Now
        </button>
      </div>
    </div>
  </>
);

export default Pricing; 