import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Play, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Typewriter } from 'react-simple-typewriter';

const cardVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', bounce: 0.3, duration: 0.6 } },
  exit: { x: 100, opacity: 0, transition: { duration: 0.3 } },
};

const HeroSection = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isCardOpen, setIsCardOpen] = useState(false);
  
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-[#0a174e] text-white border-b-2 border-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Content - Text */}
          <div className="text-center lg:text-left p-0 m-0 flex-1">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl text-white">
              Unlock Your Potential with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-400">
                <Typewriter
                  words={['Global Learning', 'AI-Powered Education', 'Future-Ready Skills', 'Next-Gen EdTech']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>
            <p className="text-2xl font-bold mb-8 max-w-2xl drop-shadow-lg text-white">
              OponMeta is redefining how the world learns. As a Global Edtech Powerhouse, we fuse innovation and accessibility to build scalable solutions in professional development and technical education. We don't just adapt to the future of work—we're shaping it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-[#0a174e] hover:bg-gray-100" onClick={() => navigate("/free-trial")}>Start Your Free Trial</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate("/get-demo")}> <Play className="mr-2 h-5 w-5" /> Request a Demo</Button>
            </div>
            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#1a2a6b] border-2 border-white" />
                  ))}
                </div>
                <span className="font-bold drop-shadow-md text-white">50,000+ learners worldwide</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-[#FFD700] fill-current" />
                <span className="font-bold drop-shadow-md text-white">4.9/5 global rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Video Showcase */}
          <div className="flex justify-center lg:justify-end p-0 m-0 flex-shrink-0">
            <div className="relative group p-0 m-0">
              <div className="w-full max-w-sm aspect-[9/16] bg-[#1a2a6b] rounded-2xl shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 border-4 border-white">
                <video 
                  className="w-full h-full object-cover rounded-2xl" 
                  controls
                  poster="/logo.png"
                >
                  <source src="/Quick Avatar Video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Advertising Card */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
        {/* Toggle Button */}
        <button
          onClick={() => setIsCardOpen(!isCardOpen)}
          className="bg-white text-[#0a174e] px-4 py-2 rounded-l-lg shadow-lg hover:bg-gray-100 transition-all duration-200 font-semibold border border-gray-200"
        >
          {isCardOpen ? '×' : 'Sponsor'}
        </button>

        {/* Advertising Card */}
        <AnimatePresence>
          {isCardOpen && (
            <motion.div
              className="bg-white rounded-l-2xl shadow-2xl p-6 w-80 text-[#0a174e] border border-gray-200"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#0a174e] mb-2">Sponsor a Course</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Support education and get your brand in front of engaged learners by sponsoring a featured course.
                </p>
              </div>
              
              <div className="mb-4">
                <div className="w-full h-32 bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a2a6b] to-[#2a3a7b] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs text-white font-medium">Course Sponsorship</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#0a174e] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1a2a6b] transition-all duration-200">
                Sponsor Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection; 