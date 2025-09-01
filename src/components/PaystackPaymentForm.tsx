import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { PAYMENT_GATEWAYS, CURRENCIES, formatPrice } from '@/config/international-payments';

interface PaystackPaymentFormProps {
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
    PaystackPop: any;
  }
}

const PaystackPaymentForm: React.FC<PaystackPaymentFormProps> = ({
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'mobile_money'>('card');

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaystackPayment = async () => {
    if (!name || !email || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const gateway = PAYMENT_GATEWAYS.paystack;
      const currencyConfig = CURRENCIES[currency];

      if (!gateway.enabled || !currencyConfig.enabled) {
        throw new Error('Paystack is not available for this currency');
      }

      // Convert amount to kobo (smallest currency unit for NGN)
      const amountInKobo = currency === 'NGN' ? Math.round(amount * 100) : Math.round(amount * 100);

      const handler = window.PaystackPop.setup({
        key: gateway.publicKey,
        email: email,
        amount: amountInKobo,
        currency: currency,
        ref: 'OPM_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        callback: function(response: any) {
          // Payment successful
          onSuccess({
            id: response.reference,
            status: 'succeeded',
            amount: amount,
            currency: currency,
            gateway: 'paystack',
            transactionId: response.reference,
            customer: {
              name: name,
              email: email,
              phone: phone,
            },
          });
        },
        onClose: function() {
          // Payment cancelled
          onError('Payment was cancelled');
        },
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: name,
            },
            {
              display_name: 'Phone Number',
              variable_name: 'phone_number',
              value: phone,
            },
          ],
        },
        channels: paymentMethod === 'mobile_money' ? ['mobile_money'] : 
                  paymentMethod === 'bank' ? ['bank'] : ['card'],
      });

      handler.openIframe();
    } catch (error) {
      console.error('Paystack payment error:', error);
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
        <label className="text-sm font-medium text-white">Payment Method</label>
        <div className="grid grid-cols-3 gap-2 mt-2">
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
            🏦 Bank
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
        </div>
      </div>

      <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-blue-200">Paystack Payment</h4>
            <p className="text-sm text-blue-300">Secure payment processing for African markets</p>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handlePaystackPayment}
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
            Pay with Paystack - {formatPrice(amount, currency)}
          </div>
        )}
      </Button>

      <p className="text-xs text-gray-300 text-center">
        Your payment will be processed securely by Paystack. 
        You'll receive a confirmation email once payment is complete.
      </p>
    </div>
  );
};

export default PaystackPaymentForm; 