import React from 'react';

const Resources = () => (
  <div className="bg-[#f6f9fc] min-h-screen py-12 px-4">
    {/* Hero Section */}
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Learning Resources & Support</h1>
      <p className="text-lg text-gray-700 mb-6">Explore a curated library of articles, guides, templates, and tools to help you succeed in your learning journey.</p>
    </div>

    {/* Value Proposition */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Blog</h3>
        <p className="text-gray-600">Stay updated with the latest trends, tips, and stories from the OponMeta community.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Toolkits</h3>
        <p className="text-gray-600">Access practical toolkits and templates for study, career, and project success.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Downloadable Guides</h3>
        <p className="text-gray-600">Download eBooks, guides, and checklists to accelerate your learning.</p>
      </div>
    </div>

    {/* Articles */}
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-2xl font-bold text-[#0a174e] mb-6 text-center">Featured Articles</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-[#0a174e] mb-1">How to Build a Growth Mindset</h4>
          <p className="text-gray-600 mb-2">Practical strategies for lifelong learning and personal development.</p>
          <a href="#" className="text-[#0a174e] font-semibold hover:underline">Read More</a>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-[#0a174e] mb-1">Top 10 Tools for Remote Collaboration</h4>
          <p className="text-gray-600 mb-2">A roundup of the best digital tools for teams and learners.</p>
          <a href="#" className="text-[#0a174e] font-semibold hover:underline">Read More</a>
        </div>
      </div>
    </div>

    {/* Downloadable Guides */}
    <div className="max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-[#0a174e] mb-6 text-center">Downloadable Guides</h2>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-700 mb-4">Get our exclusive guides and checklists to help you succeed in your studies and career.</p>
        <a href="#" className="px-8 py-3 bg-[#0a174e] text-white font-bold rounded-lg hover:bg-[#11235a] transition">Download Now</a>
      </div>
    </div>
  </div>
);

export default Resources; 