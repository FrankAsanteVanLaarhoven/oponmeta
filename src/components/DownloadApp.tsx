import React from 'react';

const DownloadApp: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Download the App</h1>
      <p className="text-gray-600 text-lg">Learn anywhere, anytime for free</p>
    </div>
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <div className="text-6xl mb-4">📱</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">OponMeta Mobile App</h2>
        <p className="text-gray-600 mb-6">Take your learning on the go with our mobile app</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg">
            Download for iOS
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-all duration-200 shadow-lg">
            Download for Android
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DownloadApp;
