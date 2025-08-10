import React from 'react';
import { Globe, Eye, Target, Users, Award, Heart } from 'lucide-react';

const principles = [
  {
    icon: <Globe className="h-8 w-8 text-[#0a174e] mb-2" />,
    text: 'We celebrate and promote diverse expertise while connecting learners with comprehensive global knowledge networks and multilingual platforms.'
  },
  {
    icon: <Users className="h-8 w-8 text-[#0a174e] mb-2" />,
    text: 'Quality education with AI-powered learning, Web3 integration, and emerging technologies should be accessible to everyone, regardless of location or background.'
  },
  {
    icon: <Award className="h-8 w-8 text-[#0a174e] mb-2" />,
    text: 'We maintain the highest standards in course content, industry partnerships, blockchain certifications, and cutting-edge learning outcomes.'
  },
  {
    icon: <Heart className="h-8 w-8 text-[#0a174e] mb-2" />,
    text: 'Every course contributes to building stronger global communities through mentorship programs, professional networks, and sustainable development initiatives.'
  },
];

const stats = [
  { value: '50,000+', label: 'Lives Transformed' },
  { value: '54', label: 'Countries Reached' },
  { value: '1,200+', label: 'Expert Instructors' },
  { value: '89%', label: 'Career Advancement' },
];

const team = [
  {
    name: 'Founder & CEO',
    title: 'Former World Bank education specialist with 15+ years in African development',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Head of Technology',
    title: 'Tech entrepreneur who built educational platforms reaching 2M+ students',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Head of Content',
    title: 'Former university dean specializing in curriculum development and quality assurance',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Head of Partnerships',
    title: 'International education consultant with extensive network across MENA and Africa',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const About = () => (
  <div className="bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] min-h-screen pb-16">
    {/* Logo and tagline */}
    <div className="flex flex-col items-center pt-10 pb-4">
      <img src="/logo.png" alt="OponMeta Logo" className="h-20 w-20 mb-4 animate-pulse drop-shadow-lg" />
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg mb-2">OponMeta</h1>
      <p className="text-lg text-white font-semibold mb-2">Empowering Global Learning</p>
    </div>

    {/* About Us */}
    <div className="max-w-3xl mx-auto text-center mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">About Us</h2>
      <p className="text-gray-200 mb-2">We are a global EdTech powerhouse pioneering the future of digital learning. We craft transformative experiences in professional development and technical education, equipping today's learners and tomorrow's leaders with cutting-edge skills and knowledge. From interactive learning modules to scalable learning platforms, we empower institutions and individuals to unlock their full potential—redefining what learning can achieve across borders and industries.</p>
      <p className="text-gray-200 mb-2">Our mission is to democratize access to world-class education through innovative technology and personalized learning experiences. By fostering a culture of excellence and innovation, we support professionals in unlocking their full potential and shaping the future of global industries.</p>
    </div>

    {/* Approach Section */}
    <div className="max-w-3xl mx-auto text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow">Our Approach</h2>
      <p className="text-lg text-white font-medium">
        OponMeta blends digital learning platforms, practical workshops, mentorship programmes, and industry collaborations to create an all-encompassing professional development ecosystem.<br className="hidden md:block" />
        Designed for accessibility, adaptability, and impact, OponMeta ensures professionals remain competitive, forward-thinking, and equipped to lead in a rapidly evolving world.
      </p>
    </div>

    {/* Vision & Mission Cards */}
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <Target className="h-10 w-10 text-[#0a174e] mb-2" />
        <h3 className="text-xl font-bold text-[#0a174e] mb-2">Mission</h3>
        <p className="text-gray-700 text-center">To democratize access to high-quality global education through multilingual platforms, AI-powered learning, Web3 integration, industry partnerships, and inclusive programs that empower learners, educators, and organizations worldwide with future-ready skills.</p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <Eye className="h-10 w-10 text-[#0a174e] mb-2" />
        <h3 className="text-xl font-bold text-[#0a174e] mb-2">Vision</h3>
        <p className="text-gray-700 text-center">A future where every learner globally has access to comprehensive, technology-enhanced education, where diverse expertise is recognized and celebrated, and where innovative learning solutions serve as the foundation for sustainable development and global collaboration.</p>
      </div>
    </div>

    {/* Principles */}
    <div className="max-w-6xl mx-auto mb-10">
      <h2 className="text-2xl font-bold text-[#0a174e] text-center mb-6">The principles that guide everything we do</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {principles.map((p, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            {p.icon}
            <p className="text-gray-700 text-sm">{p.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Impact Stats */}
    <div className="bg-white py-10 mb-10">
      <h2 className="text-xl font-bold text-[#0a174e] text-center mb-6">Making comprehensive education accessible globally through innovative technology</h2>
      <div className="flex flex-wrap justify-center gap-10 max-w-4xl mx-auto">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0a174e]">{stat.value}</span>
            <span className="text-gray-700 text-base font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Team Section */}
    <div className="max-w-6xl mx-auto mb-10">
      <h2 className="text-2xl font-bold text-[#0a174e] text-center mb-6">Passionate educators and technologists dedicated to transforming global education through innovation</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {team.map((member, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <img src={member.img} alt={member.name} className="h-20 w-20 rounded-full mb-3 object-cover" />
            <span className="text-[#0a174e] font-bold mb-1">{member.name}</span>
            <span className="text-gray-600 text-sm mb-2">{member.title}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Community CTA */}
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold text-[#0a174e] mb-2">Whether you're a learner, educator, or partner, there's a place for you in our community</h2>
      <button className="mt-4 px-8 py-3 bg-[#0a174e] text-white font-bold rounded shadow hover:bg-indigo-700 transition">Start Learning</button>
    </div>
  </div>
);

export default About; 