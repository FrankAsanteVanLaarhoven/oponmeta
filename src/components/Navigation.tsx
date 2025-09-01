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
import ThemeToggle from './ThemeToggle';
import { CompactLanguageSelector } from './LanguageSelector';

// Course categories data (Non-career focused categories)
const COURSE_CATEGORIES = [
  { icon: <Laptop className="w-5 h-5 text-[#0a174e]" />, name: 'Technology and Digital Skills', slug: 'technology-and-digital-skills', count: 0 },
  { icon: <BarChart3 className="w-5 h-5 text-cyan-500" />, name: 'Data and Analytics', slug: 'data-and-analytics', count: 0 },
  { icon: <Heart className="w-5 h-5 text-green-500" />, name: 'Health and Healthcare Innovation', slug: 'health-and-healthcare-innovation', count: 0 },
  { icon: <CloudSun className="w-5 h-5 text-[#1a2a6b]" />, name: 'Cleaning and Sanitation Services', slug: 'cleaning-and-sanitation-services', count: 0 },
  { icon: <CloudSun className="w-5 h-5 text-[#1a2a6b]" />, name: 'Environment and Sustainability', slug: 'environment-and-sustainability', count: 0 },
  { icon: <Zap className="w-5 h-5 text-lime-500" />, name: 'Engineering and Construction', slug: 'engineering-and-construction', count: 0 },
  { icon: <Briefcase className="w-5 h-5 text-[#0a174e]" />, name: 'Business, Strategy and Innovation', slug: 'business-strategy-and-innovation', count: 0 },
  { icon: <Globe className="w-5 h-5 text-green-500" />, name: 'Agriculture and Food System', slug: 'agriculture-and-food-system', count: 0 },
  { icon: <Target className="w-5 h-5 text-orange-500" />, name: 'Professional Development and Leadership', slug: 'professional-development-and-leadership', count: 0 },
  { icon: <Music className="w-5 h-5 text-pink-500" />, name: 'Music and Sound Production', slug: 'music-and-sound-production', count: 0 },
  { icon: <Star className="w-5 h-5 text-[#1a2a6b]" />, name: 'Art Design and Creative Media', slug: 'art-design-and-creative-media', count: 0 },
  { icon: <Video className="w-5 h-5 text-red-500" />, name: 'Drama, Theatre and Performance', slug: 'drama-theatre-and-performance', count: 0 },
  { icon: <TrendingUp className="w-5 h-5 text-green-600" />, name: 'Sports, Fitness and Wellness', slug: 'sports-fitness-and-wellness', count: 0 },
  { icon: <Wrench className="w-5 h-5 text-gray-600" />, name: 'Vocational and Technical Training', slug: 'vocational-and-technical-training', count: 0 },
  { icon: <Heart className="w-5 h-5 text-pink-400" />, name: 'Childhood Studies and Early Year Education', slug: 'childhood-studies-and-early-year-education', count: 0 },
];

// Other categories
const OTHER_CATEGORIES = [
  { icon: <BookOpen className="w-5 h-5 text-[#0a174e]" />, name: 'Courses', slug: 'courses', count: 0 },
  { icon: <Wrench className="w-5 h-5 text-green-600" />, name: 'Workshops', slug: 'workshops', count: 0 },
  { icon: <UserCog className="w-5 h-5 text-[#0a174e]" />, name: 'Mentorship', slug: 'mentorship', count: 0 },
];

