import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

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

const Partners = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPartnerRegistration, setShowPartnerRegistration] = useState(false);
  const [showCollaborationProposal, setShowCollaborationProposal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const partners = [
    {
      id: 1,
      name: 'TechCorp Industries',
      logo: 'https://via.placeholder.com/120x60/0a174e/ffffff?text=TechCorp',
      category: 'Technology',
      partnershipType: 'Strategic',
      description: 'Leading technology company specializing in AI and machine learning solutions.',
      collaborationAreas: ['AI Research', 'Internship Programs', 'Joint Certifications'],
      contactPerson: 'Sarah Johnson',
      contactEmail: 'partnerships@techcorp.com',
      website: 'https://techcorp.com',
      status: 'active'
    },
    {
      id: 2,
      name: 'InnovateStart',
      logo: 'https://via.placeholder.com/120x60/FFD700/0a174e?text=InnovateStart',
      category: 'Startup',
      partnershipType: 'Innovation',
      description: 'Fast-growing startup focused on educational technology and digital learning platforms.',
      collaborationAreas: ['EdTech Development', 'Student Projects', 'Innovation Labs'],
      contactPerson: 'Mike Chen',
      contactEmail: 'hello@innovatestart.com',
      website: 'https://innovatestart.com',
      status: 'active'
    },
    {
      id: 3,
      name: 'Global University',
      logo: 'https://via.placeholder.com/120x60/ffffff/0a174e?text=Global+Uni',
      category: 'Education',
      partnershipType: 'Academic',
      description: 'Prestigious university with strong programs in computer science and business.',
      collaborationAreas: ['Credit Transfer', 'Research Collaboration', 'Faculty Exchange'],
      contactPerson: 'Dr. Emily Rodriguez',
      contactEmail: 'partnerships@globaluniversity.edu',
      website: 'https://globaluniversity.edu',
      status: 'active'
    }
  ];

  const partnershipTypes = [
    'Strategic Partnership',
    'Innovation Collaboration',
    'Academic Partnership',
    'Industry Partnership',
    'Research Collaboration',
    'Internship Program',
    'Certification Program',
    'Joint Venture'
  ];

  const categories = ['Technology', 'Education', 'Healthcare', 'Finance', 'Startup', 'Non-Profit', 'Government'];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'our-partners', label: 'Our Partners' },
    { key: 'become-partner', label: 'Become a Partner' },
    { key: 'collaboration', label: 'Collaboration Hub' }
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
          Our Partners: Building the Future of Learning Together
        </motion.h1>
        <motion.p className="text-lg text-gray-700 mb-6" variants={headingVariants}>
          OponMeta collaborates with leading organizations, universities, and industry partners to deliver world-class education and opportunities.
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
              <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Industry Collaborations</h3>
              <p className="text-gray-600">Partner with us to shape the future of work and learning through joint programs and research.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg shadow p-6" variants={cardVariants}>
              <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Internship Pipelines</h3>
              <p className="text-gray-600">Connect with top talent through our internship and job placement programs.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg shadow p-6" variants={cardVariants}>
              <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Innovation Labs</h3>
              <p className="text-gray-600">Collaborate on cutting-edge projects in our innovation labs and advisory boards.</p>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'our-partners' && (
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-lg shadow p-6"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="text-2xl font-bold text-[#0a174e] mb-4" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                Our Strategic Partners
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Categories</option>
                  {categories.map(category => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Partnership Types</option>
                  {partnershipTypes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowCollaborationProposal(true)}
                  className="px-4 py-2 bg-[#FFD700] text-[#0a174e] rounded-md font-semibold hover:bg-yellow-300 transition"
                >
                  Propose Collaboration
                </button>
              </div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {partners.map(partner => (
                <motion.div
                  key={partner.id}
                  className="bg-white rounded-lg shadow p-6"
                  variants={cardVariants}
                >
                  <div className="text-center mb-4">
                    <img src={partner.logo} alt={partner.name} className="h-12 mx-auto mb-3" />
                    <h4 className="font-semibold text-[#0a174e]">{partner.name}</h4>
                    <p className="text-gray-600 text-sm">{partner.category}</p>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                      {partner.partnershipType}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-[#0a174e] text-sm mb-2">Collaboration Areas:</h5>
                    <div className="flex flex-wrap gap-1">
                      {partner.collaborationAreas.map(area => (
                        <span key={area} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Contact:</span> {partner.contactPerson}</p>
                    <p><span className="font-semibold">Email:</span> {partner.contactEmail}</p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => toast.info('Partner website would open here')}
                      className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition text-center text-sm"
                    >
                      Visit Website
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPartner(partner);
                        setShowCollaborationProposal(true);
                      }}
                      className="px-4 py-2 border border-[#0a174e] text-[#0a174e] rounded-md font-semibold hover:bg-[#0a174e] hover:text-white transition text-sm"
                    >
                      Collaborate
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {activeTab === 'become-partner' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-[#0a174e] mb-4">Become an OponMeta Partner</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Partnership Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span className="text-gray-700">Access to our global network of learners and professionals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span className="text-gray-700">Collaborative research and development opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span className="text-gray-700">Joint certification and credentialing programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span className="text-gray-700">Internship and job placement pipelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span className="text-gray-700">Innovation lab access and advisory board participation</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Partnership Types</h3>
                <div className="space-y-3">
                  {partnershipTypes.map(type => (
                    <div key={type} className="p-3 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-[#0a174e]">{type}</h4>
                      <p className="text-sm text-gray-600">Customized collaboration opportunities</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowPartnerRegistration(true)}
                className="px-8 py-3 bg-[#0a174e] text-white font-bold rounded-lg hover:bg-[#11235a] transition"
              >
                Start Partnership Application
              </button>
            </div>
          </div>
        )}

        {activeTab === 'collaboration' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-[#0a174e] mb-4">Collaboration Hub</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#0a174e] mb-2">Active Projects</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Ethics Research</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">EdTech Innovation Lab</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planning</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Student Mentorship Program</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#0a174e] mb-2">Upcoming Events</h3>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <p className="font-semibold">Partner Summit 2025</p>
                      <p className="text-gray-600">March 15-17, 2025</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Innovation Workshop</p>
                      <p className="text-gray-600">February 28, 2025</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Research Symposium</p>
                      <p className="text-gray-600">April 5, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-[#0a174e] mb-4">Partner Resources</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <h4 className="font-semibold text-[#0a174e]">Partnership Guidelines</h4>
                  <p className="text-sm text-gray-600">Learn about our partnership process</p>
                </a>
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <h4 className="font-semibold text-[#0a174e]">Collaboration Toolkit</h4>
                  <p className="text-sm text-gray-600">Resources for successful partnerships</p>
                </a>
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <h4 className="font-semibold text-[#0a174e]">Partner Portal</h4>
                  <p className="text-sm text-gray-600">Access your partnership dashboard</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Partner Registration Modal */}
      {showPartnerRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">Partnership Application</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Organization Name" className="border border-gray-300 rounded-md px-3 py-2" />
                <input type="email" placeholder="Contact Email" className="border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Contact Person" className="border border-gray-300 rounded-md px-3 py-2" />
                <input type="text" placeholder="Website URL" className="border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>Select Category</option>
                  {categories.map(category => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>Select Partnership Type</option>
                  {partnershipTypes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <textarea 
                placeholder="Tell us about your organization and why you'd like to partner with OponMeta..." 
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                rows={4}
              />
              <textarea 
                placeholder="What specific collaboration opportunities are you interested in?" 
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPartnerRegistration(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collaboration Proposal Modal */}
      {showCollaborationProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#0a174e] mb-4">
              {selectedPartner ? `Collaborate with ${selectedPartner.name}` : 'Propose Collaboration'}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Organization</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {partnershipTypes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Details</label>
                <textarea 
                  placeholder="Describe your collaboration proposal..." 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCollaborationProposal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#0a174e] text-white rounded-md font-semibold hover:bg-[#11235a] transition">
                  Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners; 