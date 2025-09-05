import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Sun, Moon, Laptop, Globe, CloudSun, 
  Users, BookOpen, Briefcase, Megaphone, Sparkles, UserCog, 
  Layers, UserPlus, UserCheck, User, LogIn, LogOut, PlusCircle, 
  Search, Play, Target, TrendingUp, Award, Heart, Star, Zap, 
  BarChart3, Shield, Home, Wrench, CreditCard, Gift, Calendar, 
  Truck, Music, Video, Handshake, Compass, Monitor, FileText,
  ChevronRight, Download, CheckCircle, Crown, Brain
} from "lucide-react";
import { ThemeToggle } from './ThemeToggle';
import { CompactLanguageSelector, SearchableLanguageSelector } from './LanguageSelector';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const deepBlue = 'bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e]';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`shadow-md border-b border-gray-200 sticky top-0 z-50 ${deepBlue} pt-3 pb-1`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="OponMeta Logo"
                  className="h-12 w-12 mr-3 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-12"
                  style={{ 
                    minWidth: '3rem',
                    filter: 'drop-shadow(0 4px 8px rgba(255, 199, 44, 0.2))'
                  }}
                />
              </div>
              <div className="relative group/text">
                <span
                  className="text-3xl font-extrabold transition-all duration-700 ease-out group-hover:text:scale-105 group-hover:text:translate-x-1"
                  style={{
                    color: '#FFC72C',
                    letterSpacing: '0.03em',
                    fontFamily: 'inherit',
                    textShadow: '0 0 10px rgba(255, 199, 44, 0.3)'
                  }}
                >
                  OponMeta
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" ref={dropdownRef}>
            {/* Programmes Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'programmes' ? null : 'programmes')}
                className="flex items-center px-4 py-2 text-white hover:text-yellow-400 transition-colors font-medium"
              >
                PROGRAMMES
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'programmes' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'programmes' && (
                <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-100">
                    Course Categories
                  </div>
                  <Link
                    to="/programmes"
                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex items-center">
                      <Laptop className="w-5 h-5 text-[#0a174e]" />
                      <span className="ml-3">Technology and Digital Skills</span>
                    </div>
                    <span className="text-xs text-gray-500">(0 Courses)</span>
                  </Link>
                  <Link
                    to="/programmes"
                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-cyan-500" />
                      <span className="ml-3">Data and Analytics</span>
                    </div>
                    <span className="text-xs text-gray-500">(0 Courses)</span>
                  </Link>
                  <Link
                    to="/programmes"
                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-green-500" />
                      <span className="ml-3">Health and Healthcare Innovation</span>
                    </div>
                    <span className="text-xs text-gray-500">(0 Courses)</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Platform Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'platform' ? null : 'platform')}
                className="flex items-center px-4 py-2 text-white hover:text-yellow-400 transition-colors font-medium"
              >
                PLATFORM
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'platform' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'platform' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  <Link
                    to="/course-library"
                    className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <BookOpen className="w-5 h-5 text-[#0a174e]" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Course Library</div>
                      <div className="text-xs text-gray-500 mt-1">Browse our extensive course collection</div>
                    </div>
                  </Link>
                  <Link
                    to="/ai-course-creator"
                    className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <Sparkles className="w-5 h-5 text-[#0a174e]" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">AI Course Creator</div>
                      <div className="text-xs text-gray-500 mt-1">Create courses with AI assistance</div>
                    </div>
                  </Link>
                  <Link
                    to="/student-portal"
                    className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Student Portal</div>
                      <div className="text-xs text-gray-500 mt-1">Access your learning dashboard and courses</div>
                    </div>
                  </Link>
                  <Link
                    to="/instructor-portal"
                    className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <UserCog className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Instructor Portal</div>
                      <div className="text-xs text-gray-500 mt-1">Manage your courses and instructor tools</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                className="flex items-center px-4 py-2 text-white hover:text-yellow-400 transition-colors font-medium"
              >
                RESOURCES
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  <Link
                    to="/blogs"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <FileText className="w-5 h-5 text-orange-600" />
                    <span className="ml-3">Blogs</span>
                  </Link>
                  <Link
                    to="/download-app"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <Download className="w-5 h-5 text-[#0a174e]" />
                    <span className="ml-3">Download the App</span>
                  </Link>
                  <Link
                    to="/stripe-connect"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <CreditCard className="w-5 h-5 text-green-600" />
                    <span className="ml-3">Stripe Connect</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Search className={`h-5 w-5 transition-colors duration-200 ${isSearchExpanded ? 'text-gray-500' : 'text-gray-300'}`} />
              </div>
              <input
                type="text"
                placeholder="Search courses, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <CompactLanguageSelector
              className="text-white hover:text-yellow-400 transition-colors"
              size="sm"
            />

            {/* Theme Switcher */}
            <ThemeToggle 
              variant="button"
              size="sm"
              showLabels={false}
              className="text-white hover:text-yellow-400 transition-colors"
            />

            {/* Sign In Button */}
            <Link
              to="/login"
              className="px-3 py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center"
            >
              <LogIn className="h-4 w-4 mr-1" />
              Sign In
            </Link>

            {/* Get Started Button */}
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 flex items-center"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Get Started
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/programmes"
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Programmes
              </Link>
              <Link
                to="/platform"
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Platform
              </Link>
              <Link
                to="/resources"
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;