import React from 'react';
import { Users, Award, Globe, Heart, Zap, Star, Linkedin as LinkedinIcon, Mail, Twitter as TwitterIcon } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Founder & CEO',
      bio: 'Former World Bank education specialist with 15+ years in African development. Passionate about democratizing education and creating sustainable impact in emerging markets.',
      expertise: ['Education Policy', 'International Development', 'Strategic Leadership'],
      img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'sarah.johnson@oponmeta.com',
      twitter: '#'
    },
    {
      name: 'Michael Chen',
      title: 'Head of Technology',
      bio: 'Tech entrepreneur who built educational platforms reaching 2M+ students. Expert in AI, machine learning, and scalable educational technology solutions.',
      expertise: ['AI/ML', 'EdTech', 'Product Development'],
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'michael.chen@oponmeta.com',
      twitter: '#'
    },
    {
      name: 'Dr. Aisha Bello',
      title: 'Head of Content',
      bio: 'Former university dean specializing in curriculum development and quality assurance. Committed to maintaining the highest standards in educational content and delivery.',
      expertise: ['Curriculum Design', 'Quality Assurance', 'Academic Leadership'],
      img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'aisha.bello@oponmeta.com',
      twitter: '#'
    },
    {
      name: 'Elena Rodriguez',
      title: 'Head of Partnerships',
      bio: 'International education consultant with extensive network across MENA and Africa. Expert in building strategic partnerships and expanding global reach.',
      expertise: ['Partnership Development', 'International Relations', 'Market Expansion'],
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'elena.rodriguez@oponmeta.com',
      twitter: '#'
    },
    {
      name: 'David Kim',
      title: 'Head of Innovation',
      bio: 'Former Google engineer and edtech innovator. Leading our AI-powered learning initiatives and cutting-edge technology development.',
      expertise: ['AI Development', 'Innovation Strategy', 'Technical Leadership'],
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'david.kim@oponmeta.com',
      twitter: '#'
    },
    {
      name: 'Fatima Al-Zahra',
      title: 'Head of Community',
      bio: 'Community builder and social impact specialist. Dedicated to fostering inclusive learning communities and supporting diverse learners worldwide.',
      expertise: ['Community Building', 'Social Impact', 'Inclusive Education'],
      img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'fatima.alzahra@oponmeta.com',
      twitter: '#'
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Passion for Education',
      description: 'We believe in the transformative power of education and its ability to change lives and communities.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: 'Global Perspective',
      description: 'We embrace diversity and work to create inclusive learning experiences for people from all backgrounds.'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Innovation First',
      description: 'We constantly push boundaries to create cutting-edge learning solutions that drive real results.'
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: 'Excellence in Everything',
      description: 'We maintain the highest standards in all aspects of our work, from content quality to user experience.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Users className="h-20 w-20 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            We're a diverse team of educators, technologists, and innovators united by a common mission: 
            to democratize access to world-class education and transform learning globally.
          </p>
        </div>

        {/* Team Values */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0a174e] mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-[#0a174e]">{member.name}</h3>
                      <p className="text-yellow-600 font-semibold">{member.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#0a174e] mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <a
                      href={member.linkedin}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href={member.twitter}
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#0a174e] text-center mb-8">
            Our Team by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-600">Countries Represented</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">25+</div>
              <div className="text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Mission-Driven</div>
            </div>
          </div>
        </div>

        {/* Join Our Team */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-[#0a174e] mb-4">
              Join Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our vision of transforming 
              education globally. If you're excited about making a difference in the world of learning, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a174e] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200">
                View Open Positions
              </button>
              <button className="px-8 py-3 bg-[#0a174e] text-white font-bold rounded-lg hover:bg-[#11235a] transition-all duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
