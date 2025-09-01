import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, TrendingUp, Award, BookOpen, Plus, Edit, Trash2, 
  Star, Clock, UserCheck, Briefcase, GraduationCap, CheckCircle,
  ChevronDown, ChevronUp, Search, Filter, Download, Share2, Eye,
  Leaf, TreePine, Droplets, Sun, Sprout, Wheat, Apple, Zap
} from 'lucide-react';

const AgricultureFood = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  // Course data state
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Sustainable Agriculture & Crop Management',
      instructor: 'Dr. Sarah Johnson',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.7,
      students: 1892,
      price: 549,
      description: 'Sustainable farming practices, crop management, and agricultural sustainability principles.',
      topics: ['Sustainable Farming', 'Crop Management', 'Soil Health', 'Agricultural Sustainability'],
      skills: ['Sustainable Agriculture', 'Crop Management', 'Soil Science', 'Agricultural Practices'],
      status: 'active',
      category: 'Sustainable Agriculture',
      certificate: true,
      liveSessions: true
    },
    {
      id: 2,
      title: 'Food Science & Technology',
      instructor: 'Michael Rodriguez',
      level: 'Advanced',
      duration: '16 weeks',
      rating: 4.8,
      students: 1456,
      price: 699,
      description: 'Food processing, preservation, and technology for the food industry.',
      topics: ['Food Processing', 'Food Preservation', 'Food Technology', 'Food Safety'],
      skills: ['Food Science', 'Food Technology', 'Food Safety', 'Food Processing'],
      status: 'active',
      category: 'Food Science',
      certificate: true,
      liveSessions: true
    },
    {
      id: 3,
      title: 'Environmental Conservation & Natural Resources',
      instructor: 'Lisa Thompson',
      level: 'Intermediate',
      duration: '14 weeks',
      rating: 4.6,
      students: 1678,
      price: 599,
      description: 'Environmental conservation, natural resource management, and sustainability practices.',
      topics: ['Environmental Conservation', 'Natural Resources', 'Sustainability', 'Ecosystem Management'],
      skills: ['Environmental Conservation', 'Natural Resource Management', 'Sustainability', 'Ecosystem Science'],
      status: 'active',
      category: 'Environmental Conservation',
      certificate: true,
      liveSessions: false
    },
    {
      id: 4,
      title: 'Livestock Management & Animal Science',
      instructor: 'David Chen',
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.5,
      students: 1234,
      price: 449,
      description: 'Livestock management, animal health, and animal science principles.',
      topics: ['Livestock Management', 'Animal Health', 'Animal Science', 'Veterinary Care'],
      skills: ['Livestock Management', 'Animal Science', 'Animal Health', 'Veterinary Care'],
      status: 'active',
      category: 'Livestock Management',
      certificate: true,
      liveSessions: true
    },
    {
      id: 5,
      title: 'Agricultural Business & Farm Management',
      instructor: 'Robert Williams',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.4,
      students: 2156,
      price: 349,
      description: 'Agricultural business management, farm operations, and agricultural economics.',
      topics: ['Agricultural Business', 'Farm Management', 'Agricultural Economics', 'Farm Operations'],
      skills: ['Agricultural Business', 'Farm Management', 'Agricultural Economics', 'Business Operations'],
      status: 'active',
      category: 'Agricultural Business',
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
    category: 'Sustainable Agriculture',
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
      category: 'Sustainable Agriculture',
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
    const matchesArea = selectedArea === 'all' || course.category === selectedArea;
    return matchesSearch && matchesLevel && matchesArea;
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const areas = ['Sustainable Agriculture', 'Food Science', 'Environmental Conservation', 'Livestock Management', 'Agricultural Business', 'Horticulture', 'Aquaculture', 'Forestry'];

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
            Agriculture, Food & Natural Resources (37 Courses)
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master agriculture, food science, and natural resource management with comprehensive training in 
            sustainable farming, food technology, and environmental conservation. Expert-led courses for agricultural professionals.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            {[
              { key: 'overview', label: 'Overview', icon: Eye },
              { key: 'courses', label: 'Courses', icon: BookOpen },
              { key: 'areas', label: 'Agricultural Areas', icon: Leaf },
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
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">37</div>
                    <div className="text-gray-600">Agricultural Courses</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">
                      {courses.reduce((sum, course) => sum + course.students, 0)}+
                    </div>
                    <div className="text-gray-600">Agricultural Professionals</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">4.6</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">8</div>
                    <div className="text-gray-600">Agricultural Areas</div>
                  </div>
                </div>

                {/* About Agriculture, Food & Natural Resources */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">About Agriculture, Food & Natural Resources</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">What You'll Learn</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Sustainable agriculture and crop management
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Food science and technology
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Environmental conservation and natural resources
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Livestock management and animal science
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Agricultural business and farm management
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">Agricultural Areas</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <Sprout className="w-4 h-4 text-blue-600" />
                          Sustainable Agriculture
                        </li>
                        <li className="flex items-center gap-2">
                          <Apple className="w-4 h-4 text-blue-600" />
                          Food Science
                        </li>
                        <li className="flex items-center gap-2">
                          <TreePine className="w-4 h-4 text-blue-600" />
                          Environmental Conservation
                        </li>
                        <li className="flex items-center gap-2">
                          <Wheat className="w-4 h-4 text-blue-600" />
                          Livestock Management
                        </li>
                        <li className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          Agricultural Business
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Courses */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">Featured Agricultural Courses</h3>
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
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Areas</option>
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
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

            {activeTab === 'areas' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Agricultural Areas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Sustainable Agriculture',
                      icon: Sprout,
                      description: 'Sustainable farming practices and crop management',
                      courses: 8,
                      avgSalary: '$50,000 - $100,000',
                      skills: ['Sustainable Farming', 'Crop Management', 'Soil Science', 'Agricultural Practices']
                    },
                    {
                      name: 'Food Science',
                      icon: Apple,
                      description: 'Food processing, technology, and safety',
                      courses: 7,
                      avgSalary: '$60,000 - $120,000',
                      skills: ['Food Science', 'Food Technology', 'Food Safety', 'Food Processing']
                    },
                    {
                      name: 'Environmental Conservation',
                      icon: TreePine,
                      description: 'Natural resource management and conservation',
                      courses: 6,
                      avgSalary: '$55,000 - $110,000',
                      skills: ['Environmental Conservation', 'Natural Resource Management', 'Sustainability', 'Ecosystem Science']
                    },
                    {
                      name: 'Livestock Management',
                      icon: Wheat,
                      description: 'Animal health and livestock management',
                      courses: 5,
                      avgSalary: '$45,000 - $90,000',
                      skills: ['Livestock Management', 'Animal Science', 'Animal Health', 'Veterinary Care']
                    },
                    {
                      name: 'Agricultural Business',
                      icon: Zap,
                      description: 'Farm management and agricultural economics',
                      courses: 6,
                      avgSalary: '$65,000 - $130,000',
                      skills: ['Agricultural Business', 'Farm Management', 'Agricultural Economics', 'Business Operations']
                    },
                    {
                      name: 'Horticulture',
                      icon: Leaf,
                      description: 'Plant cultivation and garden management',
                      courses: 5,
                      avgSalary: '$40,000 - $80,000',
                      skills: ['Horticulture', 'Plant Science', 'Garden Management', 'Plant Cultivation']
                    }
                  ].map(area => (
                    <div key={area.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0a174e] rounded-lg flex items-center justify-center">
                          <area.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0a174e] mb-1">{area.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{area.description}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-gray-500">{area.courses} courses</span>
                            <span className="text-sm text-green-600 font-medium">{area.avgSalary}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {area.skills.map(skill => (
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
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Career Paths in Agriculture, Food & Natural Resources</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Agricultural Manager',
                      description: 'Manage farm operations and agricultural businesses',
                      salary: '$60,000 - $120,000',
                      requirements: ['Agricultural degree', 'Farm management experience', 'Business skills', 'Agricultural knowledge']
                    },
                    {
                      title: 'Food Scientist',
                      description: 'Research and develop food products and processes',
                      salary: '$70,000 - $140,000',
                      requirements: ['Food science degree', 'Research experience', 'Food safety knowledge', 'Laboratory skills']
                    },
                    {
                      title: 'Environmental Conservationist',
                      description: 'Protect natural resources and manage ecosystems',
                      salary: '$50,000 - $100,000',
                      requirements: ['Environmental science degree', 'Conservation experience', 'Field work skills', 'Policy knowledge']
                    },
                    {
                      title: 'Livestock Manager',
                      description: 'Manage animal health and livestock operations',
                      salary: '$45,000 - $90,000',
                      requirements: ['Animal science degree', 'Livestock experience', 'Veterinary knowledge', 'Management skills']
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
                  <span className="font-semibold">37</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Agricultural Professionals:</span>
                  <span className="font-semibold">{courses.reduce((sum, course) => sum + course.students, 0)}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-semibold">4.6/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certification Rate:</span>
                  <span className="font-semibold">94%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Agricultural Guide
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

            {/* Agricultural Experts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Agricultural Experts</h3>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Sarah Johnson', expertise: 'Sustainable Agriculture', courses: 6 },
                  { name: 'Michael Rodriguez', expertise: 'Food Science', courses: 5 },
                  { name: 'Lisa Thompson', expertise: 'Environmental Conservation', courses: 4 }
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Create New Agricultural Course</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agricultural Area</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Edit Agricultural Course</h3>
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

export default AgricultureFood;
