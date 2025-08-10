import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  TrendingDown, 
  TrendingUp, 
  Info,
  CheckCircle
} from 'lucide-react';
import { 
  CURRENCIES, 
  formatPrice, 
  getLocalizedPrice, 
  PRICING_STRATEGIES 
} from '@/config/international-payments';
import { getUserLocationWithFallback, UserLocation } from '@/services/geolocation';

interface CurrencySelectorProps {
  basePrice: number;
  onCurrencyChange: (currency: string, price: number) => void;
  selectedCurrency?: string;
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  basePrice,
  onCurrencyChange,
  selectedCurrency = 'GBP',
  className = ''
}) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [localizedPrice, setLocalizedPrice] = useState<number>(basePrice);
  const [showAllCurrencies, setShowAllCurrencies] = useState(false);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const location = await getUserLocationWithFallback();
        setUserLocation(location);
        
        // Set initial currency based on location
        const currency = location.currencyCode;
        if (CURRENCIES[currency] && currency !== selectedCurrency) {
          const price = getLocalizedPrice(basePrice, location.countryCode);
          setLocalizedPrice(price);
          onCurrencyChange(currency, price);
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
      }
    };

    detectLocation();
  }, [basePrice, selectedCurrency, onCurrencyChange]);

  const handleCurrencyChange = (currency: string) => {
    const price = getLocalizedPrice(basePrice, userLocation?.countryCode || 'GB');
    setLocalizedPrice(price);
    onCurrencyChange(currency, price);
  };

  const getPricingStrategy = () => {
    if (!userLocation) return null;
    
    return Object.values(PRICING_STRATEGIES).find(s => 
      s.countries.includes(userLocation.countryCode)
    );
  };

  const pricingStrategy = getPricingStrategy();
  const currencyConfig = CURRENCIES[selectedCurrency];

  // Get popular currencies for quick selection
  const popularCurrencies = ['GBP', 'USD', 'EUR', 'NGN', 'GHS', 'KES', 'ZAR', 'INR'];
  const allCurrencies = Object.keys(CURRENCIES);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Location Detection */}
      {userLocation && (
        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
          <Globe className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800">
            Detected: {userLocation.country} ({userLocation.currencyCode})
          </span>
          {pricingStrategy && pricingStrategy.multiplier < 1 && (
            <Badge variant="secondary" className="text-green-700 bg-green-50">
              <TrendingDown className="w-3 h-3 mr-1" />
              {Math.round((1 - pricingStrategy.multiplier) * 100)}% Regional Discount
            </Badge>
          )}
        </div>
      )}

      {/* Current Price Display */}
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-2xl font-bold text-gray-900">
          {formatPrice(localizedPrice, selectedCurrency)}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {currencyConfig?.name} • {currencyConfig?.symbol}
        </div>
        {pricingStrategy && pricingStrategy.multiplier < 1 && (
          <div className="text-xs text-green-600 mt-2">
            <CheckCircle className="w-3 h-3 inline mr-1" />
            Regional pricing applied
          </div>
        )}
      </div>

      {/* Currency Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900">
          Select Currency
        </label>
        
        {/* Popular Currencies */}
        <div className="grid grid-cols-4 gap-2">
          {popularCurrencies.map((currency) => {
            const config = CURRENCIES[currency];
            const price = getLocalizedPrice(basePrice, userLocation?.countryCode || 'GB');
            const isSelected = currency === selectedCurrency;
            
            return (
              <Button
                key={currency}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCurrencyChange(currency)}
                className="flex flex-col items-center p-2 h-auto"
              >
                <span className="text-lg font-bold">{config.symbol}</span>
                <span className="text-xs">{currency}</span>
                <span className="text-xs text-gray-500">
                  {formatPrice(price, currency)}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Show More/Less Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAllCurrencies(!showAllCurrencies)}
          className="w-full text-blue-600 hover:text-blue-700"
        >
          {showAllCurrencies ? 'Show Less' : 'Show All Currencies'}
        </Button>

        {/* All Currencies */}
        {showAllCurrencies && (
          <div className="space-y-2">
            <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allCurrencies.map((currency) => {
                  const config = CURRENCIES[currency];
                  const price = getLocalizedPrice(basePrice, userLocation?.countryCode || 'GB');
                  
                  return (
                    <SelectItem key={currency} value={currency}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">{config.symbol}</span>
                          <span>{config.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatPrice(price, currency)}
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Pricing Information */}
      <Card className="bg-gray-50">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Pricing Information</p>
              <ul className="space-y-1">
                <li>• Prices are converted using current exchange rates</li>
                <li>• Regional discounts are automatically applied</li>
                <li>• All prices include applicable taxes</li>
                <li>• 30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencySelector; 