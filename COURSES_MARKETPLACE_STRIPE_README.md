# Courses Marketplace Stripe Integration

This document explains how the Stripe payment integration works in the courses marketplace at `/courses`.

## Overview

The courses marketplace now includes comprehensive Stripe checkout integration for purchasing courses. Users can:
- Browse available courses with pricing information
- Purchase individual courses directly
- Add courses to a shopping cart for bulk purchase
- Enroll in free courses immediately
- Complete secure payments through Stripe's hosted checkout

## Features

### Course Display
- **Grid and List Views**: Toggle between different viewing modes
- **Pricing Information**: Clear display of course prices (including free courses)
- **Course Details**: Instructor, duration, level, rating, and student count
- **Category Filtering**: Filter courses by category and difficulty level

### Purchase Options
- **Individual Purchase**: Click "Buy Now" on any paid course
- **Cart System**: Add multiple courses to cart for bulk purchase
- **Free Enrollment**: Instant enrollment for free courses
- **Stripe Checkout**: Secure payment processing for paid courses

### Cart Management
- **Add to Cart**: Yellow "Add to Cart" button for paid courses
- **Cart Indicator**: Shows number of items in cart
- **Cart Modal**: Review cart contents and proceed to checkout
- **Remove Items**: Remove courses from cart before checkout

## Implementation Details

### Frontend (Programme.tsx)
- Uses `createStripeCheckoutSession` from `src/api/stripe.ts`
- Handles both single course and cart purchases
- Manages success/cancel URL parameters
- Provides fallback mock checkout for development

### Purchase Flow
1. **Individual Purchase**:
   - User clicks "Buy Now" → Purchase modal → "Pay with Card" → Stripe checkout
   
2. **Cart Checkout**:
   - User adds courses to cart → Cart modal → "Checkout" → Stripe checkout
   - Free courses are enrolled immediately
   - Paid courses are processed through Stripe

3. **Return Handling**:
   - After payment, user returns to courses page
   - Success confirmation with toast notifications
   - URL parameters are cleaned up

### Course Types
- **Paid Courses**: Redirect to Stripe checkout
- **Free Courses**: Immediate enrollment with success message
- **Mixed Cart**: Free courses enrolled immediately, paid courses to Stripe

## User Experience

### Course Cards
- **Grid View**: Compact cards with purchase buttons below course info
- **List View**: Detailed layout with purchase actions on the right
- **Responsive Design**: Works on all device sizes

### Purchase Modals
- **Course Details**: Image, title, instructor, and pricing breakdown
- **Processing Fees**: Clear display of any additional charges
- **Action Buttons**: Prominent checkout and cancel options

### Cart Experience
- **Visual Feedback**: Cart count indicator with red badge
- **Easy Management**: Add/remove courses with clear visual states
- **Bulk Checkout**: Process multiple courses in single transaction

## Technical Implementation

### State Management
```typescript
const [cart, setCart] = useState<any[]>([]);
const [showCartModal, setShowCartModal] = useState(false);
const [showPurchaseModal, setShowPurchaseModal] = useState(false);
const [selectedCourse, setSelectedCourse] = useState<any>(null);
```

### Key Functions
- `addToCart(course)`: Add course to shopping cart
- `removeFromCart(courseId)`: Remove course from cart
- `handlePurchaseCourse(course)`: Open purchase modal
- `handlePurchaseFromCart()`: Process cart checkout
- `handleCompletePurchase()`: Complete individual purchase

### Stripe Integration
- **Checkout Sessions**: Creates Stripe checkout for paid courses
- **Success URLs**: Returns users to courses page with success parameters
- **Metadata**: Includes course information for tracking
- **Error Handling**: Fallback to mock checkout in development

## Development vs Production

### Development Mode
- Mock Stripe checkout URLs
- Toast notifications indicate mock mode
- Full UI flow testing without real payments

### Production Mode
- Real Stripe checkout integration
- Secure payment processing
- Webhook handling for payment confirmation

## Environment Setup

### Required Variables
```bash
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### API Endpoints
- `/api/stripe/create-checkout-session`: Create Stripe checkout sessions
- Webhook endpoint for payment confirmation

## Security Considerations

- **Frontend Security**: No sensitive data in client-side code
- **API Security**: Secure backend endpoints for Stripe integration
- **Webhook Verification**: Verify Stripe webhook signatures
- **User Authentication**: Ensure proper user verification before checkout

## Testing

### Development Testing
1. Test UI flow with mock checkout
2. Verify cart functionality
3. Test free course enrollment
4. Check success/cancel URL handling

### Production Testing
1. Use Stripe test keys
2. Test with test card numbers
3. Verify webhook processing
4. Test payment success/failure scenarios

## Future Enhancements

- **Subscription Plans**: Monthly/yearly course access
- **Coupon System**: Discount codes and promotions
- **Payment Methods**: Multiple payment options
- **International Support**: Multi-currency and localization
- **Course Bundles**: Pre-packaged course collections
- **Loyalty Program**: Rewards for frequent purchases

## Troubleshooting

### Common Issues
- **Checkout not loading**: Check Stripe keys and API endpoints
- **Cart not updating**: Verify state management and event handlers
- **Payment failures**: Check Stripe dashboard for error details

### Debug Steps
1. Check browser console for errors
2. Verify Stripe configuration
3. Test API endpoints independently
4. Review Stripe dashboard logs

## Integration with Existing System

The courses marketplace integrates seamlessly with:
- **Course Library**: Shared Stripe API layer
- **User Management**: Course access after purchase
- **Progress Tracking**: Learning progress for enrolled courses
- **Analytics**: Purchase and enrollment metrics

This integration provides a complete e-learning marketplace experience with secure payment processing and seamless user experience.
