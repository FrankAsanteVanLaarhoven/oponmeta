import React, { useState } from 'react';

const programCourses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    desc: 'Learn to build modern web applications from scratch with React, Node.js, and databases.',
    instructor: 'Jane Doe',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    level: 'Intermediate',
    price: '$299',
    duration: '12 weeks',
    tags: ['Web Development', 'JavaScript', 'React'],
    rating: 4.8,
    students: 1247,
  },
  {
    id: 2,
    title: 'Digital Marketing Mastery',
    desc: 'Master SEO, social media marketing, and analytics for business growth.',
    instructor: 'John Smith',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    level: 'Beginner',
    price: '$199',
    duration: '8 weeks',
    tags: ['Marketing', 'SEO', 'Social Media'],
    rating: 4.6,
    students: 892,
  },
  {
    id: 3,
    title: 'Creative Graphic Design',
    desc: 'Unleash your creativity with hands-on design projects using modern tools.',
    instructor: 'Emily Clark',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    level: 'Beginner',
    price: '$249',
    duration: '10 weeks',
    tags: ['Design', 'Creative', 'Adobe'],
    rating: 4.9,
    students: 1563,
  },
  {
    id: 4,
    title: 'Business Analytics Fundamentals',
    desc: 'Turn data into actionable business insights with advanced analytics tools.',
    instructor: 'Michael Lee',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    level: 'Intermediate',
    price: '$349',
    duration: '14 weeks',
    tags: ['Analytics', 'Data', 'Business'],
    rating: 4.7,
    students: 734,
  },
  {
    id: 5,
    title: 'Mobile App Development',
    desc: 'Build and deploy mobile apps for iOS and Android using React Native.',
    instructor: 'Sara Kim',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    level: 'Advanced',
    price: '$399',
    duration: '16 weeks',
    tags: ['Mobile', 'React Native', 'iOS'],
    rating: 4.8,
    students: 567,
  },
  {
    id: 6,
    title: 'Project Management Essentials',
    desc: 'Lead teams and deliver projects successfully using agile methodologies.',
    instructor: 'David Brown',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    level: 'Intermediate',
    price: '$279',
    duration: '10 weeks',
    tags: ['Management', 'Agile', 'Leadership'],
    rating: 4.5,
    students: 445,
  },
  {
    id: 7,
    title: 'AI and Machine Learning',
    desc: 'Master artificial intelligence and machine learning algorithms.',
    instructor: 'Alex Chen',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80',
    level: 'Advanced',
    price: '$449',
    duration: '18 weeks',
    tags: ['AI', 'Machine Learning', 'Python'],
    rating: 4.9,
    students: 678,
  },
  {
    id: 8,
    title: 'Cybersecurity Fundamentals',
    desc: 'Learn to protect systems and networks from digital attacks.',
    instructor: 'Maria Rodriguez',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80',
    level: 'Intermediate',
    price: '$329',
    duration: '12 weeks',
    tags: ['Security', 'Networking', 'Ethical Hacking'],
    rating: 4.7,
    students: 523,
  },
  {
    id: 9,
    title: 'UX/UI Design Mastery',
    desc: 'Create user-centered designs that delight and engage users.',
    instructor: 'Lisa Wang',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80',
    level: 'Intermediate',
    price: '$289',
    duration: '10 weeks',
    tags: ['UX', 'UI', 'Design Thinking'],
    rating: 4.8,
    students: 789,
  },
];

const levelColors = {
  'Beginner': 'bg-green-100 text-green-700',
  'Intermediate': 'bg-yellow-100 text-yellow-700',
  'Advanced': 'bg-red-100 text-red-700',
};

const OponMetaPrograms = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const allTags = ['All', 'Web Development', 'Marketing', 'Design', 'Analytics', 'Mobile', 'Management', 'AI', 'Security', 'UX'];

  const filteredCourses = programCourses.filter(course => {
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    const tagMatch = selectedTag === 'All' || course.tags.includes(selectedTag);
    return levelMatch && tagMatch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
      case 'price-high':
        return parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''));
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Filters and Sorting */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
          
          <div className="ml-auto">
            <span className="text-sm text-gray-600">
              {sortedCourses.length} courses found
            </span>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCourses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100"
            onClick={() => window.location.href = `/course/${course.id}`}
          >
            <div className="relative">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-[#0a174e] shadow-sm">
                {course.price}
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]} shadow-sm`}>
                  {course.level}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#0a174e] mb-2 group-hover:text-[#FFD700] transition-colors line-clamp-1">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-3 text-sm line-clamp-2">{course.desc}</p>
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
                {course.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
                {course.tags.length > 2 && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    +{course.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No courses found matching your criteria</div>
          <button 
            onClick={() => {
              setSelectedLevel('All');
              setSelectedTag('All');
            }}
            className="mt-4 px-6 py-2 bg-[#0a174e] text-white rounded-lg hover:bg-[#1a2a6b] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default OponMetaPrograms; 