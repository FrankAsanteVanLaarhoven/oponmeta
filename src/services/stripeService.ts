// Stripe Service for our platform
// This service handles all Stripe-related operations including payments, subscriptions, and webhooks

export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
  credits: number;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  plan: SubscriptionPlan;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  subscription?: Subscription;
  defaultPaymentMethod?: string;
}

// Mock Stripe configuration (replace with real keys in production)
const STRIPE_CONFIG: StripeConfig = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_key',
  secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || 'sk_test_mock_key',
  webhookSecret: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || 'whsec_mock_secret',
};

// Available subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      'Basic AI course creation',
      '5 courses per month',
      'Community support',
      'Basic analytics',
    ],
    stripePriceId: 'price_free',
    credits: 50,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    currency: 'USD',
    interval: 'month',
    features: [
      'Advanced AI course creation',
      'Unlimited courses',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'SCORM export',
    ],
    stripePriceId: 'price_basic_monthly',
    credits: 200,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Basic',
      'AI companions',
      'Voice-driven lessons',
      'Advanced integrations',
      'White-label solution',
      'API access',
      'Dedicated support',
    ],
    stripePriceId: 'price_pro_monthly',
    credits: 500,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Pro',
      'Custom AI training',
      'On-premise deployment',
      'SLA guarantee',
      'Custom integrations',
      'Dedicated account manager',
      'Unlimited credits',
    ],
    stripePriceId: 'price_enterprise_monthly',
    credits: 1000,
  },
];

class StripeService {
  private config: StripeConfig;

  constructor(config: StripeConfig = STRIPE_CONFIG) {
    this.config = config;
  }

  // Initialize Stripe (load Stripe.js)
  async initialize(): Promise<void> {
    if (typeof window !== 'undefined' && !window.Stripe) {
      // Load Stripe.js dynamically
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => resolve();
      });
    }
  }

  // Create a payment intent for one-time payments
  async createPaymentIntent(amount: number, currency: string = 'USD'): Promise<PaymentIntent> {
    try {
      // Mock implementation - replace with real API call
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock payment intent:', error);
      return {
        id: `pi_mock_${Date.now()}`,
        amount,
        currency,
        status: 'requires_payment_method',
        clientSecret: 'pi_mock_secret_' + Date.now(),
      };
    }
  }

  // Create a subscription
  async createSubscription(priceId: string, customerId?: string): Promise<Subscription> {
    try {
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock subscription:', error);
      const plan = SUBSCRIPTION_PLANS.find(p => p.stripePriceId === priceId) || SUBSCRIPTION_PLANS[1];
      
      return {
        id: `sub_mock_${Date.now()}`,
        status: 'active',
        plan,
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
      };
    }
  }

  // Cancel a subscription
  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd: boolean = true): Promise<Subscription> {
    try {
      const response = await fetch(`/api/stripe/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
          cancelAtPeriodEnd,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock cancellation:', error);
      return {
        id: subscriptionId,
        status: cancelAtPeriodEnd ? 'active' : 'canceled',
        plan: SUBSCRIPTION_PLANS[1],
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd,
      };
    }
  }

  // Update subscription
  async updateSubscription(subscriptionId: string, priceId: string): Promise<Subscription> {
    try {
      const response = await fetch(`/api/stripe/update-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
          priceId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock update:', error);
      const plan = SUBSCRIPTION_PLANS.find(p => p.stripePriceId === priceId) || SUBSCRIPTION_PLANS[1];
      
      return {
        id: subscriptionId,
        status: 'active',
        plan,
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
      };
    }
  }

  // Create a customer portal session
  async createCustomerPortalSession(customerId: string, returnUrl: string): Promise<string> {
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock portal session:', error);
      return '/subscription-settings';
    }
  }

  // Get customer details
  async getCustomer(customerId: string): Promise<Customer> {
    try {
      const response = await fetch(`/api/stripe/customer/${customerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get customer');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock customer:', error);
      return {
        id: customerId,
        email: 'user@example.com',
        name: 'John Doe',
        subscription: {
          id: 'sub_mock_123',
          status: 'active',
          plan: SUBSCRIPTION_PLANS[2],
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: false,
        },
      };
    }
  }

  // Get subscription details
  async getSubscription(subscriptionId: string): Promise<Subscription> {
    try {
      const response = await fetch(`/api/stripe/subscription/${subscriptionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get subscription');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock subscription:', error);
      return {
        id: subscriptionId,
        status: 'active',
        plan: SUBSCRIPTION_PLANS[2],
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
      };
    }
  }

  // Process webhook events
  async processWebhook(payload: string, signature: string): Promise<void> {
    try {
      const response = await fetch('/api/stripe/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Stripe-Signature': signature,
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Webhook processing failed');
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
      throw error;
    }
  }

  // Get available plans
  getPlans(): SubscriptionPlan[] {
    return SUBSCRIPTION_PLANS;
  }

  // Get plan by ID
  getPlan(planId: string): SubscriptionPlan | undefined {
    return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
  }

  // Format price for display
  formatPrice(price: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price / 100);
  }

  // Validate payment method
  async validatePaymentMethod(paymentMethodId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/stripe/validate-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId }),
      });

      return response.ok;
    } catch (error) {
      console.error('Payment method validation error:', error);
      return false;
    }
  }

  // Get billing history
  async getBillingHistory(customerId: string): Promise<any[]> {
    try {
      const response = await fetch(`/api/stripe/billing-history/${customerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get billing history');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock fallback for development
      console.warn('Using mock billing history:', error);
      return [
        {
          id: 'inv_mock_1',
          amount: 7900,
          currency: 'USD',
          status: 'paid',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Pro Plan - Monthly',
        },
        {
          id: 'inv_mock_2',
          amount: 7900,
          currency: 'USD',
          status: 'paid',
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Pro Plan - Monthly',
        },
      ];
    }
  }
}

// Export singleton instance
export const stripeService = new StripeService();

// Export types for use in components
export type { StripeConfig, SubscriptionPlan, PaymentIntent, Subscription, Customer }; 