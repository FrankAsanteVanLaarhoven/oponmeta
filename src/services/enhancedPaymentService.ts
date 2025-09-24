export interface PaymentItem {
  id: string
  name: string
  description: string
  price: number
  currency: string
  type: 'course' | 'subscription' | 'certification' | 'package'
  metadata?: Record<string, any>
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  paymentMethod?: string
  amount?: number
  currency?: string
}

export interface PaymentRequestOptions {
  requestPayerName?: boolean
  requestPayerEmail?: boolean
  requestPayerPhone?: boolean
  requestShipping?: boolean
  shippingType?: 'shipping' | 'delivery' | 'pickup'
}

export class EnhancedPaymentService {
  private static instance: EnhancedPaymentService
  private supportedMethods: PaymentMethodData[] = []

  static getInstance(): EnhancedPaymentService {
    if (!EnhancedPaymentService.instance) {
      EnhancedPaymentService.instance = new EnhancedPaymentService()
    }
    return EnhancedPaymentService.instance
  }

  constructor() {
    this.initializeSupportedMethods()
  }

  private initializeSupportedMethods(): void {
    this.supportedMethods = [
      {
        supportedMethods: 'basic-card',
        data: {
          supportedNetworks: ['visa', 'mastercard', 'amex', 'discover'],
          supportedTypes: ['credit', 'debit', 'prepaid']
        }
      },
      {
        supportedMethods: 'https://apple.com/apple-pay',
        data: {
          version: 3,
          merchantIdentifier: import.meta.env.VITE_APPLE_PAY_MERCHANT_ID,
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: ['visa', 'mastercard', 'amex'],
          countryCode: 'GB',
          currencyCode: 'GBP'
        }
      },
      {
        supportedMethods: 'https://google.com/pay',
        data: {
          environment: import.meta.env.VITE_GOOGLE_PAY_ENVIRONMENT || 'TEST',
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX']
            }
          }]
        }
      },
      {
        supportedMethods: 'https://www.paypal.com/webapps/billing/js/payments',
        data: {
          environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT || 'sandbox'
        }
      }
    ]
  }

  async processAdvancedPayment(
    items: PaymentItem[],
    options: PaymentRequestOptions = {}
  ): Promise<PaymentResult> {
    try {
      // Check if Payment Request API is supported
      if (!('PaymentRequest' in window)) {
        return await this.fallbackToStripeCheckout(items)
      }

      const totalAmount = items.reduce((sum, item) => sum + item.price, 0)
      const currency = items[0]?.currency || 'GBP'

      const details = this.buildPaymentDetails(items, totalAmount, currency)
      const paymentOptions = this.buildPaymentOptions(options)

      const request = new PaymentRequest(this.supportedMethods, details, paymentOptions)

      // Validate payment request
      if (!(await request.canMakePayment())) {
        return await this.fallbackToStripeCheckout(items)
      }

      // Show payment request
      const response = await request.show()

      // Process payment with backend
      const result = await this.processPaymentWithBackend(response, items)

      if (result.success) {
        await response.complete('success')
        this.trackPaymentSuccess(result, items)
        return result
      } else {
        await response.complete('fail')
        this.trackPaymentFailure(result.error, items)
        return result
      }

    } catch (error) {
      console.error('Payment Request API failed:', error)
      return await this.fallbackToStripeCheckout(items)
    }
  }

  private buildPaymentDetails(items: PaymentItem[], totalAmount: number, currency: string): PaymentDetailsInit {
    const displayItems = items.map(item => ({
      label: item.name,
      amount: {
        currency: currency,
        value: item.price.toFixed(2)
      }
    }))

    // Add platform fee and VAT
    const platformFee = totalAmount * 0.15 // 15% platform fee
    const vat = (totalAmount + platformFee) * 0.20 // 20% VAT
    const finalTotal = totalAmount + platformFee + vat

    return {
      total: {
        label: 'OPONM Learning Platform',
        amount: {
          currency: currency,
          value: finalTotal.toFixed(2)
        }
      },
      displayItems: [
        ...displayItems,
        {
          label: 'Platform Fee (15%)',
          amount: {
            currency: currency,
            value: platformFee.toFixed(2)
          }
        },
        {
          label: 'VAT (20%)',
          amount: {
            currency: currency,
            value: vat.toFixed(2)
          }
        }
      ]
    }
  }

  private buildPaymentOptions(options: PaymentRequestOptions): PaymentOptions {
    return {
      requestPayerName: options.requestPayerName ?? true,
      requestPayerEmail: options.requestPayerEmail ?? true,
      requestPayerPhone: options.requestPayerPhone ?? false,
      requestShipping: options.requestShipping ?? false,
      shippingType: options.shippingType ?? 'shipping'
    }
  }

  private async processPaymentWithBackend(
    response: PaymentResponse,
    items: PaymentItem[]
  ): Promise<PaymentResult> {
    try {
      const paymentData = {
        methodName: response.methodName,
        details: response.details,
        payerName: response.payerName,
        payerEmail: response.payerEmail,
        payerPhone: response.payerPhone,
        shippingAddress: response.shippingAddress,
        items: items
      }

      const result = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(paymentData)
      })

      const paymentResult = await result.json()

      if (result.ok) {
        return {
          success: true,
          transactionId: paymentResult.transactionId,
          paymentMethod: response.methodName,
          amount: paymentResult.amount,
          currency: paymentResult.currency
        }
      } else {
        return {
          success: false,
          error: paymentResult.error || 'Payment processing failed'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  private async fallbackToStripeCheckout(items: PaymentItem[]): Promise<PaymentResult> {
    try {
      // Fallback to Stripe Checkout
      const stripe = await this.loadStripe()
      if (!stripe) {
        throw new Error('Stripe not available')
      }

      const session = await this.createStripeSession(items)
      const result = await stripe.redirectToCheckout({ sessionId: session.id })

      if (result.error) {
        return {
          success: false,
          error: result.error.message
        }
      }

      return {
        success: true,
        transactionId: session.id
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed'
      }
    }
  }

  private async loadStripe(): Promise<any> {
    if (window.Stripe) {
      return window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      script.onload = () => {
        resolve(window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY))
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  private async createStripeSession(items: PaymentItem[]): Promise<{ id: string }> {
    const response = await fetch('/api/payments/create-stripe-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify({ items })
    })

    if (!response.ok) {
      throw new Error('Failed to create Stripe session')
    }

    return response.json()
  }

  async processSubscriptionPayment(
    tierId: string,
    billingCycle: 'monthly' | 'yearly',
    userId: string
  ): Promise<PaymentResult> {
    const subscriptionTierService = (await import('./subscriptionTierService')).subscriptionTierService
    const tier = subscriptionTierService.getTierById(tierId)
    
    if (!tier) {
      return {
        success: false,
        error: 'Invalid subscription tier'
      }
    }

    const price = billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice

    const items: PaymentItem[] = [{
      id: `subscription-${tierId}`,
      name: `${tier.name} Subscription (${billingCycle})`,
      description: tier.description,
      price: price,
      currency: tier.currency,
      type: 'subscription',
      metadata: {
        tierId,
        billingCycle,
        userId
      }
    }]

    return await this.processAdvancedPayment(items)
  }

  async processCoursePurchase(courseId: string, userId: string): Promise<PaymentResult> {
    try {
      // Fetch course details
      const course = await this.fetchCourseDetails(courseId)
      
      const items: PaymentItem[] = [{
        id: courseId,
        name: course.title,
        description: course.description,
        price: course.price,
        currency: course.currency,
        type: 'course',
        metadata: {
          courseId,
          userId,
          instructorId: course.instructorId
        }
      }]

      return await this.processAdvancedPayment(items)
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch course details'
      }
    }
  }

  async processCertificationPurchase(
    certificationId: string,
    userId: string
  ): Promise<PaymentResult> {
    try {
      const certification = await this.fetchCertificationDetails(certificationId)
      
      const items: PaymentItem[] = [{
        id: certificationId,
        name: certification.title,
        description: certification.description,
        price: certification.price,
        currency: certification.currency,
        type: 'certification',
        metadata: {
          certificationId,
          userId,
          validityPeriod: certification.validityPeriod
        }
      }]

      return await this.processAdvancedPayment(items)
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch certification details'
      }
    }
  }

  private async fetchCourseDetails(courseId: string): Promise<any> {
    const response = await fetch(`/api/courses/${courseId}`)
    if (!response.ok) {
      throw new Error('Course not found')
    }
    return response.json()
  }

  private async fetchCertificationDetails(certificationId: string): Promise<any> {
    const response = await fetch(`/api/certifications/${certificationId}`)
    if (!response.ok) {
      throw new Error('Certification not found')
    }
    return response.json()
  }

  private getAuthToken(): string {
    // Get authentication token from your auth system
    return localStorage.getItem('auth-token') || ''
  }

  private trackPaymentSuccess(result: PaymentResult, items: PaymentItem[]): void {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: result.transactionId,
        value: result.amount,
        currency: result.currency,
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.name,
          category: item.type,
          quantity: 1,
          price: item.price
        }))
      })
    }
  }

  private trackPaymentFailure(error: string, items: PaymentItem[]): void {
    if (window.gtag) {
      window.gtag('event', 'payment_failed', {
        error_message: error,
        items_count: items.length,
        total_value: items.reduce((sum, item) => sum + item.price, 0)
      })
    }
  }

  // Utility methods
  isPaymentRequestSupported(): boolean {
    return 'PaymentRequest' in window
  }

  getSupportedPaymentMethods(): string[] {
    return this.supportedMethods.map(method => method.supportedMethods)
  }

  async validatePaymentMethod(method: string): Promise<boolean> {
    if (!('PaymentRequest' in window)) {
      return false
    }

    try {
      const request = new PaymentRequest(
        [{ supportedMethods: method }],
        {
          total: {
            label: 'Test',
            amount: { currency: 'GBP', value: '0.01' }
          }
        }
      )

      return await request.canMakePayment()
    } catch (error) {
      return false
    }
  }
}

// Global type declarations
declare global {
  interface Window {
    Stripe?: any
    gtag?: (...args: any[]) => void
  }
}

export const enhancedPaymentService = EnhancedPaymentService.getInstance()
