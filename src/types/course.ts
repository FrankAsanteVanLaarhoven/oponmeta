export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  level: string;
  duration: string;
  lessonsCount: number;
  students: number;
  rating: number;
  lastUpdated: string;
  certificate: boolean;
  accessType: 'free' | 'paid';
  isBestseller?: boolean;
  progress?: number;
  tags?: string[];
  language?: string;
  subtitles?: string[];
  requirements?: string[];
  whatYouWillLearn?: string[];
  targetAudience?: string[];
  reviews?: CourseReview[];
}

export interface CourseReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  courseCount: number;
  color: string;
}

export interface CourseFilter {
  searchTerm: string;
  category: string;
  level: string;
  priceRange: [number, number];
  duration: string;
  rating: number;
  language: string;
  certificate: boolean;
}

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completedAt?: string;
  certificateIssued?: boolean;
  certificateIssuedAt?: string;
}

export interface CoursePurchase {
  id: string;
  studentId: string;
  courseId: string;
  purchasedAt: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
}

export interface CourseLesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'discussion';
  duration: number; // in minutes
  order: number;
  content: string;
  resources?: string[];
  isFree: boolean;
}

export interface CourseProgress {
  courseId: string;
  studentId: string;
  lessonsCompleted: number;
  totalLessons: number;
  quizzesPassed: number;
  totalQuizzes: number;
  projectsCompleted: number;
  totalProjects: number;
  overallProgress: number;
  lastAccessed: string;
  timeSpent: number; // in minutes
}

export interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  totalRevenue: number;
  averageRating: number;
  completionRate: number;
  averageTimeToComplete: number; // in days
  topPerformingLessons: string[];
  studentSatisfaction: number;
  refundRate: number;
}

export interface InstructorStats {
  instructorId: string;
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  coursesPublished: number;
  coursesDraft: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
}

export interface CourseFilters {
  category?: string;
  sector?: string;
  language?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  duration?: string;
  features?: string[];
  search?: string;
  instructor?: string;
  tags?: string[];
}

export interface CourseSort {
  field: 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high' | 'duration' | 'relevance';
  direction: 'asc' | 'desc';
}

export interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  sector: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  price: number;
  originalPrice?: number;
  image: string;
  tags: string[];
  certificate: boolean;
  lessons: number;
  quizzes: number;
  projects: number;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
}

export interface CourseUpdateData {
  title?: string;
  description?: string;
  category?: string;
  sector?: string;
  language?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: number;
  price?: number;
  originalPrice?: number;
  image?: string;
  tags?: string[];
  certificate?: boolean;
  lessons?: number;
  quizzes?: number;
  projects?: number;
}

export interface CourseSearchResult {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CourseRecommendation {
  courseId: string;
  score: number;
  reason: string;
}

export interface CourseBundle {
  id: string;
  title: string;
  description: string;
  courses: string[];
  price: number;
  originalPrice?: number;
  discount: number;
  image: string;
  isActive: boolean;
  expiresAt?: string;
}

export interface CourseSubscription {
  id: string;
  studentId: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
  price: number;
  billingCycle: 'monthly' | 'yearly';
  autoRenew: boolean;
}

export interface CourseCertificate {
  id: string;
  studentId: string;
  courseId: string;
  issuedAt: string;
  certificateUrl: string;
  certificateNumber: string;
  instructorSignature: string;
  courseTitle: string;
  studentName: string;
  completionDate: string;
} 