import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  X, 
  Globe, 
  Smartphone,
  ChevronDown,
  CheckCircle,
  Info,
  Shield,
  Lock,
  Phone,
  Wifi,
  Banknote
} from 'lucide-react';
import { 
  createPaystackCheckoutSession,
  getAfricanMobilePaymentMethods,
  getCurrencyInfo, 
  formatCurrency,
  SUPPORTED_CURRENCIES,
  type PaymentMethod
} from '../api/stripe';

interface AfricanPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  onSuccess: (courseId: string) => void;
  selectedCountry: string;
  selectedCurrency: string;
}

const AfricanPaymentModal: React.FC<AfricanPaymentModalProps> = ({
  isOpen,
  onClose,
  course,
  onSuccess,
  selectedCountry,
  selectedCurrency
}) => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [networkProvider, setNetworkProvider] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get available African mobile payment methods for selected country
  const availableAfricanMethods = getAfricanMobilePaymentMethods(selectedCountry);
  const currencyInfo = getCurrencyInfo(selectedCurrency);

  // Calculate price in selected currency (mock conversion rates)
  const getConvertedPrice = (basePrice: number, baseCurrency: string, targetCurrency: string) => {
    const conversionRates: Record<string, Record<string, number>> = {
      USD: { NGN: 1200, GHS: 12, KES: 150, TZS: 2500, UGX: 3800, RWF: 1200, ZAR: 18, XOF: 600, XAF: 600, ETB: 55 },
      NGN: { USD: 0.00083, GHS: 0.01, KES: 0.125, TZS: 2.08, UGX: 3.17, RWF: 1, ZAR: 0.015, XOF: 0.5, XAF: 0.5, ETB: 0.046 },
      GHS: { USD: 0.083, NGN: 100, KES: 12.5, TZS: 208, UGX: 317, RWF: 100, ZAR: 1.5, XOF: 50, XAF: 50, ETB: 4.6 },
      KES: { USD: 0.0067, NGN: 8, GHS: 0.08, TZS: 16.7, UGX: 25.3, RWF: 8, ZAR: 0.12, XOF: 4, XAF: 4, ETB: 0.37 },
      TZS: { USD: 0.0004, NGN: 0.48, GHS: 0.0048, KES: 0.06, UGX: 1.52, RWF: 0.48, ZAR: 0.0072, XOF: 0.24, XAF: 0.24, ETB: 0.022 },
      UGX: { USD: 0.00026, NGN: 0.32, GHS: 0.0032, KES: 0.04, TZS: 0.66, RWF: 0.32, ZAR: 0.0047, XOF: 0.16, XAF: 0.16, ETB: 0.014 },
      RWF: { USD: 0.00083, NGN: 1, GHS: 0.01, KES: 0.125, TZS: 2.08, UGX: 3.17, ZAR: 0.015, XOF: 0.5, XAF: 0.5, ETB: 0.046 },
      ZAR: { USD: 0.056, NGN: 67, GHS: 0.67, KES: 8.33, TZS: 139, UGX: 211, RWF: 67, XOF: 33.3, XAF: 33.3, ETB: 3.06 },
      XOF: { USD: 0.0017, NGN: 2, GHS: 0.02, KES: 0.25, TZS: 4.17, UGX: 6.33, RWF: 2, ZAR: 0.03, XAF: 1, ETB: 0.092 },
      XAF: { USD: 0.0017, NGN: 2, GHS: 0.02, KES: 0.25, TZS: 4.17, UGX: 6.33, RWF: 2, XOF: 1, ZAR: 0.03, ETB: 0.092 },
      ETB: { USD: 0.018, NGN: 22, GHS: 0.22, KES: 2.73, TZS: 45.5, UGX: 69, RWF: 22, XOF: 11, XAF: 11, ZAR: 0.33 }
    };

    if (baseCurrency === targetCurrency) return basePrice;
    return conversionRates[baseCurrency]?.[targetCurrency] ? 
      Math.round(basePrice * conversionRates[baseCurrency][targetCurrency] * 100) / 100 : 
      basePrice;
  };

  const convertedPrice = getConvertedPrice(course.price, 'USD', selectedCurrency);
  const processingFee = convertedPrice * 0.015; // 1.5% processing fee for African payments
  const totalAmount = convertedPrice + processingFee;

  // Get network providers for selected country
  const getNetworkProviders = (country: string) => {
    const providers: Record<string, string[]> = {
      NG: ['MTN', 'Glo', 'Airtel', '9mobile'],
      GH: ['MTN', 'Vodafone', 'Airtel'],
      KE: ['Safaricom', 'Airtel'],
      TZ: ['Vodacom', 'Airtel'],
      UG: ['MTN', 'Airtel'],
      RW: ['MTN', 'Airtel'],
      ZA: ['Vodacom', 'MTN'],
      SN: ['Orange'],
      CI: ['Orange'],
      CM: ['MTN'],
      ET: ['Ethio Telecom']
    };
    return providers[country] || [];
  };

  const networkProviders = getNetworkProviders(selectedCountry);

  const handlePayment = async () => {
    if (!customerEmail || !mobileNumber || !networkProvider || !selectedPaymentMethod) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createPaystackCheckoutSession({
        courseId: course.id,
        courseTitle: course.title,
        amount: totalAmount,
        currency: selectedCurrency.toLowerCase(),
        customerEmail: customerEmail,
        mobileNumber: mobileNumber,
        networkProvider: networkProvider,
        paymentMethod: selectedPaymentMethod.type,
        successUrl: `${window.location.origin}/courses?success=true&courseId=${course.id}`,
        cancelUrl: `${window.location.origin}/courses?canceled=true`
      });

      if (result && result.url) {
        // Redirect to Paystack checkout
        window.location.href = result.url;
      } else {
        throw new Error('Failed to create Paystack checkout session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">African Mobile Payment</h2>
              <p className="text-green-100 mt-1">Secure mobile money payment via Paystack</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Course Details */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{course.instructor}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>Level: {course.level}</span>
                <span>Duration: {course.duration}</span>
                <span>Rating: ⭐ {course.rating}</span>
              </div>
            </div>
          </div>

          {/* African Payment Setup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Mobile Payment Setup - {selectedCountry}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Mobile Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+234 801 234 5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Network Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Network Provider *
              </label>
              <select
                value={networkProvider}
                onChange={(e) => setNetworkProvider(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select your network provider</option>
                {networkProviders.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Available African Payment Methods */}
          <div className="space-y-4">
            <button
              onClick={() => setShowPaymentMethods(!showPaymentMethods)}
              className="flex items-center justify-between w-full p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors bg-green-50"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">
                  Available Mobile Money Methods ({availableAfricanMethods.length})
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-green-600 transition-transform ${showPaymentMethods ? 'rotate-180' : ''}`} />
            </button>

            {showPaymentMethods && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-green-50 rounded-lg">
                {availableAfricanMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod?.id === method.id 
                        ? 'border-green-500 bg-green-100' 
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method)}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                    {selectedPaymentMethod?.id === method.id ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-green-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-900">Pricing Breakdown</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Price:</span>
                <span className="font-medium">
                  {formatCurrency(convertedPrice, selectedCurrency)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Processing Fee (1.5%):</span>
                <span className="font-medium">
                  {formatCurrency(processingFee, selectedCurrency)}
                </span>
              </div>
              
              <div className="border-t border-green-200 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">
                    {formatCurrency(totalAmount, selectedCurrency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Currency Conversion Note */}
            {selectedCurrency !== 'USD' && (
              <div className="text-xs text-gray-600 bg-white p-2 rounded border border-green-200">
                <Info className="w-4 h-4 inline mr-1 text-green-600" />
                Price converted from USD {course.price} to {selectedCurrency} {convertedPrice}
              </div>
            )}
          </div>

          {/* African Payment Benefits */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Banknote className="w-5 h-5" />
              Why Choose Mobile Money?
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Instant payments with no bank delays</li>
              <li>• Lower transaction fees than traditional banking</li>
              <li>• Widely available across {selectedCountry}</li>
              <li>• Secure and regulated by local authorities</li>
              <li>• No need for bank account or credit card</li>
            </ul>
          </div>

          {/* Security & Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Paystack Secure</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing || !customerEmail || !mobileNumber || !networkProvider || !selectedPaymentMethod}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Mobile Payment...
                </>
              ) : (
                <>
                  <Smartphone className="w-5 h-5" />
                  Pay {formatCurrency(totalAmount, selectedCurrency)} via {selectedPaymentMethod?.name || 'Mobile Money'}
                </>
              )}
            </button>
            
            <button
              onClick={onClose}
              className="w-full border border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Additional Information */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>By completing this purchase, you agree to our Terms of Service and Privacy Policy.</p>
            <p>Your payment will be processed securely by Paystack, a trusted African payment processor.</p>
            <p className="text-green-600 font-medium">Supported in {selectedCountry} with {availableAfricanMethods.length} mobile money options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfricanPaymentModal;
