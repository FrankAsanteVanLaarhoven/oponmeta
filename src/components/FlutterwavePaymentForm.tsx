import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { PAYMENT_GATEWAYS, CURRENCIES, formatPrice } from '@/config/international-payments';

interface FlutterwavePaymentFormProps {
  amount: number;
  currency: string;
  email: string;
  onSuccess: (paymentResult: any) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

declare global {
  interface Window {
    FlutterwaveCheckout: any;
  }
}

const FlutterwavePaymentForm: React.FC<FlutterwavePaymentFormProps> = ({
  amount,
  currency,
  email,
  onSuccess,
  onError,
  loading,
  setLoading,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'mobile_money' | 'ussd'>('card');

  useEffect(() => {
    // Load Flutterwave script
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleFlutterwavePayment = async () => {
    if (!name || !email || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const gateway = PAYMENT_GATEWAYS.flutterwave;
      const currencyConfig = CURRENCIES[currency];

      if (!gateway.enabled || !currencyConfig.enabled) {
        throw new Error('Flutterwave is not available for this currency');
      }

      // Convert amount to smallest currency unit
      const amountInSmallestUnit = Math.round(amount * 100);

      const config = {
        public_key: gateway.publicKey,
        tx_ref: 'OPM_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        amount: amountInSmallestUnit,
        currency: currency,
        payment_options: paymentMethod === 'mobile_money' ? 'mobilemoney' : 
                        paymentMethod === 'bank' ? 'banktransfer' : 
                        paymentMethod === 'ussd' ? 'ussd' : 'card',
        redirect_url: window.location.origin + '/payment-success',
        customer: {
          email: email,
          phone_number: phone,
          name: name,
        },
        customizations: {
          title: 'OponMeta Course Purchase',
          description: 'Complete your course purchase',
          logo: 'https://oponmeta.com/logo.png',
        },
        meta: {
          course_id: 'course_' + Date.now(),
          customer_name: name,
          phone_number: phone,
        },
        callback: function(response: any) {
          // Payment successful
          if (response.status === 'successful') {
            onSuccess({
              id: response.tx_ref,
              status: 'succeeded',
              amount: amount,
              currency: currency,
              gateway: 'flutterwave',
              transactionId: response.transaction_id,
              customer: {
                name: name,
                email: email,
                phone: phone,
              },
            });
          } else {
            onError('Payment was not successful');
          }
        },
        onclose: function() {
          // Payment cancelled
          onError('Payment was cancelled');
        },
      };

      window.FlutterwaveCheckout(config);
    } catch (error) {
      console.error('Flutterwave payment error:', error);
      onError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-white">Full Name</label>
        <Input
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-white">Phone Number</label>
        <Input
          placeholder="+234 801 234 5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <p className="text-xs text-gray-300 mt-1">For payment verification and receipts</p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-900">Payment Method</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
            type="button"
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaymentMethod('card')}
            className="flex items-center justify-center"
          >
            💳 Card
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'bank' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaymentMethod('bank')}
            className="flex items-center justify-center"
          >
            🏦 Bank Transfer
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'mobile_money' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaymentMethod('mobile_money')}
            className="flex items-center justify-center"
          >
            📱 Mobile Money
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'ussd' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaymentMethod('ussd')}
            className="flex items-center justify-center"
          >
            📞 USSD
          </Button>
        </div>
      </div>

      <div className="bg-orange-900 border border-orange-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-orange-200">Flutterwave Payment</h4>
            <p className="text-sm text-orange-300">Secure payment processing with USSD and mobile money</p>
          </div>
          <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleFlutterwavePayment}
        disabled={loading || !name || !email || !phone}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="mr-2">💳</span>
            Pay with Flutterwave - {formatPrice(amount, currency)}
          </div>
        )}
      </Button>

      <p className="text-xs text-gray-300 text-center">
        Your payment will be processed securely by Flutterwave. 
        You'll receive a confirmation email once payment is complete.
      </p>
    </div>
  );
};

export default FlutterwavePaymentForm; 