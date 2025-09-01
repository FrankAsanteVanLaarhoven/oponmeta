# Stripe Connect Integration for OponMeta Marketplace

## Overview

This document outlines the complete Stripe Connect integration for the OponMeta learning marketplace, enabling instructors to receive payments directly while the platform takes application fees.

## Architecture

```
Student → Platform → Stripe → Connected Account (Instructor)
   ↓         ↓         ↓              ↓
Payment → Platform → Application Fee → Payout
```

## Key Components

### 1. Connected Account Creation

```typescript
// Create Express account for instructor
const account = await stripeConnectService.createConnectedAccount({
  type: 'express',
  country: 'US',
  email: 'instructor@example.com',
  business_type: 'individual',
  capabilities: ['card_payments', 'transfers'],
  metadata: {
    instructor_id: 'instructor_456',
    platform_user_id: 'user_789'
  }
});
```

**API Endpoint**: `POST /v1/accounts`
```bash
curl https://api.stripe.com/v1/accounts \
  -u sk_test_YOUR_STRIPE_SECRET_KEY_HERE: \
  -d type=express \
  -d country=US \
  -d email=instructor@example.com \
  -d business_type=individual \
  -d capabilities=card_payments,transfers
```

### 2. Onboarding Flow

```typescript
// Create onboarding link
const onboardingLink = await stripeConnectService.createOnboardingLink(
  accountId,
  'https://oponm.com/instructor/dashboard'
);
```

**API Endpoint**: `POST /v1/account_links`
```bash
curl https://api.stripe.com/v1/account_links \
  -u sk_test_YOUR_STRIPE_SECRET_KEY_HERE: \
  -d account=acct_1032D82eZvKYlo2C \
  -d refresh_url=https://oponm.com/instructor/dashboard \
  -d return_url=https://oponm.com/instructor/dashboard \
  -d type=account_onboarding
```

### 3. Direct Charge Creation

```typescript
// Create direct charge to connected account
const payment = await stripeConnectService.createDirectCharge({
  amount: 2000, // $20.00
  currency: 'usd',
  description: 'Course: Advanced React Development',
  connected_account: 'acct_1032D82eZvKYlo2C',
  application_fee_amount: 200, // $2.00 platform fee
  metadata: {
    course_id: 'course_123',
    instructor_id: 'instructor_456',
    student_id: 'student_789'
  }
});
```

**API Endpoint**: `POST /v1/charges`
```bash
curl https://api.stripe.com/v1/charges \
  -u sk_test_YOUR_STRIPE_SECRET_KEY_HERE: \
  -H "Stripe-Account: acct_1032D82eZvKYlo2C" \
  -d amount=2000 \
  -d currency=usd \
  -d source=tok_visa \
  -d description="Course: Advanced React Development" \
  -d application_fee_amount=200
```

### 4. Payment Retrieval

```typescript
// Get payment details
const payment = await stripeConnectService.getPayment(
  'ch_3LmjFA2eZvKYlo2C09TLIsrw',
  'acct_1032D82eZvKYlo2C'
);
```

**API Endpoint**: `GET /v1/charges/{charge_id}`
```bash
curl https://api.stripe.com/v1/charges/ch_3LmjFA2eZvKYlo2C09TLIsrw \
  -u sk_test_YOUR_STRIPE_SECRET_KEY_HERE: \
  -H "Stripe-Account: acct_1032D82eZvKYlo2C" \
  -G
```

### 5. Payout Creation

```typescript
// Create payout to instructor bank account
const payout = await stripeConnectService.createPayout({
  amount: 1800, // $18.00 (after platform fee)
  currency: 'usd',
  connected_account: 'acct_1032D82eZvKYlo2C',
  destination: 'ba_1032D82eZvKYlo2C', // Bank account ID
  metadata: {
    instructor_id: 'instructor_456',
    payout_period: '2024-01'
  }
});
```

**API Endpoint**: `POST /v1/transfers`
```bash
curl https://api.stripe.com/v1/transfers \
  -u sk_test_YOUR_STRIPE_SECRET_KEY_HERE: \
  -H "Stripe-Account: acct_1032D82eZvKYlo2C" \
  -d amount=1800 \
  -d currency=usd \
  -d destination=ba_1032D82eZvKYlo2C
```

## Implementation

### Service Layer

```typescript
// src/services/stripeConnect.ts
export class StripeConnectService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.stripe.com/v1';
  }

  // Create connected account
  async createConnectedAccount(params: ConnectedAccountParams): Promise<ConnectedAccount> {
    const response = await fetch(`${this.baseUrl}/accounts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params)
    });
    return response.json();
  }

  // Create onboarding link
  async createOnboardingLink(accountId: string, returnUrl: string): Promise<AccountLink> {
    const response = await fetch(`${this.baseUrl}/account_links`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        account: accountId,
        refresh_url: returnUrl,
        return_url: returnUrl,
        type: 'account_onboarding'
      })
    });
    return response.json();
  }

  // Create direct charge
  async createDirectCharge(params: DirectChargeParams): Promise<Charge> {
    const response = await fetch(`${this.baseUrl}/charges`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Account': params.connected_account
      },
      body: new URLSearchParams(params)
    });
    return response.json();
  }

  // Get payment details
  async getPayment(chargeId: string, connectedAccount: string): Promise<Charge> {
    const response = await fetch(`${this.baseUrl}/charges/${chargeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Stripe-Account': connectedAccount
      }
    });
    return response.json();
  }

  // Create payout
  async createPayout(params: PayoutParams): Promise<Transfer> {
    const response = await fetch(`${this.baseUrl}/transfers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Account': params.connected_account
      },
      body: new URLSearchParams(params)
    });
    return response.json();
  }
}
```

### React Component

```typescript
// src/components/StripeConnectIntegration.tsx
import React, { useState, useEffect } from 'react';
import { StripeConnectService } from '../services/stripeConnect';

