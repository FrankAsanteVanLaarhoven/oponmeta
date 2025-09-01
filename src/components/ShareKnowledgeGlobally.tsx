import React from 'react';

const ShareKnowledgeGlobally: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Share Your Knowledge Globally</h1>
      <p className="text-gray-600 text-lg">Inspire learners worldwide and grow your teaching career with our global platform</p>
      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">New</span>
    </div>
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <div className="text-6xl mb-4">🌍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Global Teaching Platform</h2>
        <p className="text-gray-600 mb-6">Reach millions of learners worldwide and build your teaching brand</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-bold text-gray-800">Grow Your Income</h3>
            <p className="text-gray-600">Earn revenue from your expertise</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-bold text-gray-800">Reach Global Audience</h3>
            <p className="text-gray-600">Connect with learners worldwide</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-bold text-gray-800">Build Your Brand</h3>
            <p className="text-gray-600">Establish yourself as an expert</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShareKnowledgeGlobally;
