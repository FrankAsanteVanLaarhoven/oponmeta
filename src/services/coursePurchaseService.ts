import { Course } from '../data/coursesData';

export interface PurchaseRequest {
  courseId: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
  };
  paymentMethod: 'card' | 'paypal' | 'bank_transfer';
  cardInfo?: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  };
  couponCode?: string;
  totalAmount: number;
}

export interface PurchaseResponse {
  success: boolean;
  transactionId?: string;
  courseAccessUrl?: string;
  receiptUrl?: string;
  error?: string;
}

export interface Coupon {
  code: string;
  discount: number;
  description: string;
  validUntil?: string;
  minAmount?: number;
}

class CoursePurchaseService {
  private baseUrl = process.env.REACT_APP_API_URL || 'https://api.oponmeta.com';

  // Simulate API calls - replace with actual API endpoints
  async purchaseCourse(purchaseRequest: PurchaseRequest): Promise<PurchaseResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate payment processing
      const isPaymentSuccessful = Math.random() > 0.1; // 90% success rate

      if (!isPaymentSuccessful) {
        return {
          success: false,
          error: 'Payment processing failed. Please try again.'
        };
      }

      // Generate mock transaction ID
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Save enrollment to localStorage for student portal access
      this.saveCourseEnrollment(purchaseRequest.courseId, purchaseRequest.customerInfo.email, transactionId);

      return {
        success: true,
        transactionId,
        courseAccessUrl: `/course-access/${purchaseRequest.courseId}`,
        receiptUrl: `/receipt/${transactionId}`
      };
    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  // Save course enrollment to localStorage for student portal access
  private saveCourseEnrollment(courseId: number, userEmail: string, transactionId: string): void {
    try {
      const enrollmentData = {
        courseId,
        userEmail,
        transactionId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        status: 'enrolled',
        estimatedCompletion: this.calculateEstimatedCompletion()
      };

      // Get existing enrollments
      const existingEnrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
      
      // Check if already enrolled
      const existingEnrollment = existingEnrollments.find(
        (enrollment: any) => enrollment.courseId === courseId && enrollment.userEmail === userEmail
      );

      if (!existingEnrollment) {
        // Add new enrollment
        existingEnrollments.push(enrollmentData);
        localStorage.setItem('courseEnrollments', JSON.stringify(existingEnrollments));
        
        // Also save to user-specific storage
        const userKey = `userEnrollments_${userEmail}`;
        const userEnrollments = JSON.parse(localStorage.getItem(userKey) || '[]');
        userEnrollments.push(enrollmentData);
        localStorage.setItem(userKey, JSON.stringify(userEnrollments));
      }
    } catch (error) {
      console.error('Failed to save course enrollment:', error);
    }
  }

  // Calculate estimated completion date (3 months from enrollment)
  private calculateEstimatedCompletion(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  }

  // Get enrolled courses for a specific user
  getEnrolledCourses(userEmail: string): any[] {
    try {
      const userKey = `userEnrollments_${userEmail}`;
      return JSON.parse(localStorage.getItem(userKey) || '[]');
    } catch (error) {
      console.error('Failed to get enrolled courses:', error);
      return [];
    }
  }

  // Check if user is enrolled in a specific course
  isEnrolledInCourse(courseId: number, userEmail: string): boolean {
    try {
      const enrollments = this.getEnrolledCourses(userEmail);
      return enrollments.some(enrollment => enrollment.courseId === courseId);
    } catch (error) {
      console.error('Failed to check enrollment:', error);
      return false;
    }
  }

