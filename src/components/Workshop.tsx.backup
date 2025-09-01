import React, { useState } from 'react';
import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'tween', duration: 0.7 } },
};

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.6 } },
};

const Workshop = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLiveSession, setShowLiveSession] = useState(false);
  
  // CRUD State Management
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: 'AI for Everyone: Live Interactive Session',
      date: '2025-04-20',
      time: '2:00 PM - 4:00 PM',
      location: 'Online',
      instructor: 'Dr. Sarah Chen',
      category: 'Artificial Intelligence',
      level: 'Beginner',
      price: 49,
      capacity: 50,
      enrolled: 32,
      description: 'A beginner-friendly workshop on the basics of artificial intelligence and its real-world applications. Live Q&A session included.',
      topics: ['Machine Learning Basics', 'AI Ethics', 'Real-world Applications', 'Live Q&A'],
      materials: ['Laptop', 'Python installed', 'Basic programming knowledge'],
      status: 'upcoming',
      meetingLink: '#',
      recordingUrl: null,
      isLive: true,
      liveFeatures: ['Real-time Chat', 'Screen Sharing', 'Interactive Polls', 'Breakout Rooms']
    },
    {
      id: 2,
      title: 'Full Stack Web Development: Live Coding Session',
      date: '2025-05-05',
      time: '10:00 AM - 6:00 PM',
      location: 'Hybrid (Online + Campus)',
      instructor: 'Mike Rodriguez',
      category: 'Web Development',
      level: 'Intermediate',
      price: 199,
      capacity: 25,
      enrolled: 18,
      description: 'Build and deploy a web app from scratch in this intensive, hands-on live coding session.',
      topics: ['React', 'Node.js', 'Database Design', 'Live Deployment', 'Code Review'],
      materials: ['Laptop', 'GitHub account', 'Intermediate JavaScript'],
      status: 'upcoming',
      meetingLink: '#',
      recordingUrl: null,
      isLive: true,
      liveFeatures: ['Live Coding', 'Pair Programming', 'Code Review', 'Real-time Collaboration']
    },
    {
      id: 3,
      title: 'Data Science Fundamentals: Interactive Workshop',
      date: '2024-12-10',
      time: '1:00 PM - 3:00 PM',
      location: 'Online',
      instructor: 'Dr. Emily Watson',
      category: 'Data Science',
      level: 'Beginner',
      price: 79,
      capacity: 40,
      enrolled: 40,
      description: 'Learn the fundamentals of data science and statistical analysis with hands-on exercises.',
      topics: ['Statistics', 'Python Pandas', 'Data Visualization', 'Interactive Exercises'],
      materials: ['Laptop', 'Python installed'],
      status: 'completed',
      meetingLink: null,
      recordingUrl: '#',
      isLive: false,
      liveFeatures: []
    },
    {
      id: 4,
      title: 'Leadership in Digital Age: Live Masterclass',
      date: '2025-04-25',
      time: '6:00 PM - 8:00 PM',
      location: 'Online',
      instructor: 'Prof. James Wilson',
      category: 'Leadership',
      level: 'Advanced',
      price: 89,
      capacity: 30,
      enrolled: 15,
      description: 'Master the art of leadership in the digital era with real-world case studies and live discussions.',
      topics: ['Digital Leadership', 'Remote Team Management', 'Change Management', 'Live Case Studies'],
      materials: ['Notebook', 'Open mind', 'Leadership experience preferred'],
      status: 'upcoming',
      meetingLink: '#',
      recordingUrl: null,
      isLive: true,
      liveFeatures: ['Case Study Discussions', 'Role-playing Exercises', 'Peer Feedback', 'Expert Q&A']
    },
    {
      id: 5,
      title: 'UX/UI Design Sprint: Live Design Workshop',
      date: '2025-05-10',
      time: '9:00 AM - 5:00 PM',
      location: 'On Campus',
      instructor: 'Lisa Thompson',
      category: 'Design',
      level: 'Intermediate',
      price: 149,
      capacity: 20,
      enrolled: 12,
      description: 'Complete a design sprint from ideation to prototype in this intensive live workshop.',
      topics: ['Design Thinking', 'User Research', 'Prototyping', 'User Testing', 'Live Feedback'],
      materials: ['Laptop', 'Design software (Figma/Sketch)', 'Creative mindset'],
      status: 'upcoming',
      meetingLink: '#',
      recordingUrl: null,
      isLive: true,
      liveFeatures: ['Design Critiques', 'Live Prototyping', 'User Testing Sessions', 'Collaborative Design']
    },
    {
      id: 6,
      title: 'Blockchain & Web3: Live Development Session',
      date: '2025-04-30',
      time: '3:00 PM - 6:00 PM',
      location: 'Online',
      instructor: 'Alex Kumar',
      category: 'Technology',
      level: 'Advanced',
      price: 129,
      capacity: 35,
      enrolled: 28,
      description: 'Build a smart contract and deploy it on a testnet in this hands-on blockchain workshop.',
      topics: ['Smart Contracts', 'Solidity', 'DeFi Protocols', 'Live Deployment', 'Security Best Practices'],
      materials: ['Laptop', 'MetaMask wallet', 'Basic programming knowledge'],
      status: 'upcoming',
      meetingLink: '#',
      recordingUrl: null,
      isLive: true,
      liveFeatures: ['Live Smart Contract Development', 'Real-time Testing', 'Security Auditing', 'DeFi Protocol Interaction']
    }
  ]);

  // CRUD State for Create/Edit
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    date: '',
    time: '',
    location: 'Online',
    instructor: '',
    category: 'Technology',
    level: 'Beginner',
    price: 0,
    capacity: 20,
    enrolled: 0,
    description: '',
    topics: [],
    materials: [],
    status: 'upcoming',
    meetingLink: '',
    recordingUrl: '',
    isLive: false,
    liveFeatures: []
  });

  // CRUD Functions
  const handleCreateWorkshop = () => {
    const workshopToCreate = {
      ...newWorkshop,
      id: Math.max(...workshops.map(w => w.id)) + 1,
      topics: newWorkshop.topics.filter(t => t.trim() !== ''),
      materials: newWorkshop.materials.filter(m => m.trim() !== ''),
      liveFeatures: newWorkshop.liveFeatures.filter(f => f.trim() !== '')
    };
    
    setWorkshops([...workshops, workshopToCreate]);
    setShowCreateModal(false);
    setNewWorkshop({
      title: '',
      date: '',
      time: '',
      location: 'Online',
      instructor: '',
      category: 'Technology',
      level: 'Beginner',
      price: 0,
      capacity: 20,
      enrolled: 0,
      description: '',
      topics: [],
      materials: [],
      status: 'upcoming',
      meetingLink: '',
      recordingUrl: '',
      isLive: false,
      liveFeatures: []
    });
  };

  const handleUpdateWorkshop = () => {
    const updatedWorkshops = workshops.map(workshop => 
      workshop.id === editingWorkshop.id ? editingWorkshop : workshop
    );
    setWorkshops(updatedWorkshops);
    setShowEditModal(false);
    setEditingWorkshop(null);
  };

  const handleDeleteWorkshop = (id) => {
    setWorkshops(workshops.filter(workshop => workshop.id !== id));
    setShowDeleteModal(false);
    setSelectedWorkshop(null);
  };

  const handleEditWorkshop = (workshop) => {
    setEditingWorkshop({ ...workshop });
    setShowEditModal(true);
  };

  const handleDeleteClick = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowDeleteModal(true);
  };

  const addTopic = () => {
    setNewWorkshop({
      ...newWorkshop,
      topics: [...newWorkshop.topics, '']
    });
  };

  const updateTopic = (index, value) => {
    const updatedTopics = [...newWorkshop.topics];
    updatedTopics[index] = value;
    setNewWorkshop({
      ...newWorkshop,
      topics: updatedTopics
    });
  };

  const removeTopic = (index) => {
    const updatedTopics = newWorkshop.topics.filter((_, i) => i !== index);
    setNewWorkshop({
      ...newWorkshop,
      topics: updatedTopics
    });
  };

  const addMaterial = () => {
    setNewWorkshop({
      ...newWorkshop,
      materials: [...newWorkshop.materials, '']
    });
  };

  const updateMaterial = (index, value) => {
    const updatedMaterials = [...newWorkshop.materials];
    updatedMaterials[index] = value;
    setNewWorkshop({
      ...newWorkshop,
      materials: updatedMaterials
    });
  };

  const removeMaterial = (index) => {
    const updatedMaterials = newWorkshop.materials.filter((_, i) => i !== index);
    setNewWorkshop({
      ...newWorkshop,
      materials: updatedMaterials
    });
  };

  const addLiveFeature = () => {
    setNewWorkshop({
      ...newWorkshop,
      liveFeatures: [...newWorkshop.liveFeatures, '']
    });
  };

  const updateLiveFeature = (index, value) => {
    const updatedFeatures = [...newWorkshop.liveFeatures];
    updatedFeatures[index] = value;
    setNewWorkshop({
      ...newWorkshop,
      liveFeatures: updatedFeatures
    });
  };

  const removeLiveFeature = (index) => {
    const updatedFeatures = newWorkshop.liveFeatures.filter((_, i) => i !== index);
    setNewWorkshop({
      ...newWorkshop,
      liveFeatures: updatedFeatures
    });
  };

  const tabs = [
    { key: 'upcoming', label: 'Upcoming Workshops' },
    { key: 'my-workshops', label: 'My Workshops' },
    { key: 'past-workshops', label: 'Past Workshops' },
    { key: 'calendar', label: 'Calendar View' }
  ];

  const categories = ['All Categories', 'Artificial Intelligence', 'Web Development', 'Data Science', 'Leadership', 'Design'];

  const filteredWorkshops = workshops.filter(workshop => {
    if (activeTab === 'upcoming') return workshop.status === 'upcoming';
    if (activeTab === 'past-workshops') return workshop.status === 'completed';
    return true;
  });

  return (
    <div className="bg-[#f6f9fc] min-h-screen py-12 px-4">
      {/* Hero Section */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        <motion.h1 className="text-4xl font-bold text-[#0a174e] mb-4" variants={headingVariants}>
          Hands-On Workshops for Real-World Skills
        </motion.h1>
        <motion.p className="text-lg text-gray-700 mb-6" variants={headingVariants}>
          Join live, interactive sessions led by industry experts. Our workshops are designed to give you practical, actionable skills in a collaborative environment.
        </motion.p>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        className="max-w-5xl mx-auto mb-8"
        variants={tabVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map(tab => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === tab.key 
                  ? 'bg-[#0a174e] text-white shadow-lg' 
                  : 'bg-white text-[#0a174e] hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
        
        {/* Create Workshop Button */}
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-3 bg-[#FFD700] text-[#0a174e] font-bold rounded-lg hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Workshop
          </motion.button>
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto">
        {activeTab === 'upcoming' && (
          <div className="space-y-8">
            {/* Filters */}
            <motion.div
              className="bg-white rounded-lg shadow p-6"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="text-2xl font-bold text-[#0a174e] mb-4" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                Upcoming Workshops
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  {categories.map(category => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Locations</option>
                  <option>Online</option>
                  <option>Hybrid</option>
                  <option>On Campus</option>
                </select>
              </div>
            </motion.div>

            {/* Workshop Cards */}
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {filteredWorkshops.map(workshop => (
                <motion.div
                  key={workshop.id}
                  className="bg-white rounded-lg shadow p-6"
                  variants={cardVariants}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-[#0a174e] text-lg">{workshop.title}</h4>
                      <p className="text-gray-600">{workshop.instructor}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {workshop.level}
                      </span>
                      {workshop.isLive && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 animate-pulse">
                          🔴 LIVE SESSION
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600 text-sm">
                      📅 {new Date(workshop.date).toLocaleDateString()} • {workshop.time}
                    </p>
                    <p className="text-gray-600 text-sm">📍 {workshop.location}</p>
                    <p className="text-gray-600 text-sm">👥 {workshop.enrolled}/{workshop.capacity} enrolled</p>
                    <p className="text-gray-500 text-sm">{workshop.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {workshop.topics.map(topic => (
                      <span key={topic} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  {workshop.isLive && workshop.liveFeatures && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-green-700 mb-2">🎥 Live Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {workshop.liveFeatures.map(feature => (
                          <span key={feature} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#0a174e]">${workshop.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedWorkshop(workshop);
                          setShowRegistration(true);
                        }}
                        className="px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition"
                      >
                        Register
                      </button>
                      <button className="px-4 py-2 border border-[#0a174e] text-[#0a174e] rounded-md font-semibold hover:bg-[#0a174e] hover:text-white transition-colors">
                        Details
                      </button>
                      <button
                        onClick={() => handleEditWorkshop(workshop)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(workshop)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {activeTab === 'my-workshops' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#0a174e] mb-6">My Registered Workshops</h2>
            <div className="space-y-4">
              {workshops.filter(w => w.enrolled > 0).map(workshop => (
                <div key={workshop.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-[#0a174e]">{workshop.title}</h4>
                      <p className="text-gray-600">{workshop.instructor}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(workshop.date).toLocaleDateString()} • {workshop.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {workshop.status === 'upcoming' && workshop.meetingLink && (
                        <button
                          onClick={() => {
                            setSelectedWorkshop(workshop);
                            setShowLiveSession(true);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition"
                        >
                          Join Live
                        </button>
                      )}
                      {workshop.status === 'completed' && workshop.recordingUrl && (
                        <a
                          href={workshop.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                        >
                          Watch Recording
                        </a>
                      )}
                      <button 
                        onClick={() => setShowFeedback(true)}
                        className="px-4 py-2 bg-[#FFD700] text-[#0a174e] rounded-md text-sm font-semibold hover:bg-yellow-300 transition"
                      >
                        Feedback
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'past-workshops' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#0a174e] mb-6">Past Workshops</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {workshops.filter(w => w.status === 'completed').map(workshop => (
                <div key={workshop.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0a174e]">{workshop.title}</h4>
                  <p className="text-gray-600 text-sm">{workshop.instructor}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(workshop.date).toLocaleDateString()} • {workshop.time}
                  </p>
                  {workshop.recordingUrl && (
                    <a
                      href={workshop.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Watch Recording
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#0a174e] mb-6">Workshop Calendar</h2>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(2025, 3, i + 1);
                const workshop = workshops.find(w => 
                  new Date(w.date).toDateString() === date.toDateString()
                );
                return (
                  <div key={i} className="border border-gray-200 p-2 min-h-[80px]">
                    <div className="text-sm text-gray-600">{i + 1}</div>
                    {workshop && (
                      <div className="mt-1">
                        <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded">
                          {workshop.title}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {showRegistration && selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Register for {selectedWorkshop.title}</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Workshop Details:</p>
                <p className="font-semibold">{selectedWorkshop.title}</p>
                <p className="text-sm">{selectedWorkshop.instructor}</p>
                <p className="text-sm">{new Date(selectedWorkshop.date).toLocaleDateString()} • {selectedWorkshop.time}</p>
                <p className="text-sm">📍 {selectedWorkshop.location}</p>
                <p className="text-lg font-bold text-[#0a174e]">${selectedWorkshop.price}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goals for this workshop</label>
                <textarea 
                  placeholder="What do you hope to learn?" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRegistration(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition">
                  Complete Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Session Modal */}
      {showLiveSession && selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Live Workshop: {selectedWorkshop.title}</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Meeting Link:</p>
                <a 
                  href={selectedWorkshop.meetingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {selectedWorkshop.meetingLink}
                </a>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[#0a174e] mb-2">Workshop Materials</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedWorkshop.materials.map(material => (
                      <li key={material}>• {material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0a174e] mb-2">Topics Covered</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedWorkshop.topics.map(topic => (
                      <li key={topic}>• {topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLiveSession(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <a
                  href={selectedWorkshop.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition text-center"
                >
                  Join Meeting
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Workshop Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="text-2xl text-yellow-400 hover:text-yellow-500">★</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What did you learn?</label>
                <textarea 
                  placeholder="Share your key takeaways..." 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Suggestions for improvement</label>
                <textarea 
                  placeholder="How can we make this workshop better?" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition">
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Workshop Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Create New Workshop</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workshop Title</label>
                  <input
                    type="text"
                    value={newWorkshop.title}
                    onChange={(e) => setNewWorkshop({...newWorkshop, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter workshop title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                  <input
                    type="text"
                    value={newWorkshop.instructor}
                    onChange={(e) => setNewWorkshop({...newWorkshop, instructor: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter instructor name"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newWorkshop.date}
                    onChange={(e) => setNewWorkshop({...newWorkshop, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={newWorkshop.time}
                    onChange={(e) => setNewWorkshop({...newWorkshop, time: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., 2:00 PM - 4:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={newWorkshop.location}
                    onChange={(e) => setNewWorkshop({...newWorkshop, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Online">Online</option>
                    <option value="Hybrid (Online + Campus)">Hybrid</option>
                    <option value="On Campus">On Campus</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newWorkshop.category}
                    onChange={(e) => setNewWorkshop({...newWorkshop, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={newWorkshop.level}
                    onChange={(e) => setNewWorkshop({...newWorkshop, level: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={newWorkshop.price}
                    onChange={(e) => setNewWorkshop({...newWorkshop, price: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    value={newWorkshop.capacity}
                    onChange={(e) => setNewWorkshop({...newWorkshop, capacity: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Live Session</label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={newWorkshop.isLive}
                      onChange={(e) => setNewWorkshop({...newWorkshop, isLive: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Enable live features</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newWorkshop.description}
                  onChange={(e) => setNewWorkshop({...newWorkshop, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  placeholder="Enter workshop description"
                />
              </div>

              {/* Topics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topics Covered</label>
                <div className="space-y-2">
                  {newWorkshop.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => updateTopic(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter topic"
                      />
                      <button
                        onClick={() => removeTopic(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addTopic}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Topic
                  </button>
                </div>
              </div>

              {/* Materials */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Materials</label>
                <div className="space-y-2">
                  {newWorkshop.materials.map((material, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => updateMaterial(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter material"
                      />
                      <button
                        onClick={() => removeMaterial(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addMaterial}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Material
                  </button>
                </div>
              </div>

              {/* Live Features */}
              {newWorkshop.isLive && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Live Features</label>
                  <div className="space-y-2">
                    {newWorkshop.liveFeatures.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateLiveFeature(index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                          placeholder="Enter live feature"
                        />
                        <button
                          onClick={() => removeLiveFeature(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addLiveFeature}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Add Live Feature
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWorkshop}
                  className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition"
                >
                  Create Workshop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Workshop Modal */}
      {showEditModal && editingWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Edit Workshop</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workshop Title</label>
                  <input
                    type="text"
                    value={editingWorkshop.title}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                  <input
                    type="text"
                    value={editingWorkshop.instructor}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, instructor: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={editingWorkshop.date}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={editingWorkshop.time}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, time: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={editingWorkshop.location}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Online">Online</option>
                    <option value="Hybrid (Online + Campus)">Hybrid</option>
                    <option value="On Campus">On Campus</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={editingWorkshop.category}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={editingWorkshop.level}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, level: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={editingWorkshop.price}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, price: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    value={editingWorkshop.capacity}
                    onChange={(e) => setEditingWorkshop({...editingWorkshop, capacity: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Live Session</label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={editingWorkshop.isLive}
                      onChange={(e) => setEditingWorkshop({...editingWorkshop, isLive: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Enable live features</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingWorkshop.description}
                  onChange={(e) => setEditingWorkshop({...editingWorkshop, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
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
                  onClick={handleUpdateWorkshop}
                  className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition"
                >
                  Update Workshop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Delete Workshop</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedWorkshop.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWorkshop(selectedWorkshop.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Value Proposition */}
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Project-Based Learning</h3>
          <p className="text-gray-600">Work on real-world projects and build your portfolio with hands-on labs.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Expert Instructors</h3>
          <p className="text-gray-600">Learn from top professionals in AI, Web Development, Data Science, Leadership, and more.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Certificates of Completion</h3>
          <p className="text-gray-600">Earn certificates to showcase your new skills and boost your resume.</p>
        </div>
      </div>
    </div>
  );
};

export default Workshop; 