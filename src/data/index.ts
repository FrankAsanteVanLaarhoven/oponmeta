// Data exports
export * from './coursesData';
export * from './vendorPlans';

// Types and interfaces
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  theme: 'light' | 'dark' | 'auto';
  accessibility: AccessibilitySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  courseUpdates: boolean;
  newMessages: boolean;
  achievements: boolean;
  marketing: boolean;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  reducedMotion: boolean;
}

export interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  certificates: number;
  achievements: number;
  streak: number;
}

export interface Category extends BaseEntity {
  name: string;
  description: string;
  slug: string;
  icon: string;
  color: string;
  parentId?: string;
  children?: Category[];
  courseCount: number;
}

export interface Tag extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  usageCount: number;
}

export interface Review extends BaseEntity {
  userId: string;
  courseId: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  reported: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Enrollment extends BaseEntity {
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'dropped' | 'expired';
  progress: number;
  completedLessons: string[];
  startDate: string;
  endDate?: string;
  certificateId?: string;
  lastAccessed: string;
}

export interface Certificate extends BaseEntity {
  userId: string;
  courseId: string;
  enrollmentId: string;
  certificateNumber: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'revoked';
  downloadUrl: string;
}

export interface Achievement extends BaseEntity {
  userId: string;
  type: 'course_completion' | 'streak' | 'milestone' | 'special';
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt: string;
}

export interface Notification extends BaseEntity {
  userId: string;
  type: 'course_update' | 'message' | 'achievement' | 'system' | 'marketing';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Payment extends BaseEntity {
  userId: string;
  courseId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  description: string;
}

export interface Subscription extends BaseEntity {
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethodId: string;
  nextBillingDate: string;
}

export interface Plan extends BaseEntity {
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  maxCourses: number;
  maxUsers?: number;
  isPopular: boolean;
  isActive: boolean;
}

// Mock data generators
export function generateMockUser(overrides: Partial<User> = {}): User {
  return {
    id: `user_${Math.random().toString(36).substr(2, 9)}`,
    email: `user${Math.random().toString(36).substr(2, 5)}@example.com`,
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    status: 'active',
    preferences: {
      language: 'en',
      timezone: 'UTC',
      notifications: {
        email: true,
        push: true,
        sms: false,
        courseUpdates: true,
        newMessages: true,
        achievements: true,
        marketing: false,
      },
      theme: 'light',
      accessibility: {
        highContrast: false,
        largeText: false,
        screenReader: false,
        reducedMotion: false,
      },
    },
    stats: {
      totalCourses: 5,
      completedCourses: 3,
      totalHours: 45,
      certificates: 2,
      achievements: 8,
      streak: 7,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockEnrollment(overrides: Partial<Enrollment> = {}): Enrollment {
  return {
    id: `enrollment_${Math.random().toString(36).substr(2, 9)}`,
    userId: `user_${Math.random().toString(36).substr(2, 9)}`,
    courseId: `course_${Math.random().toString(36).substr(2, 9)}`,
    status: 'active',
    progress: Math.floor(Math.random() * 100),
    completedLessons: [],
    startDate: new Date().toISOString(),
    lastAccessed: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockReview(overrides: Partial<Review> = {}): Review {
  return {
    id: `review_${Math.random().toString(36).substr(2, 9)}`,
    userId: `user_${Math.random().toString(36).substr(2, 9)}`,
    courseId: `course_${Math.random().toString(36).substr(2, 9)}`,
    rating: Math.floor(Math.random() * 5) + 1,
    title: 'Great course!',
    content: 'This course was very helpful and well-structured.',
    helpful: Math.floor(Math.random() * 50),
    reported: false,
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}
