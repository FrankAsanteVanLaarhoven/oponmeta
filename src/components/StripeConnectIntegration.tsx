import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  CreditCard, 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  Download,
  Upload,
  Settings,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Target,
  Flag,
  Bell,
  Calendar,
  FileText,
  Star,
  Award,
  Timer,
  Stopwatch,
  Hourglass,
  CalendarDays,
  Clock3,
  Info,
  ChevronUp,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Send,
  Archive,
  Banknote,
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Globe,
  MapPin,
  Phone,
  Mail,
  User,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Link,
  Share2,
  MoreHorizontal,
  Filter,
  Search,
  Grid,
  List,
  Play,
  Pause,
  Square
} from 'lucide-react';

interface ConnectedAccount {
  id: string;
  business_type: 'individual' | 'company';
  country: string;
  email: string;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
  requirements: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
  };
  created: number;
  metadata: {
    instructor_id: string;
    platform_user_id: string;
  };
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  description: string;
  customer: string;
  connected_account: string;
  application_fee_amount?: number;
  created: number;
  metadata: {
    course_id: string;
    instructor_id: string;
    student_id: string;
  };
}

interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'in_transit' | 'canceled' | 'failed';
  arrival_date: number;
  created: number;
  connected_account: string;
  metadata: {
    instructor_id: string;
    payout_period: string;
  };
}

interface PlatformMetrics {
  totalConnectedAccounts: number;
  activeAccounts: number;
  totalPayments: number;
  totalPayouts: number;
  platformRevenue: number;
  averagePaymentAmount: number;
  successRate: number;
}

