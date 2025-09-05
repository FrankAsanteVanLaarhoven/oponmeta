import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, Globe, Cloud, Users, BookOpen, Briefcase, 
  Megaphone as MegaphoneIcon, Sparkles, UserCog as UserCogIcon, Layers as LayersIcon, UserPlus as UserPlusIcon, UserCheck, 
  Search, Play, Target, TrendingUp, Award, Heart, Star, Zap, 
  BarChart3, Shield, Home, Wrench, CreditCard, Gift, Calendar, 
  Truck as TruckIcon, Music as MusicIcon, Video as VideoIcon, Handshake as HandshakeIcon, Mail, Phone, MapPin,
  Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon, Linkedin as LinkedinIcon, Youtube as YoutubeIcon, Github as GithubIcon,
  ExternalLink, MessageCircle, MessageSquare
} from "lucide-react";

// Course categories data
const COURSE_CATEGORIES = [
  { icon: <Monitor className="w-4 h-4 text-blue-600" />, name: 'Technology and Digital Skills', slug: 'technology-and-digital-skills' },
  { icon: <BarChart3 className="w-4 h-4 text-cyan-500" />, name: 'Data and Analytics', slug: 'data-and-analytics' },
  { icon: <Heart className="w-4 h-4 text-green-500" />, name: 'Health and Healthcare Innovation', slug: 'health-and-healthcare-innovation' },
  { icon: <Cloud className="w-4 h-4 text-blue-400" />, name: 'Cleaning and Sanitation Services', slug: 'cleaning-and-sanitation-services' },
  { icon: <Cloud className="w-4 h-4 text-green-400" />, name: 'Environment and Sustainability', slug: 'environment-and-sustainability' },
  { icon: <Zap className="w-4 h-4 text-lime-500" />, name: 'Engineering and Construction', slug: 'engineering-and-construction' },
  { icon: <Users className="w-4 h-4 text-cyan-500" />, name: 'Leadership and Management', slug: 'leadership-and-management' },
  { icon: <Briefcase className="w-4 h-4 text-purple-500" />, name: 'Business, Strategy and Innovation', slug: 'business-strategy-and-innovation' },
  { icon: <Globe className="w-4 h-4 text-green-500" />, name: 'Agriculture and Food System', slug: 'agriculture-and-food-system' },
  { icon: <Target className="w-4 h-4 text-orange-500" />, name: 'Professional Development and Leadership', slug: 'professional-development-and-leadership' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e] text-white -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative">
                                 <img
                   src="/logo.png"
                   alt="OponMeta Logo"
                   className="h-10 w-10 mr-3"
                   onError={(e) => {
                     // Fallback to other logo files if main logo fails
                     const target = e.target as HTMLImageElement;
                     if (target.src.includes('/logo.png')) {
                       target.src = '/oponmeta-logo .png';
                     } else if (target.src.includes('oponmeta-logo')) {
                       target.src = '/branding/logo.png';
                     } else {
                       // Final fallback - hide image and show text only
                       target.style.display = 'none';
                     }
                   }}
                 />
                {/* Fallback logo circle if image fails to load */}
                <div className="h-10 w-10 mr-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center hidden">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-yellow-400">
                OponMeta
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Empowering Global Learning</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              We are a global EdTech powerhouse pioneering the future of digital learning. We craft transformative experiences in professional development and technical education, equipping today's learners and tomorrow's leaders with cutting-edge skills and knowledge.
            </p>
            <div className="space-y-2 mb-4">
              <span className="flex items-center text-gray-300 text-sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                oponmeta.com
              </span>
              <a href="mailto:info@oponmeta.com" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                <Mail className="w-4 h-4 mr-2" />
                info@oponmeta.com
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About and Values */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">About and Values</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mission" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Mission
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Vision
                </Link>
              </li>
              <li>
                <Link to="/approach" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning and Platform */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Learning and Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <Wrench className="w-4 h-4 mr-2" />
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/student-portal" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/instructor-portal" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <UserCogIcon className="w-4 h-4 mr-2" />
                  Instructor Portal
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Community and Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Community and Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/community-forums" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Community Forums
                </Link>
              </li>
              <li>
                <Link to="/alumni-network" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Alumni Network
                </Link>
              </li>
              <li>
                <Link to="/events" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Events and Networking
                </Link>
              </li>
              <li>
                <Link to="/support" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-yellow-400">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-medium rounded-r-lg hover:bg-yellow-500 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

                    {/* Bottom Section */}
            <div className="border-t border-white mt-8 pt-8 bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e] text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-white text-sm mb-4 md:mb-0">
                  © {currentYear} OponMeta. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm">
                  <Link to="/privacy" className="text-white hover:text-[#FFD700] transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-white hover:text-[#FFD700] transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/cookies" className="text-white hover:text-[#FFD700] transition-colors">
                    Cookie Policy
                  </Link>
                  <Link to="/accessibility" className="text-white hover:text-[#FFD700] transition-colors">
                    Accessibility
                  </Link>
                </div>
              </div>
            </div>
      </div>
    </footer>
  );
};

export default Footer; 