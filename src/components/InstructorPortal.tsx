import React from 'react';
import VendorDashboard from './VendorDashboard';

const InstructorPortal: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Instructor Portal</h1>
      <p className="text-gray-600 text-lg">Access your instructor dashboard and tools</p>
      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">New</span>
    </div>
    <VendorDashboard />
  </div>
);

export default InstructorPortal;
