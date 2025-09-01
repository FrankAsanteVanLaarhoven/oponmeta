import React from 'react';

const Blogs: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Blogs</h1>
      <p className="text-gray-600 text-lg">News, insights, tips and stories from our platform</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Featured Blog Post */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Featured Blog" className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">Featured</span>
            <span className="text-gray-500 text-sm ml-2">5 min read</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">The Future of Online Learning: AI-Powered Education</h2>
          <p className="text-gray-600 mb-4">Discover how artificial intelligence is revolutionizing the way we learn and teach online.</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Author" className="w-8 h-8 rounded-full mr-2" />
              <span className="text-sm text-gray-600">By John Smith</span>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>

      {/* Regular Blog Posts */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="Blog Post" className="w-full h-32 object-cover" />
        <div className="p-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">Technology</span>
          <h3 className="font-bold text-gray-800 mt-2 mb-1">10 Tips for Effective Online Teaching</h3>
          <p className="text-gray-600 text-sm mb-2">Learn the best practices for engaging students in virtual classrooms.</p>
          <span className="text-xs text-gray-500">3 days ago</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Blog Post" className="w-full h-32 object-cover" />
        <div className="p-4">
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Career</span>
          <h3 className="font-bold text-gray-800 mt-2 mb-1">Building a Successful Teaching Career</h3>
          <p className="text-gray-600 text-sm mb-2">Strategies for growing your teaching business and reaching more students.</p>
          <span className="text-xs text-gray-500">1 week ago</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Blog Post" className="w-full h-32 object-cover" />
        <div className="p-4">
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">Learning</span>
          <h3 className="font-bold text-gray-800 mt-2 mb-1">The Psychology of Learning</h3>
          <p className="text-gray-600 text-sm mb-2">Understanding how the brain learns and retains information.</p>
          <span className="text-xs text-gray-500">2 weeks ago</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="Blog Post" className="w-full h-32 object-cover" />
        <div className="p-4">
          <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">Tips</span>
          <h3 className="font-bold text-gray-800 mt-2 mb-1">Creating Engaging Course Content</h3>
          <p className="text-gray-600 text-sm mb-2">Tips and tricks for making your courses more interactive and engaging.</p>
          <span className="text-xs text-gray-500">3 weeks ago</span>
        </div>
      </div>
    </div>
  </div>
);

export default Blogs;
