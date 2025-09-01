import React from 'react';

/**
 * Test component to verify yellow text on buttons
 */
export const TestYellowButtons: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Yellow Text Button Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test Section 1: CourseCatalog Style Buttons */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">CourseCatalog Style Buttons</h2>
            <div className="space-y-4">
              <button 
                className="px-4 py-2 text-yellow-500 bg-blue-100 border border-blue-300 rounded-lg font-medium quick-action-button
                          hover:bg-blue-200 hover:border-blue-400 focus:outline-none focus:ring-2 
                          focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#f59e0b', fontWeight: '700' }}
              >
                Add New Course (Blue Background)
              </button>
              
              <button 
                className="px-4 py-2 text-yellow-500 bg-green-100 border border-green-300 rounded-lg font-medium quick-action-button
                          hover:bg-green-200 hover:border-green-400 focus:outline-none focus:ring-2 
                          focus:ring-green-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#f59e0b', fontWeight: '700' }}
              >
                Export Catalogue (Green Background)
              </button>
              
              <button 
                className="px-4 py-2 text-yellow-500 bg-purple-100 border border-purple-300 rounded-lg font-medium quick-action-button
                          hover:bg-purple-200 hover:border-purple-400 focus:outline-none focus:ring-2 
                          focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#f59e0b', fontWeight: '700' }}
              >
                Customise View (Purple Background)
              </button>
            </div>
          </div>

          {/* Test Section 2: Different Yellow Shades */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Different Yellow Shades</h2>
            <div className="space-y-4">
              <button 
                className="px-4 py-2 bg-blue-600 border border-blue-700 rounded-lg font-medium
                          hover:bg-blue-700 hover:border-blue-800 focus:outline-none focus:ring-2 
                          focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#fbbf24', fontWeight: '700' }}
              >
                Yellow-400 Text (#fbbf24)
              </button>
              
              <button 
                className="px-4 py-2 bg-green-600 border border-green-700 rounded-lg font-medium
                          hover:bg-green-700 hover:border-green-800 focus:outline-none focus:ring-2 
                          focus:ring-green-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#f59e0b', fontWeight: '700' }}
              >
                Yellow-500 Text (#f59e0b)
              </button>
              
              <button 
                className="px-4 py-2 bg-purple-600 border border-purple-700 rounded-lg font-medium
                          hover:bg-purple-700 hover:border-purple-800 focus:outline-none focus:ring-2 
                          focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#d97706', fontWeight: '700' }}
              >
                Yellow-600 Text (#d97706)
              </button>
            </div>
          </div>

          {/* Test Section 3: CSS Class Testing */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">CSS Class Testing</h2>
            <div className="space-y-4">
              <button className="px-4 py-2 text-yellow-500 bg-gray-800 border border-gray-700 rounded-lg font-medium
                          hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 
                          focus:ring-gray-500 focus:border-transparent transition-all duration-200">
                Tailwind text-yellow-500 Class
              </button>
              
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg font-medium quick-action-button
                          hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 
                          focus:ring-gray-500 focus:border-transparent transition-all duration-200">
                Custom quick-action-button Class
              </button>
              
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg font-medium
                          hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 
                          focus:ring-gray-500 focus:border-transparent transition-all duration-200">
                No Special Classes
              </button>
            </div>
          </div>

          {/* Test Section 4: Inline Style Override */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Inline Style Override</h2>
            <div className="space-y-4">
              <button 
                className="px-4 py-2 bg-red-600 border border-red-700 rounded-lg font-medium text-white
                          hover:bg-red-700 hover:border-red-800 focus:outline-none focus:ring-2 
                          focus:ring-red-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#fbbf24', fontWeight: '700' }}
              >
                Red Button with Yellow Text (Inline)
              </button>
              
              <button 
                className="px-4 py-2 bg-indigo-600 border border-indigo-700 rounded-lg font-medium text-white
                          hover:bg-indigo-700 hover:border-indigo-800 focus:outline-none focus:ring-2 
                          focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                style={{ color: '#f59e0b', fontWeight: '700' }}
              >
                Indigo Button with Yellow Text (Inline)
              </button>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Debug Information</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Inline styles should override all CSS classes</p>
            <p>• Yellow colors used: #fbbf24 (yellow-400), #f59e0b (yellow-500), #d97706 (yellow-600)</p>
            <p>• Font weight set to 700 (bold) for better visibility</p>
            <p>• Check browser developer tools to see which styles are being applied</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestYellowButtons;
