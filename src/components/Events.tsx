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

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const events = [
    {
      id: 1,
      title: 'OponMeta Tech Summit 2025',
      date: '2025-03-15',
      time: '9:00 AM - 6:00 PM',
      location: 'San Francisco Convention Center',
      type: 'In-Person',
      category: 'Conference',
      description: 'Join us for our annual technology summit featuring keynote speakers, workshops, and networking opportunities.',
      speakers: ['Dr. Sarah Chen', 'Mike Rodriguez', 'Emily Watson'],
      price: 299,
      capacity: 500,
      registered: 342,
      status: 'upcoming',
      image: 'https://via.placeholder.com/400x250/0a174e/ffffff?text=Tech+Summit',
      agenda: [
        '9:00 AM - Opening Keynote',
        '10:30 AM - AI in Education Panel',
        '12:00 PM - Networking Lunch',
        '2:00 PM - Workshop Sessions',
        '4:30 PM - Closing Remarks'
      ]
    },
    {
      id: 2,
      title: 'Virtual AI Workshop Series',
      date: '2025-02-20',
      time: '2:00 PM - 4:00 PM',
      location: 'Online (Zoom)',
      type: 'Virtual',
      category: 'Workshop',
      description: 'Learn the fundamentals of artificial intelligence and machine learning in this interactive virtual workshop.',
      speakers: ['Dr. Alex Johnson'],
      price: 49,
      capacity: 100,
      registered: 78,
      status: 'upcoming',
      image: 'https://via.placeholder.com/400x250/FFD700/0a174e?text=AI+Workshop',
      agenda: [
        '2:00 PM - Introduction to AI',
        '2:30 PM - Machine Learning Basics',
        '3:00 PM - Hands-on Exercises',
        '3:45 PM - Q and A Session'
      ]
    },
    {
      id: 3,
      title: 'Student Success Stories Panel',
      date: '2024-12-10',
      time: '7:00 PM - 8:30 PM',
      location: 'Online (YouTube Live)',
      type: 'Virtual',
      category: 'Panel',
      description: 'Hear inspiring stories from OponMeta students who have transformed their careers through our programs.',
      speakers: ['Aisha Patel', 'Carlos Rodriguez', 'Lisa Thompson'],
      price: 0,
      capacity: 1000,
      registered: 456,
      status: 'completed',
      image: 'https://via.placeholder.com/400x250/ffffff/0a174e?text=Success+Stories',
      recordingUrl: '#'
    },
    {
      id: 4,
      title: 'Partner Networking Event',
      date: '2025-01-25',
      time: '6:00 PM - 9:00 PM',
      location: 'New York City',
      type: 'In-Person',
      category: 'Networking',
      description: 'Connect with industry leaders and potential partners in an intimate networking setting.',
      speakers: ['Various Industry Leaders'],
      price: 150,
      capacity: 100,
      registered: 67,
      status: 'upcoming',
      image: 'https://via.placeholder.com/400x250/0a174e/ffffff?text=Networking',
      agenda: [
        '6:00 PM - Welcome Reception',
        '6:30 PM - Partner Presentations',
        '7:30 PM - Networking Session',
        '8:30 PM - Closing Remarks'
      ]
    }
  ];

  const categories = ['All Events', 'Conference', 'Workshop', 'Panel', 'Networking', 'Webinar'];
  const eventTypes = ['All Types', 'In-Person', 'Virtual', 'Hybrid'];

  const tabs = [
    { key: 'upcoming', label: 'Upcoming Events' },
    { key: 'past', label: 'Past Events' },
    { key: 'calendar', label: 'Event Calendar' }
  ];

  const filteredEvents = events.filter(event => {
    if (activeTab === 'upcoming') return event.status === 'upcoming';
    if (activeTab === 'past') return event.status === 'completed';
    return true;
  });

  return (
    <div className="bg-[#f6f9fc] min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <motion.h1 className="text-4xl font-bold text-[#0a174e] mb-4" variants={headingVariants}>
            Events and Conferences
          </motion.h1>
          <motion.p className="text-lg text-gray-700 max-w-3xl mx-auto" variants={headingVariants}>
            Join us for inspiring events, workshops, and conferences designed to connect, educate, and empower our community.
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          variants={tabVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
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
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white rounded-lg shadow p-6 mb-8"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <select className="border border-gray-300 rounded-md px-3 py-2">
              {categories.map(category => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2">
              {eventTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <button className="px-6 py-2 bg-[#FFD700] text-[#0a174e] rounded-md font-semibold hover:bg-yellow-300 transition">
              Filter Events
            </button>
          </div>
        </motion.div>

        {/* Events Grid */}
        {activeTab !== 'calendar' && (
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filteredEvents.map(event => (
              <motion.div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                variants={cardVariants}
              >
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-[#0a174e]">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.type === 'Virtual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      📅 {new Date(event.date).toLocaleDateString()} • {event.time}
                    </p>
                    <p className="text-gray-600">📍 {event.location}</p>
                    <p className="text-gray-600">👥 {event.registered}/{event.capacity} registered</p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {event.category}
                    </span>
                    {event.speakers.map(speaker => (
                      <span key={speaker} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {speaker}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#0a174e]">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </span>
                    <div className="flex gap-2">
                      {event.status === 'upcoming' ? (
                        <button
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowRegistration(true);
                          }}
                          className="px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition"
                        >
                          Register Now
                        </button>
                      ) : (
                        <a
                          href={event.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#FFD700] text-[#0a174e] rounded-md font-semibold hover:bg-yellow-300 transition"
                        >
                          Watch Recording
                        </a>
                      )}
                      <button className="px-4 py-2 border border-[#0a174e] text-[#0a174e] rounded-md font-semibold hover:bg-[#0a174e] hover:text-white transition">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#0a174e] mb-6">Event Calendar</h2>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(2025, 0, i + 1);
                const event = events.find(e => 
                  new Date(e.date).toDateString() === date.toDateString()
                );
                return (
                  <div key={i} className="border border-gray-200 p-2 min-h-[100px]">
                    <div className="text-sm text-gray-600">{i + 1}</div>
                    {event && (
                      <div className="mt-1">
                        <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded">
                          {event.title}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Featured Event Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0a174e] to-[#1a2a6b] text-white rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">OponMeta Tech Summit 2025</h2>
              <p className="text-gray-200 mb-4">
                Join us for our biggest event of the year! Three days of inspiring talks, hands-on workshops, and networking with industry leaders.
              </p>
              <div className="space-y-2 mb-6">
                <p>📅 March 15-17, 2025</p>
                <p>📍 San Francisco Convention Center</p>
                <p>🎟️ Early Bird Pricing Available</p>
              </div>
              <button className="px-8 py-3 bg-[#FFD700] text-[#0a174e] font-bold rounded-lg hover:bg-yellow-300 transition">
                Get Your Tickets
              </button>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-[#FFD700] mb-2">500+</div>
              <div className="text-gray-200">Expected Attendees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Register for {selectedEvent.title}</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Event Details:</p>
                <p className="font-semibold">{selectedEvent.title}</p>
                <p className="text-sm">{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}</p>
                <p className="text-sm">📍 {selectedEvent.location}</p>
                <p className="text-lg font-bold text-[#0a174e]">
                  {selectedEvent.price === 0 ? 'Free' : `$${selectedEvent.price}`}
                </p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisation</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Requirements (if applicable)</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>None</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Gluten-Free</option>
                  <option>Other</option>
                </select>
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
    </div>
  );
};

export default Events; 