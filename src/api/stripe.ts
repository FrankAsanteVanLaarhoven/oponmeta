// Enhanced Stripe API endpoints for course purchases with full localisation support
// Including Sub-Saharan African mobile payments via Paystack and local systems
// In production, this would be a real server endpoint

export interface StripeCheckoutSessionData {
  courseId?: string;
  courseTitle?: string;
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
  courses?: Array<{
    courseId: string;
    courseTitle: string;
    amount: number;
    instructor: string;
  }>;
  totalAmount?: number;
  // Enhanced localisation options
  locale?: string;
  paymentMethodTypes?: string[];
  customerEmail?: string;
  billingAddressCollection?: 'auto' | 'required';
  allowPromotionCodes?: boolean;
  taxIdCollection?: boolean;
  phoneNumberCollection?: boolean;
  // African payment specific options
  africanPaymentMethod?: string;
  mobileNumber?: string;
  networkProvider?: string;
}

export interface StripeCheckoutSessionResponse {
  url: string;
  sessionId: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  supportedCountries: string[];
  supportedCurrencies: string[];
  isAfrican?: boolean;
  mobileProvider?: string;
}

// Comprehensive payment methods supported by Stripe and African systems
export const SUPPORTED_PAYMENT_METHODS: PaymentMethod[] = [
  // Credit/Debit Cards
  {
    id: 'card',
    type: 'card',
    name: 'Credit & Debit Cards',
    description: 'Visa, Mastercard, American Express, Discover',
    icon: '💳',
    supportedCountries: ['*'],
    supportedCurrencies: ['*']
  },
  
  // Digital Wallets
  {
    id: 'apple_pay',
    type: 'apple_pay',
    name: 'Apple Pay',
    description: 'Quick and secure payment with Apple Pay',
    icon: '🍎',
    supportedCountries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'SG'],
    supportedCurrencies: ['USD', 'CAD', 'GBP', 'AUD', 'EUR', 'JPY', 'SGD']
  },
  {
    id: 'google_pay',
    type: 'google_pay',
    name: 'Google Pay',
    description: 'Fast payment with Google Pay',
    icon: '🤖',
    supportedCountries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'SG', 'IN'],
    supportedCurrencies: ['USD', 'CAD', 'GBP', 'AUD', 'EUR', 'JPY', 'SGD', 'INR']
  },
  
  // Buy Now, Pay Later
  {
    id: 'klarna',
    type: 'klarna',
    name: 'Klarna',
    description: 'Pay in 4 installments or later',
    icon: '🎯',
    supportedCountries: ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'AT', 'BE', 'NL', 'NO', 'SE', 'FI', 'DK'],
    supportedCurrencies: ['USD', 'CAD', 'GBP', 'EUR', 'NOK', 'SEK', 'DKK']
  },
  {
    id: 'afterpay_clearpay',
    type: 'afterpay_clearpay',
    name: 'Afterpay/Clearpay',
    description: 'Pay in 4 interest-free installments',
    icon: '📅',
    supportedCountries: ['US', 'CA', 'GB', 'AU', 'NZ'],
    supportedCurrencies: ['USD', 'CAD', 'GBP', 'AUD', 'NZD']
  },
  
  // Bank Transfers
  {
    id: 'us_bank_account',
    type: 'us_bank_account',
    name: 'US Bank Account',
    description: 'Direct bank transfer (ACH)',
    icon: '🏦',
    supportedCountries: ['US'],
    supportedCurrencies: ['USD']
  },
  {
    id: 'sepa_debit',
    type: 'sepa_debit',
    name: 'SEPA Direct Debit',
    description: 'European bank transfer',
    icon: '🇪🇺',
    supportedCountries: ['DE', 'FR', 'IT', 'ES', 'AT', 'BE', 'NL', 'PT', 'IE', 'FI', 'LU'],
    supportedCurrencies: ['EUR']
  },
  
  // Local Payment Methods
  {
    id: 'ideal',
    type: 'ideal',
    name: 'iDEAL',
    description: 'Dutch bank transfer',
    icon: '🇳🇱',
    supportedCountries: ['NL'],
    supportedCurrencies: ['EUR']
  },
  {
    id: 'bancontact',
    type: 'bancontact',
    name: 'Bancontact',
    description: 'Belgian bank transfer',
    icon: '🇧🇪',
    supportedCountries: ['BE'],
    supportedCurrencies: ['EUR']
  },
  {
    id: 'giropay',
    type: 'giropay',
    name: 'GiroPay',
    description: 'German bank transfer',
    icon: '🇩🇪',
    supportedCountries: ['DE'],
    supportedCurrencies: ['EUR']
  },
  {
    id: 'sofort',
    type: 'sofort',
    name: 'Sofort',
    description: 'German bank transfer',
    icon: '🇩🇪',
    supportedCountries: ['DE', 'AT'],
    supportedCurrencies: ['EUR']
  },
  {
    id: 'eps',
    type: 'eps',
    name: 'EPS',
    description: 'Austrian bank transfer',
    icon: '🇦🇹',
    supportedCountries: ['AT'],
    supportedCurrencies: ['EUR']
  },
  {
    id: 'przelewy24',
    type: 'przelewy24',
    name: 'Przelewy24',
    description: 'Polish bank transfer',
    icon: '🇵🇱',
    supportedCountries: ['PL'],
    supportedCurrencies: ['PLN']
  },
  
  // Asian Payment Methods
  {
    id: 'wechat_pay',
    type: 'wechat_pay',
    name: 'WeChat Pay',
    description: 'Chinese mobile payment',
    icon: '💬',
    supportedCountries: ['CN', 'HK', 'SG'],
    supportedCurrencies: ['CNY', 'HKD', 'SGD']
  },
  {
    id: 'alipay',
    type: 'alipay',
    name: 'Alipay',
    description: 'Chinese mobile payment',
    icon: '📱',
    supportedCountries: ['CN', 'HK', 'SG'],
    supportedCurrencies: ['CNY', 'HKD', 'SGD']
  },
  {
    id: 'grabpay',
    type: 'grabpay',
    name: 'GrabPay',
    description: 'Southeast Asian payment',
    icon: '🚗',
    supportedCountries: ['SG', 'MY', 'TH', 'VN', 'PH', 'ID'],
    supportedCurrencies: ['SGD', 'MYR', 'THB', 'VND', 'PHP', 'IDR']
  },

  // ===== SUB-SAHARAN AFRICAN PAYMENT METHODS =====
  
  // Nigerian Mobile Money & Banking
  {
    id: 'paystack_nigeria',
    type: 'paystack_nigeria',
    name: 'Paystack Nigeria',
    description: 'Nigerian payment gateway with mobile money',
    icon: '🇳🇬',
    supportedCountries: ['NG'],
    supportedCurrencies: ['NGN'],
    isAfrican: true
  },
  {
    id: 'mtn_momo_ng',
    type: 'mtn_momo_ng',
    name: 'MTN Mobile Money (Nigeria)',
    description: 'MTN mobile money wallet',
    icon: '📱',
    supportedCountries: ['NG'],
    supportedCurrencies: ['NGN'],
    isAfrican: true,
    mobileProvider: 'MTN'
  },
  {
    id: 'glo_money_ng',
    type: 'glo_money_ng',
    name: 'Glo Money (Nigeria)',
    description: 'Glo mobile money service',
    icon: '📱',
    supportedCountries: ['NG'],
    supportedCurrencies: ['NGN'],
    isAfrican: true,
    mobileProvider: 'Glo'
  },
  {
    id: 'airtel_money_ng',
    type: 'airtel_money_ng',
    name: 'Airtel Money (Nigeria)',
    description: 'Airtel mobile money wallet',
    icon: '📱',
    supportedCountries: ['NG'],
    supportedCurrencies: ['NGN'],
    isAfrican: true,
    mobileProvider: 'Airtel'
  },
  {
    id: '9mobile_money_ng',
    type: '9mobile_money_ng',
    name: '9mobile Money (Nigeria)',
    description: '9mobile money service',
    icon: '📱',
    supportedCountries: ['NG'],
    supportedCurrencies: ['NGN'],
    isAfrican: true,
    mobileProvider: '9mobile'
  },

  // Ghana Mobile Money
  {
    id: 'mtn_momo_gh',
    type: 'mtn_momo_gh',
    name: 'MTN Mobile Money (Ghana)',
    description: 'MTN mobile money in Ghana',
    icon: '🇬🇭',
    supportedCountries: ['GH'],
    supportedCurrencies: ['GHS'],
    isAfrican: true,
    mobileProvider: 'MTN'
  },
  {
    id: 'vodafone_cash_gh',
    type: 'vodafone_cash_gh',
    name: 'Vodafone Cash (Ghana)',
    description: 'Vodafone mobile money service',
    icon: '🇬🇭',
    supportedCountries: ['GH'],
    supportedCurrencies: ['GHS'],
    isAfrican: true,
    mobileProvider: 'Vodafone'
  },
  {
    id: 'airtel_money_gh',
    type: 'airtel_money_gh',
    name: 'Airtel Money (Ghana)',
    description: 'Airtel mobile money in Ghana',
    icon: '🇬🇭',
    supportedCountries: ['GH'],
    supportedCurrencies: ['GHS'],
    isAfrican: true,
    mobileProvider: 'Airtel'
  },

  // Kenya Mobile Money
  {
    id: 'mpesa_ke',
    type: 'mpesa_ke',
    name: 'M-Pesa (Kenya)',
    description: 'Safaricom mobile money service',
    icon: '🇰🇪',
    supportedCountries: ['KE'],
    supportedCurrencies: ['KES'],
    isAfrican: true,
    mobileProvider: 'Safaricom'
  },
  {
    id: 'airtel_money_ke',
    type: 'airtel_money_ke',
    name: 'Airtel Money (Kenya)',
    description: 'Airtel mobile money in Kenya',
    icon: '🇰🇪',
    supportedCountries: ['KE'],
    supportedCurrencies: ['KES'],
    isAfrican: true,
    mobileProvider: 'Airtel'
  },

  // Tanzania Mobile Money
  {
    id: 'mpesa_tz',
    type: 'mpesa_tz',
    name: 'M-Pesa (Tanzania)',
    description: 'Vodacom mobile money service',
    icon: '🇹🇿',
    supportedCountries: ['TZ'],
    supportedCurrencies: ['TZS'],
    isAfrican: true,
    mobileProvider: 'Vodacom'
  },
  {
    id: 'airtel_money_tz',
    type: 'airtel_money_tz',
    name: 'Airtel Money (Tanzania)',
    description: 'Airtel mobile money in Tanzania',
    icon: '🇹🇿',
    supportedCountries: ['TZ'],
    supportedCurrencies: ['TZS'],
    isAfrican: true,
    mobileProvider: 'Airtel'
  },

  // Uganda Mobile Money
  {
    id: 'mtn_momo_ug',
    type: 'mtn_momo_ug',
    name: 'MTN Mobile Money (Uganda)',
    description: 'MTN mobile money in Uganda',
    icon: '🇺🇬',
    supportedCountries: ['UG'],
    supportedCurrencies: ['UGX'],
    isAfrican: true,
    mobileProvider: 'MTN'
  },
  {
    id: 'airtel_money_ug',
    type: 'airtel_money_ug',
    name: 'Airtel Money (Uganda)',
    description: 'Airtel mobile money in Uganda',
    icon: '🇺🇬',
    supportedCountries: ['UG'],
    supportedCurrencies: ['UGX'],
    isAfrican: true,
    mobileProvider: 'Airtel'
  },

  // Rwanda Mobile Money
  {
    id: 'mtn_momo_rw',
    type: 'mtn_momo_rw',
    name: 'MTN Mobile Money (Rwanda)',
    description: 'MTN mobile money in Rwanda',
    icon: '🇷🇼',
    supportedCountries: ['RW'],
    supportedCurrencies: ['RWF'],
    isAfrican: true,
    mobileProvider: 'MTN'
  },
  {
    id: 'airtel_money_rw',
    type: 'airtel_money_rw',
    name: 'Airtel Money (Rwanda)',
    description: 'Airtel mobile money in Rwanda',
    icon: '🇷🇼',
    supportedCountries: ['RW'],
    supportedCurrencies: ['RWF'],
    isAfrican: true,
    mobileProvider: 'Airtel'
  },

  // South Africa Mobile Money
  {
    id: 'vodacom_momo_za',
    type: 'vodacom_momo_za',
    name: 'Vodacom Mobile Money (SA)',
    description: 'Vodacom mobile money in South Africa',
    icon: '🇿🇦',
    supportedCountries: ['ZA'],
    supportedCurrencies: ['ZAR'],
    isAfrican: true,
    mobileProvider: 'Vodacom'
  },
  {
    id: 'mtn_momo_za',
    type: 'mtn_momo_za',
    name: 'MTN Mobile Money (SA)',
    description: 'MTN mobile money in South Africa',
    icon: '🇿🇦',
    supportedCountries: ['ZA'],
    supportedCurrencies: ['ZAR'],
    isAfrican: true,
    mobileProvider: 'MTN'
  },

  // Senegal Mobile Money
  {
    id: 'orange_money_sn',
    type: 'orange_money_sn',
    name: 'Orange Money (Senegal)',
    description: 'Orange mobile money in Senegal',
    icon: '🇸🇳',
    supportedCountries: ['SN'],
    supportedCurrencies: ['XOF'],
    isAfrican: true,
    mobileProvider: 'Orange'
  },

  // Ivory Coast Mobile Money
  {
    id: 'orange_money_ci',
    type: 'orange_money_ci',
    name: 'Orange Money (Ivory Coast)',
    description: 'Orange mobile money in Ivory Coast',
    icon: '🇨🇮',
    supportedCountries: ['CI'],
    supportedCurrencies: ['XOF'],
    isAfrican: true,
    mobileProvider: 'Orange'
  },

  // Cameroon Mobile Money
  {
    id: 'mtn_momo_cm',
    type: 'mtn_momo_cm',
    name: 'MTN Mobile Money (Cameroon)',
    description: 'MTN mobile money in Cameroon',
    icon: '🇨🇲',
    supportedCountries: ['CM'],
    supportedCurrencies: ['XAF'],
    isAfrican: true,
    mobileProvider: 'MTN'
  },

  // Ethiopia Mobile Money
  {
    id: 'telebirr_et',
    type: 'telebirr_et',
    name: 'Telebirr (Ethiopia)',
    description: 'Ethio Telecom mobile money',
    icon: '🇪🇹',
    supportedCountries: ['ET'],
    supportedCurrencies: ['ETB'],
    isAfrican: true,
    mobileProvider: 'Ethio Telecom'
  }
];

