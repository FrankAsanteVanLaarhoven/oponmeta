import React, { useState } from 'react';
import { 
  CloudSun, 
  Shield, 
  Activity, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  Award,
  Target,
  Brain,
  LineChart,
  Droplets,
  Sparkles
} from 'lucide-react';

const CleaningSanitationServices = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Professional Cleaning Fundamentals',
      description: 'Master essential cleaning techniques and safety protocols',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.6,
      students: 892,
      price: 89,
      area: 'Commercial Cleaning',
      topics: ['Cleaning Techniques', 'Safety Protocols', 'Equipment Use', 'Chemical Safety'],
      skills: ['Cleaning Methods', 'Safety Awareness', 'Equipment Operation', 'Chemical Handling']
    },
    {
      id: 2,
      title: 'Sanitation Management Systems',
      description: 'Learn to implement and manage comprehensive sanitation programs',
      level: 'Intermediate',
      duration: '8 weeks',
      rating: 4.7,
      students: 567,
      price: 119,
      area: 'Sanitation Management',
      topics: ['HACCP Principles', 'Quality Control', 'Regulatory Compliance', 'Documentation'],
      skills: ['Quality Management', 'Regulatory Knowledge', 'Process Documentation', 'Risk Assessment']
    },
    {
      id: 3,
      title: 'Advanced Disinfection Technologies',
      description: 'Explore cutting-edge disinfection methods and technologies',
      level: 'Advanced',
      duration: '10 weeks',
      rating: 4.8,
      students: 345,
      price: 149,
      area: 'Disinfection',
      topics: ['UV Technology', 'Chemical Disinfection', 'Biofilm Management', 'Infection Control'],
      skills: ['Advanced Disinfection', 'Technology Implementation', 'Infection Prevention', 'Research Methods']
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Beginner',
    duration: '',
    price: '',
    area: 'Commercial Cleaning',
    topics: '',
    skills: ''
  });

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      ...formData,
      rating: 0,
      students: 0,
      topics: formData.topics.split(',').map(t => t.trim()),
      skills: formData.skills.split(',').map(s => s.trim())
    };
    setCourses([...courses, newCourse]);
    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      level: 'Beginner',
      duration: '',
      price: '',
      area: 'Commercial Cleaning',
      topics: '',
      skills: ''
    });
  };

  const updateCourse = () => {
    setCourses(courses.map(course => 
      course.id === editingCourse.id 
        ? { ...editingCourse, topics: editingCourse.topics.split(',').map(t => t.trim()), skills: editingCourse.skills.split(',').map(s => s.trim()) }
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
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesArea = selectedArea === 'all' || course.area === selectedArea;
    return matchesSearch && matchesLevel && matchesArea;
  });

  const serviceAreas = [
    { name: 'Commercial Cleaning', icon: <Shield className="w-6 h-6" />, description: 'Office buildings, retail spaces, and commercial facilities' },
    { name: 'Industrial Sanitation', icon: <Activity className="w-6 h-6" />, description: 'Manufacturing plants and industrial facilities' },
    { name: 'Healthcare Cleaning', icon: <Target className="w-6 h-6" />, description: 'Hospitals, clinics, and medical facilities' },
    { name: 'Food Service Sanitation', icon: <Droplets className="w-6 h-6" />, description: 'Restaurants, food processing, and catering' },
    { name: 'Environmental Services', icon: <Globe className="w-6 h-6" />, description: 'Waste management and environmental protection' },
            { name: 'Specialised Cleaning', icon: <Sparkles className="w-6 h-6" />, description: 'Carpet, upholstery, and specialised surfaces' }
  ];

  const careerPaths = [
    { title: 'Cleaning Supervisor', salary: '$35,000 - $55,000', skills: ['Team Management', 'Quality Control', 'Scheduling', 'Training'] },
    { title: 'Sanitation Manager', salary: '$45,000 - $70,000', skills: ['HACCP Implementation', 'Regulatory Compliance', 'Process Management', 'Documentation'] },
    { title: 'Infection Control Specialist', salary: '$50,000 - $75,000', skills: ['Infection Prevention', 'Risk Assessment', 'Protocol Development', 'Training'] },
    { title: 'Environmental Services Director', salary: '$60,000 - $90,000', skills: ['Strategic Planning', 'Budget Management', 'Regulatory Knowledge', 'Leadership'] },
    { title: 'Quality Assurance Manager', salary: '$55,000 - $80,000', skills: ['Quality Systems', 'Auditing', 'Compliance Management', 'Process Improvement'] },
    { title: 'Cleaning Technology Specialist', salary: '$40,000 - $65,000', skills: ['Equipment Operation', 'Technology Implementation', 'Maintenance', 'Training'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <CloudSun className="w-12 h-12 text-blue-200" />
            <div>
              <h1 className="text-4xl font-bold">Cleaning & Sanitation Services</h1>
              <p className="text-blue-200 text-lg">Professional cleaning and sanitation for health and safety</p>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">{courses.length}</p>
                  <p className="text-blue-200">Courses Available</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">1,804</p>
                  <p className="text-blue-200">Active Students</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-blue-200">Success Rate</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-blue-200" />
                <div className="ml-3">
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-blue-200">Career Paths</p>
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
            {['overview', 'courses', 'service-areas', 'career-paths'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Cleaning & Sanitation Services</h2>
                <p className="text-gray-600 mb-4">
                  Professional cleaning and sanitation services are essential for maintaining healthy environments 
                  in commercial, industrial, and healthcare settings. Our program covers all aspects of modern 
                  cleaning and sanitation practices.
                </p>
                <p className="text-gray-600">
                  From basic cleaning techniques to advanced disinfection technologies, our courses prepare you 
                  for roles in this critical and growing industry.
                </p>
              </div>

              {/* Featured Courses */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
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
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Areas</option>
                    <option value="Commercial Cleaning">Commercial Cleaning</option>
                    <option value="Sanitation Management">Sanitation Management</option>
                    <option value="Disinfection">Disinfection</option>
                  </select>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Available Courses</h3>
                  <div className="space-y-4">
                    {filteredCourses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
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
                                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
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
                </div>
              </div>
            </div>
          )}

          {/* Service Areas Tab */}
          {activeTab === 'service-areas' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Service Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceAreas.map((area, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="text-blue-600 mr-3">
                          {area.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900">{area.name}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Career Paths Tab */}
          {activeTab === 'career-paths' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Career Paths</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {careerPaths.map((path, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{path.title}</h4>
                      <p className="text-blue-600 font-semibold mb-3">{path.salary}</p>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {path.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <input
                type="text"
                placeholder="Duration (e.g., 6 weeks)"
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
              <select
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Commercial Cleaning">Commercial Cleaning</option>
                <option value="Sanitation Management">Sanitation Management</option>
                <option value="Disinfection">Disinfection</option>
              </select>
              <input
                type="text"
                placeholder="Topics (comma-separated)"
                value={formData.topics}
                onChange={(e) => setFormData({...formData, topics: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Skills (comma-separated)"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
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
                value={editingCourse.level}
                onChange={(e) => setEditingCourse({...editingCourse, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <input
                type="text"
                placeholder="Duration"
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
              <select
                value={editingCourse.area}
                onChange={(e) => setEditingCourse({...editingCourse, area: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Commercial Cleaning">Commercial Cleaning</option>
                <option value="Sanitation Management">Sanitation Management</option>
                <option value="Disinfection">Disinfection</option>
              </select>
              <input
                type="text"
                placeholder="Topics (comma-separated)"
                value={editingCourse.topics}
                onChange={(e) => setEditingCourse({...editingCourse, topics: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Skills (comma-separated)"
                value={editingCourse.skills}
                onChange={(e) => setEditingCourse({...editingCourse, skills: e.target.value})}
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

export default CleaningSanitationServices;
