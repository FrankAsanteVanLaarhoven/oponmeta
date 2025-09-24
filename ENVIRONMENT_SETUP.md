# Environment Setup Guide

This guide will help you set up the required environment variables for the OPONM Learning Platform.

## Required Environment Variables

### Supabase Configuration
```bash
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### Payment Providers (Optional)
```bash
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Paystack
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
VITE_PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key_here

# Flutterwave
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST_your_flutterwave_public_key_here
VITE_FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_your_flutterwave_secret_key_here
```

### OAuth Providers (Optional)
```bash
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Facebook OAuth
VITE_FACEBOOK_APP_ID=your_facebook_app_id_here
VITE_FACEBOOK_APP_SECRET=your_facebook_app_secret_here
```

### Monitoring (Optional)
```bash
# Sentry
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_SENTRY_ENVIRONMENT=development
```

## Setup Instructions

### 1. Create Environment File
Create a `.env.local` file in the root directory of your project:

```bash
touch .env.local
```

### 2. Add Environment Variables
Copy the required environment variables to your `.env.local` file and replace the placeholder values with your actual credentials.

### 3. Supabase Setup
1. Go to [Supabase](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the Project URL and anon/public key
4. Add them to your `.env.local` file

### 4. Payment Setup (Optional)
If you want to enable payments, set up accounts with:
- [Stripe](https://stripe.com) for international payments
- [Paystack](https://paystack.com) for African payments
- [Flutterwave](https://flutterwave.com) for African payments

### 5. OAuth Setup (Optional)
If you want to enable social login:
- [Google OAuth](https://console.developers.google.com)
- [Facebook OAuth](https://developers.facebook.com)

## Development Mode
If you don't have Supabase credentials yet, the application will run in development mode with mock data. You'll see a warning in the console, but the app will still function for development purposes.

## Security Notes
- Never commit your `.env.local` file to version control
- Use test/development keys for local development
- Use production keys only in production environment
- Keep your service role keys secure and never expose them in client-side code

## Troubleshooting
- If you see "Missing Supabase environment variables" error, make sure your `.env.local` file exists and contains the required variables
- Restart your development server after adding environment variables
- Check that your environment variable names start with `VITE_` for Vite to recognize them
