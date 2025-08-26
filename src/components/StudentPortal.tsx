import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { coursesData } from '../data/coursesData';
import { 
  BookOpen, 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  ChevronLeft,
  Home,
  Trophy,
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  Award,
  Star,
  MoreVertical,
  Play,
  Pause,
  SkipForward,
  Bookmark,
  Download,
  Share2,
  HelpCircle,
  Settings,
  LogOut,
  Plus,
  Filter,
  Calendar,
  Target,
  TrendingUp,
  Lightbulb,
  Zap,
  Heart,
  Gift,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Edit,
  Trash,
  Archive,
  RefreshCw,
  RotateCcw,
  CheckSquare,
  Square,
  Circle,
  Minus,
  X,
  AlertCircle,
  Info,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronUp,
  FileText,
  Video,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Mail,
  Phone,
  MapPin,
  Link,
  Copy,
  Save,
  Upload,
  Download as DownloadIcon,
  Printer,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  WifiHigh,
  WifiLow,
  WifiMedium,
  WifiOff as WifiOffIcon,
  WifiHigh as WifiHighIcon,
  WifiLow as WifiLowIcon,
  WifiMedium as WifiMediumIcon,
  ShoppingCart,
  CreditCard,
  Briefcase,
  MessageSquare,
  Wallet,
  Laptop,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import the additional widgets
import {
  AnnouncementsWidget,
  InstructorsWidget,
  FoldersWidget,
  LearningPathWidget,
  LibraryWidget,
  ReadyToUseCoursesWidget,
  AutomationWidget,
  GamificationWidget,
  TrainingCalendarWidget,
  TrashWidget
} from './StudentPortalWidgets';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started' | 'archived';
  lastAccessed: string;
  nextLesson: string;
  totalLessons: number;
  completedLessons: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  enrolledDate: string;
  estimatedCompletion: string;
  lessons?: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  points: number;
  category: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

const StudentPortal: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notification-1',
      title: 'New Course Available',
      message: 'Advanced React Development is now available for enrollment',
      type: 'info',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 'notification-2',
      title: 'Assignment Due',
      message: 'Your Machine Learning assignment is due in 3 days',
      type: 'warning',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: 'notification-3',
      title: 'Course Completed!',
      message: 'Congratulations! You\'ve completed Digital Marketing Fundamentals',
      type: 'success',
      timestamp: '3 days ago',
      read: true
    }
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseViewer, setShowCourseViewer] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [isLearning, setIsLearning] = useState(false);
  const [showCourseMenu, setShowCourseMenu] = useState<string | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedCourseForProgress, setSelectedCourseForProgress] = useState<Course | null>(null);

  // Get enrolled courses from localStorage
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Load enrolled courses from localStorage
    const storedEnrollments = localStorage.getItem('courseEnrollments');
    if (storedEnrollments) {
      const enrollments = JSON.parse(storedEnrollments);
      // Remove duplicate enrollments by courseId and ensure unique course IDs
      const uniqueEnrollments = enrollments.filter((enrollment: any, index: number, self: any[]) => 
        index === self.findIndex((e: any) => e.courseId === enrollment.courseId)
      );
      
      const coursesWithDetails = uniqueEnrollments.map((enrollment: any, index: number) => {
        // Find course details from coursesData
        const courseData = coursesData.find(c => c.id === enrollment.courseId);
        if (courseData) {
          return {
            id: `enrolled-course-${enrollment.courseId}-${index}`,
            title: courseData.title,
            instructor: courseData.instructor,
            progress: enrollment.progress || 0,
            status: enrollment.progress === 100 ? 'completed' : enrollment.progress > 0 ? 'in-progress' : 'not-started',
            lastAccessed: enrollment.lastAccessed || 'Never',
            nextLesson: enrollment.nextLesson || 'Start learning',
            totalLessons: courseData.lessonsCount || 18,
            completedLessons: Math.floor((enrollment.progress || 0) / 100 * (courseData.lessonsCount || 18)),
            category: courseData.category,
            difficulty: courseData.level.toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
            rating: courseData.rating,
            enrolledDate: enrollment.enrolledAt,
            estimatedCompletion: enrollment.estimatedCompletion || 'Not set'
          };
        }
        return null;
      }).filter(Boolean);
      
      setEnrolledCourses(coursesWithDetails);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCourseMenu && !(event.target as Element).closest('.course-menu')) {
        setShowCourseMenu(null);
      }
      if (showNotifications && !(event.target as Element).closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
      if (showProfileMenu && !(event.target as Element).closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCourseMenu, showNotifications, showProfileMenu]);

  // Close course viewer when pressing Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showCourseViewer) {
        closeCourseViewer();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showCourseViewer]);

  // Mock data for demo purposes (fallback if no enrollments)
  const fallbackCourses: Course[] = [
    {
      id: 'fallback-course-1',
      title: 'Digital Marketing Fundamentals',
      instructor: 'Sarah Johnson',
      progress: 0,
      status: 'not-started',
      lastAccessed: 'Never',
      nextLesson: 'Introduction to Digital Marketing',
      totalLessons: 18,
      completedLessons: 0,
      category: 'Marketing',
      difficulty: 'beginner',
      rating: 4.8,
      enrolledDate: '2024-01-15',
      estimatedCompletion: '2024-03-20'
    }
  ];

  const courses = enrolledCourses.length > 0 ? enrolledCourses : fallbackCourses;

  // Course management functions
  const startCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentLesson(0);
    setLessonProgress(0);
    setShowCourseViewer(true);
    setIsLearning(true);
    
    // Update course status and last accessed
    updateCourseProgress(course.id, 0, 'in-progress', 'Just now');
  };

  const continueCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentLesson(course.completedLessons);
    setLessonProgress(course.progress);
    setShowCourseViewer(true);
    setIsLearning(true);
    
    // Update last accessed
    updateCourseProgress(course.id, course.progress, course.status, 'Just now');
  };

  const updateCourseProgress = (courseId: string, progress: number, status: string, lastAccessed: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const newProgress = Math.min(100, Math.max(0, progress));
        const newStatus = newProgress === 100 ? 'completed' : newProgress > 0 ? 'in-progress' : 'not-started';
        const completedLessons = Math.floor(newProgress / 100 * course.totalLessons);
        
        return {
          ...course,
          progress: newProgress,
          status: newStatus,
          lastAccessed,
          completedLessons,
          nextLesson: newProgress === 100 ? 'Course completed!' : `Lesson ${completedLessons + 1}`
        };
      }
      return course;
    });

    setEnrolledCourses(updatedCourses);
    
    // Update localStorage
    const storedEnrollments = localStorage.getItem('courseEnrollments');
    if (storedEnrollments) {
      const enrollments = JSON.parse(storedEnrollments);
      const updatedEnrollments = enrollments.map((enrollment: any) => {
        if (enrollment.courseId.toString() === courseId) {
          return {
            ...enrollment,
            progress: progress,
            lastAccessed: lastAccessed
          };
        }
        return enrollment;
      });
      localStorage.setItem('courseEnrollments', JSON.stringify(updatedEnrollments));
    }
  };

  const completeLesson = () => {
    if (!selectedCourse) return;
    
    const newProgress = Math.min(100, lessonProgress + (100 / selectedCourse.totalLessons));
    const newStatus = newProgress === 100 ? 'completed' : 'in-progress';
    
    updateCourseProgress(selectedCourse.id, newProgress, newStatus, 'Just now');
    setLessonProgress(newProgress);
    
    if (newProgress === 100) {
      setIsLearning(false);
      
      // Add course completion notification
      const completionNotification: Notification = {
        id: Date.now().toString(),
        title: 'Course Completed! 🎉',
        message: `Congratulations! You've successfully completed "${selectedCourse.title}". Well done!`,
        type: 'success',
        timestamp: new Date().toLocaleDateString('en-GB'),
        read: false
      };
      setNotifications(prev => [completionNotification, ...prev]);
      
      // Show completion message
      setTimeout(() => {
        setShowCourseViewer(false);
        setSelectedCourse(null);
      }, 2000);
    }
  };

  const nextLesson = () => {
    if (!selectedCourse) return;
    
    const nextLessonIndex = Math.min(currentLesson + 1, selectedCourse.totalLessons - 1);
    setCurrentLesson(nextLessonIndex);
    
    // Update progress based on completed lessons
    const newProgress = (nextLessonIndex / selectedCourse.totalLessons) * 100;
    setLessonProgress(newProgress);
    
    if (nextLessonIndex === selectedCourse.totalLessons - 1) {
      // Last lesson, complete the course
      completeLesson();
    }
  };

  const previousLesson = () => {
    if (!selectedCourse) return;
    
    const prevLessonIndex = Math.max(currentLesson - 1, 0);
    setCurrentLesson(prevLessonIndex);
    
    // Update progress based on completed lessons
    const newProgress = (prevLessonIndex / selectedCourse.totalLessons) * 100;
    setLessonProgress(newProgress);
  };

  const toggleLearning = () => {
    setIsLearning(!isLearning);
  };

  const closeCourseViewer = () => {
    setShowCourseViewer(false);
    setSelectedCourse(null);
    setIsLearning(false);
    setCurrentLesson(0);
    setLessonProgress(0);
  };

  const enrollInNewCourse = () => {
    navigate('/programme');
  };

  const toggleCourseMenu = (courseId: string) => {
    setShowCourseMenu(showCourseMenu === courseId ? null : courseId);
  };

  const archiveCourse = (courseId: string) => {
    // Archive course by moving it to archived state
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          status: 'archived' as const,
          lastAccessed: new Date().toLocaleDateString('en-GB')
        };
      }
      return course;
    });

    setEnrolledCourses(updatedCourses);
    
    // Update localStorage
    const storedEnrollments = localStorage.getItem('courseEnrollments');
    if (storedEnrollments) {
      const enrollments = JSON.parse(storedEnrollments);
      const updatedEnrollments = enrollments.map((enrollment: any) => {
        if (enrollment.courseId.toString() === courseId) {
          return {
            ...enrollment,
            status: 'archived',
            lastAccessed: new Date().toLocaleDateString('en-GB')
          };
        }
        return enrollment;
      });
      localStorage.setItem('courseEnrollments', JSON.stringify(updatedEnrollments));
    }

    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: 'Course Archived',
      message: `Course has been archived successfully. You can restore it from the archived section.`,
      type: 'info',
      timestamp: new Date().toLocaleDateString('en-GB'),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    setShowCourseMenu(null);
  };

  const restoreCourse = (courseId: string) => {
    // Restore course from archived state
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          status: 'not-started' as const,
          lastAccessed: new Date().toLocaleDateString('en-GB')
        };
      }
      return course;
    });

    setEnrolledCourses(updatedCourses);
    
    // Update localStorage
    const storedEnrollments = localStorage.getItem('courseEnrollments');
    if (storedEnrollments) {
      const enrollments = JSON.parse(storedEnrollments);
      const updatedEnrollments = enrollments.map((enrollment: any) => {
        if (enrollment.courseId.toString() === courseId) {
          return {
            ...enrollment,
            status: 'not-started',
            lastAccessed: new Date().toLocaleDateString('en-GB')
          };
        }
        return enrollment;
      });
      localStorage.setItem('courseEnrollments', JSON.stringify(updatedEnrollments));
    }

    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: 'Course Restored',
      message: `Course has been restored successfully. You can now continue learning.`,
      type: 'success',
      timestamp: new Date().toLocaleDateString('en-GB'),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    setShowCourseMenu(null);
  };

  const unenrollCourse = (courseId: string) => {
    // Remove course from enrolled courses
    const courseToRemove = courses.find(course => course.id === courseId);
    const updatedCourses = courses.filter(course => course.id !== courseId);
    
    setEnrolledCourses(updatedCourses);
    
    // Remove from localStorage
    const storedEnrollments = localStorage.getItem('courseEnrollments');
    if (storedEnrollments) {
      const enrollments = JSON.parse(storedEnrollments);
      const updatedEnrollments = enrollments.filter((enrollment: any) => 
        enrollment.courseId.toString() !== courseId
      );
      localStorage.setItem('courseEnrollments', JSON.stringify(updatedEnrollments));
    }

    // Add notification
    if (courseToRemove) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'Course Unenrolled',
        message: `You have been unenrolled from "${courseToRemove.title}". You can re-enroll anytime from the course catalog.`,
        type: 'info',
        timestamp: new Date().toLocaleDateString('en-GB'),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
    
    setShowCourseMenu(null);
  };

  const viewDetailedProgress = (course: Course) => {
    setSelectedCourseForProgress(course);
    setShowProgressModal(true);
    setShowCourseMenu(null);
  };

  const closeProgressModal = () => {
    setShowProgressModal(false);
    setSelectedCourseForProgress(null);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  const achievements: Achievement[] = [
    {
      id: 'achievement-1',
      title: 'First Course Completed',
      description: 'Successfully completed your first course',
      icon: '🎓',
      earnedDate: '2024-01-15',
      points: 100,
      category: 'milestone'
    },
    {
      id: 'achievement-2',
      title: 'Perfect Score',
      description: 'Achieved 100% on a course assessment',
      icon: '⭐',
      earnedDate: '2024-01-10',
      points: 50,
      category: 'academic'
    },
    {
      id: 'achievement-3',
      title: 'Streak Master',
      description: 'Maintained 7-day learning streak',
      icon: '🔥',
      earnedDate: '2024-01-08',
      points: 75,
      category: 'consistency'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Calculate learning statistics
  const getLearningStats = () => {
    const totalCourses = enrolledCourses.length;
    const completedCourses = enrolledCourses.filter(course => course.status === 'completed').length;
    const inProgressCourses = enrolledCourses.filter(course => course.status === 'in-progress').length;
    const archivedCourses = enrolledCourses.filter(course => course.status === 'archived').length;
    
    const totalLessons = enrolledCourses.reduce((sum, course) => sum + (course.lessons?.length || 0), 0);
    const completedLessons = enrolledCourses.reduce((sum, course) => {
      if (course.lessons) {
        return sum + course.lessons.filter(lesson => lesson.completed).length;
      }
      return sum;
    }, 0);
    
    const completionRate = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
    const lessonCompletionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      archivedCourses,
      totalLessons,
      completedLessons,
      completionRate,
      lessonCompletionRate
    };
  };

  const stats = getLearningStats();

  // Social Media Sharing Function
  const shareToSocialMedia = (platform: string, achievement: any) => {
    const achievementText = `🎉 I just earned the "${achievement.title}" achievement on OponM LMS! ${achievement.description} #Learning #Achievement #OponM`;
    const shareUrl = window.location.origin + '/student-portal';
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(achievementText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(achievementText)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(achievement.title)}&summary=${encodeURIComponent(achievement.description)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
        navigator.clipboard.writeText(achievementText + ' ' + shareUrl);
        alert('Achievement text copied to clipboard! You can now paste it on Instagram.');
        return;
      case 'youtube':
        // YouTube doesn't support direct sharing via URL, so we'll copy to clipboard
        navigator.clipboard.writeText(achievementText + ' ' + shareUrl);
        alert('Achievement text copied to clipboard! You can now paste it on YouTube.');
        return;
      case 'copy':
        navigator.clipboard.writeText(achievementText + ' ' + shareUrl);
        alert('Achievement link copied to clipboard!');
        return;
      default:
        return;
    }
    
    // Open the share link in a new window
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search courses, instructors..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 notifications-dropdown">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark all read
                          </button>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' :
                                notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                              }`} />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                                  <div className="flex space-x-1">
                                    {!notification.read && (
                                      <button
                                        onClick={() => markNotificationAsRead(notification.id)}
                                        className="text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        Mark read
                                      </button>
                                    )}
                                    <button
                                      onClick={() => deleteNotification(notification.id)}
                                      className="text-xs text-red-600 hover:text-red-800"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 profile-menu">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          navigate('/help');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          // Clear user data and redirect to home
                          localStorage.removeItem('courseEnrollments');
                          localStorage.removeItem('userSession');
                          alert('You have been signed out successfully.');
                          navigate('/');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-[#0a174e] shadow-sm border-r border-[#1a2a6b] transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <div className="p-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 text-white hover:text-blue-100 rounded-lg hover:bg-[#1a2a6b]"
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
          
          <nav className="mt-4">
            <div className="px-4 space-y-2">
              {/* Main Navigation */}
              <div className="mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
                  Main
                </h3>
              </div>
              
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Home className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Dashboard</span>}
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'courses'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">My Courses</span>}
              </button>

              <button
                onClick={() => setActiveTab('achievements')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'achievements'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Trophy className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Achievements</span>}
              </button>

              <button
                onClick={() => setActiveTab('progress')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'progress'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Progress</span>}
              </button>

              <button
                onClick={() => setActiveTab('community')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'community'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Users className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Community</span>}
              </button>

              {/* Quick Access Tools */}
              <div className="mt-6 mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
                  Quick Access
                </h3>
              </div>

              <button
                onClick={() => navigate('/course-library')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <BookOpen className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Course Library</span>}
              </button>

              <button
                onClick={() => navigate('/course-library')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <ShoppingCart className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Shopping Cart</span>}
              </button>

              <button
                onClick={() => navigate('/course-library')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Heart className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Wishlist</span>}
              </button>

              <button
                onClick={() => navigate('/course-library')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Wallet className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Wallet</span>}
              </button>

              <button
                onClick={() => navigate('/course-workspace')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Monitor className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Workspace</span>}
              </button>

              <button
                onClick={() => navigate('/whiteboard')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <FileText className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Whiteboard</span>}
              </button>

              <button
                onClick={() => navigate('/ai-video-calling')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Video className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">AI Video Calling</span>}
              </button>

              <button
                onClick={() => navigate('/companions-library')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Users className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">AI Companions</span>}
              </button>

              {/* Learning Tools */}
              <div className="mt-6 mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
                  Learning Tools
                </h3>
              </div>

              <button
                onClick={() => navigate('/course-authoring')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Edit className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Course Authoring</span>}
              </button>

              <button
                onClick={() => navigate('/ai-course-creator')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Zap className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">AI Course Creator</span>}
              </button>

              <button
                onClick={() => navigate('/plagiarism-checker')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Shield className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Plagiarism Checker</span>}
              </button>

              <button
                onClick={() => navigate('/grammar-checker')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <CheckCircle className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Grammar Checker</span>}
              </button>

              <button
                onClick={() => navigate('/resume-builder')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <FileText className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Resume Builder</span>}
              </button>

              {/* Resources */}
              <div className="mt-6 mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
                  Resources
                </h3>
              </div>

              <button
                onClick={() => navigate('/blogs')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <FileText className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Blogs</span>}
              </button>

              <button
                onClick={() => navigate('/webinars')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Video className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Webinars</span>}
              </button>

              <button
                onClick={() => navigate('/download-app')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <Download className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Download App</span>}
              </button>

              {/* Account & Settings */}
              <div className="mt-6 mb-4">
                <h3 className={`text-xs font-semibold text-white uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
                  Account
                </h3>
              </div>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#1a2a6b] text-white border border-[#2a3a7b]'
                    : 'text-white hover:bg-[#1a2a6b] hover:text-blue-100'
                }`}
              >
                <Settings className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Settings</span>}
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1a2a6b] hover:text-blue-100"
              >
                <HelpCircle className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-white">Help & Support</span>}
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Learning Statistics */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalCourses}</div>
                    <div className="text-sm text-gray-600">Total Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.completedCourses}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.inProgressCourses}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{stats.archivedCourses}</div>
                    <div className="text-sm text-gray-600">Archived</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{stats.completionRate}%</div>
                    <div className="text-sm text-gray-600">Course Completion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-indigo-600">{stats.lessonCompletionRate}%</div>
                    <div className="text-sm text-gray-600">Lesson Completion Rate</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600">
                    {stats.totalLessons} Total Lessons • {stats.completedLessons} Completed
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {enrolledCourses
                    .filter(course => course.lastAccessed)
                    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
                    .slice(0, 5)
                    .map(course => (
                      <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(course.status).split(' ')[0]}`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-600">
                              Last accessed: {course.lastAccessed}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.progress}% complete
                        </div>
                      </div>
                    ))}
                  {enrolledCourses.filter(course => course.lastAccessed).length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No recent activity. Start learning to see your progress here!
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
                  >
                    <div className="text-blue-600 text-lg font-semibold">Continue Learning</div>
                    <div className="text-sm text-gray-600">Pick up where you left off</div>
                  </button>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center"
                  >
                    <div className="text-green-600 text-lg font-semibold">Enroll in New Course</div>
                    <div className="text-sm text-gray-600">Discover more learning opportunities</div>
                  </button>
                </div>
              </div>

              {/* Additional Widgets Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Quick Access Features</h3>
                
                {/* Announcements Widget */}
                <AnnouncementsWidget />
                
                {/* Instructors Widget */}
                <InstructorsWidget />
                
                {/* Folders Widget */}
                <FoldersWidget />
                
                {/* Learning Path Widget */}
                <LearningPathWidget />
                
                {/* Library Widget */}
                <LibraryWidget />
                
                {/* Ready to Use Courses Widget */}
                <ReadyToUseCoursesWidget />
                
                {/* Automation Widget */}
                <AutomationWidget />
                
                {/* Gamification Widget */}
                <GamificationWidget />
                
                {/* Training Calendar Widget */}
                <TrainingCalendarWidget />
                
                {/* Trash Widget */}
                <TrashWidget />
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                  <p className="text-gray-600">Manage and track your enrolled courses</p>
                </div>
                <button 
                  onClick={enrollInNewCourse}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enroll in New Course
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="Programming">Programming</option>
                      <option value="Data Science">Data Science</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="not-started">Not Started</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilterCategory('all');
                        setFilterStatus('all');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <div key={`course-grid-${course.id}`} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                            {course.status.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">Lessons</p>
                          <p className="font-medium">{course.completedLessons}/{course.totalLessons}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">{course.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Last accessed: {course.lastAccessed}
                          </div>
                          <div className="flex space-x-2">
                            {course.status === 'in-progress' && (
                              <button 
                                onClick={() => continueCourse(course)}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                Continue
                              </button>
                            )}
                            {course.status === 'not-started' && (
                              <button 
                                onClick={() => startCourse(course)}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                Start
                              </button>
                            )}
                            {course.status === 'archived' && (
                              <button 
                                onClick={() => restoreCourse(course.id)}
                                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                              >
                                Restore
                              </button>
                            )}
                            <div className="relative">
                              <button 
                                onClick={() => toggleCourseMenu(course.id)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                              
                              {/* Course Menu Dropdown */}
                              {showCourseMenu === course.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 course-menu">
                                  <div className="py-1">
                                    <button
                                      onClick={() => viewDetailedProgress(course)}
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                      <BarChart3 className="h-4 w-4" />
                                      <span>View Progress</span>
                                    </button>
                                    {course.status === 'archived' ? (
                                      <button
                                        onClick={() => restoreCourse(course.id)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                      >
                                        <RotateCcw className="h-4 w-4" />
                                        <span>Restore</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => archiveCourse(course.id)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                      >
                                        <Archive className="h-4 w-4" />
                                        <span>Archive</span>
                                      </button>
                                    )}
                                    <button
                                      onClick={() => unenrollCourse(course.id)}
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                      <LogOut className="h-4 w-4" />
                                      <span>Unenroll</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
                <p className="text-gray-600">Track your accomplishments and milestones</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 mb-4">{achievement.description}</p>
                      <div className="flex justify-between items-center text-sm mb-4">
                        <span className="text-gray-500">{achievement.earnedDate}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                          +{achievement.points} pts
                        </span>
                      </div>
                      
                      {/* Social Media Sharing */}
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-600 mb-3">Share your achievement:</p>
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => shareToSocialMedia('twitter', achievement)}
                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                            title="Share on Twitter"
                          >
                            <Twitter className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => shareToSocialMedia('facebook', achievement)}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            title="Share on Facebook"
                          >
                            <Facebook className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => shareToSocialMedia('linkedin', achievement)}
                            className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                            title="Share on LinkedIn"
                          >
                            <Linkedin className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => shareToSocialMedia('instagram', achievement)}
                            className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
                            title="Share on Instagram"
                          >
                            <Instagram className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => shareToSocialMedia('youtube', achievement)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Share on YouTube"
                          >
                            <Youtube className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => shareToSocialMedia('copy', achievement)}
                            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                            title="Copy Link"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
                <p className="text-gray-600">Monitor your learning journey and performance</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Courses Completed</span>
                        <span className="text-sm font-medium text-gray-900">
                          {courses.filter(c => c.status === 'completed').length}/{courses.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${(courses.filter(c => c.status === 'completed').length / courses.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Average Score</span>
                        <span className="text-sm font-medium text-gray-900">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '87%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Streak */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Streak</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">7 days</div>
                    <p className="text-gray-600 mb-4">Keep up the great work!</p>
                    <div className="flex justify-center space-x-1">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div key={`streak-day-${i}`} className="w-3 h-3 bg-blue-500 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Progress Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Course Progress Details</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={`course-progress-${course.id}`} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{course.title}</h4>
                          <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                          <span>Est. completion: {course.estimatedCompletion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Community</h2>
                <p className="text-gray-600">Connect with fellow learners and instructors</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Study Groups */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Groups</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">React Developers</h4>
                        <p className="text-sm text-gray-600">45 members • Active now</p>
                      </div>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        Join
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Data Science Club</h4>
                        <p className="text-sm text-gray-600">32 members • 2 online</p>
                      </div>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                </div>

                {/* Discussion Forums */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion Forums</h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-3">
                      <h4 className="font-medium text-gray-900 mb-1">Best practices for state management?</h4>
                      <p className="text-sm text-gray-600">12 replies • 2 hours ago</p>
                    </div>
                    <div className="border-b border-gray-100 pb-3">
                      <h4 className="font-medium text-gray-900 mb-1">Machine learning project ideas</h4>
                      <p className="text-sm text-gray-600">8 replies • 1 day ago</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Web development resources</h4>
                      <p className="text-sm text-gray-600">15 replies • 3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Discussions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Discussions</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={`discussion-${i}`} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">How to implement authentication in React?</h4>
                          <p className="text-sm text-gray-600 mb-2">I'm working on a React project and need help with user authentication...</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>by John Doe</span>
                            <span>• 2 hours ago</span>
                            <span>• 5 replies</span>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Reply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Course Viewer Modal */}
          {showCourseViewer && selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
              >
                {/* Course Viewer Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={closeCourseViewer}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h2>
                      <p className="text-sm text-gray-600">Lesson {currentLesson + 1} of {selectedCourse.totalLessons}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleLearning}
                      className={`p-2 rounded-lg transition-colors ${
                        isLearning ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isLearning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={closeCourseViewer}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Course Content */}
                <div className="flex-1 flex">
                  {/* Main Content Area */}
                  <div className="flex-1 p-6">
                    <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">
                          Lesson {currentLesson + 1}: {getLessonTitle(currentLesson)}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {getLessonDescription(currentLesson)}
                        </p>
                        
                        {/* Lesson Progress */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Lesson Progress</span>
                            <span className="text-sm font-medium text-gray-900">
                              {Math.round((lessonProgress / 100) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${lessonProgress}%` }}
                            />
                          </div>
                        </div>

                        {/* Learning Controls */}
                        <div className="flex items-center justify-center space-x-4">
                          <button
                            onClick={previousLesson}
                            disabled={currentLesson === 0}
                            className={`p-3 rounded-lg transition-colors ${
                              currentLesson === 0 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </button>
                          
                          <button
                            onClick={completeLesson}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                          >
                            {currentLesson === selectedCourse.totalLessons - 1 ? 'Complete Course' : 'Complete Lesson'}
                          </button>
                          
                          <button
                            onClick={nextLesson}
                            disabled={currentLesson === selectedCourse.totalLessons - 1}
                            className={`p-3 rounded-lg transition-colors ${
                              currentLesson === selectedCourse.totalLessons - 1 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Sidebar */}
                  <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
                    
                    {/* Overall Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Overall Progress</span>
                        <span className="text-sm font-medium text-gray-900">{selectedCourse.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${selectedCourse.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Lesson List */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Lessons</h4>
                      {Array.from({ length: selectedCourse.totalLessons }, (_, index) => (
                        <div
                          key={`lesson-${index}`}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            index === currentLesson 
                              ? 'bg-blue-100 border border-blue-200' 
                              : index < Math.floor((selectedCourse.progress / 100) * selectedCourse.totalLessons)
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setCurrentLesson(index);
                            const newProgress = (index / selectedCourse.totalLessons) * 100;
                            setLessonProgress(newProgress);
                          }}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            index < Math.floor((selectedCourse.progress / 100) * selectedCourse.totalLessons)
                              ? 'bg-green-500 text-white'
                              : index === currentLesson
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {index < Math.floor((selectedCourse.progress / 100) * selectedCourse.totalLessons) ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span className={`text-sm ${
                            index === currentLesson 
                              ? 'text-blue-700 font-medium' 
                              : index < Math.floor((selectedCourse.progress / 100) * selectedCourse.totalLessons)
                              ? 'text-green-700'
                              : 'text-gray-600'
                          }`}>
                            Lesson {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Course Stats */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Course Stats</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed Lessons:</span>
                          <span className="font-medium">{selectedCourse.completedLessons}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Remaining Lessons:</span>
                          <span className="font-medium">{selectedCourse.totalLessons - selectedCourse.completedLessons}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated Time:</span>
                          <span className="font-medium">{(selectedCourse.totalLessons - selectedCourse.completedLessons) * 15} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Progress Modal */}
          {showProgressModal && selectedCourseForProgress && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCourseForProgress.title}</h2>
                      <p className="text-gray-600">Detailed Progress Report</p>
                    </div>
                    <button
                      onClick={closeProgressModal}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Progress Overview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Overall Progress</span>
                            <span className="text-sm font-medium text-gray-900">{selectedCourseForProgress.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${selectedCourseForProgress.progress}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Completed Lessons</span>
                            <span className="text-sm font-medium text-gray-900">
                              {selectedCourseForProgress.completedLessons}/{selectedCourseForProgress.totalLessons}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(selectedCourseForProgress.completedLessons / selectedCourseForProgress.totalLessons) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${getStatusColor(selectedCourseForProgress.status)}`}>
                            {selectedCourseForProgress.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className={`font-medium ${getDifficultyColor(selectedCourseForProgress.difficulty)}`}>
                            {selectedCourseForProgress.difficulty.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{selectedCourseForProgress.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Enrolled:</span>
                          <span className="font-medium">{selectedCourseForProgress.enrolledDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Accessed:</span>
                          <span className="font-medium">{selectedCourseForProgress.lastAccessed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Lesson:</span>
                          <span className="font-medium">{selectedCourseForProgress.nextLesson}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lesson Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Breakdown</h3>
                    <div className="space-y-3">
                      {Array.from({ length: selectedCourseForProgress.totalLessons }, (_, index) => {
                        const isCompleted = index < selectedCourseForProgress.completedLessons;
                        const isCurrent = index === selectedCourseForProgress.completedLessons;
                        
                        return (
                          <div
                            key={`progress-lesson-${index}`}
                            className={`flex items-center space-x-3 p-3 rounded-lg border ${
                              isCompleted 
                                ? 'bg-green-50 border-green-200' 
                                : isCurrent
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : isCurrent
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="flex-1">
                              <span className={`text-sm font-medium ${
                                isCompleted 
                                  ? 'text-green-700' 
                                  : isCurrent
                                  ? 'text-blue-700'
                                  : 'text-gray-600'
                              }`}>
                                Lesson {index + 1}: {getLessonTitle(index)}
                              </span>
                              <p className={`text-xs ${
                                isCompleted 
                                  ? 'text-green-600' 
                                  : isCurrent
                                  ? 'text-blue-600'
                                  : 'text-gray-500'
                              }`}>
                                {getLessonDescription(index)}
                              </p>
                            </div>
                            <div className="text-xs text-gray-500">
                              {isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Pending'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={closeProgressModal}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Close
                    </button>
                    {selectedCourseForProgress.status !== 'completed' && (
                      <button
                        onClick={() => {
                          closeProgressModal();
                          if (selectedCourseForProgress.status === 'not-started') {
                            startCourse(selectedCourseForProgress);
                          } else {
                            continueCourse(selectedCourseForProgress);
                          }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {selectedCourseForProgress.status === 'not-started' ? 'Start Course' : 'Continue Learning'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Helper functions for lesson content
const getLessonTitle = (lessonIndex: number): string => {
  const lessonTitles = [
    'Introduction to Digital Marketing',
    'Understanding Your Target Audience',
    'Content Marketing Strategies',
    'Social Media Marketing',
    'Email Marketing Fundamentals',
    'SEO Basics',
    'Paid Advertising',
    'Analytics and Metrics',
    'Brand Building',
    'Customer Relationship Management',
    'Marketing Automation',
    'Mobile Marketing',
    'Video Marketing',
    'Influencer Marketing',
    'Local Marketing',
    'International Marketing',
    'Marketing Ethics',
    'Future of Digital Marketing'
  ];
  return lessonTitles[lessonIndex] || `Lesson ${lessonIndex + 1}`;
};

const getLessonDescription = (lessonIndex: number): string => {
  const lessonDescriptions = [
    'Learn the fundamentals of digital marketing and its importance in today\'s business landscape.',
    'Discover how to identify and understand your target audience for better marketing campaigns.',
    'Explore various content marketing strategies to engage and convert your audience.',
    'Master social media marketing techniques across different platforms.',
    'Understand the basics of email marketing and building effective email campaigns.',
    'Learn Search Engine Optimization fundamentals to improve your online visibility.',
    'Explore paid advertising options and how to create effective ad campaigns.',
    'Learn to measure and analyze your marketing performance with key metrics.',
    'Build a strong brand identity and maintain brand consistency.',
    'Develop strategies for building and maintaining customer relationships.',
    'Automate your marketing processes for better efficiency and results.',
    'Adapt your marketing strategies for mobile-first audiences.',
    'Create compelling video content for your marketing campaigns.',
    'Leverage influencer partnerships to expand your reach.',
    'Target local customers with location-based marketing strategies.',
    'Expand your business globally with international marketing approaches.',
    'Understand ethical considerations in digital marketing.',
    'Explore emerging trends and technologies in digital marketing.'
  ];
  return lessonDescriptions[lessonIndex] || 'This lesson covers important concepts and practical applications.';
};

export default StudentPortal;