// Career categories
const CAREER_CATEGORIES = [
  { icon: <Users className="w-5 h-5 text-[#0a174e]" />, name: 'About Us', slug: 'about', count: 'Company Info' },
  { icon: <Wrench className="w-5 h-5 text-green-600" />, name: 'Workshops', slug: 'workshops', count: 'Live Sessions' },
  { icon: <Handshake className="w-5 h-5 text-[#0a174e]" />, name: 'Our Partners', slug: 'our-partners', count: 'Collaborations' },
  { icon: <Users className="w-5 h-5 text-[#1a2a6b]" />, name: 'Leadership and Management', slug: 'leadership-and-management', count: 0 },
  { icon: <UserCog className="w-5 h-5 text-[#0a174e]" />, name: 'Mentorship & Career Readiness', slug: 'mentorship-career-readiness', count: 0 },
  { icon: <Layers className="w-5 h-5 text-teal-500" />, name: 'Specialised Industry Tracks', slug: 'specialised-industry-tracks', count: 0 },
  { icon: <Home className="w-5 h-5 text-[#0a174e]" />, name: 'Real Estate and Estate Management', slug: 'real-estate-and-estate-management', count: 0 },
  { icon: <Shield className="w-5 h-5 text-red-600" />, name: 'Public Safety and Emergency Services', slug: 'public-safety-and-emergency-services', count: 0 },
  { icon: <Users className="w-5 h-5 text-[#1a2a6b]" />, name: 'Social Care and Community Support', slug: 'social-care-and-community-support', count: 0 },
  { icon: <Heart className="w-5 h-5 text-green-500" />, name: 'Health Science', slug: 'health-science', count: 162 },
  { icon: <CreditCard className="w-5 h-5 text-green-600" />, name: 'Finance', slug: 'finance', count: 62 },
  { icon: <Laptop className="w-5 h-5 text-[#0a174e]" />, name: 'Information Technology', slug: 'information-technology', count: 57 },
  { icon: <BookOpen className="w-5 h-5 text-[#0a174e]" />, name: 'Education & Training', slug: 'education-training', count: 57 },
  { icon: <Briefcase className="w-5 h-5 text-[#0a174e]" />, name: 'Business Management & Administration', slug: 'business-management-administration', count: 57 },
  { icon: <TrendingUp className="w-5 h-5 text-orange-500" />, name: 'Marketing, Sales, & Service', slug: 'marketing-sales-service', count: 48 },
  { icon: <Globe className="w-5 h-5 text-green-500" />, name: 'Agriculture, Food, & Natural Resources', slug: 'agriculture-food-natural-resources', count: 37 },
  { icon: <Calendar className="w-5 h-5 text-orange-400" />, name: 'Hospitality & Tourism', slug: 'hospitality-tourism', count: 34 },
];

// Platform features
const PLATFORM_FEATURES = [
  { icon: <BookOpen className="w-5 h-5 text-[#0a174e]" />, name: 'Course Library', slug: 'course-library', description: 'Browse our extensive course collection' },
  { icon: <Sparkles className="w-5 h-5 text-[#0a174e]" />, name: 'AI Course Creator', slug: 'ai-course-creator', description: 'Create courses with AI assistance' },
  { icon: <Layers className="w-5 h-5 text-green-600" />, name: 'Course Authoring Tool', slug: 'course-authoring-tool', description: 'Drag-and-drop course builder with templates' },
  { icon: <Video className="w-5 h-5 text-[#0a174e]" />, name: 'AI Video Calling', slug: 'ai-video-calling', description: 'Connect with AI tutors and experts' },
  { icon: <Users className="w-5 h-5 text-[#0a174e]" />, name: 'Companion Library', slug: 'companion-library', description: 'AI learning companions for personalised support' },
  { icon: <Monitor className="w-5 h-5 text-teal-600" />, name: 'Whiteboard', slug: 'whiteboard', description: 'Interactive whiteboard for collaborative learning' },
  { icon: <User className="w-5 h-5 text-blue-600" />, name: 'Student Portal', slug: 'student-portal', description: 'Access your learning dashboard and courses' },
  { icon: <UserCog className="w-5 h-5 text-green-600" />, name: 'Instructor Portal', slug: 'instructor-portal', description: 'Manage your courses and instructor tools' },
];

