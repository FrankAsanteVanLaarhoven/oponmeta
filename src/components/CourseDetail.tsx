import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  Play,
  CheckCircle,
  ArrowRight,
  Calendar,
  Target,
  FileText,
  Video,
  Download
} from 'lucide-react';
import { coursesData, Course } from '../data/coursesData';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');

  useEffect(() => {
    if (id) {
      const foundCourse = coursesData.find(c => c.id === parseInt(id));
      setCourse(foundCourse || null);
      setLoading(false);
    }
  }, [id]);

  const handleEnroll = () => {
    if (course) {
      navigate(`/course-purchase/${course.id}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link 
            to="/programme" 
            className="px-6 py-3 bg-[#0a174e] text-white font-semibold rounded-lg hover:bg-[#1a2a6b] transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: FileText },
    { id: 'instructor', label: 'Instructor', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          to="/programme" 
          className="inline-flex items-center text-[#0a174e] hover:text-[#FFD700] transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Header */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#0a174e] mb-2">{course.title}</h1>
                <p className="text-gray-600 text-lg mb-4">{course.description}</p>
                
                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{course.rating} ({course.students} ratings)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative mb-6">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {course.level}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-[#0a174e]">
                  ${course.price}
                </span>
              </div>
            </div>

            {/* Course Objectives */}
            {course.objectives && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#0a174e] mb-3">What you'll learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Tags */}
            {course.tags && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#0a174e] mb-3">Skills you'll gain</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Tabs */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                        selectedTab === tab.id
                          ? 'border-[#FFD700] text-[#0a174e]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {selectedTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0a174e] mb-4">Course Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#0a174e] mb-3">Course Features</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Lifetime access to course content
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Certificate of completion
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Mobile and desktop access
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Instructor support
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0a174e] mb-3">Requirements</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Basic computer skills
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Internet connection
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Dedication to learn
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'curriculum' && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0a174e] mb-4">Course Curriculum</h3>
                  {course.content?.lessons ? (
                    <div className="space-y-4">
                      {course.content.lessons.map((lesson, index) => (
                        <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 bg-[#0a174e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </span>
                              <div>
                                <h4 className="font-medium text-[#0a174e]">{lesson.title}</h4>
                                <p className="text-sm text-gray-600">{lesson.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.duration} min</span>
                              {lesson.videoUrl && (
                                <Video className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Curriculum details will be available after enrollment</p>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'instructor' && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0a174e] mb-4">About the Instructor</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#0a174e]">{course.instructor}</h4>
                      <p className="text-gray-600 mb-3">Expert Instructor</p>
                      <p className="text-gray-700">
                        {course.instructor} is a passionate educator with years of experience in {course.category.toLowerCase()}. 
                        They have helped thousands of students master the skills needed to succeed in their careers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0a174e] mb-4">Student Reviews</h3>
                  <div className="text-center py-8 text-gray-500">
                    <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Reviews will be available after enrollment</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar - Enrollment Card */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 sticky top-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-[#0a174e] mb-2">
                ${course.price}
              </div>
              {course.originalPrice && course.originalPrice > course.price && (
                <div className="text-lg text-gray-500 line-through mb-2">
                  ${course.originalPrice}
                </div>
              )}
              <div className="text-sm text-gray-600">
                One-time payment • Lifetime access
              </div>
            </div>

            <button
              onClick={handleEnroll}
              className="w-full bg-[#FFD700] text-[#0a174e] font-bold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors mb-4 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Enroll Now
            </button>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">30-Day Money-Back Guarantee</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Full lifetime access</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Access on mobile and desktop</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Certificate of completion</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Instructor support</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Share this course:</p>
                <div className="flex justify-center space-x-3">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.022-1.842-3.022-1.842 0-2.136 1.44-2.136 2.939v5.652H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 