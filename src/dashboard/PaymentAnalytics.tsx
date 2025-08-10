import React, { useState, } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Globe, 
  Users, 
  CreditCard,
  PieChart,
  MapPin,
  Download,
  Filter
} from 'lucide-react';
import { 
  CURRENCIES, 
  PAYMENT_GATEWAYS
} from '@/config/international-payments';

interface PaymentData {
  id: string;
  amount: number;
  currency: string;
  gateway: string;
  country: string;
  status: 'success' | 'failed' | 'pending';
  date: string;
  customerEmail: string;
  courseId: string;
  courseTitle: string;
}

interface AnalyticsData {
  totalRevenue: number;
  totalTransactions: number;
  successRate: number;
  averageOrderValue: number;
  topCountries: Array<{ country: string; revenue: number; transactions: number }>;
  topCurrencies: Array<{ currency: string; revenue: number; transactions: number }>;
  gatewayPerformance: Array<{ gateway: string; revenue: number; successRate: number }>;
  regionalPerformance: Array<{ region: string; revenue: number; discount: number }>;
}

const PaymentAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [paymentData] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedGateway] = useState<string>('all');

  (() => {
    loadAnalyticsData();
  }, [timeRange, selectedGateway]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simulate loading analytics data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in production, this would come from your backend
      const mockData: AnalyticsData = {
        totalRevenue: 125000,
        totalTransactions: 847,
        successRate: 94.2,
        averageOrderValue: 147.58,
        topCountries: [
          { country: 'Nigeria', revenue: 45000, transactions: 320 },
          { country: 'United Kingdom', revenue: 28000, transactions: 180 },
          { country: 'Kenya', revenue: 22000, transactions: 150 },
          { country: 'Ghana', revenue: 18000, transactions: 120 },
          { country: 'United States', revenue: 12000, transactions: 77 },
        ],
        topCurrencies: [
          { currency: 'NGN', revenue: 45000, transactions: 320 },
          { currency: 'GBP', revenue: 28000, transactions: 180 },
          { currency: 'KES', revenue: 22000, transactions: 150 },
          { currency: 'GHS', revenue: 18000, transactions: 120 },
          { currency: 'USD', revenue: 12000, transactions: 77 },
        ],
        gatewayPerformance: [
          { gateway: 'paystack', revenue: 63000, successRate: 96.5 },
          { gateway: 'stripe', revenue: 52000, successRate: 92.8 },
          { gateway: 'flutterwave', revenue: 10000, successRate: 91.2 },
        ],
        regionalPerformance: [
          { region: 'Africa', revenue: 85000, discount: 50 },
          { region: 'Europe', revenue: 28000, discount: 0 },
          { region: 'Americas', revenue: 12000, discount: 30 },
        ],
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'GBP') => {
    const symbols: Record<string, string> = {
      GBP: '£',
      USD: '$',
      EUR: '€',
      NGN: '₦',
      GHS: '₵',
      KES: 'KSh',
      ZAR: 'R',
      INR: '₹',
      BRL: 'R$',
      CAD: 'C$',
      AUD: 'A$',
    };
    
    return `${symbols[currency] || currency}${amount.toLocaleString()}`;
  };

  const getGatewayName = (gateway: string) => {
    return PAYMENT_GATEWAYS[gateway]?.name || gateway;
  };

  const getCurrencyName = (currency: string) => {
    return CURRENCIES[currency]?.name || currency;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Analytics</h1>
          <p className="text-gray-600">Track your international payment performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2">
        {(['7d', '30d', '90d', '1y'] as const).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range === '7d' && '7 Days'}
            {range === '30d' && '30 Days'}
            {range === '90d' && '90 Days'}
            {range === '1y' && '1 Year'}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(analyticsData?.totalRevenue || 0)}
            </div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {analyticsData?.totalTransactions.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +8.3% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <PieChart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {analyticsData?.successRate}%
            </div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +2.1% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(analyticsData?.averageOrderValue || 0)}
            </div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +4.2% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Top Countries by Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.topCountries.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900">{country.country}</p>
                      <p className="text-sm text-gray-600">{country.transactions} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(country.revenue)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {((country.revenue / (analyticsData?.totalRevenue || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Gateway Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Gateway Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.gatewayPerformance.map((gateway) => (
                <div key={gateway.gateway} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {getGatewayName(gateway.gateway)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {gateway.successRate}% success rate
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(gateway.revenue)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {((gateway.revenue / (analyticsData?.totalRevenue || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Currencies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Top Currencies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.topCurrencies.map((currency, index) => (
                <div key={currency.currency} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900">
                        {getCurrencyName(currency.currency)} ({currency.currency})
                      </p>
                      <p className="text-sm text-gray-600">{currency.transactions} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(currency.revenue)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {((currency.revenue / (analyticsData?.totalRevenue || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Regional Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.regionalPerformance.map((region) => (
                <div key={region.region} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <div>
                      <p className="font-medium text-gray-900">{region.region}</p>
                      <p className="text-sm text-gray-600">
                        {region.discount > 0 ? `${region.discount}% discount applied` : 'Standard pricing'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(region.revenue)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {((region.revenue / (analyticsData?.totalRevenue || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Top Performing Markets</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Nigeria leads with 36% of total revenue</li>
                <li>• African markets show 50% regional discount effectiveness</li>
                <li>• Paystack has highest success rate (96.5%)</li>
                <li>• Mobile money adoption growing 15% month-over-month</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Recommendations</h4>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Expand mobile money support in East Africa</li>
                <li>• Consider additional regional pricing for India</li>
                <li>• Implement USSD payments for offline users</li>
                <li>• Add more local payment methods in Brazil</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentAnalytics; 