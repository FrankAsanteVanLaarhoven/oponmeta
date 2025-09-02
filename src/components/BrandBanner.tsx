import React from 'react';

const BrandBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] to-yellow-400 bg-clip-text text-transparent">
            OponMeta
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            Empowering the future through innovative education, cutting-edge technology, and transformative learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/programme" 
              className="px-8 py-4 bg-[#FFD700] text-[#0a174e] font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Programme
            </a>
            <a 
              href="/about" 
              className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white hover:text-[#0a174e] transition-all duration-300"
            >
              Learn About Us
            </a>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Our Vision</h2>
            <p className="text-gray-200 leading-relaxed">
              To become the global leader in accessible, high-quality education that bridges the gap between traditional learning and the demands of the digital age. We envision a world where anyone, anywhere can access world-class education and unlock their full potential.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Our Mission</h2>
            <p className="text-gray-200 leading-relaxed">
                              To democratise education through innovative technology, expert-led instruction, and personalised learning pathways. We're committed to empowering individuals with the skills, knowledge, and confidence needed to thrive in an ever-evolving world.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#0a174e]">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Excellence</h3>
              <p className="text-gray-300 text-sm">We strive for the highest standards in everything we do</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#0a174e]">🌍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-300 text-sm">Education should be available to everyone, everywhere</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#0a174e]">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-300 text-sm">We embrace new technologies and creative solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#0a174e]">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-gray-300 text-sm">We build strong, supportive learning communities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandBanner; 