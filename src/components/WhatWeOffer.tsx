import React from 'react';
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

const WhatWeOffer = () => (
  <section className="w-full bg-white py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-12"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#0a174e] mb-4"
          variants={headingVariants}
        >
          What We Offer
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          variants={headingVariants}
        >
          Comprehensive learning solutions designed to accelerate your professional growth and career advancement.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="text-center p-6 rounded-lg bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] hover:shadow-lg transition-shadow"
          variants={cardVariants}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-[#1a2a6b] to-[#2a3a7b] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2" style={{color: 'white'}}>Expert-Led Courses</h3>
          <p className="text-white" style={{color: 'white'}}>Learn from industry professionals and subject matter experts with real-world experience.</p>
        </motion.div>

        <motion.div
          className="text-center p-6 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-lg transition-shadow"
          variants={cardVariants}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">1:1 Mentorship</h3>
                          <p className="text-gray-600">Get personalised guidance from experienced mentors to accelerate your career growth.</p>
        </motion.div>

        <motion.div
          className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow"
          variants={cardVariants}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Hands-On Workshops</h3>
          <p className="text-gray-600">Participate in interactive workshops to gain practical skills and real-world experience.</p>
        </motion.div>

        <motion.div
          className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow"
          variants={cardVariants}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#0a174e] mb-2">Industry Connections</h3>
          <p className="text-gray-600">Build your professional network and connect with industry leaders and peers.</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default WhatWeOffer; 