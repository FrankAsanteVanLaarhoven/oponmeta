import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play, 
  Calendar,
  Target,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Hours Learned', value: '156', icon: Clock, color: 'bg-green-500' },
    { label: 'Certificates', value: '8', icon: Award, color: 'bg-yellow-500' },
    { label: 'Streak Days', value: '23', icon: TrendingUp, color: 'bg-purple-500' }
  ];

  const recentCourses = [
    {
      title: 'Advanced React Development',
      progress: 75,
      instructor: 'Sarah Johnson',
      nextLesson: 'State Management with Redux',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      title: 'Python for Data Science',
      progress: 45,
      instructor: 'Dr. Michael Chen',
      nextLesson: 'Pandas DataFrames',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      title: 'UI/UX Design Fundamentals',
      progress: 90,
      instructor: 'Emma Wilson',
      nextLesson: 'Final Project Review',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Live Q&A: React Best Practices',
      date: 'Today, 3:00 PM',
      instructor: 'Sarah Johnson',
      type: 'Live Session'
    },
    {
      title: 'Assignment Due: Python Project',
      date: 'Tomorrow, 11:59 PM',
      instructor: 'Dr. Michael Chen',
      type: 'Assignment'
    },
    {
      title: 'Webinar: Future of Web Development',
      date: 'Friday, 2:00 PM',
      instructor: 'Tech Industry Panel',
      type: 'Webinar'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-[#0a174e] rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Alex!</h1>
        <p className="text-white mb-4">Ready to continue your learning journey?</p>
        <div className="flex items-center space-x-4">
          <button className="bg-white text-[#0a174e] px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
            Continue Learning
          </button>
          <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-[#0a174e] transition-colors">
            Browse Courses
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
            </div>
            <div className="p-6 space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="mt-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Next: {course.nextLesson}</p>
                  </div>
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.instructor}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                    </div>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Learning Goals</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium">Complete 3 courses this month</span>
                  </div>
                  <span className="text-sm text-green-600">2/3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Study 20 hours this week</span>
                  </div>
                  <span className="text-sm text-blue-600">15/20</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-sm font-medium">Join 2 study groups</span>
                  </div>
                  <span className="text-sm text-purple-600">1/2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;