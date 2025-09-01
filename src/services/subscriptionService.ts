import { Stripe } from '@stripe/stripe-js';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
  maxUsers?: number;
  maxCourses?: number;
  maxStorage?: number;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

export interface SubscriptionUsage {
  userId: string;
  planId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  coursesUsed: number;
  storageUsed: number;
  companionsUsed: number;
  apiCallsUsed: number;
}

export interface BillingHistory {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  date: Date;
  invoiceUrl?: string;
}

class SubscriptionService {
  private plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      currency: 'USD',
      interval: 'month',
      features: [
        'Access to basic courses',
        'Community forums',
        'Basic support',
        '5 courses per month',
        '100MB storage'
      ],
      maxUsers: 1,
      maxCourses: 5,
      maxStorage: 100
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      currency: 'USD',
      interval: 'month',
      features: [
        'Everything in Free',
        'Premium courses',
        'AI companions',
        'Priority support',
        'Unlimited courses',
        '10GB storage',
        'Advanced analytics'
      ],
      isPopular: true,
      maxUsers: 5,
      maxCourses: -1,
      maxStorage: 10240
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      currency: 'USD',
      interval: 'month',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
        'White-label options',
        'API access',
        'Unlimited storage'
      ],
      isEnterprise: true,
      maxUsers: -1,
      maxCourses: -1,
      maxStorage: -1
    }
  ];

  private subscriptions: UserSubscription[] = [];
  private usage: SubscriptionUsage[] = [];
  private billingHistory: BillingHistory[] = [];

  constructor() {
    this.loadData();
  }

  // Plan Management
  async getPlans(): Promise<SubscriptionPlan[]> {
    return this.plans;
  }

  async getPlanById(id: string): Promise<SubscriptionPlan | null> {
    return this.plans.find(plan => plan.id === id) || null;
  }

  async getPopularPlan(): Promise<SubscriptionPlan | null> {
    return this.plans.find(plan => plan.isPopular) || null;
  }

  // Subscription Management
  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    return this.subscriptions.find(sub => sub.userId === userId) || null;
  }

  async createSubscription(userId: string, planId: string, stripeSubscriptionId?: string): Promise<UserSubscription> {
    const plan = await this.getPlanById(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    const subscription: UserSubscription = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      planId,
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      cancelAtPeriodEnd: false,
      stripeSubscriptionId,
    };

    this.subscriptions.push(subscription);
    this.saveSubscriptions();
    return subscription;
  }

  async updateSubscription(subscriptionId: string, updates: Partial<UserSubscription>): Promise<UserSubscription | null> {
    const index = this.subscriptions.findIndex(sub => sub.id === subscriptionId);
    if (index === -1) return null;

    this.subscriptions[index] = {
      ...this.subscriptions[index],
      ...updates,
    };

    this.saveSubscriptions();
    return this.subscriptions[index];
  }

  async cancelSubscription(subscriptionId: string): Promise<UserSubscription | null> {
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) return null;

    return await this.updateSubscription(subscriptionId, {
      cancelAtPeriodEnd: true,
      status: 'canceled',
    });
  }

  async reactivateSubscription(subscriptionId: string): Promise<UserSubscription | null> {
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) return null;

    return await this.updateSubscription(subscriptionId, {
      cancelAtPeriodEnd: false,
      status: 'active',
    });
  }

  // Usage Tracking
  async getUsage(userId: string): Promise<SubscriptionUsage | null> {
    return this.usage.find(u => u.userId === userId) || null;
  }

  async updateUsage(userId: string, updates: Partial<SubscriptionUsage>): Promise<SubscriptionUsage> {
    let usage = this.usage.find(u => u.userId === userId);
    
    if (!usage) {
      usage = {
        userId,
        planId: 'free',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        coursesUsed: 0,
        storageUsed: 0,
        companionsUsed: 0,
        apiCallsUsed: 0,
      };
      this.usage.push(usage);
    }

    Object.assign(usage, updates);
    this.saveUsage();
    return usage;
  }

  async checkUsageLimit(userId: string, type: 'courses' | 'storage' | 'companions' | 'apiCalls'): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    const usage = await this.getUsage(userId);
    
    if (!subscription || !usage) return false;

    const plan = await this.getPlanById(subscription.planId);
    if (!plan) return false;

    const limits = {
      courses: plan.maxCourses || 0,
      storage: plan.maxStorage || 0,
      companions: plan.maxUsers || 0,
      apiCalls: 1000, // Default limit
    };

    const currentUsage = {
      courses: usage.coursesUsed,
      storage: usage.storageUsed,
      companions: usage.companionsUsed,
      apiCalls: usage.apiCallsUsed,
    };

    return currentUsage[type] < limits[type] || limits[type] === -1;
  }

  // Billing Management
  async getBillingHistory(userId: string): Promise<BillingHistory[]> {
    return this.billingHistory.filter(bill => bill.userId === userId);
  }

  async addBillingRecord(billingRecord: Omit<BillingHistory, 'id' | 'date'>): Promise<BillingHistory> {
    const record: BillingHistory = {
      ...billingRecord,
      id: `bill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date(),
    };

    this.billingHistory.push(record);
    this.saveBillingHistory();
    return record;
  }

  // Analytics
  async getSubscriptionAnalytics(): Promise<{
    totalSubscriptions: number;
    activeSubscriptions: number;
    revenue: number;
    popularPlans: { planId: string; count: number }[];
  }> {
    const totalSubscriptions = this.subscriptions.length;
    const activeSubscriptions = this.subscriptions.filter(sub => sub.status === 'active').length;
    const revenue = this.subscriptions.reduce((sum, sub) => {
      const plan = this.plans.find(p => p.id === sub.planId);
      return sum + (plan?.price || 0);
    }, 0);

    const popularPlans = this.plans.map(plan => ({
      planId: plan.id,
      count: this.subscriptions.filter(sub => sub.planId === plan.id).length,
    }));

    return {
      totalSubscriptions,
      activeSubscriptions,
      revenue,
      popularPlans,
    };
  }

  // Stripe Integration
  async createStripeCheckoutSession(userId: string, planId: string): Promise<string> {
    // This would integrate with Stripe to create a checkout session
    // For now, return a mock session URL
    return `https://checkout.stripe.com/mock-session-${Date.now()}`;
  }

  async handleStripeWebhook(event: any): Promise<void> {
    // Handle Stripe webhooks for subscription updates
    switch (event.type) {
      case 'customer.subscription.created':
        await this.handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object);
        break;
    }
  }

  private async handleSubscriptionCreated(stripeSubscription: any): Promise<void> {
    // Handle new subscription creation
    console.log('New subscription created:', stripeSubscription);
  }

  private async handleSubscriptionUpdated(stripeSubscription: any): Promise<void> {
    // Handle subscription updates
    console.log('Subscription updated:', stripeSubscription);
  }

  private async handleSubscriptionDeleted(stripeSubscription: any): Promise<void> {
    // Handle subscription deletion
    console.log('Subscription deleted:', stripeSubscription);
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedSubscriptions = localStorage.getItem('oponmeta_subscriptions');
      if (storedSubscriptions) {
        this.subscriptions = JSON.parse(storedSubscriptions).map((sub: any) => ({
          ...sub,
          currentPeriodStart: new Date(sub.currentPeriodStart),
          currentPeriodEnd: new Date(sub.currentPeriodEnd),
          trialEnd: sub.trialEnd ? new Date(sub.trialEnd) : undefined,
        }));
      }

      const storedUsage = localStorage.getItem('oponmeta_subscription_usage');
      if (storedUsage) {
        this.usage = JSON.parse(storedUsage).map((u: any) => ({
          ...u,
          currentPeriodStart: new Date(u.currentPeriodStart),
          currentPeriodEnd: new Date(u.currentPeriodEnd),
        }));
      }

      const storedBilling = localStorage.getItem('oponmeta_billing_history');
      if (storedBilling) {
        this.billingHistory = JSON.parse(storedBilling).map((bill: any) => ({
          ...bill,
          date: new Date(bill.date),
        }));
      }
    } catch (error) {
      console.error('Failed to load subscription data:', error);
    }
  }

  private saveSubscriptions(): void {
    try {
      localStorage.setItem('oponmeta_subscriptions', JSON.stringify(this.subscriptions));
    } catch (error) {
      console.error('Failed to save subscriptions:', error);
    }
  }

  private saveUsage(): void {
    try {
      localStorage.setItem('oponmeta_subscription_usage', JSON.stringify(this.usage));
    } catch (error) {
      console.error('Failed to save usage:', error);
    }
  }

  private saveBillingHistory(): void {
    try {
      localStorage.setItem('oponmeta_billing_history', JSON.stringify(this.billingHistory));
    } catch (error) {
      console.error('Failed to save billing history:', error);
    }
  }
}

// Create singleton instance
const subscriptionService = new SubscriptionService();

export { subscriptionService };
export default subscriptionService;
