import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

// Example course data (should match your catalog structure)
const allCourses = [
  {
    id: '1',
    title: 'Complete React Developer Course with Redux, Hooks, and GraphQL',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    reviewCount: 12543,
    price: 89.99,
    originalPrice: 199.99,
    duration: '42h 30m',
    students: 45678,
    lessons: 156,
    level: 'Intermediate',
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    isBestseller: true
  },
  {
    id: '2',
    title: 'Python for Data Science and Machine Learning Bootcamp',
    instructor: 'Dr. Michael Chen',
    rating: 4.7,
    reviewCount: 8932,
    price: 79.99,
    originalPrice: 149.99,
    duration: '38h 15m',
    students: 32145,
    lessons: 142,
    level: 'Beginner',
    category: 'Data Science',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    isNew: true
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals: From Wireframes to Prototypes',
    instructor: 'Emma Wilson',
    rating: 4.9,
    reviewCount: 6754,
    price: 69.99,
    duration: '28h 45m',
    students: 18923,
    lessons: 98,
    level: 'Beginner',
    category: 'Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    isBestseller: true
  },
  // ...add more courses as needed
];

const getViewedCourses = () => {
  try {
    const data = localStorage.getItem('viewedCourses');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const RecommendedCourses = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const viewed = getViewedCourses();
    // Find categories of viewed courses
    const viewedCategories = allCourses
      .filter((c) => viewed.includes(c.id))
      .map((c) => c.category);
    // Recommend courses in the same categories, not already viewed
    const recs = allCourses.filter(
      (c) =>
        viewedCategories.includes(c.category) &&
        !viewed.includes(c.id)
    );
    // If no recs, show popular courses not viewed
    setRecommended(
      recs.length > 0
        ? recs
        : allCourses.filter((c) => !viewed.includes(c.id)).slice(0, 3)
    );
  }, []);

  if (!recommended.length) return null;

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-6 drop-shadow">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommended.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses; 