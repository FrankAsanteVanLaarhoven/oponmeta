import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  onSuccess: (paymentResult: any) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      '::placeholder': {
        color: '#9ca3af',
      },
      backgroundColor: 'transparent',
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  currency,
  onSuccess,
  onError,
  loading,
  setLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!email || !name) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // For development, use mock payment API
      // In production, this would call your real server endpoint
      const { createPaymentIntent, confirmPayment } = await import('../api/payment');
      
      const paymentIntent = await createPaymentIntent(
        Math.round(amount * 100), // Convert to cents
        currency.toLowerCase()
      );

      const clientSecret = paymentIntent.clientSecret;

      // For development, simulate payment confirmation
      // In production, this would use real Stripe confirmation
      const paymentResult = await confirmPayment(clientSecret, {
        amount: Math.round(amount * 100),
        currency: currency.toLowerCase(),
        id: 'pm_' + Date.now(),
      });

      if (paymentResult.status === 'succeeded') {
        onSuccess(paymentResult);
      } else {
        onError('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-white">Cardholder Name</label>
        <Input
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-white">Email Address</label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <p className="text-xs text-gray-300 mt-1">We'll send your receipt and course access to this email</p>
      </div>

      <div>
        <label className="text-sm font-medium text-white">Card Details</label>
        <div className="mt-1 p-3 border border-gray-600 rounded-md bg-gray-700">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Complete Purchase - £{amount}
            <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        )}
      </Button>
    </form>
  );
};

export default StripePaymentForm; 