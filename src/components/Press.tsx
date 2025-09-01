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

const Press = () => {
  const [activeTab, setActiveTab] = useState('press-releases');

  const pressReleases = [
    {
      id: 1,
      title: 'OponMeta Launches Revolutionary AI-Powered Learning Platform',
      date: '2024-12-15',
      summary: 'OponMeta announces the launch of its cutting-edge AI-powered learning platform, designed to revolutionize online education through personalized learning experiences.',
      content: 'OponMeta, a leading educational technology company, today announced the launch of its revolutionary AI-powered learning platform. This innovative platform combines advanced artificial intelligence with expert-led instruction to deliver personalized learning experiences that adapt to each student\'s unique needs and learning style.',
      category: 'Product Launch',
      featured: true
    },
    {
      id: 2,
      title: 'OponMeta Partners with Global Universities for Credit Transfer Program',
      date: '2024-11-28',
      summary: 'Strategic partnerships established with leading universities to enable seamless credit transfer and academic recognition for OponMeta courses.',
      content: 'OponMeta has established strategic partnerships with several prestigious universities worldwide, enabling students to transfer credits earned through OponMeta courses toward their degree programs. This initiative represents a significant step forward in bridging the gap between online education and traditional academic institutions.',
      category: 'Partnerships',
      featured: false
    },
    {
      id: 3,
      title: 'OponMeta Receives $10M Investment for Global Expansion',
      date: '2024-10-15',
      summary: 'Major investment round secured to support OponMeta\'s mission to democratize education worldwide.',
      content: 'OponMeta has secured a $10 million investment round led by prominent venture capital firms. This funding will support the company\'s global expansion efforts, including the development of new courses, technology enhancements, and partnerships with educational institutions worldwide.',
      category: 'Funding',
      featured: false
    }
  ];

  const mediaMentions = [
    {
      id: 1,
      source: 'TechCrunch',
      title: 'OponMeta: The Future of Online Education',
      date: '2024-12-10',
      url: '#',
      excerpt: 'OponMeta is redefining what\'s possible in online education with its innovative approach to personalized learning.'
    },
    {
      id: 2,
      source: 'Forbes',
      title: 'How OponMeta is Democratizing Education',
      date: '2024-11-25',
      url: '#',
      excerpt: 'The company\'s mission to make quality education accessible to everyone is gaining traction worldwide.'
    },
    {
      id: 3,
      source: 'EdTech Magazine',
      title: 'OponMeta\'s AI Revolution in Learning',
      date: '2024-10-30',
      url: '#',
      excerpt: 'Artificial intelligence is transforming education, and OponMeta is at the forefront of this revolution.'
    }
  ];

  const tabs = [
    { key: 'press-releases', label: 'Press Releases' },
    { key: 'media-mentions', label: 'Media Mentions' },
    { key: 'press-kit', label: 'Press Kit' },
    { key: 'contact', label: 'Media Contact' }
  ];

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
            Press & Media
          </motion.h1>
          <motion.p className="text-lg text-gray-700 max-w-3xl mx-auto" variants={headingVariants}>
            Stay updated with the latest news, press releases, and media coverage about OponMeta's mission to revolutionize education.
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

        {/* Tab Content */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
        >
          {activeTab === 'press-releases' && (
            <div className="space-y-8">
              <motion.h2 className="text-2xl font-bold text-[#0a174e] mb-6" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                Latest Press Releases
              </motion.h2>
              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {pressReleases.map(release => (
                  <motion.div
                    key={release.id}
                    className={`border-l-4 ${release.featured ? 'border-[#FFD700]' : 'border-[#0a174e]'} pl-6 py-4`}
                    variants={cardVariants}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-[#0a174e]">{release.title}</h3>
                      <span className="text-sm text-gray-500">{new Date(release.date).toLocaleDateString()}</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-3">
                      {release.category}
                    </span>
                    <p className="text-gray-700 mb-4">{release.summary}</p>
                    <button className="text-[#0a174e] font-semibold hover:underline">
                      Read Full Release →
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {activeTab === 'media-mentions' && (
            <div className="space-y-8">
              <motion.h2 className="text-2xl font-bold text-[#0a174e] mb-6" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
                Media Coverage
              </motion.h2>
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {mediaMentions.map(mention => (
                  <motion.div
                    key={mention.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    variants={cardVariants}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-[#0a174e]">{mention.title}</h3>
                      <span className="text-sm text-gray-500">{new Date(mention.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mention.source}</p>
                    <p className="text-gray-700 mb-4">{mention.excerpt}</p>
                    <a 
                      href={mention.url} 
                      className="text-[#0a174e] font-semibold hover:underline text-sm"
                    >
                      Read Article →
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {activeTab === 'press-kit' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-[#0a174e] mb-6">Press Kit</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Company Name:</span> OponMeta
                    </div>
                    <div>
                      <span className="font-semibold">Founded:</span> 2023
                    </div>
                    <div>
                      <span className="font-semibold">Headquarters:</span> San Francisco, CA
                    </div>
                    <div>
                      <span className="font-semibold">Industry:</span> Educational Technology
                    </div>
                    <div>
                      <span className="font-semibold">Mission:</span> Democratizing education through innovative technology
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Downloadable Assets</h3>
                  <div className="space-y-3">
                    <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <span className="font-semibold text-[#0a174e]">Company Logo (High Res)</span>
                      <span className="block text-sm text-gray-600">PNG, SVG, JPG formats</span>
                    </a>
                    <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <span className="font-semibold text-[#0a174e]">Brand Guidelines</span>
                      <span className="block text-sm text-gray-600">PDF - 2.3 MB</span>
                    </a>
                    <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <span className="font-semibold text-[#0a174e]">Product Screenshots</span>
                      <span className="block text-sm text-gray-600">Platform previews and demos</span>
                    </a>
                    <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <span className="font-semibold text-[#0a174e]">Executive Bios</span>
                      <span className="block text-sm text-gray-600">Leadership team information</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Company Fact Sheet</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0a174e]">50+</div>
                    <div className="text-gray-600">Courses Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0a174e]">10K+</div>
                    <div className="text-gray-600">Active Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0a174e]">25+</div>
                    <div className="text-gray-600">Partner Organizations</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-[#0a174e] mb-6">Media Contact</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Press Inquiries</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Press Contact:</span> Sarah Johnson
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span> press@oponmeta.com
                    </div>
                    <div>
                      <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                    </div>
                    <div>
                      <span className="font-semibold">Response Time:</span> Within 24 hours
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Interview Requests</h3>
                  <p className="text-gray-700 mb-4">
                    Our executives are available for interviews on topics including:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Educational technology trends</li>
                    <li>• AI in education</li>
                    <li>• Online learning innovation</li>
                    <li>• Digital transformation in education</li>
                    <li>• Future of work and learning</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#0a174e] text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Subscribe to Press Updates</h3>
                <p className="mb-4">Stay informed about our latest news and announcements.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 px-4 py-2 rounded-md text-gray-900"
                  />
                  <button className="px-6 py-2 bg-[#FFD700] text-[#0a174e] font-semibold rounded-md hover:bg-yellow-300 transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Press; 