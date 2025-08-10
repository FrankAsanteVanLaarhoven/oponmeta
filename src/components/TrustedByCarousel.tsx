import React from 'react';
import { motion } from 'framer-motion';

// Using only local images and text-based logos to avoid external URL issues
const logos = [
  { name: 'OponMeta', type: 'local', src: '/logo.png' },
  { name: 'Microsoft', type: 'text', color: 'bg-blue-600' },
  { name: 'Nike', type: 'text', color: 'bg-black' },
  { name: 'IBM', type: 'text', color: 'bg-blue-800' },
  { name: 'Google', type: 'text', color: 'bg-blue-500' },
  { name: 'Unilever', type: 'text', color: 'bg-blue-400' },
  { name: 'World Bank', type: 'text', color: 'bg-blue-900' },
];

// Duplicate the logos for seamless infinite scroll
const repeatedLogos = [...logos, ...logos];

const TrustedByCarousel = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#0a174e] to-[#1a2a6b] py-8 flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow">Trusted By</h2>
      <div className="overflow-hidden w-full max-w-5xl relative">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 18,
              ease: 'linear',
            },
          }}
          style={{ width: 'max-content' }}
        >
          {repeatedLogos.map((logo, idx) => (
            <div key={idx} className="flex-shrink-0 flex items-center justify-center h-16 w-32 bg-white rounded-xl shadow border-2 border-yellow-400 p-2">
              {logo.type === 'local' ? (
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-10 object-contain mx-auto"
                  onError={(e) => {
                    // Fallback to text if local image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-center text-gray-600 font-semibold text-sm">${logo.name}</div>`;
                    }
                  }}
                />
              ) : (
                <div className={`w-full h-full rounded-lg ${logo.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm text-center">{logo.name}</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedByCarousel; 