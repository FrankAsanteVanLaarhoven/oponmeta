import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, TrendingUp, Award, BookOpen, Plus, Edit, Trash2, 
  Star, Clock, UserCheck, Briefcase, GraduationCap, CheckCircle,
  ChevronDown, ChevronUp, Search, Filter, Download, Share2, Eye,
  Heart, MessageCircle, Calendar, MapPin
} from 'lucide-react';

const MentorshipCareerReadiness = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Course data state
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Career Development & Goal Setting',
      instructor: 'Dr. Emily Watson',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.9,
      students: 1856,
      price: 149,
      description: 'Learn how to set meaningful career goals and develop a strategic plan for professional growth.',
      topics: ['Goal Setting', 'Career Planning', 'Personal Branding', 'Networking'],
      skills: ['Career Planning', 'Goal Setting', 'Personal Branding', 'Networking'],
      status: 'active',
      category: 'Career Development',
      certificate: true,
      liveSessions: true
    },
    {
      id: 2,
      title: 'Professional Mentorship Program',
      instructor: 'Sarah Mitchell',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.8,
      students: 1243,
      price: 399,
      description: 'One-on-one mentorship program with industry professionals to accelerate your career growth.',
      topics: ['Mentorship', 'Career Guidance', 'Industry Insights', 'Professional Development'],
      skills: ['Mentorship', 'Career Guidance', 'Professional Development', 'Industry Knowledge'],
      status: 'active',
      category: 'Mentorship',
      certificate: true,
      liveSessions: true
    },
    {
      id: 3,
      title: 'Interview Preparation & Communication',
      instructor: 'Michael Rodriguez',
      level: 'Beginner',
      duration: '4 weeks',
      rating: 4.7,
      students: 2341,
      price: 99,
      description: 'Master interview techniques, communication skills, and professional presentation.',
      topics: ['Interview Skills', 'Communication', 'Body Language', 'Negotiation'],
      skills: ['Interview Skills', 'Communication', 'Presentation', 'Negotiation'],
      status: 'active',
      category: 'Career Skills',
      certificate: true,
      liveSessions: false
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    level: 'Beginner',
    duration: '',
    price: 0,
    description: '',
    topics: [],
    skills: [],
    category: 'Career Development',
    certificate: true,
    liveSessions: false
  });

  // CRUD Functions
  const addCourse = () => {
    const course = {
      id: Date.now(),
      ...newCourse,
      rating: 0,
      students: 0,
      status: 'active'
    };
    setCourses([...courses, course]);
    setShowCreateModal(false);
    setNewCourse({
      title: '',
      instructor: '',
      level: 'Beginner',
      duration: '',
      price: 0,
      description: '',
      topics: [],
      skills: [],
      category: 'Career Development',
      certificate: true,
      liveSessions: false
    });
  };

  const updateCourse = () => {
    setCourses(courses.map(course => 
      course.id === editingCourse.id ? { ...editingCourse } : course
    ));
    setShowEditModal(false);
    setEditingCourse(null);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const addTopic = () => {
    setNewCourse(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const updateTopic = (index, value) => {
    setNewCourse(prev => ({
      ...prev,
      topics: prev.topics.map((topic, i) => i === index ? value : topic)
    }));
  };

  const removeTopic = (index) => {
    setNewCourse(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setNewCourse(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index, value) => {
    setNewCourse(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const removeSkill = (index) => {
    setNewCourse(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const categories = ['Career Development', 'Mentorship', 'Career Skills', 'Professional Growth'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#0a174e] mb-4">
            Mentorship & Career Readiness
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Accelerate your career growth with expert mentorship, career planning, and professional development. 
            Connect with industry leaders and develop essential career skills.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            {[
              { key: 'overview', label: 'Overview', icon: Eye },
              { key: 'courses', label: 'Courses', icon: BookOpen },
              { key: 'mentors', label: 'Mentors', icon: Users },
              { key: 'careers', label: 'Career Paths', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-[#0a174e] text-white'
                    : 'text-gray-600 hover:text-[#0a174e]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Statistics */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">{courses.length}</div>
                    <div className="text-gray-600">Total Programs</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">
                      {courses.reduce((sum, course) => sum + course.students, 0)}
                    </div>
                    <div className="text-gray-600">Active Participants</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">4.8</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">25</div>
                    <div className="text-gray-600">Expert Mentors</div>
                  </div>
                </div>

                {/* About Mentorship & Career Readiness */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">About Mentorship & Career Readiness</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">What You'll Learn</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Career goal setting and strategic planning
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Professional networking and relationship building
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Interview preparation and communication skills
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Personal branding and professional presence
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Industry insights and career guidance
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">Program Benefits</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-600" />
                          One-on-one mentorship sessions
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-600" />
                          Personalized career roadmaps
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-600" />
                          Industry networking opportunities
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-600" />
                          Professional certification
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-600" />
                          Ongoing career support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Programs */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">Featured Programs</h3>
                  <div className="space-y-4">
                    {courses.slice(0, 3).map(course => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-[#0a174e]">{course.title}</h4>
                            <p className="text-gray-600 text-sm">{course.instructor}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-500">{course.level}</span>
                              <span className="text-sm text-gray-500">{course.duration}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm">{course.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-[#0a174e]">${course.price}</div>
                            <button className="mt-2 px-4 py-2 bg-[#0a174e] text-white rounded-md hover:bg-[#11235a]">
                              View Program
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search programs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Levels</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Program
                    </button>
                  </div>
                </div>

                {/* Programs List */}
                <div className="space-y-4">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">{course.title}</h3>
                          <p className="text-gray-600 mb-3">{course.description}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-gray-500">Mentor: {course.instructor}</span>
                            <span className="text-sm text-gray-500">Level: {course.level}</span>
                            <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{course.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">{course.students} participants</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.topics.slice(0, 3).map((topic, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-2xl font-bold text-[#0a174e]">${course.price}</div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingCourse(course);
                                setShowEditModal(true);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCourse(course.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'mentors' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Expert Mentors</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Dr. Emily Watson',
                      expertise: 'Career Development & HR',
                      experience: '15+ years',
                      company: 'Fortune 500 HR Director',
                      specialties: ['Career Planning', 'HR Strategy', 'Leadership Development'],
                      rating: 4.9,
                      mentees: 156
                    },
                    {
                      name: 'Sarah Mitchell',
                      expertise: 'Executive Coaching',
                      experience: '12+ years',
                      company: 'Executive Coach & Consultant',
                      specialties: ['Executive Coaching', 'Career Transitions', 'Leadership'],
                      rating: 4.8,
                      mentees: 89
                    },
                    {
                      name: 'Michael Rodriguez',
                      expertise: 'Technology Leadership',
                      experience: '18+ years',
                      company: 'Tech Startup Founder',
                      specialties: ['Tech Leadership', 'Startup Mentoring', 'Product Management'],
                      rating: 4.9,
                      mentees: 203
                    },
                    {
                      name: 'Lisa Chen',
                      expertise: 'Marketing & Branding',
                      experience: '10+ years',
                      company: 'Marketing Director',
                      specialties: ['Digital Marketing', 'Personal Branding', 'Career Growth'],
                      rating: 4.7,
                      mentees: 134
                    }
                  ].map(mentor => (
                    <div key={mentor.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-[#0a174e] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0a174e] mb-1">{mentor.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{mentor.expertise}</p>
                          <p className="text-gray-500 text-xs mb-2">{mentor.company}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{mentor.rating}</span>
                            <span className="text-sm text-gray-500">({mentor.mentees} mentees)</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {mentor.specialties.map(specialty => (
                              <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'careers' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Career Paths & Opportunities</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Career Coach',
                      description: 'Help others navigate their career paths and achieve professional goals',
                      salary: '$50,000 - $120,000',
                      requirements: ['Coaching certification', 'HR background', 'Communication skills']
                    },
                    {
                      title: 'HR Professional',
                      description: 'Manage human resources and support employee development',
                      salary: '$60,000 - $150,000',
                      requirements: ['HR degree/certification', 'People skills', 'Organizational knowledge']
                    },
                    {
                      title: 'Executive Coach',
                      description: 'Provide high-level coaching to executives and leaders',
                      salary: '$100,000 - $300,000',
                      requirements: ['Executive experience', 'Coaching certification', 'Business acumen']
                    },
                    {
                      title: 'Recruitment Specialist',
                      description: 'Connect talent with opportunities and manage hiring processes',
                      salary: '$45,000 - $100,000',
                      requirements: ['Recruitment experience', 'Networking skills', 'Assessment abilities']
                    }
                  ].map(career => (
                    <div key={career.title} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-[#0a174e] mb-2">{career.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{career.description}</p>
                      <p className="text-green-600 font-semibold text-sm mb-3">{career.salary}</p>
                      <div className="space-y-1">
                        {career.requirements.map(req => (
                          <div key={req} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-gray-600">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel - Tools & Resources */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Programs:</span>
                  <span className="font-semibold">{courses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Participants:</span>
                  <span className="font-semibold">{courses.reduce((sum, course) => sum + course.students, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-semibold">4.8/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-semibold">96%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Find a Mentor
                </button>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Session
                </button>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Resources
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {[
                  { title: 'Career Networking Mixer', date: 'Dec 15, 2024', time: '6:00 PM', location: 'Virtual' },
                  { title: 'Interview Skills Workshop', date: 'Dec 20, 2024', time: '2:00 PM', location: 'Virtual' },
                  { title: 'Mentor-Mentee Meetup', date: 'Dec 25, 2024', time: '7:00 PM', location: 'Virtual' }
                ].map(event => (
                  <div key={event.title} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-[#0a174e] text-sm">{event.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Create Course Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Create New Program</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Title</label>
                    <input
                      type="text"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter program title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mentor/Instructor</label>
                    <input
                      type="text"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter mentor name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="e.g., 6 weeks"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter program description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topics</label>
                  {newCourse.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => updateTopic(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter topic"
                      />
                      <button
                        onClick={() => removeTopic(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addTopic}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Topic
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  {newCourse.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter skill"
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addCourse}
                    className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition"
                  >
                    Create Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Course Modal */}
        {showEditModal && editingCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Edit Program</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Title</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mentor/Instructor</label>
                    <input
                      type="text"
                      value={editingCourse.instructor}
                      onChange={(e) => setEditingCourse({...editingCourse, instructor: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select
                      value={editingCourse.level}
                      onChange={(e) => setEditingCourse({...editingCourse, level: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={editingCourse.price}
                      onChange={(e) => setEditingCourse({...editingCourse, price: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingCourse.description}
                    onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateCourse}
                    className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition"
                  >
                    Update Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipCareerReadiness;
