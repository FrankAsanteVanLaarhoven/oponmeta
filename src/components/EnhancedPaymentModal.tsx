import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  X, 
  Globe, 
  MapPin, 
  ChevronDown,
  CheckCircle,
  Info,
  Shield,
  Lock
} from 'lucide-react';
import { 
  createStripeCheckoutSession, 
  getAvailablePaymentMethods, 
  getCurrencyInfo, 
  formatCurrency,
  SUPPORTED_CURRENCIES,
  getAfricanMobilePaymentMethods,
  type PaymentMethod
} from '../api/stripe';
import AfricanPaymentModal from './AfricanPaymentModal';

interface EnhancedPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  onSuccess: (courseId: string) => void;
}

const EnhancedPaymentModal: React.FC<EnhancedPaymentModalProps> = ({
  isOpen,
  onClose,
  course,
  onSuccess
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [customerEmail, setCustomerEmail] = useState('');
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useAfricanPayment, setUseAfricanPayment] = useState(false);
  const [showAfricanModal, setShowAfricanModal] = useState(false);

  // Get available payment methods for selected country and currency
  const availablePaymentMethods = getAvailablePaymentMethods(selectedCountry, selectedCurrency);
  const currencyInfo = getCurrencyInfo(selectedCurrency);

  // Calculate price in selected currency (mock conversion rates)
  const getConvertedPrice = (basePrice: number, baseCurrency: string, targetCurrency: string) => {
    const conversionRates: Record<string, Record<string, number>> = {
      USD: { EUR: 0.85, GBP: 0.73, JPY: 110, SGD: 1.35, CAD: 1.25, AUD: 1.35 },
      EUR: { USD: 1.18, GBP: 0.86, JPY: 129, SGD: 1.59, CAD: 1.47, AUD: 1.59 },
      GBP: { USD: 1.37, EUR: 1.16, JPY: 150, SGD: 1.85, CAD: 1.71, AUD: 1.85 },
      JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0067, SGD: 0.012, CAD: 0.011, AUD: 0.012 },
      SGD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81, CAD: 0.93, AUD: 1.0 },
      CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88, SGD: 1.08, AUD: 1.08 },
      AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81, SGD: 1.0, CAD: 0.93 }
    };

    if (baseCurrency === targetCurrency) return basePrice;
    return conversionRates[baseCurrency]?.[targetCurrency] ? 
      Math.round(basePrice * conversionRates[baseCurrency][targetCurrency] * 100) / 100 : 
      basePrice;
  };

  const convertedPrice = getConvertedPrice(course.price, 'USD', selectedCurrency);
  const processingFee = convertedPrice * 0.0349; // 3.49% processing fee
  const totalAmount = convertedPrice + processingFee;

  const handlePayment = async () => {
    if (!customerEmail) {
      alert('Please enter your email address');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createStripeCheckoutSession({
        courseId: course.id,
        courseTitle: course.title,
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: selectedCurrency.toLowerCase(),
        successUrl: `${window.location.origin}/courses?success=true&courseId=${course.id}`,
        cancelUrl: `${window.location.origin}/courses?canceled=true`,
        metadata: {
          courseId: course.id.toString(),
          courseTitle: course.title,
          instructor: course.instructor,
          originalPrice: course.price.toString(),
          originalCurrency: 'USD',
          convertedPrice: convertedPrice.toString(),
          convertedCurrency: selectedCurrency
        },
        locale: 'auto',
        customerEmail: customerEmail,
        billingAddressCollection: 'auto',
        allowPromotionCodes: true,
        taxIdCollection: false,
        phoneNumberCollection: false,
        paymentMethodTypes: availablePaymentMethods.map(m => m.type)
      });

      if (result && result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        throw new Error('Failed to create checkout session');
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
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Complete Purchase</h2>
              <p className="text-gray-600 mt-1">Secure payment powered by Stripe</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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

          {/* Localization Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Localization & Payment Options
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(SUPPORTED_CURRENCIES).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.symbol} {info.name} ({code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="US">🇺🇸 United States</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="IT">🇮🇹 Italy</option>
                  <option value="ES">🇪🇸 Spain</option>
                  <option value="NL">🇳🇱 Netherlands</option>
                  <option value="BE">🇧🇪 Belgium</option>
                  <option value="AT">🇦🇹 Austria</option>
                  <option value="PL">🇵🇱 Poland</option>
                  <option value="SE">🇸🇪 Sweden</option>
                  <option value="NO">🇳🇴 Norway</option>
                  <option value="DK">🇩🇰 Denmark</option>
                  <option value="FI">🇫🇮 Finland</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="SG">🇸🇬 Singapore</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="CN">🇨🇳 China</option>
                  <option value="HK">🇭🇰 Hong Kong</option>
                  <option value="IN">🇮🇳 India</option>
                  <option value="BR">🇧🇷 Brazil</option>
                  <option value="MX">🇲🇽 Mexico</option>
                  
                  {/* African Countries */}
                  <option value="NG">🇳🇬 Nigeria</option>
                  <option value="GH">🇬🇭 Ghana</option>
                  <option value="KE">🇰🇪 Kenya</option>
                  <option value="TZ">🇹🇿 Tanzania</option>
                  <option value="UG">🇺🇬 Uganda</option>
                  <option value="RW">🇷🇼 Rwanda</option>
                  <option value="ZA">🇿🇦 South Africa</option>
                  <option value="SN">🇸🇳 Senegal</option>
                  <option value="CI">🇨🇮 Ivory Coast</option>
                  <option value="CM">🇨🇲 Cameroon</option>
                  <option value="ET">🇪🇹 Ethiopia</option>
                </select>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* African Mobile Payment Toggle */}
            {getAfricanMobilePaymentMethods(selectedCountry).length > 0 && (
              <div className="col-span-2">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🇿🇦</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900">African Mobile Money Available</h4>
                      <p className="text-sm text-green-700">
                        {getAfricanMobilePaymentMethods(selectedCountry).length} mobile payment methods in {selectedCountry}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAfricanModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Use Mobile Money
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Available Payment Methods */}
          <div className="space-y-4">
            <button
              onClick={() => setShowPaymentMethods(!showPaymentMethods)}
              className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Available Payment Methods ({availablePaymentMethods.length})
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showPaymentMethods ? 'rotate-180' : ''}`} />
            </button>

            {showPaymentMethods && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
                {availablePaymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-900">Pricing Breakdown</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Price:</span>
                <span className="font-medium">
                  {formatCurrency(convertedPrice, selectedCurrency)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Processing Fee (3.49%):</span>
                <span className="font-medium">
                  {formatCurrency(processingFee, selectedCurrency)}
                </span>
              </div>
              
              <div className="border-t pt-2">
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
              <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                <Info className="w-4 h-4 inline mr-1" />
                Price converted from USD {course.price} to {selectedCurrency} {convertedPrice}
              </div>
            )}
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
              <span>Secure Checkout</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing || !customerEmail}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay {formatCurrency(totalAmount, selectedCurrency)} with {availablePaymentMethods.length} Payment Methods
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
            <p>Your payment will be processed securely by Stripe, a trusted global payment processor.</p>
          </div>
        </div>
      </div>

      {/* African Payment Modal */}
      {showAfricanModal && (
        <AfricanPaymentModal
          isOpen={showAfricanModal}
          onClose={() => setShowAfricanModal(false)}
          course={course}
          onSuccess={onSuccess}
          selectedCountry={selectedCountry}
          selectedCurrency={selectedCurrency}
        />
      )}
    </div>
  );
};

export default EnhancedPaymentModal;
