"use client"

import React from 'react';

const demoFrames = [
  {
    id: 1,
    title: "Company Overview",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 2,
    title: "WebGL Demo",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 3,
    title: "Animation Showcase",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 4,
    title: "Web Video",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 5,
    title: "Logo Animation",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 6,
    title: "Creative Animation",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 7,
    title: "Illustration Demo",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 8,
    title: "Art Direction",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 9,
    title: "Product Video",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
];

const OpontainmentDemo: React.FC = () => {
  return (
    <div className="w-full h-96 bg-zinc-900 rounded-lg overflow-hidden">
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Opontainment Demo</h3>
          <p className="text-gray-300">Interactive video content demonstration</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {demoFrames.slice(0, 6).map((frame) => (
              <div key={frame.id} className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-center">
                  <div className="w-6 h-6 bg-white/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-white font-medium">{frame.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpontainmentDemo; 