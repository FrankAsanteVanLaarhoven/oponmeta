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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                    OponMeta
                  </span>
                  <span className="text-xs text-yellow-300 font-medium tracking-wider">
                    LEARNING PLATFORM
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Programmes Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('programmes')}
                  className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
                >
                  Programmes
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'programmes' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'programmes' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="grid grid-cols-2 gap-1">
                      <Link to="/programmes" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">All Programmes</div>
                          <div className="text-sm text-gray-500">Browse all courses</div>
                        </div>
                      </Link>
                      <Link to="/programmes/technology" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Monitor className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Technology</div>
                          <div className="text-sm text-gray-500">Digital skills</div>
                        </div>
                      </Link>
                      <Link to="/programmes/business" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Briefcase className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Business</div>
                          <div className="text-sm text-gray-500">Management skills</div>
                        </div>
                      </Link>
                      <Link to="/programmes/creative" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Sparkles className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Creative Arts</div>
                          <div className="text-sm text-gray-500">Design and media</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Platform Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('platform')}
                  className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
                >
                  Platform
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'platform' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'platform' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="grid grid-cols-2 gap-1">
                      <Link to="/features" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Zap className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Features</div>
                          <div className="text-sm text-gray-500">Platform capabilities</div>
                        </div>
                      </Link>
                      <Link to="/mobile-courses" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Monitor className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Mobile Courses</div>
                          <div className="text-sm text-gray-500">Mobile marketplace</div>
                        </div>
                      </Link>
                      <Link to="/instructor-portal" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <UserCog className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Instructor Portal</div>
                          <div className="text-sm text-gray-500">Teach with us</div>
                        </div>
                      </Link>
                      <Link to="/student-portal" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <User className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Student Portal</div>
                          <div className="text-sm text-gray-500">Your dashboard</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('resources')}
                  className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
                >
                  Resources
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="grid grid-cols-2 gap-1">
                      <Link to="/about" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Heart className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">About Us</div>
                          <div className="text-sm text-gray-500">Our mission</div>
                        </div>
                      </Link>
                      <Link to="/events" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Events</div>
                          <div className="text-sm text-gray-500">Upcoming events</div>
                        </div>
                      </Link>
                      <Link to="/press" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Megaphone className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Press</div>
                          <div className="text-sm text-gray-500">News and media</div>
                        </div>
                      </Link>
                      <Link to="/contact" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Handshake className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Contact</div>
                          <div className="text-sm text-gray-500">Get in touch</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link to="/pricing" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">
                Pricing
              </Link>
              <Link to="/signup" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">
                Sign Up
              </Link>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                </form>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle
                variant="button"
                size="sm"
                showLabels={false}
                className="text-white hover:text-yellow-400 transition-colors"
              />

              {/* Language Selector */}
              <CompactLanguageSelector />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-yellow-400 transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <img src="/logo.png" alt="OponMeta" className="h-8 w-8 mr-2" />
                  <span className="text-lg font-bold text-gray-900">OponMeta</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-200">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </form>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-2">
                  {/* Programmes Section */}
                  <div>
                    <button
                      onClick={() => toggleDropdown('mobile-programmes')}
                      className="flex items-center justify-between w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                        <span className="font-medium">Programmes</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'mobile-programmes' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'mobile-programmes' && (
                      <div className="ml-8 mt-2 space-y-1">
                        <Link to="/programmes" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          All Programmes
                        </Link>
                        <Link to="/programmes/technology" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Technology and Digital Skills
                        </Link>
                        <Link to="/programmes/business" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Business and Management
                        </Link>
                        <Link to="/programmes/creative" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Creative Arts and Media
                        </Link>
                        <Link to="/programmes/health" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Health and Healthcare
                        </Link>
                        <Link to="/programmes/agriculture" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Agriculture and Food Systems
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Platform Section */}
                  <div>
                    <button
                      onClick={() => toggleDropdown('mobile-platform')}
                      className="flex items-center justify-between w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Monitor className="w-5 h-5 mr-3 text-blue-500" />
                        <span className="font-medium">Platform</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'mobile-platform' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'mobile-platform' && (
                      <div className="ml-8 mt-2 space-y-1">
                        <Link to="/features" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Platform Features
                        </Link>
                        <Link to="/mobile-courses" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Mobile Course Marketplace
                        </Link>
                        <Link to="/instructor-portal" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Instructor Portal
                        </Link>
                        <Link to="/student-portal" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Student Portal
                        </Link>
                        <Link to="/world-class-lms-features" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          LMS Features
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Resources Section */}
                  <div>
                    <button
                      onClick={() => toggleDropdown('mobile-resources')}
                      className="flex items-center justify-between w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-blue-500" />
                        <span className="font-medium">Resources</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'mobile-resources' && (
                      <div className="ml-8 mt-2 space-y-1">
                        <Link to="/about" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          About Us
                        </Link>
                        <Link to="/events" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Events and Conferences
                        </Link>
                        <Link to="/press" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Press and Media
                        </Link>
                        <Link to="/contact" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Contact Us
                        </Link>
                        <Link to="/help" onClick={closeMobileMenu} className="block p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Help Centre
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Direct Links */}
                  <Link to="/pricing" onClick={closeMobileMenu} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <CreditCard className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">Pricing</span>
                  </Link>

                  <Link to="/signup" onClick={closeMobileMenu} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <UserPlus className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">Sign Up</span>
                  </Link>

                  <Link to="/login" onClick={closeMobileMenu} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <LogIn className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">Login</span>
                  </Link>
                </nav>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Theme</span>
                  <ThemeToggle
                    variant="buttons"
                    size="sm"
                    showLabels={true}
                    className="w-full justify-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Language</span>
                  <SearchableLanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;