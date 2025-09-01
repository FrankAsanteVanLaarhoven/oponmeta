export interface VendorProfile {
  id: string;
  name: string;
  email: string;
  company?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  specialties: string[];
  experience: number; // years
  rating: number;
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  joinDate: Date;
  isVerified: boolean;
  subscription: VendorSubscription;
}

export interface VendorSubscription {
  plan: VendorPlan;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export type VendorPlan = 'free' | 'professional' | 'enterprise';

export interface VendorPlanFeatures {
  plan: VendorPlan;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: {
    maxCourses: number;
    analytics: boolean;
    prioritySupport: boolean;
    customBranding: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
    revenueSharing: boolean;
    bulkManagement: boolean;
    marketingTools: boolean;
    dedicatedSupport: boolean;
  };
  limits: {
    storageGB: number;
    bandwidthGB: number;
    apiCallsPerMonth: number;
    studentsPerCourse: number;
  };
}

export interface VendorAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalStudents: number;
  activeStudents: number;
  totalCourses: number;
  publishedCourses: number;
  averageRating: number;
  completionRate: number;
  topPerformingCourses: Array<{
    id: string;
    title: string;
    revenue: number;
    students: number;
    rating: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
}

export interface VendorCourse {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  students: number;
  rating: number;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
} 