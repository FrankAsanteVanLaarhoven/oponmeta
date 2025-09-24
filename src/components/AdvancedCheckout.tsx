import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, CreditCard, Smartphone, Globe, CheckCircle, X } from 'lucide-react'
import { enhancedPaymentService } from '../services/enhancedPaymentService'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

interface CartItem {
  course_id: string
  course: any
  added_at: string
}

interface BillingDetails {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
}

interface Discount {
  code: string
  percentage: number
  amount: number
}

export const AdvancedCheckout: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay' | 'google_pay'>('card')
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: user?.full_name?.split(' ')[0] || '',
    lastName: user?.full_name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'GB'
  })
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState<Discount | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCheckoutData = async () => {
      if (!user?.id) {
        navigate('/login')
        return
      }

      try {
        // Check if single course purchase
        const courseId = searchParams.get('course')
        if (courseId) {
          const { data: course, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single()

          if (course) {
            setCartItems([{
              course_id: courseId,
              course,
              added_at: new Date().toISOString()
            }])
          }
        } else {
          // Load from cart
          const cart = await getShoppingCart(user.id)
          setCartItems(cart)
        }
      } catch (error) {
        console.error('Failed to load checkout data:', error)
        setError('Failed to load checkout data')
      }
    }

    loadCheckoutData()
  }, [user?.id, searchParams, navigate])

  const subtotal = cartItems.reduce((sum, item) => sum + item.course.price, 0)
  const discountAmount = discount ? (subtotal * discount.percentage / 100) : 0
  const vatAmount = (subtotal - discountAmount) * 0.2 // UK VAT
  const total = subtotal - discountAmount + vatAmount

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return

    try {
      const { data: coupon, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .single()

      if (error || !coupon) {
        setError('Invalid coupon code')
        return
      }

      // Check if coupon is still valid
      const now = new Date()
      if (coupon.valid_until && new Date(coupon.valid_until) < now) {
        setError('Coupon has expired')
        return
      }

      // Check minimum amount
      if (coupon.minimum_amount && subtotal < coupon.minimum_amount) {
        setError(`Minimum order amount is £${coupon.minimum_amount}`)
        return
      }

      setDiscount({
        code: coupon.code,
        percentage: coupon.discount_type === 'percentage' ? coupon.discount_value : 0,
        amount: coupon.discount_type === 'fixed_amount' ? coupon.discount_value : 0
      })
      setError('')
    } catch (error) {
      setError('Failed to apply coupon')
    }
  }

  const handlePayment = async () => {
    if (!user?.id) return

    try {
      setProcessing(true)
      setError('')

      const paymentData = {
        items: cartItems.map(item => ({
          course_id: item.course.id,
          price: item.course.price,
          title: item.course.title
        })),
        total,
        currency: 'GBP',
        payment_method: paymentMethod,
        billing_details: billingDetails,
        discount_applied: discount
      }

      let paymentResult

      switch (paymentMethod) {
        case 'card':
          paymentResult = await enhancedPaymentService.processAdvancedPayment(
            paymentData.items,
            {
              requestPayerName: true,
              requestPayerEmail: true
            }
          )
          break
        case 'paypal':
          paymentResult = await processPayPalPayment(paymentData)
          break
        case 'apple_pay':
          paymentResult = await processApplePayPayment(paymentData)
          break
        case 'google_pay':
          paymentResult = await processGooglePayPayment(paymentData)
          break
        default:
          throw new Error('Invalid payment method')
      }

      if (paymentResult.success) {
        // Enroll user in courses
        await Promise.all(
          cartItems.map(item => enrollInCourse(user.id, item.course.id, 'paid', paymentResult.transactionId))
        )

        // Clear cart
        await clearShoppingCart(user.id)

        // Redirect to success page
        navigate('/checkout/success', { 
          state: { 
            courses: cartItems.map(item => item.course),
            payment_id: paymentResult.transactionId 
          }
        })
      } else {
        setError(paymentResult.error || 'Payment failed')
      }

    } catch (error) {
      console.error('Payment failed:', error)
      setError(error instanceof Error ? error.message : 'Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No items in cart</h2>
          <p className="text-gray-600 mb-4">Add some courses to your cart to continue</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Order Summary
            </h2>
            
            {cartItems.map(item => (
              <CheckoutCourseItem
                key={item.course.id}
                course={item.course}
              />
            ))}

            {/* Coupon Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Apply
                </button>
              </div>
              {discount && (
                <div className="mt-2 text-green-600 flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  {discount.percentage}% discount applied
                </div>
              )}
              {error && (
                <div className="mt-2 text-red-600 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-£{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>VAT (20%):</span>
                <span>£{vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-semibold border-t pt-2">
                <span>Total:</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Payment Details
            </h2>

            {/* Payment Method Selection */}
            <PaymentMethodSelector
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />

            {/* Billing Information */}
            <BillingForm
              details={billingDetails}
              onChange={setBillingDetails}
            />

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock size={20} className="mr-2" />
                  Pay £{total.toFixed(2)}
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
              <Lock size={16} />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Checkout Course Item Component
const CheckoutCourseItem: React.FC<{
  course: any
}> = ({ course }) => {
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
      <img
        src={course.thumbnail_url || '/placeholder-course.jpg'}
        alt={course.title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{course.title}</h3>
        <p className="text-sm text-gray-600">by {course.creator?.full_name || 'Unknown'}</p>
      </div>
      <div className="text-lg font-semibold text-gray-900">
        {course.is_free ? 'Free' : `£${course.price}`}
      </div>
    </div>
  )
}

// Payment Method Selector Component
const PaymentMethodSelector: React.FC<{
  selected: string
  onSelect: (method: 'card' | 'paypal' | 'apple_pay' | 'google_pay') => void
}> = ({ selected, onSelect }) => {
  const methods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', label: 'PayPal', icon: Globe },
    { id: 'apple_pay', label: 'Apple Pay', icon: Smartphone },
    { id: 'google_pay', label: 'Google Pay', icon: Smartphone }
  ]

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
      <div className="space-y-2">
        {methods.map(method => (
          <label
            key={method.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              selected === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onSelect(method.id as any)}
              className="sr-only"
            />
            <method.icon size={20} className="mr-3 text-gray-600" />
            <span className="text-gray-900">{method.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Billing Form Component
const BillingForm: React.FC<{
  details: BillingDetails
  onChange: (details: BillingDetails) => void
}> = ({ details, onChange }) => {
  const handleChange = (field: keyof BillingDetails, value: string) => {
    onChange({ ...details, [field]: value })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={details.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={details.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={details.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          type="text"
          value={details.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={details.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
          <input
            type="text"
            value={details.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <select
          value={details.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>
      </div>
    </div>
  )
}

// Helper functions (these would be implemented in your services)
const getShoppingCart = async (userId: string) => {
  const { data, error } = await supabase
    .from('shopping_cart')
    .select(`
      *,
      course:courses(*)
    `)
    .eq('user_id', userId)

  if (error) throw error
  return data || []
}

const clearShoppingCart = async (userId: string) => {
  const { error } = await supabase
    .from('shopping_cart')
    .delete()
    .eq('user_id', userId)

  if (error) throw error
}

const enrollInCourse = async (userId: string, courseId: string, type: string, paymentId?: string) => {
  const { error } = await supabase
    .from('course_enrollments')
    .insert({
      student_id: userId,
      course_id: courseId,
      enrollment_type: type,
      payment_id: paymentId
    })

  if (error) throw error
}

const processPayPalPayment = async (paymentData: any) => {
  // Implementation for PayPal payment
  return { success: true, transactionId: 'paypal_' + Date.now() }
}

const processApplePayPayment = async (paymentData: any) => {
  // Implementation for Apple Pay payment
  return { success: true, transactionId: 'apple_' + Date.now() }
}

const processGooglePayPayment = async (paymentData: any) => {
  // Implementation for Google Pay payment
  return { success: true, transactionId: 'google_' + Date.now() }
}

export default AdvancedCheckout
