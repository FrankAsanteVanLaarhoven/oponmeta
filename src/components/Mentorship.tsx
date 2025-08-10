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

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showScheduling, setShowScheduling] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const mentors = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'AI & Data Science Lead',
      company: 'TechCorp',
      expertise: ['Machine Learning', 'Python', 'Data Analysis'],
      availability: ['Mon', 'Wed', 'Fri'],
      rating: 4.8,
      sessions: 45,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: '10+ years in AI and data science. Passionate about mentoring the next generation of tech leaders.',
      hourlyRate: 150
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      expertise: ['React', 'Node.js', 'AWS'],
      availability: ['Tue', 'Thu', 'Sat'],
      rating: 4.9,
      sessions: 32,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Full-stack developer with expertise in modern web technologies. Love helping others grow their skills.',
      hourlyRate: 120
    },
    {
      id: 3,
      name: 'Samuel Lee',
      role: 'Product Manager',
      company: 'InnovateTech',
      expertise: ['Product Strategy', 'User Research', 'Agile'],
      availability: ['Mon', 'Tue', 'Thu'],
      rating: 4.7,
      sessions: 28,
      image: 'https://randomuser.me/api/portraits/men/65.jpg',
      bio: 'Product management expert with experience in both startups and enterprise companies.',
      hourlyRate: 180
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'find-mentor', label: 'Find a Mentor' },
    { key: 'my-sessions', label: 'My Sessions' },
    { key: 'become-mentor', label: 'Become a Mentor' }
  ];

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
          Unlock Your Potential with OponMeta Mentorship
        </motion.h1>
        <motion.p className="text-lg text-gray-700 mb-6" variants={headingVariants}>
          Connect with experienced professionals and industry leaders who are passionate about helping you grow. Our mentorship program is designed for students, early-career professionals, and anyone looking to pivot or advance.
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
      </motion.div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto">
        {activeTab === 'overview' && (
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="bg-white rounded-lg shadow p-6" variants={cardVariants}>
              <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">1:1 and group mentorship sessions tailored to your goals and interests.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg shadow p-6" variants={cardVariants}>
              <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Career Planning</h3>
              <p className="text-gray-600">Get help with career planning, resume building, and interview preparation.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg shadow p-6" variants={cardVariants}>
              <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Networking</h3>
              <p className="text-gray-600">Access exclusive events and connect with a global network of mentors and peers.</p>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'find-mentor' && (
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-lg shadow p-6"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="text-2xl font-bold text-[#0a174e] mb-4" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                Find Your Perfect Mentor
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Expertise</option>
                  <option>Machine Learning</option>
                  <option>Web Development</option>
                  <option>Product Management</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Availability</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Rates</option>
                  <option>$50-100/hr</option>
                  <option>$100-150/hr</option>
                  <option>$150+/hr</option>
                </select>
              </div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {mentors.map(mentor => (
                <motion.div
                  key={mentor.id}
                  className="bg-white rounded-lg shadow p-6"
                  variants={cardVariants}
                >
                  <div className="flex items-center mb-4">
                    <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold text-[#0a174e]">{mentor.name}</h4>
                      <p className="text-gray-600 text-sm">{mentor.role}</p>
                      <p className="text-gray-500 text-xs">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">{mentor.rating}</span>
                      <span className="ml-2 text-sm text-gray-500">({mentor.sessions} sessions)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.expertise.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{mentor.bio}</p>
                    <p className="text-sm text-gray-500">Available: {mentor.availability.join(', ')}</p>
                    <p className="text-sm font-semibold text-[#0a174e]">${mentor.hourlyRate}/hr</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMentor(mentor);
                        setShowScheduling(true);
                      }}
                      className="flex-1 bg-[#0a174e] text-white py-2 rounded-md font-semibold hover:bg-[#11235a] transition"
                    >
                      Book Session
                    </button>
                    <button className="px-4 py-2 border border-[#0a174e] text-[#0a174e] rounded-md font-semibold hover:bg-[#0a174e] hover:text-white transition">
                      View Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {activeTab === 'my-sessions' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#0a174e] mb-6">My Mentorship Sessions</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#0a174e]">Session with Alex Johnson</h4>
                    <p className="text-gray-600">AI Career Guidance</p>
                    <p className="text-sm text-gray-500">Tomorrow, 2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition">
                      Join Meeting
                    </button>
                    <button 
                      onClick={() => setShowFeedback(true)}
                      className="px-4 py-2 bg-[#FFD700] text-[#0a174e] rounded-md text-sm font-semibold hover:bg-yellow-300 transition"
                    >
                      Feedback
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#0a174e]">Session with Maria Rodriguez</h4>
                    <p className="text-gray-600">React Development</p>
                    <p className="text-sm text-gray-500">Completed on Dec 15, 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowFeedback(true)}
                      className="px-4 py-2 bg-[#FFD700] text-[#0a174e] rounded-md text-sm font-semibold hover:bg-yellow-300 transition"
                    >
                      Leave Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'become-mentor' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#0a174e] mb-4">Become a Mentor</h2>
            <form className="grid gap-4 max-w-2xl">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
                <input type="email" placeholder="Email Address" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Current Role" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
                <input type="text" placeholder="Company" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
              </div>
              <input type="text" placeholder="LinkedIn or Portfolio URL" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
              <textarea placeholder="Tell us about your expertise and experience..." className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" rows={4} />
              <div className="grid md:grid-cols-2 gap-4">
                <input type="number" placeholder="Hourly Rate ($)" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
                  <option>Select Availability</option>
                  <option>Weekdays Only</option>
                  <option>Weekends Only</option>
                  <option>Flexible</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-[#0a174e] text-white font-semibold rounded-md hover:bg-[#11235a] transition-colors text-lg">Submit Application</button>
            </form>
          </div>
        )}
      </div>

      {/* Scheduling Modal */}
      {showScheduling && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Schedule Session with {selectedMentor.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {timeSlots.map(slot => (
                    <option key={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Topic</label>
                <input type="text" placeholder="What would you like to discuss?" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowScheduling(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Session Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="text-2xl text-yellow-400 hover:text-yellow-500">★</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                <textarea 
                  placeholder="Share your experience..." 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  rows={4}
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

      {/* Success Stories */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-[#0a174e] mb-6 text-center">Success Stories</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-700 italic mb-2">"Thanks to my OponMeta mentor, I landed my dream job in tech. The guidance and support were invaluable!"</p>
          <div className="text-right text-sm text-gray-500">— Aisha, Mentee</div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship; 