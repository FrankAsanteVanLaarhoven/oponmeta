import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'CEO & Founder',
    img: '/team1.jpg',
  },
  {
    name: 'Sarah Johnson',
    role: 'Lead Designer',
    img: '/team2.jpg',
  },
  {
    name: 'Michael Lee',
    role: 'Head of Engineering',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    name: 'Aisha Bello',
    role: 'AI Specialist',
    img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
  },
];

const carouselVariants = {
  animate: {
    x: [0, -100 * teamMembers.length],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 16,
        ease: 'linear',
      },
    },
  },
};

const TeamCarousel = () => {
  const controls = useAnimation();
  const { t } = useTranslation();

  useEffect(() => {
    controls.start('animate');
  }, [controls]);

  return (
    <div className="overflow-x-hidden w-full bg-white text-[#0a1834] dark:bg-[#0a1834] dark:text-white py-12">
      <motion.div
        className="flex gap-8"
        variants={carouselVariants}
        animate={controls}
        initial={{ x: 0 }}
        style={{ width: `${teamMembers.length * 320}px` }}
      >
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white dark:bg-[#16203a] rounded-lg shadow-lg p-6 min-w-[280px] max-w-xs mx-auto border-2 border-[#22305a]"
          >
            <img
              src={member.img}
              alt={t(`team.${idx}.name`)}
              className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-cyan-300"
              loading="lazy"
            />
            <span className="font-semibold text-lg text-[#0a1834] dark:text-white">{member.name}</span>
            <span className="text-cyan-700 dark:text-cyan-300 text-sm">{member.role.replace('CEO & Founder', 'Chief Executive Officer & Founder').replace('Lead Designer', 'Lead Product Designer').replace('Head of Engineering', 'Director of Engineering').replace('AI Specialist', 'Artificial Intelligence Specialist')}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeamCarousel; 