// Resources and tools
const RESOURCES_TOOLS = [
  { icon: <UserCog className="w-5 h-5 text-[#0a174e]" />, name: 'Creators Portal', slug: 'creators-portal', description: 'Manage your courses and track performance', isNew: true },
  { icon: <CreditCard className="w-5 h-5 text-green-600" />, name: 'Stripe Connect', slug: 'stripe-connect', description: 'Marketplace payment processing & connected accounts', isNew: true },
  { icon: <Globe className="w-5 h-5 text-blue-600" />, name: 'Localization Demo', slug: 'localization-demo', description: 'Comprehensive demonstration of multilingual features', isNew: true },
  { icon: <Video className="w-5 h-5 text-[#0a174e]" />, name: 'Meet AI Video Calling Powered by AI Agents', slug: 'meet-ai-video-calling', description: 'Experience AI-powered learning', isNew: true },
  { icon: <Globe className="w-5 h-5 text-green-600" />, name: 'Share Your Knowledge Globally', slug: 'share-knowledge-globally', description: 'Inspire learners worldwide and grow your teaching career with our global platform', isNew: true },
  { icon: <UserPlus className="w-5 h-5 text-[#0a174e]" />, name: 'Become an Instructor', slug: 'become-instructor', description: 'Share your knowledge and earn revenue', isNew: true },
  { icon: <UserCog className="w-5 h-5 text-[#0a174e]" />, name: 'Instructor Portal', slug: 'instructor-portal', description: 'Access your instructor dashboard and tools', isNew: true },
  { icon: <FileText className="w-5 h-5 text-orange-600" />, name: 'Blogs', slug: 'blogs', description: 'News, insights, tips and stories from our platform' },
  { icon: <Download className="w-5 h-5 text-[#0a174e]" />, name: 'Download the App', slug: 'download-app', description: 'Learn anywhere, anytime for free' },
  { icon: <FileText className="w-5 h-5 text-green-500" />, name: 'Résumé Builder', slug: 'resume-builder', description: 'Create your professional résumé', isNew: true },
  { icon: <Target className="w-5 h-5 text-[#0a174e]" />, name: 'Career Ready Plan', slug: 'career-ready-plan', description: 'Plan to achieve your career goals', isNew: true },
  { icon: <BarChart3 className="w-5 h-5 text-[#0a174e]" />, name: 'Aptitude Test', slug: 'aptitude-test', description: 'Assess your skills and abilities' },
  { icon: <Users className="w-5 h-5 text-pink-500" />, name: 'Workplace Personality Assessment', slug: 'workplace-personality-assessment', description: 'Discover your strengths & weaknesses' },
  { icon: <Heart className="w-5 h-5 text-red-500" />, name: 'Mental Health Assessment', slug: 'mental-health-assessment', description: 'Assess your mental wellbeing' },
  { icon: <Layers className="w-5 h-5 text-[#1a2a6b]" />, name: 'Learning Management System', slug: 'learning-management-system', description: 'Up-skill and empower your team' },
  { icon: <Video className="w-5 h-5 text-green-400" />, name: 'Webinars', slug: 'webinars', description: 'Register for upcoming webinars' },
  { icon: <Shield className="w-5 h-5 text-[#1a2a6b]" />, name: 'Plagiarism Checker', slug: 'plagiarism-checker', description: 'Premium AI-powered plagiarism detection', isPremium: true },
  { icon: <CheckCircle className="w-5 h-5 text-green-400" />, name: 'Grammar Checker', slug: 'grammar-checker', description: 'Free AI grammar and style checker' },
  { icon: <Crown className="w-5 h-5 text-yellow-500" />, name: 'Get Premium', slug: 'get-premium', description: 'Remove ads' },
  { icon: <CreditCard className="w-5 h-5 text-blue-500" />, name: 'Subscription', slug: 'subscription', description: 'Manage your subscription plans' },
  { icon: <Users className="w-5 h-5 text-[#2a3a7b]" />, name: 'Graduate Profiles', slug: 'graduate-profiles', description: 'Read graduate success stories' },
  { icon: <Award className="w-5 h-5 text-yellow-400" />, name: 'Certification', slug: 'certification', description: 'View and verify course certificates', isNew: true },
  { icon: <Brain className="w-5 h-5 text-[#2a3a7b]" />, name: 'How to Build a Growth Mindset', slug: 'growth-mindset', description: 'Practical strategies for lifelong learning and personal development' },
  { icon: <Users className="w-5 h-5 text-green-300" />, name: 'Community', slug: 'community', description: 'Connect with learners and share experiences' },
  { icon: <Shield className="w-5 h-5 text-red-600" />, name: 'Super Admin', slug: 'super-admin', description: 'Enterprise governance and system administration', isAdmin: true },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSearchResults, setFilteredSearchResults] = useState<Array<{title: string, category: string, url: string}>>([]);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      // Combine all searchable content
      const allSearchableContent = [
        ...COURSE_CATEGORIES.map(cat => ({ title: cat.name, category: 'Course Category', url: `/programme/${cat.slug}` })),
        ...CAREER_CATEGORIES.map(cat => ({ title: cat.name, category: 'Career Category', url: cat.slug === 'about' ? '/about' : `/career/${cat.slug}` })),
        ...PLATFORM_FEATURES.map(feat => ({ title: feat.name, category: 'Platform Feature', url: `/${feat.slug}` })),
        ...RESOURCES_TOOLS.map(res => ({ title: res.name, category: 'Resource', url: `/resources/${res.slug}` }))
      ];

      // Filter results based on search query
      const filtered = allSearchableContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredSearchResults(filtered.slice(0, 10)); // Limit to 10 results
    } else {
      setFilteredSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchResultClick = (result: {title: string, category: string, url: string}) => {
    setSearchQuery('');
    setFilteredSearchResults([]);
    setIsSearchExpanded(false);
    // Navigate to the result URL
    window.location.href = result.url;
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const deepBlue = 'bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e]';
  const deepBlueHover = 'hover:bg-gradient-to-r hover:from-[#11235a] hover:via-[#2a3a7b] hover:to-[#11235a]';

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
                   className="h-12 w-12 mr-3 animate-pulse hover:animate-spin transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:drop-shadow-yellow-400/50"
                   style={{ minWidth: '3rem' }}
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
                <div className="h-12 w-12 mr-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse hover:animate-spin transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:drop-shadow-yellow-400/50 hidden">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
              </div>
              <span
                className="text-3xl font-extrabold group-hover:scale-105 transition-transform duration-300"
                style={{
                  color: '#FFC72C',
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
          <nav className="hidden lg:flex space-x-1" ref={dropdownRef}>
            {/* Main Navigation Links */}




            
            {/* Programmes Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('programmes')}
                className={`px-3 py-2 text-base font-medium text-white ${deepBlueHover} rounded transition-all duration-200 flex items-center border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20 ${activeDropdown === 'programmes' ? 'bg-gradient-to-r from-[#11235a] via-[#2a3a7b] to-[#11235a]' : ''}`}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                PROGRAMMES
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'programmes' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'programmes' && (
                <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 backdrop-blur-sm bg-white/95">
                  <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">CATEGORIES</div>
                  {COURSE_CATEGORIES.map((category) => {
                    // Map course category slugs to actual routes
                    const routeMap: { [key: string]: string } = {
                      'technology-and-digital-skills': '/technology-and-digital-skills',
                      'data-and-analytics': '/data-and-analytics',
                      'health-and-healthcare-innovation': '/health-and-healthcare-innovation',
                      'cleaning-and-sanitation-services': '/cleaning-and-sanitation-services',
                      'environment-and-sustainability': '/environment-and-sustainability',
                      'engineering-and-construction': '/engineering-and-construction',
                      'business-strategy-and-innovation': '/business-strategy-and-innovation',
                      'agriculture-and-food-system': '/agriculture-and-food-system',
                      'professional-development-and-leadership': '/professional-development-and-leadership',
                      'music-and-sound-production': '/music-and-sound-production',
                      'art-design-and-creative-media': '/art-design-and-creative-media',
                      'drama-theatre-and-performance': '/drama-theatre-and-performance',
                      'sports-fitness-and-wellness': '/sports-fitness-and-wellness',
                      'vocational-and-technical-training': '/vocational-and-technical-training',
                      'childhood-studies-and-early-year-education': '/childhood-studies-and-early-year-education'
                    };
                    
                    const route = routeMap[category.slug] || `/${category.slug}`;
                    
                    return (
                      <Link
                        key={category.slug}
                        to={route}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-3">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">({category.count} Courses)</span>
                      </Link>
                    );
                  })}
                  
                  <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">OTHER</div>
                  {OTHER_CATEGORIES.map((category) => {
                    // Map other category slugs to actual routes
                    const otherRouteMap: { [key: string]: string } = {
                      'courses': '/courses',
                      'workshops': '/workshops',
                      'mentorship': '/mentorship-career'
                    };
                    
                    const route = otherRouteMap[category.slug] || `/${category.slug}`;
                    
                    return (
                      <Link
                        key={category.slug}
                        to={route}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-3">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">({category.count} Courses)</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Explore Career Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('career-categories')}
                className={`px-3 py-2 text-base font-medium text-white ${deepBlueHover} rounded transition-all duration-200 flex items-center border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20 ${activeDropdown === 'career-categories' ? 'bg-gradient-to-r from-[#11235a] via-[#2a3a7b] to-[#11235a]' : ''}`}
              >
                <Target className="w-4 h-4 mr-1" />
                EXPLORE CAREER CATEGORIES
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'career-categories' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'career-categories' && (
                <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 backdrop-blur-sm bg-white/95">
                  <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">CAREER CATEGORIES</div>
                  {CAREER_CATEGORIES.map((category) => {
                    // Map career category slugs to actual routes
                    const routeMap: { [key: string]: string } = {
                      'about': '/about',
                      'workshops': '/workshops',
                      'our-partners': '/partners',
                      'leadership-and-management': '/leadership-management',
                      'mentorship-career-readiness': '/mentorship-career',
                      'specialised-industry-tracks': '/specialised-tracks',
                      'real-estate-and-estate-management': '/real-estate',
                      'public-safety-and-emergency-services': '/public-safety',
                      'social-care-and-community-support': '/social-care',
                      'health-science': '/health-science',
                      'finance': '/finance',
                      'information-technology': '/information-technology',
                      'education-training': '/education-training',
                      'business-management-administration': '/business-management',
                      'marketing-sales-service': '/marketing-sales',
                      'agriculture-food-natural-resources': '/agriculture-food',
                      'hospitality-tourism': '/hospitality-tourism'
                    };
                    
                    const route = routeMap[category.slug] || `/${category.slug}`;
                    
                    return (
                      <Link
                        key={category.slug}
                        to={route}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-3">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {typeof category.count === 'number' ? `(${category.count} Courses)` : `(${category.count})`}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>



            {/* Platform Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('platform')}
                className={`px-3 py-2 text-base font-medium text-white ${deepBlueHover} rounded transition-all duration-200 flex items-center border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20 ${activeDropdown === 'platform' ? 'bg-gradient-to-r from-[#11235a] via-[#2a3a7b] to-[#11235a]' : ''}`}
              >
                <Monitor className="w-4 h-4 mr-1" />
                PLATFORM
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'platform' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'platform' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 backdrop-blur-sm bg-white/95">
                  <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">PLATFORM FEATURES</div>
                  {PLATFORM_FEATURES.map((feature) => {
                    // Map platform feature slugs to actual routes
                    const routeMap: { [key: string]: string } = {
                      'ai-course-creator': '/ai-course-creator',
                      'course-authoring-tool': '/course-authoring',
                      'companion-library': '/companions-library',
                      'whiteboard': '/whiteboard',
                      'course-library': '/course-library',
                      'ai-video-calling': '/ai-video-calling'
                    };
                    
                    const route = routeMap[feature.slug] || `/${feature.slug}`;
                    
                    return (
                      <Link
                        key={feature.slug}
                        to={route}
                        className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {feature.icon}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{feature.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className={`px-3 py-2 text-base font-medium text-white ${deepBlueHover} rounded transition-all duration-200 flex items-center border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20 ${activeDropdown === 'resources' ? 'bg-gradient-to-r from-[#11235a] via-[#2a3a7b] to-[#11235a]' : ''}`}
              >
                <FileText className="w-4 h-4 mr-1" />
                RESOURCES
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 backdrop-blur-sm bg-white/95 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">RESOURCES & TOOLS</div>
                  {RESOURCES_TOOLS.map((resource) => (
                    <Link
                      key={resource.slug}
                      to={resource.slug === 'super-admin' ? '/super-admin' : `/resources/${resource.slug}`}
                      className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {resource.icon}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{resource.name}</span>
                          {resource.isNew && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">New</span>
                          )}
                          {resource.isPremium && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Premium</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{resource.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar - Collapsible */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className={`relative transition-all duration-300 ease-in-out ${isSearchExpanded ? 'w-full' : 'w-12'}`}>
              {/* Search Icon - Always Visible */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Search className={`h-5 w-5 transition-colors duration-200 ${isSearchExpanded ? 'text-gray-500' : 'text-gray-300'}`} />
              </div>
              
              {/* Input Field - Always visible and functional */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg leading-5 bg-white/95 backdrop-blur-sm placeholder-gray-500 text-black focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300"
                placeholder="Search courses, instructors, topics..."
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => {
                  // Delay hiding to allow for button clicks
                  setTimeout(() => setIsSearchExpanded(false), 200);
                }}
                style={{ zIndex: isSearchExpanded ? 20 : 1 }}
              />
              
              {/* Collapse Button - Only visible when expanded */}
              {isSearchExpanded && (
                <button
                  onClick={() => setIsSearchExpanded(false)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-30"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {/* Expand Button - Only visible when collapsed */}
              {!isSearchExpanded && (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="absolute inset-0 w-12 h-full bg-white/10 backdrop-blur-sm rounded-lg border border-gray-400/30 hover:border-yellow-400/50 hover:bg-white/20 transition-all duration-200 flex items-center justify-center z-30"
                >
                  <Search className="h-5 w-5 text-gray-300" />
                </button>
              )}
              
              {/* Predictive Search Results */}
              {isSearchExpanded && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                  {filteredSearchResults.length > 0 ? (
                    filteredSearchResults.map((result, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="flex items-center">
                          <Search className="h-4 w-4 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{result.title}</div>
                            <div className="text-sm text-gray-500">{result.category}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            {/* Language Selector */}
            <CompactLanguageSelector 
              className="text-white hover:text-yellow-400 transition-colors"
              size="sm"
            />

            {/* Theme Toggle */}
            <ThemeToggle />

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
              className="lg:hidden p-2 rounded-lg text-white hover:text-yellow-400 hover:bg-gradient-to-r hover:from-[#11235a] hover:via-[#2a3a7b] hover:to-[#11235a] transition-all duration-300 border border-transparent hover:border-yellow-400/30"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/95 backdrop-blur-sm placeholder-gray-500 text-black focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
                    placeholder="Search courses, instructors, topics..."
                  />
                  
                  {/* Mobile Predictive Search Results */}
                  {searchQuery.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                      {filteredSearchResults.length > 0 ? (
                        filteredSearchResults.map((result, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              handleSearchResultClick(result);
                              setIsMenuOpen(false);
                            }}
                          >
                            <div className="flex items-center">
                              <Search className="h-4 w-4 text-gray-400 mr-3" />
                              <div>
                                <div className="font-medium text-gray-900">{result.title}</div>
                                <div className="text-sm text-gray-500">{result.category}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500 text-sm">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Main Navigation Links */}




              
              {/* Programmes */}
              <button
                className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                onClick={() => toggleDropdown('mobile-programmes')}
              >
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  PROGRAMMES
                </span>
                <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'mobile-programmes' ? 'rotate-90' : ''}`} />
              </button>
              {activeDropdown === 'mobile-programmes' && (
                <div className="pl-4 bg-white rounded shadow mt-1">
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">CATEGORIES</div>
                  {COURSE_CATEGORIES.map((category) => {
                    // Map course category slugs to actual routes
                    const routeMap: { [key: string]: string } = {
                      'technology-and-digital-skills': '/technology-and-digital-skills',
                      'data-and-analytics': '/data-and-analytics',
                      'health-and-healthcare-innovation': '/health-and-healthcare-innovation',
                      'cleaning-and-sanitation-services': '/cleaning-and-sanitation-services',
                      'environment-and-sustainability': '/environment-and-sustainability',
                      'engineering-and-construction': '/engineering-and-construction',
                      'business-strategy-and-innovation': '/business-strategy-and-innovation',
                      'agriculture-and-food-system': '/agriculture-and-food-system',
                      'professional-development-and-leadership': '/professional-development-and-leadership',
                      'music-and-sound-production': '/music-and-sound-production',
                      'art-design-and-creative-media': '/art-design-and-creative-media',
                      'drama-theatre-and-performance': '/drama-theatre-and-performance',
                      'sports-fitness-and-wellness': '/sports-fitness-and-wellness',
                      'vocational-and-technical-training': '/vocational-and-technical-training',
                      'childhood-studies-and-early-year-education': '/childhood-studies-and-early-year-education'
                    };
                    
                    const route = routeMap[category.slug] || `/${category.slug}`;
                    
                    return (
                      <Link
                        key={category.slug}
                        to={route}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-3">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">({category.count} Courses)</span>
                      </Link>
                    );
                  })}
                  
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold border-t border-gray-100">OTHER</div>
                  {OTHER_CATEGORIES.map((category) => {
                    // Map other category slugs to actual routes
                    const otherRouteMap: { [key: string]: string } = {
                      'courses': '/courses',
                      'workshops': '/workshops',
                      'mentorship': '/mentorship-career'
                    };
                    
                    const route = otherRouteMap[category.slug] || `/${category.slug}`;
                    
                    return (
                      <Link
                        key={category.slug}
                        to={route}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-3">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">({category.count} Courses)</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Discover Career Mobile */}
              <button
                className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                onClick={() => toggleDropdown('mobile-career')}
              >
                <span className="flex items-center">
                  <Compass className="w-4 h-4 mr-2" />
                  DISCOVER CAREER
                </span>
                <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'mobile-career' ? 'rotate-90' : ''}`} />
              </button>
              {activeDropdown === 'mobile-career' && (
                <div className="pl-4 bg-white rounded shadow mt-1">
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">EXPLORE CAREER CATEGORIES</div>
                  {CAREER_CATEGORIES.map((category) => {
                    // Map career category slugs to actual routes
                    const routeMap: { [key: string]: string } = {
                      'about': '/about',
                      'workshops': '/workshops',
                      'our-partners': '/partners',
                      'leadership-and-management': '/leadership-management',
                      'mentorship-career-readiness': '/mentorship-career',
                      'specialised-industry-tracks': '/specialised-tracks',
                      'real-estate-and-estate-management': '/real-estate',
                      'public-safety-and-emergency-services': '/public-safety',
                      'social-care-and-community-support': '/social-care',
                      'health-science': '/health-science',
                      'finance': '/finance',
                      'information-technology': '/information-technology',
                      'education-training': '/education-training',
                      'business-management-administration': '/business-management',
                      'marketing-sales-service': '/marketing-sales',
                      'agriculture-food-natural-resources': '/agriculture-food',
                      'hospitality-tourism': '/hospitality-tourism'
                    };
                    
                    const route = routeMap[category.slug] || `/${category.slug}`;
                    
                    return (
                      <Link
                        key={category.slug}
                        to={route}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-3">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {typeof category.count === 'number' ? `(${category.count} Courses)` : `(${category.count})`}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Platform Mobile */}
              <button
                className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                onClick={() => toggleDropdown('mobile-platform')}
              >
                <span className="flex items-center">
                  <Monitor className="w-4 h-4 mr-2" />
                  PLATFORM
                </span>
                <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'mobile-platform' ? 'rotate-90' : ''}`} />
              </button>
              {activeDropdown === 'mobile-platform' && (
                <div className="pl-4 bg-white rounded shadow mt-1">
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">PLATFORM FEATURES</div>
                  {PLATFORM_FEATURES.map((feature) => {
                    // Map platform feature slugs to actual routes
                    const routeMap: { [key: string]: string } = {
                      'ai-course-creator': '/ai-course-creator',
                      'course-authoring-tool': '/course-authoring',
                      'companion-library': '/companions-library',
                      'whiteboard': '/whiteboard',
                      'course-library': '/course-library',
                      'ai-video-calling': '/ai-video-calling'
                    };
                    
                    const route = routeMap[feature.slug] || `/${feature.slug}`;
                    
                    return (
                      <Link
                        key={feature.slug}
                        to={route}
                        className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {feature.icon}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{feature.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Resources Mobile */}
              <button
                className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                onClick={() => toggleDropdown('mobile-resources')}
              >
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  RESOURCES
                </span>
                <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'mobile-resources' ? 'rotate-90' : ''}`} />
              </button>
              {activeDropdown === 'mobile-resources' && (
                <div className="pl-4 bg-white rounded shadow mt-1 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">RESOURCES & TOOLS</div>
                  {RESOURCES_TOOLS.map((resource) => (
                    <Link
                      key={resource.slug}
                      to={resource.slug === 'super-admin' ? '/super-admin' : `/resources/${resource.slug}`}
                      className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {resource.icon}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{resource.name}</span>
                          {resource.isNew && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">New</span>
                          )}
                          {resource.isPremium && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Premium</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{resource.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Theme Toggle */}
              <div className="w-full px-3 py-2">
                <ThemeToggle />
              </div>

              {/* Mobile Language Selector */}
              <div className="w-full px-3 py-2">
                <SearchableLanguageSelector 
                  className="w-full"
                  size="md"
                  showNativeNames={true}
                  showPopular={true}
                  showRegional={true}
                />
              </div>

              <Link
                to="/login"
                className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#0a174e] rounded flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </span>
              </Link>

              <Link
                to="/signup"
                className="w-full text-left px-3 py-2 text-base font-medium bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Get Started
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
