// Stripe Connect Service
// Based on https://docs.stripe.com/connect/design-an-integration

export interface ConnectedAccount {
  id: string;
  object: 'account';
  business_type: 'individual' | 'company';
  country: string;
  email: string;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
  requirements: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
  };
  created: number;
  metadata: {
    instructor_id: string;
    platform_user_id: string;
  };
}

export interface Payment {
  id: string;
  object: 'charge';
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  description: string;
  customer: string;
  connected_account: string;
  application_fee_amount?: number;
  created: number;
  metadata: {
    course_id: string;
    instructor_id: string;
    student_id: string;
  };
}

export interface Payout {
  id: string;
  object: 'transfer';
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'in_transit' | 'canceled' | 'failed';
  arrival_date: number;
  created: number;
  connected_account: string;
  destination: string;
  metadata: {
    instructor_id: string;
    payout_period: string;
  };
}

export interface PlatformMetrics {
  totalConnectedAccounts: number;
  activeAccounts: number;
  totalPayments: number;
  totalPayouts: number;
  platformRevenue: number;
  averagePaymentAmount: number;
  successRate: number;
}

export interface OnboardingLink {
  url: string;
  expires_at: number;
}

class StripeConnectService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = 'sk_test_YOUR_STRIPE_SECRET_KEY_HERE';
    this.baseUrl = 'https://api.stripe.com/v1';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Stripe API Error: ${error.error?.message || 'Unknown error'}`);
    }

    return response.json();
  }

  // Create Connected Account (Express)
  async createConnectedAccount(params: {
    email: string;
    country: string;
    business_type: 'individual' | 'company';
    instructor_id: string;
    platform_user_id: string;
  }): Promise<ConnectedAccount> {
    const body = new URLSearchParams({
      type: 'express',
      country: params.country,
      email: params.email,
      business_type: params.business_type,
      capabilities: 'card_payments,transfers',
      metadata: JSON.stringify({
        instructor_id: params.instructor_id,
        platform_user_id: params.platform_user_id,
      }),
    });

    return this.makeRequest('/accounts', {
      method: 'POST',
      body,
    });
  }

  // Create Onboarding Link
  async createOnboardingLink(accountId: string, returnUrl: string): Promise<OnboardingLink> {
    const body = new URLSearchParams({
      account: accountId,
      refresh_url: returnUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });

    return this.makeRequest('/account_links', {
      method: 'POST',
      body,
    });
  }

  // Get Connected Account Details
  async getConnectedAccount(accountId: string): Promise<ConnectedAccount> {
    return this.makeRequest(`/accounts/${accountId}`, {
      headers: {
        'Stripe-Account': accountId,
      },
    });
  }

  // List Connected Accounts
  async listConnectedAccounts(limit: number = 100): Promise<{ data: ConnectedAccount[] }> {
    return this.makeRequest(`/accounts?limit=${limit}`);
  }

  // Create Direct Charge
  async createDirectCharge(params: {
    amount: number;
    currency: string;
    description: string;
    connected_account: string;
    application_fee_amount?: number;
    metadata?: Record<string, string>;
  }): Promise<Payment> {
    const body = new URLSearchParams({
      amount: params.amount.toString(),
      currency: params.currency,
      source: 'tok_visa', // In production, use payment_method_id
      description: params.description,
      application_fee_amount: (params.application_fee_amount || 0).toString(),
      ...(params.metadata && { metadata: JSON.stringify(params.metadata) }),
    });

    return this.makeRequest('/charges', {
      method: 'POST',
      headers: {
        'Stripe-Account': params.connected_account,
      },
      body,
    });
  }

  // Get Payment Details
  async getPayment(paymentId: string, accountId: string): Promise<Payment> {
    return this.makeRequest(`/charges/${paymentId}`, {
      headers: {
        'Stripe-Account': accountId,
      },
    });
  }

  // List Payments for Connected Account
  async listPayments(accountId: string, limit: number = 100): Promise<{ data: Payment[] }> {
    return this.makeRequest(`/charges?limit=${limit}`, {
      headers: {
        'Stripe-Account': accountId,
      },
    });
  }

  // Create Payout (Transfer)
  async createPayout(params: {
    amount: number;
    currency: string;
    connected_account: string;
    destination: string;
    metadata?: Record<string, string>;
  }): Promise<Payout> {
    const body = new URLSearchParams({
      amount: params.amount.toString(),
      currency: params.currency,
      destination: params.destination,
      ...(params.metadata && { metadata: JSON.stringify(params.metadata) }),
    });

    return this.makeRequest('/transfers', {
      method: 'POST',
      headers: {
        'Stripe-Account': params.connected_account,
      },
      body,
    });
  }

  // Get Payout Details
  async getPayout(payoutId: string, accountId: string): Promise<Payout> {
    return this.makeRequest(`/transfers/${payoutId}`, {
      headers: {
        'Stripe-Account': accountId,
      },
    });
  }

  // List Payouts for Connected Account
  async listPayouts(accountId: string, limit: number = 100): Promise<{ data: Payout[] }> {
    return this.makeRequest(`/transfers?limit=${limit}`, {
      headers: {
        'Stripe-Account': accountId,
      },
    });
  }

  // Get Account Balance
  async getAccountBalance(accountId: string): Promise<any> {
    return this.makeRequest(`/balance`, {
      headers: {
        'Stripe-Account': accountId,
      },
    });
  }

  // Create Payment Intent (for more complex payment flows)
  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    connected_account: string;
    application_fee_amount?: number;
    metadata?: Record<string, string>;
  }): Promise<any> {
    const body = new URLSearchParams({
      amount: params.amount.toString(),
      currency: params.currency,
      application_fee_amount: (params.application_fee_amount || 0).toString(),
      ...(params.metadata && { metadata: JSON.stringify(params.metadata) }),
    });

    return this.makeRequest('/payment_intents', {
      method: 'POST',
      headers: {
        'Stripe-Account': params.connected_account,
      },
      body,
    });
  }

  // Create Customer
  async createCustomer(params: {
    email: string;
    name?: string;
    metadata?: Record<string, string>;
  }): Promise<any> {
    const body = new URLSearchParams({
      email: params.email,
      ...(params.name && { name: params.name }),
      ...(params.metadata && { metadata: JSON.stringify(params.metadata) }),
    });

    return this.makeRequest('/customers', {
      method: 'POST',
      body,
    });
  }

  // Create Payment Method
  async createPaymentMethod(params: {
    type: 'card';
    card: {
      token: string;
    };
  }): Promise<any> {
    const body = new URLSearchParams({
      type: params.type,
      card: JSON.stringify(params.card),
    });

    return this.makeRequest('/payment_methods', {
      method: 'POST',
      body,
    });
  }

  // Attach Payment Method to Customer
  async attachPaymentMethod(paymentMethodId: string, customerId: string): Promise<any> {
    const body = new URLSearchParams({
      customer: customerId,
    });

    return this.makeRequest(`/payment_methods/${paymentMethodId}/attach`, {
      method: 'POST',
      body,
    });
  }

  // Create Setup Intent (for saving payment methods)
  async createSetupIntent(params: {
    customer: string;
    payment_method_types: string[];
    usage: 'off_session' | 'on_session';
  }): Promise<any> {
    const body = new URLSearchParams({
      customer: params.customer,
      payment_method_types: params.payment_method_types.join(','),
      usage: params.usage,
    });

    return this.makeRequest('/setup_intents', {
      method: 'POST',
      body,
    });
  }

  // Refund Payment
  async refundPayment(params: {
    charge: string;
    amount?: number;
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
  }): Promise<any> {
    const body = new URLSearchParams({
      charge: params.charge,
      ...(params.amount && { amount: params.amount.toString() }),
      ...(params.reason && { reason: params.reason }),
    });

    return this.makeRequest('/refunds', {
      method: 'POST',
      body,
    });
  }

  // Get Platform Metrics
  async getPlatformMetrics(): Promise<PlatformMetrics> {
    try {
      // Get all connected accounts
      const accountsResponse = await this.listConnectedAccounts();
      const accounts = accountsResponse.data;

      // Calculate metrics
      const totalConnectedAccounts = accounts.length;
      const activeAccounts = accounts.filter(acc => acc.charges_enabled && acc.payouts_enabled).length;

      // Get payments from all accounts
      let totalPayments = 0;
      let totalRevenue = 0;
      let successfulPayments = 0;

      for (const account of accounts) {
        try {
          const paymentsResponse = await this.listPayments(account.id);
          const payments = paymentsResponse.data;
          
          totalPayments += payments.length;
          successfulPayments += payments.filter(p => p.status === 'succeeded').length;
          
          payments.forEach(payment => {
            if (payment.status === 'succeeded' && payment.application_fee_amount) {
              totalRevenue += payment.application_fee_amount;
            }
          });
        } catch (error) {
          console.error(`Error fetching payments for account ${account.id}:`, error);
        }
      }

      const averagePaymentAmount = totalPayments > 0 ? totalRevenue / totalPayments : 0;
      const successRate = totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0;

      return {
        totalConnectedAccounts,
        activeAccounts,
        totalPayments,
        totalPayouts: 0, // Would need to calculate from payouts
        platformRevenue: totalRevenue,
        averagePaymentAmount,
        successRate,
      };
    } catch (error) {
      console.error('Error calculating platform metrics:', error);
      return {
        totalConnectedAccounts: 0,
        activeAccounts: 0,
        totalPayments: 0,
        totalPayouts: 0,
        platformRevenue: 0,
        averagePaymentAmount: 0,
        successRate: 0,
      };
    }
  }

  // Utility functions
  formatCurrency(amount: number, currency: string = 'usd'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString();
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/accounts');
      return true;
    } catch (error) {
      console.error('Stripe API connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const stripeConnectService = new StripeConnectService();

// Export types for use in components
export type {
  ConnectedAccount,
  Payment,
  Payout,
  PlatformMetrics,
  OnboardingLink,
};
