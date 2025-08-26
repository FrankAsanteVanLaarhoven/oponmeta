// Comprehensive RBAC System for Enterprise LMS
export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  VENDOR = 'vendor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  MODERATOR = 'moderator',
  SUPPORT = 'support'
}

export enum Permission {
  // User Management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_LIST = 'user:list',
  
  // Course Management
  COURSE_CREATE = 'course:create',
  COURSE_READ = 'course:read',
  COURSE_UPDATE = 'course:update',
  COURSE_DELETE = 'course:delete',
  COURSE_PUBLISH = 'course:publish',
  COURSE_APPROVE = 'course:approve',
  COURSE_LIST = 'course:list',
  
  // Enrollment Management
  ENROLLMENT_CREATE = 'enrollment:create',
  ENROLLMENT_READ = 'enrollment:read',
  ENROLLMENT_UPDATE = 'enrollment:update',
  ENROLLMENT_DELETE = 'enrollment:delete',
  ENROLLMENT_LIST = 'enrollment:list',
  
  // Payment Management
  PAYMENT_CREATE = 'payment:create',
  PAYMENT_READ = 'payment:read',
  PAYMENT_UPDATE = 'payment:update',
  PAYMENT_REFUND = 'payment:refund',
  PAYMENT_LIST = 'payment:list',
  
  // Analytics & Reporting
  ANALYTICS_READ = 'analytics:read',
  ANALYTICS_EXPORT = 'analytics:export',
  REPORTS_GENERATE = 'reports:generate',
  
  // Content Management
  CONTENT_CREATE = 'content:create',
  CONTENT_READ = 'content:read',
  CONTENT_UPDATE = 'content:update',
  CONTENT_DELETE = 'content:delete',
  CONTENT_MODERATE = 'content:moderate',
  
  // System Administration
  SYSTEM_CONFIG = 'system:config',
  SYSTEM_BACKUP = 'system:backup',
  SYSTEM_RESTORE = 'system:restore',
  SYSTEM_LOGS = 'system:logs',
  
  // Security & Compliance
  SECURITY_AUDIT = 'security:audit',
  COMPLIANCE_MANAGE = 'compliance:manage',
  GDPR_MANAGE = 'gdpr:manage',
  
  // Communication
  NOTIFICATION_SEND = 'notification:send',
  MESSAGE_SEND = 'message:send',
  ANNOUNCEMENT_CREATE = 'announcement:create',
  
  // Financial Management
  REVENUE_VIEW = 'revenue:view',
  PAYOUT_MANAGE = 'payout:manage',
  INVOICE_MANAGE = 'invoice:manage',
  
  // AI & ML Features
  AI_FEATURES_ACCESS = 'ai:access',
  ML_MODELS_MANAGE = 'ml:manage',
  RECOMMENDATIONS_MANAGE = 'recommendations:manage'
}

