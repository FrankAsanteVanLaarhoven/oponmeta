import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Award,
  ShoppingCart,
  CreditCard,
  X,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  Play,
  CheckCircle,
  Shield,
  Lock,
  Smartphone,
  Globe,
  DollarSign,
  Euro,
  PoundSterling,
  Tag,
  Gift,
  Percent,
  Timer,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Zap,
  Crown,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Info,
  AlertCircle,
  Check,
  XCircle
} from 'lucide-react';
import { coursesData, Course } from '../data/coursesData';
import { toast } from 'sonner';
import { coursePurchaseService, PurchaseRequest } from '../services/coursePurchaseService';

interface CartItem extends Course {
  quantity: number;
}

const MobileCourseMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  
  // Checkout state
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    postalCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const categories = [
    'all',
    'Technology and Digital Skills',
    'Data and Analytics', 
    'Health and Healthcare Innovation',
    'Business and Strategy',
    'Engineering and Construction',
    'Education and Training',
    'Creative Arts and Media',
    'Sports and Wellness',
    'Agriculture and Food Systems'
  ];

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const addToCart = (course: Course) => {
    const existingItem = cart.find(item => item.id === course.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === course.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...course, quantity: 1 }]);
    }
    toast.success(`${course.title} added to cart`);
  };

  const removeFromCart = (courseId: number) => {
    setCart(cart.filter(item => item.id !== courseId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (courseId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    setCart(cart.map(item => 
      item.id === courseId ? { ...item, quantity } : item
    ));
  };

  const toggleFavorite = (courseId: number) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const getTotalPrice = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
    const tax = (subtotal - discount) * 0.1; // 10% tax
    return {
      subtotal,
      discount,
      tax,
      total: subtotal - discount + tax
    };
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      const coupon = await coursePurchaseService.validateCoupon(couponCode);
      if (coupon) {
        setAppliedCoupon(coupon);
        toast.success(`Coupon applied: ${coupon.description}`);
      } else {
        toast.error('Invalid or expired coupon code');
      }
    } catch (error) {
      toast.error('Failed to validate coupon code');
    }
  };

  const processPayment = async () => {
    if (cart.length === 0) return;
    
    toast.loading('Processing payment...');
    
    try {
      // Process each course in the cart
      for (const item of cart) {
        const purchaseRequest: PurchaseRequest = {
          courseId: item.id,
          customerInfo,
          paymentMethod: paymentMethod as 'card' | 'paypal' | 'bank_transfer',
          cardInfo: paymentMethod === 'card' ? cardInfo : undefined,
          couponCode: appliedCoupon ? couponCode : undefined,
          totalAmount: getTotalPrice().total
        };

        const result = await coursePurchaseService.purchaseCourse(purchaseRequest);
        
        if (!result.success) {
          toast.error(result.error || 'Payment failed');
          return;
        }

        // Send confirmation email
        await coursePurchaseService.sendPurchaseConfirmation(
          customerInfo.email,
          item,
          result.transactionId!
        );

        // Track purchase event
        await coursePurchaseService.trackPurchaseEvent('course_purchased', {
          courseId: item.id,
          courseTitle: item.title,
          amount: item.price,
          transactionId: result.transactionId
        });
      }

      toast.success('Payment successful! Check your email for course access.');
      setCart([]);
      setShowCheckout(false);
      setCheckoutStep(1);
      setActiveTab('browse');
      
      // Reset form
      setCustomerInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        postalCode: ''
      });
      setCardInfo({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
      });
      setAppliedCoupon(null);
      setCouponCode('');
      
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
    }
  };

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleFavorite(course.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm"
        >
          <Heart 
            className={`w-5 h-5 ${
              favorites.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`} 
          />
        </button>
        {course.isBestseller && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
            Bestseller
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {course.category}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium ml-1">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-sm text-gray-400 line-through mr-2">
                £{course.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              £{course.price}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedCourse(course);
                setShowCourseDetail(true);
              }}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View
            </button>
            <button
              onClick={() => addToCart(course)}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const CartItem: React.FC<{ item: CartItem }> = ({ item }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      <img 
        src={item.image} 
        alt={item.title}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
        <p className="text-sm text-gray-500">by {item.instructor}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 bg-white rounded-full shadow-sm"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-2 py-1 bg-white rounded text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 bg-white rounded-full shadow-sm"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-semibold text-gray-900">
            £{(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-gray-400 hover:text-red-500"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">Course Marketplace</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 flex items-center space-x-2 text-sm text-gray-600"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        
        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t bg-gray-50 px-4 py-3"
            >
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Course Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t p-4">
                                      <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>£{getTotalPrice().subtotal.toFixed(2)}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount ({appliedCoupon.discount}%):</span>
                          <span>-£{getTotalPrice().discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>£{getTotalPrice().tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>£{getTotalPrice().total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Coupon Code Section */}
                    <div className="mb-4">
                      {!appliedCoupon ? (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 p-2 border border-gray-200 rounded-lg text-sm"
                          />
                          <button
                            onClick={applyCoupon}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-sm text-green-700">{appliedCoupon.description}</span>
                          </div>
                          <button
                            onClick={() => {
                              setAppliedCoupon(null);
                              setCouponCode('');
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                {checkoutStep === 1 && (
                  <div className="p-4 space-y-4">
                    <h3 className="font-semibold text-gray-900">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        className="p-3 border border-gray-200 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        className="p-3 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg"
                    />
                    
                    <div className="pt-4">
                      <button
                        onClick={() => setCheckoutStep(2)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}
                
                {checkoutStep === 2 && (
                  <div className="p-4 space-y-4">
                    <h3 className="font-semibold text-gray-900">Payment Method</h3>
                    
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span>Credit/Debit Card</span>
                      </label>
                      
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <Globe className="w-5 h-5 mr-2" />
                        <span>PayPal</span>
                      </label>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                          className="w-full p-3 border border-gray-200 rounded-lg"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                            className="p-3 border border-gray-200 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                            className="p-3 border border-gray-200 rounded-lg"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                          className="w-full p-3 border border-gray-200 rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <button
                        onClick={() => setCheckoutStep(3)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}
                
                {checkoutStep === 3 && (
                  <div className="p-4 space-y-4">
                    <h3 className="font-semibold text-gray-900">Order Summary</h3>
                    
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>£{getTotalPrice().subtotal.toFixed(2)}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount:</span>
                          <span>-£{getTotalPrice().discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>£{getTotalPrice().tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>£{getTotalPrice().total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={processPayment}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        Complete Purchase
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {showCourseDetail && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Course Details</h2>
                <button
                  onClick={() => setShowCourseDetail(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="p-4 space-y-4">
                  <img 
                    src={selectedCourse.image} 
                    alt={selectedCourse.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-2" />
                        <span>Instructor: {selectedCourse.instructor}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Duration: {selectedCourse.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{selectedCourse.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                        <span>{selectedCourse.rating} rating</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        {selectedCourse.originalPrice && selectedCourse.originalPrice > selectedCourse.price && (
                          <span className="text-sm text-gray-400 line-through mr-2">
                            £{selectedCourse.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">
                          £{selectedCourse.price}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          addToCart(selectedCourse);
                          setShowCourseDetail(false);
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileCourseMarketplace;
