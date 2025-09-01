import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, TrendingUp, Award, BookOpen, Plus, Edit, Trash2, 
  Star, Clock, UserCheck, Briefcase, GraduationCap, CheckCircle,
  ChevronDown, ChevronUp, Search, Filter, Download, Share2, Eye,
  Heart, Activity, Stethoscope, Pill, Microscope, Brain, Dna, Syringe
} from 'lucide-react';

const HealthScience = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Course data state
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced Clinical Medicine & Patient Care',
      instructor: 'Dr. Sarah Johnson',
      level: 'Advanced',
      duration: '16 weeks',
      rating: 4.9,
      students: 2156,
      price: 699,
      description: 'Comprehensive clinical medicine training covering advanced patient care, diagnosis, and treatment protocols.',
      topics: ['Clinical Diagnosis', 'Patient Care', 'Treatment Protocols', 'Medical Ethics'],
      skills: ['Clinical Medicine', 'Patient Care', 'Diagnosis', 'Medical Ethics'],
      status: 'active',
      category: 'Clinical Medicine',
      certificate: true,
      liveSessions: true
    },
    {
      id: 2,
      title: 'Nursing Practice & Healthcare Management',
      instructor: 'Dr. Michael Chen',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.8,
      students: 3247,
      price: 449,
      description: 'Professional nursing practice training with healthcare management and patient care coordination.',
      topics: ['Nursing Practice', 'Healthcare Management', 'Patient Coordination', 'Clinical Skills'],
      skills: ['Nursing Practice', 'Healthcare Management', 'Patient Care', 'Clinical Skills'],
      status: 'active',
      category: 'Nursing',
      certificate: true,
      liveSessions: true
    },
    {
      id: 3,
      title: 'Pharmaceutical Sciences & Drug Development',
      instructor: 'Dr. Emily Rodriguez',
      level: 'Advanced',
      duration: '14 weeks',
      rating: 4.7,
      students: 1892,
      price: 599,
      description: 'Advanced pharmaceutical sciences covering drug development, pharmacology, and clinical trials.',
      topics: ['Drug Development', 'Pharmacology', 'Clinical Trials', 'Pharmaceutical Research'],
      skills: ['Pharmaceutical Sciences', 'Drug Development', 'Pharmacology', 'Clinical Research'],
      status: 'active',
      category: 'Pharmaceuticals',
      certificate: true,
      liveSessions: false
    },
    {
      id: 4,
      title: 'Public Health & Epidemiology',
      instructor: 'Dr. Robert Williams',
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.6,
      students: 1567,
      price: 399,
      description: 'Public health principles, epidemiology, and population health management strategies.',
      topics: ['Public Health', 'Epidemiology', 'Population Health', 'Health Policy'],
      skills: ['Public Health', 'Epidemiology', 'Population Health', 'Health Policy'],
      status: 'active',
      category: 'Public Health',
      certificate: true,
      liveSessions: true
    },
    {
      id: 5,
      title: 'Medical Laboratory Sciences',
      instructor: 'Dr. Lisa Thompson',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.5,
      students: 2789,
      price: 299,
      description: 'Medical laboratory techniques, diagnostic testing, and laboratory management.',
      topics: ['Laboratory Techniques', 'Diagnostic Testing', 'Lab Management', 'Quality Control'],
      skills: ['Laboratory Sciences', 'Diagnostic Testing', 'Lab Management', 'Quality Control'],
      status: 'active',
      category: 'Laboratory Sciences',
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
    category: 'Clinical Medicine',
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
      category: 'Clinical Medicine',
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
    const matchesSpecialty = selectedSpecialty === 'all' || course.category === selectedSpecialty;
    return matchesSearch && matchesLevel && matchesSpecialty;
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const specialties = ['Clinical Medicine', 'Nursing', 'Pharmaceuticals', 'Public Health', 'Laboratory Sciences', 'Mental Health', 'Surgery', 'Pediatrics'];

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
            Health Science (162 Courses)
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advance your career in healthcare with comprehensive training in clinical medicine, nursing, 
            pharmaceuticals, public health, and medical laboratory sciences. Expert-led courses for healthcare professionals.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            {[
              { key: 'overview', label: 'Overview', icon: Eye },
              { key: 'courses', label: 'Courses', icon: BookOpen },
              { key: 'specialties', label: 'Specialties', icon: Stethoscope },
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
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">162</div>
                    <div className="text-gray-600">Health Science Courses</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">
                      {courses.reduce((sum, course) => sum + course.students, 0)}+
                    </div>
                    <div className="text-gray-600">Healthcare Professionals</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">4.7</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl font-bold text-[#0a174e] mb-2">8</div>
                    <div className="text-gray-600">Medical Specialties</div>
                  </div>
                </div>

                {/* About Health Science */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">About Health Science</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">What You'll Learn</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Clinical medicine and patient care
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Nursing practice and healthcare management
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Pharmaceutical sciences and drug development
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Public health and epidemiology
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Medical laboratory sciences
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e] mb-3">Medical Specialties</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          Clinical Medicine
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-blue-600" />
                          Nursing Practice
                        </li>
                        <li className="flex items-center gap-2">
                          <Pill className="w-4 h-4 text-blue-600" />
                          Pharmaceutical Sciences
                        </li>
                        <li className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-600" />
                          Public Health
                        </li>
                        <li className="flex items-center gap-2">
                          <Microscope className="w-4 h-4 text-blue-600" />
                          Laboratory Sciences
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Courses */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold text-[#0a174e] mb-4">Featured Health Science Courses</h3>
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
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Specialties</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
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
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
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

            {activeTab === 'specialties' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Health Science Specialties</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Clinical Medicine',
                      icon: Stethoscope,
                      description: 'Patient care, diagnosis, treatment, and clinical practice',
                      courses: 45,
                      avgSalary: '$180,000 - $350,000',
                      skills: ['Clinical Diagnosis', 'Patient Care', 'Treatment Protocols', 'Medical Ethics']
                    },
                    {
                      name: 'Nursing Practice',
                      icon: Heart,
                      description: 'Nursing care, patient management, healthcare coordination',
                      courses: 38,
                      avgSalary: '$70,000 - $120,000',
                      skills: ['Nursing Care', 'Patient Management', 'Healthcare Coordination', 'Clinical Skills']
                    },
                    {
                      name: 'Pharmaceutical Sciences',
                      icon: Pill,
                      description: 'Drug development, pharmacology, clinical trials',
                      courses: 25,
                      avgSalary: '$90,000 - $180,000',
                      skills: ['Drug Development', 'Pharmacology', 'Clinical Trials', 'Pharmaceutical Research']
                    },
                    {
                      name: 'Public Health',
                      icon: Activity,
                      description: 'Population health, epidemiology, health policy',
                      courses: 22,
                      avgSalary: '$60,000 - $120,000',
                      skills: ['Public Health', 'Epidemiology', 'Health Policy', 'Population Health']
                    },
                    {
                      name: 'Laboratory Sciences',
                      icon: Microscope,
                      description: 'Medical testing, laboratory management, diagnostic procedures',
                      courses: 18,
                      avgSalary: '$50,000 - $100,000',
                      skills: ['Laboratory Testing', 'Diagnostic Procedures', 'Lab Management', 'Quality Control']
                    },
                    {
                      name: 'Mental Health',
                      icon: Brain,
                      description: 'Psychology, psychiatry, mental health counseling',
                      courses: 14,
                      avgSalary: '$80,000 - $150,000',
                      skills: ['Mental Health', 'Psychology', 'Counseling', 'Therapeutic Interventions']
                    }
                  ].map(specialty => (
                    <div key={specialty.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0a174e] rounded-lg flex items-center justify-center">
                          <specialty.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0a174e] mb-1">{specialty.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{specialty.description}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-gray-500">{specialty.courses} courses</span>
                            <span className="text-sm text-green-600 font-medium">{specialty.avgSalary}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {specialty.skills.map(skill => (
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
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Career Paths in Health Science</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Medical Doctor (MD)',
                      description: 'Practice medicine, diagnose patients, and provide treatment',
                      salary: '$200,000 - $400,000+',
                      requirements: ['Medical degree', 'Licensing', 'Residency training', 'Board certification']
                    },
                    {
                      title: 'Registered Nurse (RN)',
                      description: 'Provide patient care and coordinate healthcare services',
                      salary: '$70,000 - $120,000',
                      requirements: ['Nursing degree', 'RN license', 'Clinical experience', 'Continuing education']
                    },
                    {
                      title: 'Pharmacist',
                      description: 'Dispense medications and provide pharmaceutical care',
                      salary: '$120,000 - $180,000',
                      requirements: ['Pharmacy degree', 'Pharmacist license', 'Clinical experience', 'Drug knowledge']
                    },
                    {
                      title: 'Public Health Specialist',
                      description: 'Develop health policies and manage population health programs',
                      salary: '$80,000 - $140,000',
                      requirements: ['Public health degree', 'Epidemiology training', 'Policy experience', 'Analytical skills']
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
                  <span className="font-semibold">162</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Healthcare Professionals:</span>
                  <span className="font-semibold">{courses.reduce((sum, course) => sum + course.students, 0)}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-semibold">4.7/5.0</span>
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
                  Download Medical Guide
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

            {/* Medical Experts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Medical Experts</h3>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Sarah Johnson', expertise: 'Clinical Medicine', courses: 12 },
                  { name: 'Dr. Michael Chen', expertise: 'Nursing Practice', courses: 8 },
                  { name: 'Dr. Emily Rodriguez', expertise: 'Pharmaceuticals', courses: 6 }
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Create New Health Science Course</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Specialty</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
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
              <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Edit Health Science Course</h3>
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

export default HealthScience;
