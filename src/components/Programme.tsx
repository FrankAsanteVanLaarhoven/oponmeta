import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Award,
  Plus,
  Edit,
  Trash2,
  Grid,
  List,
  ChevronDown,
  Play,
  Download,
  Share2,
  Heart
} from 'lucide-react';

const Programme = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Python Programming',
      description: 'Learn Python from scratch with hands-on projects and real-world applications',
      category: 'Technology and Digital Skills',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.8,
      students: 2345,
      price: 89,
      instructor: 'Dr. Sarah Johnson',
      language: 'English',
      certificate: true,
      tags: ['Programming', 'Python', 'Beginner Friendly'],
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master the basics of data science, statistics, and machine learning',
      category: 'Data and Analytics',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.9,
      students: 1892,
      price: 129,
      instructor: 'Prof. Michael Chen',
      language: 'English',
      certificate: true,
      tags: ['Data Science', 'Statistics', 'Machine Learning'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
    },
    {
      id: 3,
      title: 'Healthcare Innovation & Technology',
      description: 'Explore cutting-edge healthcare technologies and digital health solutions',
      category: 'Health and Healthcare Innovation',
      level: 'Advanced',
      duration: '10 weeks',
      rating: 4.7,
      students: 756,
      price: 149,
      instructor: 'Dr. Emily Rodriguez',
      language: 'English',
      certificate: true,
      tags: ['Healthcare', 'Innovation', 'Digital Health'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
    },
    {
      id: 4,
      title: 'Strategic Business Management',
      description: 'Develop strategic thinking and business management skills for leadership roles',
      category: 'Business, Strategy and Innovation',
      level: 'Advanced',
      duration: '14 weeks',
      rating: 4.8,
      students: 1123,
      price: 169,
      instructor: 'Prof. David Thompson',
      language: 'English',
      certificate: true,
      tags: ['Business Strategy', 'Leadership', 'Management'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400'
    },
    {
      id: 5,
      title: 'Digital Marketing Mastery',
      description: 'Learn comprehensive digital marketing strategies and tools',
      category: 'Marketing, Sales, & Service',
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.6,
      students: 2156,
      price: 119,
      instructor: 'Lisa Anderson',
      language: 'English',
      certificate: true,
      tags: ['Digital Marketing', 'SEO', 'Social Media'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
    },
    {
      id: 6,
      title: 'Environmental Sustainability',
      description: 'Understand environmental challenges and sustainable solutions',
      category: 'Environment and Sustainability',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.5,
      students: 892,
      price: 79,
      instructor: 'Dr. James Wilson',
      language: 'English',
      certificate: true,
      tags: ['Sustainability', 'Environment', 'Green Technology'],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology and Digital Skills',
    level: 'Beginner',
    duration: '',
    price: '',
    instructor: '',
    language: 'English',
    certificate: true,
    tags: ''
  });

const categories = [
  'Technology and Digital Skills',
  'Data and Analytics',
  'Health and Healthcare Innovation',
    'Business, Strategy and Innovation',
    'Marketing, Sales, & Service',
  'Environment and Sustainability',
  'Engineering and Construction',
  'Agriculture and Food System',
  'Professional Development and Leadership',
  'Music and Sound Production',
  'Art Design and Creative Media',
  'Drama, Theatre and Performance',
  'Sports, Fitness and Wellness',
  'Vocational and Technical Training',
    'Childhood Studies and Early Year Education'
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      ...formData,
      rating: 0,
      students: 0,
      tags: formData.tags.split(',').map(t => t.trim()),
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
    };
    setCourses([...courses, newCourse]);
    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      category: 'Technology and Digital Skills',
      level: 'Beginner',
      duration: '',
      price: '',
      instructor: '',
      language: 'English',
      certificate: true,
      tags: ''
    });
  };

  const updateCourse = () => {
    setCourses(courses.map(course => 
      course.id === editingCourse.id 
        ? { ...editingCourse, tags: editingCourse.tags.split(',').map(t => t.trim()) }
        : course
    ));
    setShowEditModal(false);
    setEditingCourse(null);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
    averageRating: (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1),
    freeCourses: courses.filter(course => course.price === 0).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <BookOpen className="w-12 h-12 text-blue-200" />
            <div>
              <h1 className="text-4xl font-bold">OponMeta Programme</h1>
              <p className="text-blue-200 text-lg">Comprehensive learning platform with diverse course offerings</p>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">{stats.totalCourses}</p>
                  <p className="text-blue-200">Total Courses</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                  <p className="text-blue-200">Active Students</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">{stats.averageRating}</p>
                  <p className="text-blue-200">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">{stats.freeCourses}</p>
                  <p className="text-blue-200">Free Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'courses', 'categories', 'instructors'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-black font-semibold'
                    : 'border-transparent text-black hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-black mb-4">About OponMeta Programme</h2>
                <p className="text-gray-600 mb-4">
                  OponMeta Programme is a comprehensive learning platform designed to provide high-quality education 
                  across diverse fields. Our courses are crafted by industry experts and designed to meet the evolving 
                  needs of learners worldwide.
                </p>
                <p className="text-gray-600">
                  From technology and business to arts and healthcare, our programme offers something for everyone, 
                  whether you're just starting your learning journey or looking to advance your career.
                </p>
              </div>

              {/* Featured Courses */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-black mb-4">Featured Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-semibold text-black mb-2">{course.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-semibold">${course.price}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </button>
                </div>
              </div>

              {/* Courses List */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-4">Available Courses ({filteredCourses.length})</h3>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                          <h4 className="font-semibold text-black mb-2">{course.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-blue-600 font-semibold">${course.price}</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{course.level}</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingCourse(course);
                                  setShowEditModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteCourse(course.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredCourses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-black mb-2">{course.title}</h4>
                              <p className="text-gray-600 mb-3">{course.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {course.duration}
                                </span>
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {course.level}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {course.students} students
                                </span>
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  {course.rating}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-600 font-semibold">${course.price}</span>
                              <button
                                onClick={() => {
                                  setEditingCourse(course);
                                  setShowEditModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteCourse(course.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-black mb-6">Course Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, index) => {
                    const categoryCourses = courses.filter(course => course.category === category);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                          <div className="text-blue-600 mr-3">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <h4 className="font-semibold text-black">{category}</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {categoryCourses.length} courses available
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {categoryCourses.reduce((sum, course) => sum + course.students, 0)} students
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Courses
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Instructors Tab */}
          {activeTab === 'instructors' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-black mb-6">Featured Instructors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from(new Set(courses.map(course => course.instructor))).map((instructor, index) => {
                    const instructorCourses = courses.filter(course => course.instructor === instructor);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-black">{instructor}</h4>
                            <p className="text-sm text-gray-500">{instructorCourses.length} courses</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {instructorCourses.reduce((sum, course) => sum + course.students, 0)} students
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Profile
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Course</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Course Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Duration (e.g., 8 weeks)"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Instructor Name"
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Course</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
                value={editingCourse.title}
                onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Course Description"
                value={editingCourse.description}
                onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
              <select
                value={editingCourse.category}
                onChange={(e) => setEditingCourse({...editingCourse, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={editingCourse.level}
                onChange={(e) => setEditingCourse({...editingCourse, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Duration (e.g., 8 weeks)"
                value={editingCourse.duration}
                onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Price"
                value={editingCourse.price}
                onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Instructor Name"
                value={editingCourse.instructor}
                onChange={(e) => setEditingCourse({...editingCourse, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={editingCourse.tags}
                onChange={(e) => setEditingCourse({...editingCourse, tags: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={updateCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programme; 