# Stripe Integration for Course Library

This document explains how the Stripe payment integration works in the course library.

## Overview

The course library now includes Stripe checkout integration for purchasing paid courses. Users can:
- Purchase individual courses
- Purchase multiple courses from their cart
- Get redirected to Stripe's secure checkout page
- Return to the course library after successful payment

## Features

### Individual Course Purchase
- Click "Buy Now" on any paid course
- Review course details and pricing
- Click "Pay with Card" to proceed to Stripe checkout
- Redirected to Stripe's hosted checkout page
- Return to course library after successful payment

### Cart Checkout
- Add multiple courses to cart
- Click "Checkout" in cart modal
- Free courses are enrolled immediately
- Paid courses are processed through Stripe
- Redirected to Stripe checkout for payment

### Success/Cancel Handling
- Success URLs include course IDs for tracking
- Cancel URLs return users to course library
- Toast notifications confirm successful purchases
- URL parameters are cleaned up after processing

## Implementation Details

### Frontend (CourseLibrary.tsx)
- Uses `createStripeCheckoutSession` from `src/api/stripe.ts`
- Handles both single course and cart purchases
- Manages success/cancel URL parameters
- Provides fallback mock checkout for development

### API Layer (src/api/stripe.ts)
- Mock implementation for development
- Production-ready interface for real Stripe integration
- Handles checkout session creation
- Supports both single and multiple course purchases

### Environment Variables
```bash
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Production Setup

To enable real Stripe checkout:

1. **Update Environment Variables**
   - Set real Stripe keys in your environment
   - Configure webhook endpoints

2. **Backend API Implementation**
   - Replace mock API calls with real server endpoints
   - Implement `/api/stripe/create-checkout-session` endpoint
   - Handle Stripe webhooks for payment confirmation

3. **Webhook Handling**
   - Process `checkout.session.completed` events
   - Update user course access after successful payment
   - Handle failed payments and refunds

## Mock Mode

In development mode, the system provides mock checkout URLs:
- Format: `https://checkout.stripe.com/mock-session-{timestamp}`
- Allows testing the UI flow without real payments
- Toast notifications indicate mock mode usage

## Security Considerations

- Never expose Stripe secret keys in frontend code
- Always verify webhook signatures
- Use HTTPS for all production endpoints
- Implement proper user authentication before checkout
- Validate course access after payment confirmation

## Testing

1. **Development Mode**
   - Use mock checkout URLs
   - Test UI flow and error handling
   - Verify success/cancel URL handling

2. **Production Testing**
   - Use Stripe test keys
   - Test with test card numbers
   - Verify webhook processing

## Troubleshooting

### Common Issues
- **Checkout session creation fails**: Check API endpoint and Stripe keys
- **Webhook not processing**: Verify webhook secret and endpoint URL
- **Payment not completing**: Check Stripe dashboard for errors

### Debug Steps
1. Check browser console for errors
2. Verify Stripe keys are correct
3. Test API endpoints independently
4. Check Stripe dashboard for failed payments

## Future Enhancements

- Subscription-based course access
- Coupon and discount support
- Multiple payment methods
- International currency support
- Refund and cancellation handling