const StripeConnectIntegration: React.FC = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    totalConnectedAccounts: 0,
    activeAccounts: 0,
    totalPayments: 0,
    totalPayouts: 0,
    platformRevenue: 0,
    averagePaymentAmount: 0,
    successRate: 0
  });

  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<ConnectedAccount>>({});
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({});
  const [newPayout, setNewPayout] = useState<Partial<Payout>>({});

  // Stripe API configuration
  const STRIPE_API_KEY = 'sk_test_YOUR_STRIPE_SECRET_KEY_HERE';
  const STRIPE_BASE_URL = 'https://api.stripe.com/v1';

  // Create connected account
  const createConnectedAccount = async () => {
    try {
      const response = await fetch(`${STRIPE_BASE_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'express',
          country: newAccount.country || 'US',
          email: newAccount.email || '',
          business_type: newAccount.business_type || 'individual',
          capabilities: 'card_payments,transfers',
          metadata: JSON.stringify({
            instructor_id: newAccount.metadata?.instructor_id || '',
            platform_user_id: newAccount.metadata?.platform_user_id || ''
          })
        })
      });

      const account = await response.json();
      
      if (account.id) {
        setConnectedAccounts([...connectedAccounts, account]);
        setNewAccount({});
        setShowOnboardingForm(false);
      }
    } catch (error) {
      console.error('Error creating connected account:', error);
    }
  };

  // Create payment (direct charge)
  const createPayment = async () => {
    try {
      const response = await fetch(`${STRIPE_BASE_URL}/charges`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Stripe-Account': newPayment.connected_account || ''
        },
        body: new URLSearchParams({
          amount: (newPayment.amount || 0).toString(),
          currency: newPayment.currency || 'usd',
          source: 'tok_visa', // In real app, this would be a payment method ID
          description: newPayment.description || '',
          application_fee_amount: (newPayment.application_fee_amount || 0).toString(),
          metadata: JSON.stringify({
            course_id: newPayment.metadata?.course_id || '',
            instructor_id: newPayment.metadata?.instructor_id || '',
            student_id: newPayment.metadata?.student_id || ''
          })
        })
      });

      const payment = await response.json();
      
      if (payment.id) {
        setPayments([...payments, payment]);
        setNewPayment({});
        setShowPaymentForm(false);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  // Create payout
  const createPayout = async () => {
    try {
      const response = await fetch(`${STRIPE_BASE_URL}/transfers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Stripe-Account': newPayout.connected_account || ''
        },
        body: new URLSearchParams({
          amount: (newPayout.amount || 0).toString(),
          currency: newPayout.currency || 'usd',
          destination: 'acct_1032D82eZvKYlo2C', // Bank account ID
          metadata: JSON.stringify({
            instructor_id: newPayout.metadata?.instructor_id || '',
            payout_period: newPayout.metadata?.payout_period || ''
          })
        })
      });

      const payout = await response.json();
      
      if (payout.id) {
        setPayouts([...payouts, payout]);
        setNewPayout({});
        setShowPayoutForm(false);
      }
    } catch (error) {
      console.error('Error creating payout:', error);
    }
  };

  // Get account details
  const getAccountDetails = async (accountId: string) => {
    try {
      const response = await fetch(`${STRIPE_BASE_URL}/accounts/${accountId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${STRIPE_API_KEY}`,
          'Stripe-Account': accountId
        }
      });

      const account = await response.json();
      return account;
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  // Get payment details
  const getPaymentDetails = async (paymentId: string, accountId: string) => {
    try {
      const response = await fetch(`${STRIPE_BASE_URL}/charges/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${STRIPE_API_KEY}`,
          'Stripe-Account': accountId
        }
      });

      const payment = await response.json();
      return payment;
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getAccountStatusColor = (account: ConnectedAccount) => {
    if (account.charges_enabled && account.payouts_enabled) {
      return 'bg-green-100 text-green-800';
    } else if (account.charges_enabled) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPayoutStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Stripe Connect Integration</h1>
              <p className="text-black font-medium">Marketplace Payment Processing & Connected Accounts</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">
                <CreditCard className="h-4 w-4 mr-1" />
                {metrics.totalConnectedAccounts} Connected Accounts
              </Badge>
              <Button onClick={() => setShowOnboardingForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Onboard Instructor
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{metrics.totalConnectedAccounts}</div>
              <p className="text-xs text-black">{metrics.activeAccounts} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{metrics.totalPayments}</div>
              <p className="text-xs text-black">{formatCurrency(metrics.averagePaymentAmount)} avg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">Platform Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{formatCurrency(metrics.platformRevenue)}</div>
              <p className="text-xs text-black">Application fees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{metrics.successRate}%</div>
              <Progress value={metrics.successRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Connected Accounts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Users className="h-5 w-5" />
              <span className="text-black font-bold">Connected Accounts</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              Instructors and content creators on your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getAccountStatusColor(account)}>
                        {account.charges_enabled && account.payouts_enabled ? 'Active' : 
                         account.charges_enabled ? 'Charges Only' : 'Pending'}
                      </Badge>
                      <span className="text-black font-bold">{account.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {account.country.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-black">
                        {account.business_type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-black">
                    <div>
                      <span className="font-medium">Account ID:</span>
                      <span className="ml-2 font-mono">{account.id}</span>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <span className="ml-2">{formatDate(account.created)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Requirements:</span>
                      <span className="ml-2">
                        {account.requirements.currently_due.length} pending
                      </span>
                    </div>
                  </div>

                  {account.requirements.currently_due.length > 0 && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded">
                      <p className="text-sm text-black font-medium">Pending Requirements:</p>
                      <ul className="text-sm text-black mt-1">
                        {account.requirements.currently_due.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <DollarSign className="h-5 w-5" />
              <span className="text-black font-bold">Payments</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              Direct charges to connected accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status.toUpperCase()}
                      </Badge>
                      <span className="text-black font-bold">
                        {formatCurrency(payment.amount, payment.currency)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-purple-100 text-purple-800">
                        {payment.currency.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-black">
                        {formatDate(payment.created)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-black mb-2">{payment.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-black">
                    <div>
                      <span className="font-medium">Payment ID:</span>
                      <span className="ml-2 font-mono">{payment.id}</span>
                    </div>
                    <div>
                      <span className="font-medium">Connected Account:</span>
                      <span className="ml-2 font-mono">{payment.connected_account}</span>
                    </div>
                    <div>
                      <span className="font-medium">Application Fee:</span>
                      <span className="ml-2">
                        {payment.application_fee_amount ? 
                          formatCurrency(payment.application_fee_amount, payment.currency) : 
                          'None'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payouts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Banknote className="h-5 w-5" />
              <span className="text-black font-bold">Payouts</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              Transfers to connected account bank accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payouts.map((payout) => (
                <div key={payout.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getPayoutStatusColor(payout.status)}>
                        {payout.status.toUpperCase()}
                      </Badge>
                      <span className="text-black font-bold">
                        {formatCurrency(payout.amount, payout.currency)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-purple-100 text-purple-800">
                        {payout.currency.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-black">
                        Arrives: {formatDate(payout.arrival_date)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-black">
                    <div>
                      <span className="font-medium">Payout ID:</span>
                      <span className="ml-2 font-mono">{payout.id}</span>
                    </div>
                    <div>
                      <span className="font-medium">Connected Account:</span>
                      <span className="ml-2 font-mono">{payout.connected_account}</span>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <span className="ml-2">{formatDate(payout.created)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Form */}
        {showOnboardingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-black">Onboard New Instructor</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newAccount.email || ''}
                    onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                    placeholder="instructor@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Country</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newAccount.country || ''}
                    onChange={(e) => setNewAccount({...newAccount, country: e.target.value})}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="NG">Nigeria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Business Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newAccount.business_type || ''}
                    onChange={(e) => setNewAccount({...newAccount, business_type: e.target.value as any})}
                  >
                    <option value="">Select Type</option>
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Instructor ID</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newAccount.metadata?.instructor_id || ''}
                    onChange={(e) => setNewAccount({
                      ...newAccount, 
                      metadata: {...newAccount.metadata, instructor_id: e.target.value}
                    })}
                    placeholder="instructor_123"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowOnboardingForm(false)}>
                  Cancel
                </Button>
                <Button onClick={createConnectedAccount}>
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Form */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-black">Create Payment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Amount (cents)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newPayment.amount || ''}
                    onChange={(e) => setNewPayment({...newPayment, amount: parseInt(e.target.value)})}
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Currency</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newPayment.currency || ''}
                    onChange={(e) => setNewPayment({...newPayment, currency: e.target.value})}
                  >
                    <option value="">Select Currency</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                    <option value="ngn">NGN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Description</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newPayment.description || ''}
                    onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                    placeholder="Course purchase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Connected Account ID</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newPayment.connected_account || ''}
                    onChange={(e) => setNewPayment({...newPayment, connected_account: e.target.value})}
                    placeholder="acct_..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Application Fee (cents)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newPayment.application_fee_amount || ''}
                    onChange={(e) => setNewPayment({...newPayment, application_fee_amount: parseInt(e.target.value)})}
                    placeholder="200"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                  Cancel
                </Button>
                <Button onClick={createPayment}>
                  Create Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeConnectIntegration;
