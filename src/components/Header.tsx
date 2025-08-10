import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PROGRAMME_CATEGORIES = [
  'Technology and Digital Skills',
  'Data and Analytics',
  'Health and Healthcare Innovation',
  'Cleaning and Sanitation Services',
  'Environment and Sustainability',
  'Engineering and Construction',
  'Leadership and Management',
  'Business, Strategy and Innovation',
  'Agriculture and Food System',
  'Professional Development and Leadership',
  'Music and Sound Production',
  'Art Design and Creative Media',
  'Drama, Theatre and Performance',
  'Mentorship & Career Readiness',
  'Specialized Industry Tracks',
  'Real Estate and Estate Management',
  'Hospitality, Tourism and Events',
  'Public Safety and Emergency Services',
  'Sports, Fitness and Wellness',
  'Vocational and Technical Training',
  'Social Care and Community Support',
  'Childhood Studies and Early Year Education',
];

const NAV_ITEMS = [
  {
    label: 'ABOUT US',
    link: '/about',
  },
  {
    label: 'PROGRAMME',
    categories: PROGRAMME_CATEGORIES,
    dropdown: [
      'Courses',
      'Workshops',
      'Mentorship',
      'Certifications',
    ],
  },
  { label: 'MENTORSHIP', link: '/mentorship' },
  { label: 'WORKSHOP', link: '/workshops' },
  { label: 'PARTNERS', link: '/partners' },
  { label: 'PRICING', link: '/pricing' },
  { label: 'RESOURCES', link: '/resources' },
  { label: 'COMMUNITY', link: '/community' },
  { label: 'LOG IN/ SIGN UP', link: '/login' },
];

const deepBlue = 'bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e]';
const deepBlueText = 'text-[#0a174e]';
const deepBlueHover = 'hover:bg-gradient-to-r hover:from-[#11235a] hover:via-[#2a3a7b] hover:to-[#11235a]';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setIsProfileOpen(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className={`shadow-md border-b border-gray-200 sticky top-0 z-50 ${deepBlue} pt-3 pb-1`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="OponMeta Logo"
                className="h-12 w-12 mr-3 animate-pulse hover:animate-spin transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:drop-shadow-yellow-400/50"
                style={{ minWidth: '3rem' }}
              />
              <span
                className="text-3xl font-extrabold group-hover:scale-105 transition-transform duration-300"
                style={{
                  color: '#FFC72C', // Gold
                  letterSpacing: '0.03em',
                  fontFamily: 'inherit',
                  textShadow: '0 0 10px rgba(255, 199, 44, 0.3)',
                }}
              >
                OponMeta
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-3" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                {item.link ? (
                  <Link
                    to={item.link}
                    className={`px-2 py-2 text-base font-medium text-white ${deepBlueHover} rounded transition-all duration-200 flex items-center border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20`}
                  >
                    {item.label}
                  </Link>
                ) : item.label === 'PROGRAMME' ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`px-2 py-2 text-base font-medium text-white ${deepBlueHover} rounded transition-all duration-200 flex items-center border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20 ${openDropdown === item.label ? 'bg-gradient-to-r from-[#11235a] via-[#2a3a7b] to-[#11235a]' : ''}`}
                    >
                      {item.label}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 backdrop-blur-sm bg-white/95">
                        <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">Categories</div>
                        {item.categories && item.categories.map((cat, idx) => (
                          <Link
                            key={cat + idx}
                            to={`/programme/${encodeURIComponent(cat)}`}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span>{cat}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                          </Link>
                        ))}
                        <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">Other</div>
                        {item.dropdown && item.dropdown.map((sub, idx) => (
                          <a
                            key={sub + idx}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`px-2 py-2 text-base font-medium text-white ${deepBlueHover} rounded transition-all duration-200 flex items-center border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20 ${openDropdown === item.label ? 'bg-gradient-to-r from-[#11235a] via-[#2a3a7b] to-[#11235a]' : ''}`}
                    >
                      {item.label}
                      {item.dropdown && (
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                    {openDropdown === item.label && item.dropdown && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 backdrop-blur-sm bg-white/95">
                        {item.dropdown.map((sub, idx) => (
                          <a
                            key={sub + idx}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300"
                placeholder="Search courses, instructors, topics..."
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4" ref={dropdownRef}>
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center text-white hover:text-gray-200 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">English</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Spanish</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">French</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">German</a>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-white hover:text-gray-200 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a174e]"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop"
                  alt="Profile"
                />
                <ChevronDown className={`ml-1 h-4 w-4 text-white transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200 backdrop-blur-sm bg-white/95">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Student Dashboard</Link>
                  <Link to="/vendor-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Vendor Dashboard</Link>
                  <hr className="my-1" />
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Your Profile</a>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Settings</Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Billing</a>
                  <hr className="my-1" />
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Sign out</a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:text-yellow-400 hover:bg-gradient-to-r hover:from-[#11235a] hover:via-[#2a3a7b] hover:to-[#11235a] transition-all duration-300 border border-transparent hover:border-yellow-400/30"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0a174e] focus:border-[#0a174e]"
                    placeholder="Search courses..."
                  />
                </div>
              </div>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="mb-2">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      >
                        {item.label}
                        {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                      </button>
                      {openDropdown === item.label && item.dropdown && (
                        <div className="pl-4 bg-white rounded shadow mt-1">
                          {item.dropdown.map((sub, idx) => (
                            <a
                              key={sub + idx}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {sub}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              
              {/* Dashboard Links for Mobile */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 px-3">Dashboards</div>
                <Link
                  to="/dashboard"
                  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Student Dashboard
                </Link>
                <Link
                  to="/vendor-dashboard"
                  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Vendor Dashboard
                </Link>
              </div>
              {/* Portal Links for Mobile */}
              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 px-3">Portals</div>
                <Link
                  to="/dashboard"
                  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Student Dashboard
                </Link>
                <Link
                  to="/vendor-dashboard"
                  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Vendor Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;