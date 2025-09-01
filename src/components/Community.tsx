import React from 'react';

const Community = () => (
  <div className="bg-[#f6f9fc] min-h-screen py-12 px-4">
    {/* Hero Section */}
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Join the OponMeta Community</h1>
      <p className="text-lg text-gray-700 mb-6">Connect, collaborate, and grow with learners and professionals from around the world. Our community is your space to learn, share, and make an impact.</p>
      <a href="#forums" className="px-8 py-3 bg-[#FFD700] text-[#0a174e] font-bold rounded-lg shadow hover:bg-yellow-300 transition">Visit Forums</a>
    </div>

    {/* Value Proposition */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Forums</h3>
        <p className="text-gray-600">Join discussions, ask questions, and get support from peers and experts.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Alumni Network</h3>
        <p className="text-gray-600">Connect with OponMeta alumni for mentorship, collaboration, and career opportunities.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Events & Networking</h3>
        <p className="text-gray-600">Participate in events, webinars, and networking sessions to expand your horizons.</p>
      </div>
    </div>

    {/* Forums */}
    <div id="forums" className="max-w-5xl mx-auto mb-16">
      <h2 className="text-2xl font-bold text-[#0a174e] mb-6 text-center">Community Forums</h2>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-700 mb-4">Our forums are open 24/7 for questions, discussions, and peer support. Join the conversation!</p>
        <a href="#" className="px-8 py-3 bg-[#0a174e] text-white font-bold rounded-lg hover:bg-[#11235a] transition">Go to Forums</a>
      </div>
    </div>

    {/* Alumni Network & Events */}
    <div className="max-w-4xl mx-auto mb-8 grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h4 className="font-semibold text-[#0a174e] mb-2">Alumni Network</h4>
        <p className="text-gray-600 mb-4">Stay connected with fellow graduates, share experiences, and access exclusive opportunities.</p>
        <a href="#" className="text-[#0a174e] font-semibold hover:underline">Join Alumni Network</a>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h4 className="font-semibold text-[#0a174e] mb-2">Events & Networking</h4>
        <p className="text-gray-600 mb-4">Attend online and in-person events to learn, network, and grow your career.</p>
        <a href="#" className="text-[#0a174e] font-semibold hover:underline">See Upcoming Events</a>
      </div>
    </div>
  </div>
);

export default Community; 