// Supported currencies with symbols and formatting (including African currencies)
export const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
  HKD: { symbol: 'HK$', name: 'Hong Kong Dollar', locale: 'zh-HK' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
  INR: { symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  BRL: { symbol: 'R$', name: 'Brazilian Real', locale: 'pt-BR' },
  MXN: { symbol: '$', name: 'Mexican Peso', locale: 'es-MX' },
  PLN: { symbol: 'zł', name: 'Polish Złoty', locale: 'pl-PL' },
  SEK: { symbol: 'kr', name: 'Swedish Krona', locale: 'sv-SE' },
  NOK: { symbol: 'kr', name: 'Norwegian Krone', locale: 'no-NO' },
  DKK: { symbol: 'kr', name: 'Danish Krone', locale: 'da-DK' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', locale: 'de-CH' },
  
  // African Currencies
  NGN: { symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
  GHS: { symbol: 'GH₵', name: 'Ghanaian Cedi', locale: 'en-GH' },
  KES: { symbol: 'KSh', name: 'Kenyan Shilling', locale: 'en-KE' },
  TZS: { symbol: 'TSh', name: 'Tanzanian Shilling', locale: 'en-TZ' },
  UGX: { symbol: 'USh', name: 'Ugandan Shilling', locale: 'en-UG' },
  RWF: { symbol: 'FRw', name: 'Rwandan Franc', locale: 'en-RW' },
  ZAR: { symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
  XOF: { symbol: 'CFA', name: 'West African CFA Franc', locale: 'fr-SN' },
  XAF: { symbol: 'FCFA', name: 'Central African CFA Franc', locale: 'fr-CM' },
  ETB: { symbol: 'Br', name: 'Ethiopian Birr', locale: 'en-ET' }
};

// Enhanced mock implementation for development
export const createStripeCheckoutSession = async (data: StripeCheckoutSessionData): Promise<StripeCheckoutSessionResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock checkout session response
  const sessionId = 'cs_mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  // In production, this would create a real Stripe checkout session with:
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: data.paymentMethodTypes || ['card', 'apple_pay', 'google_pay'],
  //   line_items: data.courses ? 
  //     data.courses.map(course => ({
  //       price_data: {
  //         currency: data.currency,
  //         product_data: {
  //           name: course.courseTitle,
  //           description: `Course by ${course.instructor}`,
  //         },
  //         unit_amount: Math.round(course.amount * 100), // Convert to cents
  //       },
  //       quantity: 1,
  //     })) : 
  //     [{
  //       price_data: {
  //         currency: data.currency,
  //         product_data: {
  //           name: data.courseTitle || 'Course Purchase',
  //         },
  //         unit_amount: Math.round(data.amount), // Already in cents
  //       },
  //       quantity: 1,
  //     }],
  //   mode: 'payment',
  //   success_url: data.successUrl,
  //   cancel_url: data.cancelUrl,
  //   metadata: data.metadata,
  //   locale: data.locale || 'auto',
  //   customer_email: data.customerEmail,
  //   billing_address_collection: data.billingAddressCollection || 'auto',
  //   allow_promotion_codes: data.allowPromotionCodes || true,
  //   tax_id_collection: data.taxIdCollection || false,
  //   phone_number_collection: data.phoneNumberCollection || false,
  // });
  
  return {
    url: `https://checkout.stripe.com/mock-session-${sessionId}`,
    sessionId
  };
};

// African mobile payment integration via Paystack
export const createPaystackCheckoutSession = async (data: {
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  customerEmail: string;
  mobileNumber?: string;
  networkProvider?: string;
  paymentMethod: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ url: string; reference: string }> => {
  // Simulate Paystack API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const reference = 'PS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  // In production, this would call Paystack's API:
  // const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);
  // const transaction = await paystack.transaction.initialize({
  //   amount: data.amount * 100, // Convert to kobo/cents
  //   email: data.customerEmail,
  //   reference: reference,
  //   callback_url: data.successUrl,
  //   channels: [data.paymentMethod],
  //   metadata: {
  //     courseId: data.courseId,
  //     courseTitle: data.courseTitle,
  //     mobileNumber: data.mobileNumber,
  //     networkProvider: data.networkProvider
  //   }
  // });
  
  return {
    url: `https://checkout.paystack.com/${reference}`,
    reference
  };
};

// Get available payment methods for a specific country and currency
export const getAvailablePaymentMethods = (country: string, currency: string): PaymentMethod[] => {
  return SUPPORTED_PAYMENT_METHODS.filter(method => {
    const countrySupported = method.supportedCountries.includes('*') || method.supportedCountries.includes(country);
    const currencySupported = method.supportedCurrencies.includes('*') || method.supportedCurrencies.includes(currency);
    return countrySupported && currencySupported;
  });
};

// Get African mobile payment methods for a specific country
export const getAfricanMobilePaymentMethods = (country: string): PaymentMethod[] => {
  return SUPPORTED_PAYMENT_METHODS.filter(method => 
    method.isAfrican && method.supportedCountries.includes(country)
  );
};

// Get currency information
export const getCurrencyInfo = (currency: string) => {
  return SUPPORTED_CURRENCIES[currency as keyof typeof SUPPORTED_CURRENCIES] || SUPPORTED_CURRENCIES.USD;
};

// Format currency amount
export const formatCurrency = (amount: number, currency: string): string => {
  const currencyInfo = getCurrencyInfo(currency);
  const locale = currencyInfo.locale;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Mock webhook handler for development
export const handleStripeWebhook = async (event: any, signature: string): Promise<void> => {
  // Simulate webhook processing
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would verify the webhook signature and process the event
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  
  console.log('Webhook event processed:', event.type);
  
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment
      console.log('Payment completed:', event.data.object);
      break;
    case 'payment_intent.succeeded':
      // Handle successful payment intent
      console.log('Payment intent succeeded:', event.data.object);
      break;
    case 'invoice.payment_succeeded':
      // Handle subscription payment
      console.log('Subscription payment succeeded:', event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};

// Mock Paystack webhook handler
export const handlePaystackWebhook = async (event: any, signature: string): Promise<void> => {
  // Simulate webhook processing
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would verify the webhook signature and process the event
  // const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);
  // const isValid = paystack.webhook.verify(event, signature, process.env.PAYSTACK_WEBHOOK_SECRET!);
  
  console.log('Paystack webhook event processed:', event.event);
  
  switch (event.event) {
    case 'charge.success':
      // Handle successful payment
      console.log('Payment completed:', event.data);
      break;
    case 'transfer.success':
      // Handle successful transfer
      console.log('Transfer completed:', event.data);
      break;
    default:
      console.log(`Unhandled Paystack event: ${event.event}`);
  }
};
