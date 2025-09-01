// Application constants
export const APP_NAME = 'OponMeta';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'World-Leading EdTech Platform';

// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    DELETE: '/users/delete',
  },
  COURSES: {
    LIST: '/courses',
    CREATE: '/courses',
    DETAIL: '/courses/:id',
    UPDATE: '/courses/:id',
    DELETE: '/courses/:id',
    ENROLL: '/courses/:id/enroll',
    PROGRESS: '/courses/:id/progress',
  },
  ENROLLMENTS: {
    LIST: '/enrollments',
    CREATE: '/enrollments',
    UPDATE: '/enrollments/:id',
    DELETE: '/enrollments/:id',
  },
  PAYMENTS: {
    CREATE: '/payments',
    VERIFY: '/payments/verify',
    HISTORY: '/payments/history',
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    COURSES: '/analytics/courses',
    USERS: '/analytics/users',
    REVENUE: '/analytics/revenue',
  },
} as const;

// Course categories
export const COURSE_CATEGORIES = [
  'Technology and Digital Skills',
  'Data and Analytics',
  'Health and Healthcare Innovation',
  'Business, Strategy and Innovation',
  'Professional Development and Leadership',
  'Design and Creative Media',
  'Education and Teaching',
  'Opontainment',
  'Engineering and Construction',
  'Agriculture and Food System',
  'Environment and Sustainability',
  'Marketing and Sales',
  'Finance and Accounting',
  'Language and Communication',
  'Personal Development',
  'Sports and Fitness',
  'Hospitality and Tourism',
  'Transport and Logistics',
] as const;

// Course levels
export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

// Course statuses
export const COURSE_STATUSES = ['draft', 'published', 'archived'] as const;

// User roles
export const USER_ROLES = ['student', 'instructor', 'admin'] as const;

// User statuses
export const USER_STATUSES = ['active', 'inactive', 'suspended'] as const;

// Payment statuses
export const PAYMENT_STATUSES = ['pending', 'completed', 'failed', 'refunded'] as const;

// Enrollment statuses
export const ENROLLMENT_STATUSES = ['active', 'completed', 'dropped', 'expired'] as const;

// Notification types
export const NOTIFICATION_TYPES = [
  'course_update',
  'message',
  'achievement',
  'system',
  'marketing',
] as const;

// Notification priorities
export const NOTIFICATION_PRIORITIES = ['low', 'medium', 'high'] as const;

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
] as const;

// Time zones
export const TIME_ZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
] as const;

// File upload limits
export const FILE_UPLOAD_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  AUDIO: 20 * 1024 * 1024, // 20MB
} as const;

// Supported file types
export const SUPPORTED_FILE_TYPES = {
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  VIDEO: ['.mp4', '.avi', '.mov', '.wmv', '.flv'],
  DOCUMENT: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
  AUDIO: ['.mp3', '.wav', '.aac', '.ogg'],
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Cache keys
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  COURSES: 'courses',
  ENROLLMENTS: 'enrollments',
  NOTIFICATIONS: 'notifications',
  SETTINGS: 'settings',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_STATE: 'sidebar_state',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  COURSE_ENROLLED: 'Successfully enrolled in course.',
  COURSE_COMPLETED: 'Course completed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PAYMENT_SUCCESSFUL: 'Payment completed successfully.',
} as const;

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s-()]{10,}$/,
  URL: /^https?:\/\/.+/,
} as const;

// Theme colors
export const THEME_COLORS = {
  PRIMARY: '#0a174e',
  SECONDARY: '#1a2a6b',
  ACCENT: '#FFD700',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
