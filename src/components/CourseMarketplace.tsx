import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Clock, Users, Heart, ShoppingCart, Play } from 'lucide-react'
import { courseCreationService } from '../services/courseCreationService'
import { useAuth } from '../hooks/useAuth'

export const CourseMarketplace: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true)
        const coursesData = await courseCreationService.getCourses()
        setCourses(coursesData.courses)
      } catch (error) {
        console.error('Failed to load courses:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search functionality
  }

  const handleEnrollNow = (courseId: string, price: number) => {
    if (!user?.id) {
      navigate('/login')
      return
    }

    if (price === 0) {
      navigate(`/courses/${courseId}/learn`)
    } else {
      navigate(`/checkout?course=${courseId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Your Next
              <span className="block text-yellow-300">Learning Adventure</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering new skills with our AI-powered courses
            </p>
            <SearchBar
              placeholder="What do you want to learn today?"
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {courses.length} Courses Found
          </h2>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onEnrollNow={() => handleEnrollNow(course.id, course.price)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Search Bar Component
const SearchBar: React.FC<{
  placeholder: string
  onSearch: (query: string) => void
}> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-12 text-lg rounded-full border-0 shadow-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none text-gray-900"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-6 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-300 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  )
}

// Course Card Component
const CourseCard: React.FC<{
  course: any
  onEnrollNow: () => void
}> = ({ course, onEnrollNow }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={course.thumbnail_url || '/placeholder-course.jpg'}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.is_free && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            FREE
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          by {course.creator?.full_name || 'Unknown Instructor'}
        </p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {course.average_rating?.toFixed(1) || '0.0'} ({course.total_reviews || 0})
            </span>
          </div>
          <div className="flex items-center ml-4">
            <Clock size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600 ml-1">
              {course.duration_hours}h
            </span>
          </div>
          <div className="flex items-center ml-4">
            <Users size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600 ml-1">
              {course.total_enrollments || 0}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            {course.is_free ? 'Free' : `£${course.price}`}
          </div>
          <button
            onClick={onEnrollNow}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1"
          >
            <Play size={16} />
            <span>{course.is_free ? 'Enroll Free' : 'Enroll Now'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Course Card Skeleton Component
const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-3 w-2/3"></div>
        <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  )
}

export default CourseMarketplace