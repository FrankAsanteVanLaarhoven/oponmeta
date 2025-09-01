import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesData, Course } from '../data/coursesData';

const courses = [
  {
    title: 'AI for Beginners',
    desc: 'Kickstart your journey into Artificial Intelligence with hands-on projects.',
    tags: ['Beginner Friendly', 'In-Demand Skills', 'Certified'],
  },
  {
    title: 'Web3 Essentials',
    desc: 'Master blockchain, smart contracts, and decentralized apps.',
    tags: ['Certified', 'In-Demand Skills'],
  },
  {
    title: 'Data Science Bootcamp',
    desc: 'From data wrangling to machine learning, build real-world expertise.',
    tags: ['Beginner Friendly', 'Certified'],
  },
  {
    title: 'Leadership in Tech',
    desc: 'Develop leadership skills for the digital era with industry mentors.',
    tags: ['In-Demand Skills'],
  },
];

const tagColors = {
  'Beginner Friendly': 'bg-green-100 text-green-700',
  'In-Demand Skills': 'bg-yellow-100 text-yellow-800',
  'Certified': 'bg-blue-100 text-blue-700',
};

// Use real course data from coursesData
const programCourses = coursesData.slice(0, 6); // Show first 6 courses

const levelColors = {
  'Beginner': 'bg-green-100 text-green-700',
  'Intermediate': 'bg-yellow-100 text-yellow-700',
  'Advanced': 'bg-red-100 text-red-700',
};

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.8 } },
};

const headingVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'tween', duration: 0.7 } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const FeaturedCourses = () => {
  const navigate = useNavigate();
  
  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };
  
  return (
  <>
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#0a174e] mb-2"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          Featured Courses & Workshops
        </motion.h2>
        <motion.div className="w-16 h-1 bg-indigo-400 mx-auto mb-8 rounded" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-start"
              variants={cardVariants}
            >
              <motion.h3 className="text-xl font-semibold text-[#0a174e] mb-2" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>{course.title}</motion.h3>
              <p className="text-gray-700 mb-4">{course.desc}</p>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColors[tag] || 'bg-gray-200 text-gray-700'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    
    {/* OponMeta Program Courses Preview Section */}
    <section className="w-full bg-[#f6f9fc] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#0a174e] mb-2"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          OponMeta Program Courses
        </motion.h2>
        <motion.div className="w-16 h-1 bg-[#FFD700] mx-auto mb-8 rounded" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {programCourses.slice(0, 3).map((course) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              variants={cardVariants}
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold text-[#0a174e]">
                  £{course.price}
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>{course.level}</span>
                </div>
              </div>
              <div className="p-6">
                <motion.h3 className="text-xl font-semibold text-[#0a174e] mb-2 group-hover:text-[#FFD700] transition-colors" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>{course.title}</motion.h3>
                <p className="text-gray-600 mb-3 text-sm line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Instructor: {course.instructor}</span>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm text-gray-600">{course.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({course.students} students)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {course.tags && course.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <Link 
          to="/courses" 
          className="inline-flex items-center px-8 py-3 bg-[#0a174e] text-white font-semibold rounded-lg hover:bg-[#1a2a6b] transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          See All Courses
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
    </>
  );
};

export default FeaturedCourses; 