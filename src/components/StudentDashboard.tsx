import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle, Clock, Award, Play, Star } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudentData = async () => {
      if (!user?.id) return

      try {
        setLoading(true)
        const { data: courses, error } = await supabase
          .from('course_enrollments')
          .select(`
            *,
            course:courses(
              *,
              creator:users(full_name, avatar_url)
            )
          `)
          .eq('student_id', user.id)
          .order('enrolled_at', { ascending: false })

        if (courses) setEnrolledCourses(courses)
      } catch (error) {
        console.error('Failed to load student data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStudentData()
  }, [user?.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.full_name}! 🎓
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey and achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Courses Enrolled" value={enrolledCourses.length} icon={BookOpen} color="blue" />
          <StatsCard title="Completed Courses" value={enrolledCourses.filter(c => c.completion_status === 'completed').length} icon={CheckCircle} color="green" />
          <StatsCard title="Study Hours" value={Math.round(enrolledCourses.reduce((sum, c) => sum + (c.time_spent_minutes / 60), 0))} icon={Clock} color="purple" />
          <StatsCard title="Achievements" value={0} icon={Award} color="yellow" />
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses
              .filter(course => course.completion_status === 'in_progress')
              .slice(0, 3)
              .map(enrollment => (
                <ContinueLearningCard
                  key={enrollment.id}
                  enrollment={enrollment}
                  onContinue={() => navigate(`/courses/${enrollment.course.id}/learn`)}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const StatsCard: React.FC<{
  title: string
  value: number
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
}> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    purple: 'bg-purple-500 text-white',
    yellow: 'bg-yellow-500 text-white'
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={24} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

const ContinueLearningCard: React.FC<{
  enrollment: any
  onContinue: () => void
}> = ({ enrollment, onContinue }) => {
  const progressPercentage = enrollment.progress_percentage || 0

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={enrollment.course.thumbnail_url || '/placeholder-course.jpg'}
          alt={enrollment.course.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {enrollment.course.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            by {enrollment.course.creator.full_name}
          </p>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={onContinue}
            className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Play size={16} />
            <span className="text-sm font-medium">Continue Learning</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard