import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    title: 'Advertise with OponMeta',
    text: 'Reach thousands of professionals and learners across the globe. Showcase your brand on OponMeta\'s world-class EdTech platform.',
    cta: 'Learn More',
    link: '#',
  },
  {
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    title: 'Sponsor a Course',
    text: 'Support education and get your brand in front of engaged learners by sponsoring a featured course.',
    cta: 'Sponsor Now',
    link: '#',
  },
  {
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    title: 'Partner With Us',
    text: 'Join our network of industry leaders and help shape the future of global education.',
    cta: 'Become a Partner',
    link: '#',
  },
];

const SLIDE_DURATION = 6000;

const FloatingAdBanner = () => {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current]);

  if (!visible) return null;

  const goTo = (idx: number) => setCurrent(idx);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="fixed top-1/2 right-0 z-50 transform -translate-y-1/2 flex flex-col items-end group">
      {/* Collapsed tab - always visible */}
      <div className="bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-l-2xl shadow-lg border-l-4 border-yellow-700 w-16 h-32 transition-all duration-300 ease-in-out group-hover:w-0 group-hover:opacity-0">
        <div className="flex flex-col items-center justify-center h-full p-2">
          <ChevronUp className="h-6 w-6 transform -rotate-90" />
          <span className="text-xs font-bold text-center leading-tight">AD</span>
        </div>
      </div>

      {/* Expanded banner */}
      <div className="relative bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-white w-[378px] h-[756px] rounded-l-3xl shadow-2xl border-l-4 border-yellow-700 flex flex-col items-center py-0 px-0 overflow-hidden transition-all duration-300 ease-in-out transform translate-x-full group-hover:translate-x-0">
        <button
          className="absolute -left-5 top-4 bg-white text-yellow-600 rounded-full shadow p-2 hover:bg-yellow-100 transition text-2xl z-20"
          onClick={() => setVisible(false)}
          aria-label="Close ad banner"
        >
          &times;
        </button>
        {/* Full background image */}
        <img
          src={slides[current].img}
          alt={slides[current].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay for content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        {/* Slide content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-8 text-center">
          <span className="font-bold text-2xl md:text-3xl text-white mb-4 drop-shadow-lg">{slides[current].title}</span>
          <p className="text-white text-lg mb-8 drop-shadow-lg">{slides[current].text}</p>
          <a
            href={slides[current].link}
            className="mt-auto mb-8 px-6 py-3 bg-white text-yellow-700 font-bold rounded-xl shadow hover:bg-yellow-50 text-lg transition drop-shadow-lg"
          >
            {slides[current].cta}
          </a>
        </div>
        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
          <button onClick={prev} className="bg-white/70 hover:bg-white text-yellow-700 rounded-full p-2 shadow transition" aria-label="Previous slide">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-3 h-3 rounded-full border-2 border-white ${current === idx ? 'bg-white' : 'bg-yellow-300'} transition`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="bg-white/70 hover:bg-white text-yellow-700 rounded-full p-2 shadow transition" aria-label="Next slide">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingAdBanner; 