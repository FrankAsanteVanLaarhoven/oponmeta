import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Dashboard from './Dashboard';
import CourseCatalog from './CourseCatalog';
import OponMetaPrograms from './OponMetaPrograms';

const categories = [
  'Technology and Digital Skills',
  'Data and Analytics',
  'Health and Healthcare Innovation',
  'Cleaning and Sanitation Services',
  'Environment and Sustainability',
  'Engineering and Construction',
  'Leadership and Management',
  'Business, Strategy and Innovation',
  'Agriculture and Food System',
  'Professional Development and Leadership',
  'Music and Sound Production',
  'Art Design and Creative Media',
  'Drama, Theatre and Performance',
  'Mentorship & Career Readiness',
  'Specialized Industry Tracks',
  'Real Estate and Estate Management',
  'Hospitality, Tourism and Events',
  'Public Safety and Emergency Services',
  'Sports, Fitness and Wellness',
  'Vocational and Technical Training',
  'Social Care and Community Support',
  'Childhood Studies and Early Year Education',
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const tags = ['Certified', 'In-Demand Skills', 'Beginner Friendly'];

const sampleCourses = [
  { title: 'Intro to Python', category: 'Technology and Digital Skills', desc: 'Learn Python from scratch.', level: 'Beginner', tags: ['Beginner Friendly', 'Certified'] },
  { title: 'Data Visualization', category: 'Data and Analytics', desc: 'Create stunning charts and dashboards.', level: 'Intermediate', tags: ['In-Demand Skills'] },
  { title: 'Healthcare Innovation 101', category: 'Health and Healthcare Innovation', desc: 'Explore new trends in healthcare.', level: 'Beginner', tags: ['Certified'] },
  { title: 'Green Building Basics', category: 'Environment and Sustainability', desc: 'Sustainable construction practices.', level: 'Beginner', tags: ['Certified'] },
  { title: 'Leadership Bootcamp', category: 'Leadership and Management', desc: 'Develop essential leadership skills.', level: 'Advanced', tags: ['In-Demand Skills'] },
  { title: 'Sound Design Fundamentals', category: 'Music and Sound Production', desc: 'Master the basics of sound design.', level: 'Beginner', tags: ['Certified'] },
  { title: 'Modern Art Techniques', category: 'Art Design and Creative Media', desc: 'Explore modern art and design.', level: 'Intermediate', tags: ['In-Demand Skills'] },
  { title: 'Drama for Beginners', category: 'Drama, Theatre and Performance', desc: 'Start your acting journey.', level: 'Beginner', tags: ['Beginner Friendly'] },
  { title: 'AgriTech Essentials', category: 'Agriculture and Food System', desc: 'Technology in agriculture.', level: 'Intermediate', tags: ['Certified', 'In-Demand Skills'] },
  { title: 'Hospitality Management', category: 'Hospitality, Tourism and Events', desc: 'Manage hotels and events.', level: 'Advanced', tags: ['Certified'] },
  { title: 'Childhood Development', category: 'Childhood Studies and Early Year Education', desc: 'Early childhood education best practices.', level: 'Beginner', tags: ['Certified'] },
  { title: 'Emergency Response Training', category: 'Public Safety and Emergency Services', desc: 'Learn emergency protocols.', level: 'Intermediate', tags: ['Certified'] },
  { title: 'Fitness Instructor Training', category: 'Sports, Fitness and Wellness', desc: 'Become a certified fitness instructor.', level: 'Advanced', tags: ['Certified', 'In-Demand Skills'] },
  // ...add more for other categories as needed...
];

const headingVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'tween', duration: 0.7 } },
};

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.6 } },
};

const Programme = () => {
  const [tab, setTab] = useState<'courses' | 'dashboard' | 'programs'>('courses');

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <motion.h1
        className="text-3xl font-bold text-white mb-6"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        OponMeta Programme
      </motion.h1>
      {/* Tabs */}
      <motion.div
        className="mb-8 flex border-b border-gray-200"
        variants={tabVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        <motion.button
          className={`py-2 px-6 text-lg font-semibold focus:outline-none transition border-b-2 ${tab === 'courses' ? 'border-[#FFD700] text-[#0a174e]' : 'border-transparent text-gray-500 hover:text-[#0a174e]'}`}
          onClick={() => setTab('courses')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse Courses
        </motion.button>
        <motion.button
          className={`py-2 px-6 text-lg font-semibold focus:outline-none transition border-b-2 ${tab === 'programs' ? 'border-[#FFD700] text-[#0a174e]' : 'border-transparent text-gray-500 hover:text-[#0a174e]'}`}
          onClick={() => setTab('programs')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          OponMeta Programme
        </motion.button>
        <motion.button
          className={`py-2 px-6 text-lg font-semibold focus:outline-none transition border-b-2 ${tab === 'dashboard' ? 'border-[#FFD700] text-[#0a174e]' : 'border-transparent text-gray-500 hover:text-[#0a174e]'}`}
          onClick={() => setTab('dashboard')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dashboard
        </motion.button>
      </motion.div>
      {tab === 'courses' && <CourseCatalog />}
      {tab === 'programs' && <OponMetaPrograms />}
      {tab === 'dashboard' && <Dashboard />}
    </div>
  );
};

export default Programme; 