  async validateCoupon(code: string): Promise<Coupon | null> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const coupons: Record<string, Coupon> = {
        'WELCOME10': {
          code: 'WELCOME10',
          discount: 10,
          description: '10% off for new students',
          validUntil: '2024-12-31',
          minAmount: 50
        },
        'SAVE20': {
          code: 'SAVE20',
          discount: 20,
          description: '20% off on all courses',
          validUntil: '2024-12-31',
          minAmount: 100
        },
        'STUDENT15': {
          code: 'STUDENT15',
          discount: 15,
          description: '15% student discount',
          validUntil: '2024-12-31',
          minAmount: 75
        },
        'EARLYBIRD25': {
          code: 'EARLYBIRD25',
          discount: 25,
          description: '25% early bird discount',
          validUntil: '2024-06-30',
          minAmount: 200
        }
      };

      const coupon = coupons[code.toUpperCase()];
      
      if (!coupon) {
        return null;
      }

      // Check if coupon is still valid
      if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
        return null;
      }

      return coupon;
    } catch (error) {
      return null;
    }
  }

  async getCourseAccess(courseId: number, userId: string): Promise<Course | null> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real implementation, this would fetch from your database
      // For now, return the course from the local data
      const course = require('../data/coursesData').coursesData.find((c: Course) => c.id === courseId);
      return course || null;
    } catch (error) {
      return null;
    }
  }

  async sendPurchaseConfirmation(email: string, course: Course, transactionId: string): Promise<boolean> {
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Purchase confirmation sent to ${email} for course: ${course.title}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  async generateReceipt(transactionId: string, purchaseData: PurchaseRequest): Promise<string> {
    try {
      // Simulate receipt generation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const receiptUrl = `/receipts/${transactionId}.pdf`;
      return receiptUrl;
    } catch (error) {
      throw new Error('Failed to generate receipt');
    }
  }

  // Mobile-specific methods
  async initiateMobilePayment(purchaseRequest: PurchaseRequest): Promise<{ paymentUrl: string; sessionId: string }> {
    try {
      // Simulate mobile payment initiation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const sessionId = `MOBILE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const paymentUrl = `/mobile-payment/${sessionId}`;

      return { paymentUrl, sessionId };
    } catch (error) {
      throw new Error('Failed to initiate mobile payment');
    }
  }

  async processMobilePayment(sessionId: string, paymentData: any): Promise<PurchaseResponse> {
    try {
      // Simulate mobile payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const isPaymentSuccessful = Math.random() > 0.05; // 95% success rate for mobile

      if (!isPaymentSuccessful) {
        return {
          success: false,
          error: 'Mobile payment failed. Please try again.'
        };
      }

      const transactionId = `MOBILE_TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        transactionId,
        courseAccessUrl: `/mobile-course-access/${paymentData.courseId}`,
        receiptUrl: `/mobile-receipt/${transactionId}`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Mobile payment processing failed.'
      };
    }
  }

  // Analytics and tracking
  async trackPurchaseEvent(event: string, data: any): Promise<void> {
    try {
      // Simulate analytics tracking
      console.log(`Analytics Event: ${event}`, data);
      
      // In a real implementation, this would send data to your analytics service
      // e.g., Google Analytics, Mixpanel, etc.
    } catch (error) {
      console.error('Failed to track purchase event:', error);
    }
  }

  async getPurchaseHistory(userId: string): Promise<PurchaseRequest[]> {
    try {
      // Simulate fetching purchase history
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real implementation, this would fetch from your database
      return [];
    } catch (error) {
      return [];
    }
  }

  // Currency conversion (for international payments)
  async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    try {
      // Simulate currency conversion
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock exchange rates
      const exchangeRates: Record<string, number> = {
        'USD': 1.0,
        'GBP': 0.79,
        'EUR': 0.92,
        'CAD': 1.36,
        'AUD': 1.52,
        'JPY': 149.5
      };

      const fromRate = exchangeRates[fromCurrency] || 1;
      const toRate = exchangeRates[toCurrency] || 1;

      return (amount / fromRate) * toRate;
    } catch (error) {
      return amount; // Return original amount if conversion fails
    }
  }
}

export const coursePurchaseService = new CoursePurchaseService();
export default coursePurchaseService;
