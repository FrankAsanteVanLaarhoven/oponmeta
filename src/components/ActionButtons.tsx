import React from 'react';
import { Link } from 'react-router-dom';

const ActionButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
    <Link
      to="/programme"
      className="px-10 py-6 rounded-lg bg-white text-[#0a174e] font-bold text-xl shadow-sm border-2 border-transparent hover:border-[#0a174e] hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a174e]"
      style={{ minWidth: 260 }}
    >
      Explore Programme
    </Link>
    <Link
      to="/pricing"
      className="px-10 py-6 rounded-lg bg-[#5856d6] text-white font-bold text-xl shadow-sm border-2 border-transparent hover:bg-[#443fc7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5856d6]"
      style={{ minWidth: 260 }}
    >
      View Pricing
    </Link>
    <Link
      to="/join"
      className="px-10 py-6 rounded-lg bg-transparent text-white font-bold text-xl border-2 border-white hover:bg-white hover:text-[#0a174e] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
      style={{ minWidth: 260 }}
    >
      Join Now
    </Link>
  </div>
);

export default ActionButtons; 