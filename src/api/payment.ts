// Mock payment API for development
// In production, this would be a real server endpoint

export const createPaymentIntent = async (amount: number, currency: string = 'gbp') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock payment intent response
  return {
    clientSecret: 'pi_mock_secret_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    amount: amount,
    currency: currency,
    status: 'requires_payment_method'
  };
};

// Mock payment confirmation
export const confirmPayment = async (clientSecret: string, paymentMethod: any) => {
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock successful payment
  return {
    id: 'pi_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    status: 'succeeded',
    amount: paymentMethod.amount,
    currency: paymentMethod.currency,
    created: Date.now(),
    payment_method: paymentMethod.id
  };
}; 