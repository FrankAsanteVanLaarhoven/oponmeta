import React from 'react';

const PostPricingCTA = () => (
  <div className="w-screen flex flex-col items-center justify-center py-16 bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e] -ml-4 -mr-4">
    <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
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
);

export default PostPricingCTA; 