const StripeConnectIntegration: React.FC = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const stripeService = new StripeConnectService(process.env.REACT_APP_STRIPE_SECRET_KEY);

  // Component implementation...
};
```

## Security Considerations

### 1. API Key Management

- Store API keys in environment variables
- Use different keys for development and production
- Rotate keys regularly
- Never commit keys to version control

### 2. Webhook Security

```typescript
// Verify webhook signatures
const verifyWebhook = (payload: string, signature: string, secret: string) => {
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};
```

### 3. Error Handling

```typescript
// Comprehensive error handling
try {
  const result = await stripeService.createDirectCharge(params);
  return result;
} catch (error) {
  if (error.type === 'StripeCardError') {
    // Handle card errors
    console.error('Card error:', error.message);
  } else if (error.type === 'StripeInvalidRequestError') {
    // Handle invalid request errors
    console.error('Invalid request:', error.message);
  } else {
    // Handle other errors
    console.error('Unexpected error:', error.message);
  }
  throw error;
}
```

## Testing

### 1. Test Mode Setup

```typescript
// Use test keys for development
const STRIPE_TEST_KEY = 'sk_test_YOUR_STRIPE_SECRET_KEY_HERE';
const stripeService = new StripeConnectService(STRIPE_TEST_KEY);
```

### 2. Test Cards

- **Success**: `4242424242424242`
- **Decline**: `4000000000000002`
- **Insufficient Funds**: `4000000000009995`

### 3. Test Scenarios

```typescript
// Test connected account creation
const testAccount = await stripeService.createConnectedAccount({
  type: 'express',
  country: 'US',
  email: 'test@example.com',
  business_type: 'individual',
  capabilities: ['card_payments', 'transfers']
});

// Test direct charge
const testCharge = await stripeService.createDirectCharge({
  amount: 2000,
  currency: 'usd',
  source: 'tok_visa',
  connected_account: testAccount.id,
  application_fee_amount: 200
});
```

## Deployment

### 1. Environment Variables

```bash
# .env.production
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY
REACT_APP_STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY
REACT_APP_STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### 2. Production Checklist

- [ ] Use live Stripe keys
- [ ] Configure webhook endpoints
- [ ] Set up proper error monitoring
- [ ] Test all payment flows
- [ ] Verify compliance requirements
- [ ] Set up backup and recovery procedures

## Monitoring and Analytics

### 1. Payment Analytics

```typescript
// Track payment metrics
const paymentMetrics = {
  total_volume: 0,
  successful_payments: 0,
  failed_payments: 0,
  average_transaction_value: 0,
  platform_fees: 0
};

// Update metrics on each payment
const updateMetrics = (payment: Charge) => {
  paymentMetrics.total_volume += payment.amount;
  paymentMetrics.platform_fees += payment.application_fee_amount;
  if (payment.status === 'succeeded') {
    paymentMetrics.successful_payments++;
  } else {
    paymentMetrics.failed_payments++;
  }
};
```

### 2. Dashboard Integration

```typescript
// Real-time payment dashboard
const PaymentDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState(paymentMetrics);
  
  useEffect(() => {
    // Subscribe to real-time updates
    const interval = setInterval(async () => {
      const updatedMetrics = await fetchPaymentMetrics();
      setMetrics(updatedMetrics);
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="payment-dashboard">
      <h2>Payment Analytics</h2>
      <div className="metrics-grid">
        <MetricCard title="Total Volume" value={formatCurrency(metrics.total_volume)} />
        <MetricCard title="Successful Payments" value={metrics.successful_payments} />
        <MetricCard title="Platform Fees" value={formatCurrency(metrics.platform_fees)} />
      </div>
    </div>
  );
};
```

## Troubleshooting

### Common Issues

1. **Account Not Found**: Ensure the connected account ID is correct
2. **Permission Denied**: Verify API key has proper permissions
3. **Invalid Request**: Check parameter formats and required fields
4. **Webhook Failures**: Verify webhook endpoint and signature

### Debug Mode

```typescript
// Enable debug logging
const stripeService = new StripeConnectService(apiKey, {
  debug: true,
  logLevel: 'verbose'
});
```

## Support

For technical support and questions about Stripe Connect integration:

- **Documentation**: [Stripe Connect Documentation](https://stripe.com/docs/connect)
- **API Reference**: [Stripe API Reference](https://stripe.com/docs/api)
- **Support**: [Stripe Support](https://support.stripe.com)

---

**Note**: This integration follows Stripe's best practices and security guidelines. Always test thoroughly in Stripe's test mode before going live.
