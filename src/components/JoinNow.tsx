import React from 'react';

const JoinNow = () => (
  <div className="max-w-2xl mx-auto py-16 px-4 text-center">
    <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Join OponMeta Today</h1>
    <p className="text-lg text-gray-700 mb-8">
      Become part of a vibrant learning community. Get access to exclusive courses, mentorship, workshops, and more. Start your journey to success with OponMeta!
    </p>
    <form className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <div className="mb-4 text-left">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input type="text" id="name" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="Your Name" />
      </div>
      <div className="mb-4 text-left">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input type="email" id="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="you@email.com" />
      </div>
      <button type="submit" className="w-full py-3 bg-[#0a174e] text-white font-semibold rounded-md hover:bg-[#11235a] transition-colors text-lg">Sign Up</button>
    </form>
    <p className="text-gray-500 text-sm mt-6">Already have an account? <a href="/login" className="text-[#0a174e] hover:underline">Log in</a></p>
  </div>
);

export default JoinNow; 