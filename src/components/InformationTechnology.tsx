import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, TrendingUp, Award, BookOpen, Plus, Edit, Trash2, 
  Star, Clock, UserCheck, Briefcase, GraduationCap, CheckCircle,
  ChevronDown, ChevronUp, Search, Filter, Download, Share2, Eye,
  Code, Cpu, Database, Globe, Smartphone, Cloud, Shield, Zap
} from 'lucide-react';

const InformationTechnology = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedField, setSelectedField] = useState('all');

  // Course data state
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Full-Stack Web Development',
      instructor: 'Alex Rodriguez',
      level: 'Intermediate',
      duration: '16 weeks',
      rating: 4.8,
      students: 3247,
      price: 699,
      description: 'Comprehensive full-stack development training covering frontend, backend, and database technologies.',
      topics: ['React.js', 'Node.js', 'MongoDB', 'API Development'],
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      status: 'active',
      category: 'Web Development',
      certificate: true,
      liveSessions: true
    },
    {
      id: 2,
      title: 'Data Science & Machine Learning',
      instructor: 'Dr. Sarah Chen',
      level: 'Advanced',
      duration: '20 weeks',
      rating: 4.9,
      students: 2156,
      price: 899,
      description: 'Advanced data science training with machine learning algorithms and predictive analytics.',
      topics: ['Python', 'Machine Learning', 'Data Analysis', 'Deep Learning'],
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
      status: 'active',
      category: 'Data Science',
      certificate: true,
      liveSessions: true
    },
    {
      id: 3,
      title: 'Cybersecurity & Ethical Hacking',
      instructor: 'Michael Johnson',
      level: 'Intermediate',
      duration: '14 weeks',
      rating: 4.7,
      students: 1892,
      price: 649,
      description: 'Comprehensive cybersecurity training including ethical hacking and security protocols.',
      topics: ['Network Security', 'Ethical Hacking', 'Penetration Testing', 'Security Analysis'],
      skills: ['Cybersecurity', 'Ethical Hacking', 'Network Security', 'Security Analysis'],
      status: 'active',
      category: 'Cybersecurity',
      certificate: true,
      liveSessions: false
    },
    {
      id: 4,
      title: 'Cloud Computing & DevOps',
      instructor: 'Lisa Thompson',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.6,
      students: 1678,
      price: 549,
      description: 'Cloud computing platforms and DevOps practices for modern software development.',
      topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
      skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
      status: 'active',
      category: 'Cloud Computing',
      certificate: true,
      liveSessions: true
    },
    {
      id: 5,
      title: 'Mobile App Development',
      instructor: 'David Williams',
      level: 'Beginner',
      duration: '10 weeks',
      rating: 4.5,
      students: 2456,
      price: 449,
      description: 'Mobile app development for iOS and Android platforms using modern frameworks.',
      topics: ['React Native', 'Flutter', 'Mobile UI/UX', 'App Deployment'],
      skills: ['React Native', 'Flutter', 'Mobile Development', 'UI/UX'],
      status: 'active',
      category: 'Mobile Development',
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
    category: 'Web Development',
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
      category: 'Web Development',
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
    const matchesField = selectedField === 'all' || course.category === selectedField;
    return matchesSearch && matchesLevel && matchesField;
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const fields = ['Web Development', 'Data Science', 'Cybersecurity', 'Cloud Computing', 'Mobile Development', 'Software Engineering', 'AI/ML', 'Database Management'];

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
            Information Technology (57 Courses)
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master cutting-edge technology skills with comprehensive training in web development, data science, 
            cybersecurity, cloud computing, and mobile development. Expert-led courses for tech professionals.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            {[
              { key: 'overview', label: 'Overview', icon: Eye },
              { key: 'courses', label: 'Courses', icon: BookOpen },
              { key: 'fields', label: 'Tech Fields', icon: Code },
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
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">57</div>
                    <div className="text-gray-600">IT Courses</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">
                      {courses.reduce((sum, course) => sum + course.students, 0)}+
                    </div>
                    <div className="text-gray-600">Tech Professionals</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">4.7</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">8</div>
                    <div className="text-gray-600">Tech Fields</div>
                  </div>
                </div>

                {/* About Information Technology */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">About Information Technology</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">What You'll Learn</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Full-stack web development
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Data science and machine learning
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Cybersecurity and ethical hacking
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Cloud computing and DevOps
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Mobile app development
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">Tech Fields</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-blue-600" />
                          Web Development
                        </li>
                        <li className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-blue-600" />
                          Data Science
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          Cybersecurity
                        </li>
                        <li className="flex items-center gap-2">
                          <Cloud className="w-4 h-4 text-blue-600" />
                          Cloud Computing
                        </li>
                        <li className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                          Mobile Development
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Courses */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">Featured IT Courses</h3>
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
                      value={selectedField}
                      onChange={(e) => setSelectedField(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Fields</option>
                      {fields.map(field => (
                        <option key={field} value={field}>{field}</option>
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
                              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
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

            {activeTab === 'fields' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Information Technology Fields</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Web Development',
                      icon: Code,
                      description: 'Frontend, backend, and full-stack development',
                      courses: 12,
                      avgSalary: '$70,000 - $150,000',
                      skills: ['JavaScript', 'React', 'Node.js', 'Python']
                    },
                    {
                      name: 'Data Science',
                      icon: Cpu,
                      description: 'Data analysis, machine learning, and AI',
                      courses: 10,
                      avgSalary: '$80,000 - $180,000',
                      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL']
                    },
                    {
                      name: 'Cybersecurity',
                      icon: Shield,
                      description: 'Network security, ethical hacking, and security analysis',
                      courses: 8,
                      avgSalary: '$75,000 - $160,000',
                      skills: ['Network Security', 'Ethical Hacking', 'Security Analysis', 'Penetration Testing']
                    },
                    {
                      name: 'Cloud Computing',
                      icon: Cloud,
                      description: 'AWS, Azure, DevOps, and infrastructure management',
                      courses: 7,
                      avgSalary: '$85,000 - $170,000',
                      skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps']
                    },
                    {
                      name: 'Mobile Development',
                      icon: Smartphone,
                      description: 'iOS, Android, and cross-platform development',
                      courses: 6,
                      avgSalary: '$70,000 - $140,000',
                      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin']
                    },
                    {
                      name: 'Software Engineering',
                      icon: Zap,
                      description: 'Software design, architecture, and development',
                      courses: 9,
                      avgSalary: '$90,000 - $180,000',
                      skills: ['Software Design', 'Architecture', 'Testing', 'Agile']
                    }
                  ].map(field => (
                    <div key={field.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0a174e] rounded-lg flex items-center justify-center">
                          <field.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0a174e] mb-1">{field.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{field.description}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-gray-500">{field.courses} courses</span>
                            <span className="text-sm text-green-600 font-medium">{field.avgSalary}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {field.skills.map(skill => (
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
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Career Paths in Information Technology</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Software Engineer',
                      description: 'Design, develop, and maintain software applications',
                      salary: '$80,000 - $180,000',
                      requirements: ['Computer science degree', 'Programming skills', 'Problem-solving', 'Team collaboration']
                    },
                    {
                      title: 'Data Scientist',
                      description: 'Analyze data and develop machine learning models',
                      salary: '$90,000 - $200,000',
                      requirements: ['Statistics degree', 'Python/R skills', 'Machine learning', 'Data analysis']
                    },
                    {
                      title: 'Cybersecurity Analyst',
                      description: 'Protect systems and networks from security threats',
                      salary: '$75,000 - $160,000',
                      requirements: ['Cybersecurity certification', 'Network security', 'Incident response', 'Security tools']
                    },
                    {
                      title: 'DevOps Engineer',
                      description: 'Manage infrastructure and deployment pipelines',
                      salary: '$85,000 - $170,000',
                      requirements: ['Cloud platforms', 'Automation skills', 'CI/CD knowledge', 'Infrastructure management']
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
                  <span className="font-semibold">57</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tech Professionals:</span>
                  <span className="font-semibold">{courses.reduce((sum, course) => sum + course.students, 0)}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-semibold">4.7/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certification Rate:</span>
                  <span className="font-semibold">95%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Tech Guide
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

            {/* Tech Experts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Tech Experts</h3>
              <div className="space-y-3">
                {[
                  { name: 'Alex Rodriguez', expertise: 'Web Development', courses: 8 },
                  { name: 'Dr. Sarah Chen', expertise: 'Data Science', courses: 6 },
                  { name: 'Michael Johnson', expertise: 'Cybersecurity', courses: 5 }
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Create New IT Course</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tech Field</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      {fields.map(field => (
                        <option key={field} value={field}>{field}</option>
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Edit IT Course</h3>
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

export default InformationTechnology;
