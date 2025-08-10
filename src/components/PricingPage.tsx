import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    features: [
      'Access to select courses',
      'Community forums',
      'Basic support',
    ],
  },
  {
    name: 'Professional',
    price: '$29/mo',
    features: [
      'Unlimited courses',
      'Mentorship access',
      'Workshops included',
      'Certificates',
      'Priority support',
    ],
  },
  {
    name: 'Premium',
    price: '$49/mo',
    features: [
      'All Professional features',
      'Exclusive webinars',
      'Downloadable resources',
      'Career coaching',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Custom solutions',
      'Team analytics',
      'Dedicated account manager',
      'Corporate training',
    ],
  },
];

const PricingPage = () => (
  <div className="bg-[#f6f9fc] min-h-screen py-12 px-4">
    {/* Hero Section */}
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Flexible Pricing for Every Learner</h1>
      <p className="text-lg text-gray-700 mb-6">Choose a plan that fits your needs. We believe in accessible, high-quality education for all.</p>
    </div>

    {/* Plans */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-16">
      {plans.map((plan) => (
        <div key={plan.name} className="bg-white rounded-lg shadow p-6 text-center flex flex-col">
          <h3 className="text-2xl font-bold text-[#0a174e] mb-2">{plan.name}</h3>
          <div className="text-3xl font-extrabold text-[#FFD700] mb-4">{plan.price}</div>
          <ul className="text-gray-600 mb-6 flex-1 space-y-2">
            {plan.features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
          <button className="w-full py-3 bg-[#0a174e] text-white font-semibold rounded-md hover:bg-[#11235a] transition-colors text-lg">Choose Plan</button>
        </div>
      ))}
    </div>

    {/* Comparison Table */}
    <div className="max-w-5xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-[#0a174e] mb-6 text-center">Compare Plans</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#0a174e]">Feature</th>
              {plans.map((plan) => (
                <th key={plan.name} className="px-4 py-2 text-center text-sm font-semibold text-[#0a174e]">{plan.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Access to courses</td>
              <td className="px-4 py-2 text-center">Limited</td>
              <td className="px-4 py-2 text-center">Unlimited</td>
              <td className="px-4 py-2 text-center">Unlimited</td>
              <td className="px-4 py-2 text-center">Unlimited</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Mentorship</td>
              <td className="px-4 py-2 text-center">-</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Workshops</td>
              <td className="px-4 py-2 text-center">-</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Certificates</td>
              <td className="px-4 py-2 text-center">-</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Support</td>
              <td className="px-4 py-2 text-center">Basic</td>
              <td className="px-4 py-2 text-center">Priority</td>
              <td className="px-4 py-2 text-center">Priority</td>
              <td className="px-4 py-2 text-center">Dedicated</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default PricingPage; 