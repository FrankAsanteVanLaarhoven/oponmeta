import { VendorPlanFeatures } from '@/types/vendor';

export const VENDOR_PLANS: VendorPlanFeatures[] = [
  {
    plan: 'free',
    name: 'Vendor Starter',
    price: 0,
    billingCycle: 'monthly',
    features: {
      maxCourses: 3,
      analytics: false,
      prioritySupport: false,
      customBranding: false,
      apiAccess: false,
      whiteLabel: false,
      revenueSharing: false,
      bulkManagement: false,
      marketingTools: false,
      dedicatedSupport: false,
    },
    limits: {
      storageGB: 5,
      bandwidthGB: 10,
      apiCallsPerMonth: 100,
      studentsPerCourse: 100,
    },
  },
  {
    plan: 'professional',
    name: 'Professional',
    price: 29,
    billingCycle: 'monthly',
    features: {
      maxCourses: -1, // unlimited
      analytics: true,
      prioritySupport: true,
      customBranding: true,
      apiAccess: false,
      whiteLabel: false,
      revenueSharing: false,
      bulkManagement: true,
      marketingTools: true,
      dedicatedSupport: false,
    },
    limits: {
      storageGB: 50,
      bandwidthGB: 100,
      apiCallsPerMonth: 1000,
      studentsPerCourse: 1000,
    },
  },
  {
    plan: 'enterprise',
    name: 'Enterprise',
    price: 99,
    billingCycle: 'monthly',
    features: {
      maxCourses: -1, // unlimited
      analytics: true,
      prioritySupport: true,
      customBranding: true,
      apiAccess: true,
      whiteLabel: true,
      revenueSharing: true,
      bulkManagement: true,
      marketingTools: true,
      dedicatedSupport: true,
    },
    limits: {
      storageGB: 500,
      bandwidthGB: 1000,
      apiCallsPerMonth: 10000,
      studentsPerCourse: -1, // unlimited
    },
  },
];

export const getVendorPlan = (plan: string): VendorPlanFeatures | undefined => {
  return VENDOR_PLANS.find(p => p.plan === plan);
};

export const getVendorPlanFeatures = (plan: string) => {
  const planData = getVendorPlan(plan);
  if (!planData) return null;

  const features = [];
  
  if (planData.features.maxCourses === -1) {
    features.push('Unlimited courses');
  } else {
    features.push(`${planData.features.maxCourses} courses`);
  }
  
  if (planData.features.analytics) features.push('Advanced analytics');
  if (planData.features.prioritySupport) features.push('Priority support');
  if (planData.features.customBranding) features.push('Custom branding');
  if (planData.features.apiAccess) features.push('API access');
  if (planData.features.whiteLabel) features.push('White-label solutions');
  if (planData.features.revenueSharing) features.push('Revenue sharing');
  if (planData.features.bulkManagement) features.push('Bulk management');
  if (planData.features.marketingTools) features.push('Marketing tools');
  if (planData.features.dedicatedSupport) features.push('Dedicated support');

  return {
    ...planData,
    featureList: features,
  };
}; 