export interface Role {
  id: string;
  name: UserRole;
  displayName: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAuth {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  roles: UserRole[];
  permissions: Permission[];
  isActive: boolean;
  isVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  lastLoginAt?: Date;
  lastPasswordChangeAt: Date;
  failedLoginAttempts: number;
  lockedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  refreshExpiresAt: Date;
  ipAddress: string;
  userAgent: string;
  deviceId?: string;
  isActive: boolean;
  createdAt: Date;
  lastActivityAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  type: 'password' | 'session' | 'rate_limit' | 'ip_whitelist' | 'mfa';
  config: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComplianceRecord {
  id: string;
  userId: string;
  type: 'gdpr_consent' | 'data_export' | 'data_deletion' | 'privacy_update';
  status: 'pending' | 'completed' | 'failed';
  requestData: Record<string, any>;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Role definitions with permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.STUDENT]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.COURSE_READ,
    Permission.COURSE_LIST,
    Permission.ENROLLMENT_CREATE,
    Permission.ENROLLMENT_READ,
    Permission.ENROLLMENT_UPDATE,
    Permission.PAYMENT_CREATE,
    Permission.PAYMENT_READ,
    Permission.CONTENT_READ,
    Permission.AI_FEATURES_ACCESS,
    Permission.MESSAGE_SEND,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.INSTRUCTOR]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.COURSE_CREATE,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.COURSE_DELETE,
    Permission.COURSE_PUBLISH,
    Permission.COURSE_LIST,
    Permission.ENROLLMENT_READ,
    Permission.ENROLLMENT_LIST,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_READ,
    Permission.CONTENT_UPDATE,
    Permission.CONTENT_DELETE,
    Permission.ANALYTICS_READ,
    Permission.REVENUE_VIEW,
    Permission.PAYOUT_MANAGE,
    Permission.AI_FEATURES_ACCESS,
    Permission.MESSAGE_SEND,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.VENDOR]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.COURSE_CREATE,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.COURSE_DELETE,
    Permission.COURSE_PUBLISH,
    Permission.COURSE_LIST,
    Permission.ENROLLMENT_READ,
    Permission.ENROLLMENT_LIST,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_READ,
    Permission.CONTENT_UPDATE,
    Permission.CONTENT_DELETE,
    Permission.ANALYTICS_READ,
    Permission.ANALYTICS_EXPORT,
    Permission.REVENUE_VIEW,
    Permission.PAYOUT_MANAGE,
    Permission.INVOICE_MANAGE,
    Permission.AI_FEATURES_ACCESS,
    Permission.MESSAGE_SEND,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.ADMIN]: [
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.USER_LIST,
    Permission.COURSE_CREATE,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.COURSE_DELETE,
    Permission.COURSE_APPROVE,
    Permission.COURSE_LIST,
    Permission.ENROLLMENT_CREATE,
    Permission.ENROLLMENT_READ,
    Permission.ENROLLMENT_UPDATE,
    Permission.ENROLLMENT_DELETE,
    Permission.ENROLLMENT_LIST,
    Permission.PAYMENT_READ,
    Permission.PAYMENT_UPDATE,
    Permission.PAYMENT_REFUND,
    Permission.PAYMENT_LIST,
    Permission.ANALYTICS_READ,
    Permission.ANALYTICS_EXPORT,
    Permission.REPORTS_GENERATE,
    Permission.CONTENT_MODERATE,
    Permission.SYSTEM_CONFIG,
    Permission.SYSTEM_LOGS,
    Permission.SECURITY_AUDIT,
    Permission.COMPLIANCE_MANAGE,
    Permission.GDPR_MANAGE,
    Permission.NOTIFICATION_SEND,
    Permission.ANNOUNCEMENT_CREATE,
    Permission.REVENUE_VIEW,
    Permission.AI_FEATURES_ACCESS,
    Permission.ML_MODELS_MANAGE,
    Permission.RECOMMENDATIONS_MANAGE
  ],
  
  [UserRole.SUPER_ADMIN]: [
    // All permissions
    ...Object.values(Permission)
  ],
  
  [UserRole.MODERATOR]: [
    Permission.USER_READ,
    Permission.USER_LIST,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.COURSE_APPROVE,
    Permission.COURSE_LIST,
    Permission.CONTENT_MODERATE,
    Permission.ANALYTICS_READ,
    Permission.SYSTEM_LOGS,
    Permission.NOTIFICATION_SEND,
    Permission.ANNOUNCEMENT_CREATE
  ],
  
  [UserRole.SUPPORT]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.COURSE_READ,
    Permission.ENROLLMENT_READ,
    Permission.PAYMENT_READ,
    Permission.ANALYTICS_READ,
    Permission.NOTIFICATION_SEND,
    Permission.MESSAGE_SEND
  ]
};

// Security configurations
export const SECURITY_CONFIG = {
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90, // days
    preventReuse: 5 // last 5 passwords
  },
  session: {
    maxDuration: 24 * 60 * 60 * 1000, // 24 hours
    refreshDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxConcurrentSessions: 5
  },
  rateLimit: {
    login: { window: 15 * 60 * 1000, max: 5 }, // 5 attempts per 15 minutes
    api: { window: 60 * 1000, max: 100 }, // 100 requests per minute
    passwordReset: { window: 60 * 60 * 1000, max: 3 } // 3 attempts per hour
  },
  mfa: {
    enabled: true,
    methods: ['totp', 'sms', 'email'],
    backupCodes: 10
  }
};
