import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, TrendingUp, Award, BookOpen, Plus, Edit, Trash2, 
  Star, Clock, UserCheck, Briefcase, GraduationCap, CheckCircle,
  ChevronDown, ChevronUp, Search, Filter, Download, Share2, Eye,
  Shield, AlertTriangle, Heart, Phone, Car, Flame, Stethoscope
} from 'lucide-react';

const PublicSafetyEmergencyServices = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedService, setSelectedService] = useState('all');

  // Course data state
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Emergency Response & Crisis Management',
      instructor: 'Captain Michael Rodriguez',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.9,
      students: 892,
      price: 449,
      description: 'Comprehensive training in emergency response protocols, crisis management, and incident command systems.',
      topics: ['Incident Command', 'Emergency Protocols', 'Crisis Communication', 'Risk Assessment'],
      skills: ['Emergency Response', 'Crisis Management', 'Incident Command', 'Risk Assessment'],
      status: 'active',
      category: 'Emergency Response',
      certificate: true,
      liveSessions: true
    },
    {
      id: 2,
      title: 'Fire Safety & Prevention Training',
      instructor: 'Fire Chief Sarah Johnson',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.8,
      students: 1247,
      price: 299,
      description: 'Essential fire safety training covering prevention, detection, and emergency response procedures.',
      topics: ['Fire Prevention', 'Safety Protocols', 'Emergency Evacuation', 'Equipment Operation'],
      skills: ['Fire Safety', 'Prevention Techniques', 'Emergency Procedures', 'Equipment Handling'],
      status: 'active',
      category: 'Fire Safety',
      certificate: true,
      liveSessions: true
    },
    {
      id: 3,
      title: 'First Aid & Medical Emergency Response',
      instructor: 'Dr. Emily Chen',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.7,
      students: 2156,
      price: 199,
      description: 'Comprehensive first aid training and medical emergency response for public safety professionals.',
      topics: ['First Aid', 'CPR Training', 'Medical Emergencies', 'Patient Assessment'],
      skills: ['First Aid', 'CPR', 'Emergency Medicine', 'Patient Care'],
      status: 'active',
      category: 'Medical Response',
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
    category: 'Emergency Response',
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
      category: 'Emergency Response',
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
    const matchesService = selectedService === 'all' || course.category === selectedService;
    return matchesSearch && matchesLevel && matchesService;
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const services = ['Emergency Response', 'Fire Safety', 'Medical Response', 'Law Enforcement', 'Disaster Management', 'Public Health'];

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
            Public Safety & Emergency Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Train for critical public safety roles including emergency response, fire safety, medical services, 
            and disaster management. Protect and serve your community with expert-led training.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            {[
              { key: 'overview', label: 'Overview', icon: Eye },
              { key: 'courses', label: 'Courses', icon: BookOpen },
              { key: 'services', label: 'Services', icon: Shield },
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
                    <div className="text-gray-600">Safety Courses</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">
                      {courses.reduce((sum, course) => sum + course.students, 0)}
                    </div>
                    <div className="text-gray-600">Safety Professionals</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">4.8</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">6</div>
                    <div className="text-gray-600">Service Areas</div>
                  </div>
                </div>

                {/* About Public Safety & Emergency Services */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">About Public Safety & Emergency Services</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">What You'll Learn</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Emergency response protocols and procedures
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Crisis management and incident command
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Fire safety and prevention techniques
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          First aid and medical emergency response
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Disaster preparedness and recovery
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">Service Areas</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          Emergency Response
                        </li>
                        <li className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-blue-600" />
                          Fire Safety & Prevention
                        </li>
                        <li className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          Medical Emergency Response
                        </li>
                        <li className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-blue-600" />
                          Law Enforcement
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-blue-600" />
                          Disaster Management
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Courses */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">Featured Safety Courses</h3>
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
                              View Course
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
                          placeholder="Search courses..."
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
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Services</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Course
                    </button>
                  </div>
                </div>

                {/* Courses List */}
                <div className="space-y-4">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">{course.title}</h3>
                          <p className="text-gray-600 mb-3">{course.description}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-gray-500">Instructor: {course.instructor}</span>
                            <span className="text-sm text-gray-500">Level: {course.level}</span>
                            <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{course.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">{course.students} students</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.topics.slice(0, 3).map((topic, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
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

            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Public Safety Service Areas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Emergency Response',
                      icon: Shield,
                      description: 'Crisis management, incident command, emergency protocols',
                      courses: 15,
                      avgSalary: '$45,000 - $85,000',
                      skills: ['Incident Command', 'Emergency Protocols', 'Crisis Management', 'Risk Assessment']
                    },
                    {
                      name: 'Fire Safety & Prevention',
                      icon: Flame,
                      description: 'Fire prevention, safety protocols, emergency evacuation',
                      courses: 12,
                      avgSalary: '$50,000 - $90,000',
                      skills: ['Fire Prevention', 'Safety Protocols', 'Emergency Procedures', 'Equipment Operation']
                    },
                    {
                      name: 'Medical Emergency Response',
                      icon: Stethoscope,
                      description: 'First aid, CPR, medical emergencies, patient care',
                      courses: 18,
                      avgSalary: '$40,000 - $80,000',
                      skills: ['First Aid', 'CPR', 'Emergency Medicine', 'Patient Assessment']
                    },
                    {
                      name: 'Law Enforcement',
                      icon: Car,
                      description: 'Public safety, crime prevention, community policing',
                      courses: 10,
                      avgSalary: '$55,000 - $95,000',
                      skills: ['Law Enforcement', 'Crime Prevention', 'Community Policing', 'Investigation']
                    },
                    {
                      name: 'Disaster Management',
                      icon: AlertTriangle,
                      description: 'Disaster preparedness, recovery, emergency planning',
                      courses: 8,
                      avgSalary: '$60,000 - $100,000',
                      skills: ['Disaster Planning', 'Emergency Management', 'Recovery Operations', 'Risk Mitigation']
                    },
                    {
                      name: 'Public Health',
                      icon: Heart,
                      description: 'Health safety, disease prevention, public health protocols',
                      courses: 14,
                      avgSalary: '$45,000 - $85,000',
                      skills: ['Public Health', 'Disease Prevention', 'Health Safety', 'Epidemiology']
                    }
                  ].map(service => (
                    <div key={service.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0a174e] rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0a174e] mb-1">{service.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-gray-500">{service.courses} courses</span>
                            <span className="text-sm text-green-600 font-medium">{service.avgSalary}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {service.skills.map(skill => (
                              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {skill}
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
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Career Paths in Public Safety</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Emergency Response Coordinator',
                      description: 'Coordinate emergency responses and manage crisis situations',
                      salary: '$50,000 - $90,000',
                      requirements: ['Emergency management certification', 'Crisis management experience', 'Leadership skills']
                    },
                    {
                      title: 'Fire Safety Officer',
                      description: 'Ensure fire safety compliance and conduct safety inspections',
                      salary: '$45,000 - $85,000',
                      requirements: ['Fire safety certification', 'Inspection experience', 'Safety protocols knowledge']
                    },
                    {
                      title: 'Emergency Medical Technician',
                      description: 'Provide emergency medical care and transport patients',
                      salary: '$40,000 - $75,000',
                      requirements: ['EMT certification', 'Medical training', 'Patient care experience']
                    },
                    {
                      title: 'Public Safety Officer',
                      description: 'Maintain public safety and enforce safety regulations',
                      salary: '$45,000 - $80,000',
                      requirements: ['Law enforcement training', 'Public safety experience', 'Communication skills']
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
                  <span className="text-gray-600">Total Courses:</span>
                  <span className="font-semibold">{courses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Safety Professionals:</span>
                  <span className="font-semibold">{courses.reduce((sum, course) => sum + course.students, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-semibold">4.8/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certification Rate:</span>
                  <span className="font-semibold">98%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Safety Guide
                </button>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share with Team
                </button>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  View Certifications
                </button>
              </div>
            </div>

            {/* Safety Experts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Safety Experts</h3>
              <div className="space-y-3">
                {[
                  { name: 'Captain Michael Rodriguez', expertise: 'Emergency Response', courses: 6 },
                  { name: 'Fire Chief Sarah Johnson', expertise: 'Fire Safety', courses: 4 },
                  { name: 'Dr. Emily Chen', expertise: 'Medical Response', courses: 5 }
                ].map(expert => (
                  <div key={expert.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0a174e] rounded-full flex items-center justify-center text-white font-semibold">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-[#0a174e]">{expert.name}</div>
                      <div className="text-sm text-gray-600">{expert.expertise}</div>
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Create New Safety Course</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                    <input
                      type="text"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter course title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                    <input
                      type="text"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter instructor name"
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
                      placeholder="e.g., 8 weeks"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
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
                    placeholder="Enter course description"
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
                    Create Course
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Edit Safety Course</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
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
                    Update Course
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

export default PublicSafetyEmergencyServices;
