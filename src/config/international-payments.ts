export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  countryCode: string;
}

export interface PaymentGateway {
  id: string;
  name: string;
  supportedCurrencies: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
  features: string[];
}

export interface PricingStrategy {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  countries: string[];
}

export const CURRENCIES: Record<string, Currency> = {
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rate: 1, countryCode: 'GB' },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.25, countryCode: 'US' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rate: 1.15, countryCode: 'EU' },
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 0.001, countryCode: 'NG' },
  KES: { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 0.008, countryCode: 'KE' },
  GHS: { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', rate: 0.1, countryCode: 'GH' },
  ZAR: { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 0.05, countryCode: 'ZA' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 0.015, countryCode: 'IN' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 0.85, countryCode: 'CA' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 0.75, countryCode: 'AU' },
};

export const PAYMENT_GATEWAYS: Record<string, PaymentGateway> = {
  stripe: {
    id: 'stripe',
    name: 'Stripe',
    supportedCurrencies: ['GBP', 'USD', 'EUR', 'CAD', 'AUD'],
    fees: { percentage: 2.9, fixed: 0.30 },
    features: ['3D Secure', 'Recurring Payments', 'Refunds']
  },
  paystack: {
    id: 'paystack',
    name: 'Paystack',
    supportedCurrencies: ['NGN', 'GHS', 'ZAR', 'USD'],
    fees: { percentage: 1.5, fixed: 100 },
    features: ['Local Payments', 'Mobile Money', 'Bank Transfers']
  },
  flutterwave: {
    id: 'flutterwave',
    name: 'Flutterwave',
    supportedCurrencies: ['NGN', 'GHS', 'KES', 'ZAR', 'USD'],
    fees: { percentage: 2.8, fixed: 0 },
    features: ['Card Payments', 'Mobile Money', 'Bank Transfers']
  }
};

export const PRICING_STRATEGIES: PricingStrategy[] = [
  {
    id: 'standard',
    name: 'Standard Pricing',
    description: 'Standard pricing for all regions',
    multiplier: 1,
    countries: ['*']
  },
  {
    id: 'emerging_markets',
    name: 'Emerging Markets Discount',
    description: 'Reduced pricing for emerging markets',
    multiplier: 0.7,
    countries: ['NG', 'KE', 'GH', 'ZA', 'IN']
  },
  {
    id: 'premium_markets',
    name: 'Premium Markets',
    description: 'Premium pricing for high-income markets',
    multiplier: 1.3,
    countries: ['US', 'CA', 'AU', 'GB']
  }
];

export const getLocalizedPrice = (basePrice: number, countryCode: string): number => {
  const strategy = PRICING_STRATEGIES.find(s => 
    s.countries.includes(countryCode) || s.countries.includes('*')
  );
  
  if (strategy) {
    return basePrice * strategy.multiplier;
  }
  
  return basePrice;
};

export const formatPrice = (price: number, currency: string): string => {
  const currencyInfo = CURRENCIES[currency];
  if (!currencyInfo) return `${price} ${currency}`;
  
  return `${currencyInfo.symbol}${price.toFixed(2)}`;
};

export const getGatewayForCurrency = (currency: string): string => {
  for (const [gatewayId, gateway] of Object.entries(PAYMENT_GATEWAYS)) {
    if (gateway.supportedCurrencies.includes(currency)) {
      return gatewayId;
    }
  }
  return 'stripe'; // Default fallback
};

export const getSupportedPaymentMethods = (currency: string): string[] => {
  const gateway = PAYMENT_GATEWAYS[getGatewayForCurrency(currency)];
  return gateway ? gateway.features : [];
};
