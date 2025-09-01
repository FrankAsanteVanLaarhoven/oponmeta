export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here',
  SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY || 'sk_test_your_stripe_secret_key_here',
};

export const PAYSTACK_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_paystack_public_key_here',
  SECRET_KEY: import.meta.env.VITE_PAYSTACK_SECRET_KEY || 'sk_test_your_paystack_secret_key_here',
};

export const FLUTTERWAVE_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST_your_flutterwave_public_key_here',
  SECRET_KEY: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY || 'FLWSECK_TEST_your_flutterwave_secret_key_here',
};

export const GOOGLE_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id_here',
  CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || 'your_google_client_secret_here',
};

export const FACEBOOK_CONFIG = {
  APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID || 'your_facebook_app_id_here',
  APP_SECRET: import.meta.env.VITE_FACEBOOK_APP_SECRET || 'your_facebook_app_secret_here',
};

export const SENTRY_CONFIG = {
  DSN: import.meta.env.VITE_SENTRY_DSN || 'your_sentry_dsn_here',
  ENVIRONMENT: import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development',
};

export const SUPABASE_CONFIG = {
  URL: import.meta.env.VITE_SUPABASE_URL || 'your_supabase_url_here',
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here',
  SERVICE_ROLE_KEY: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'your_supabase_service_role_key_here',
};
