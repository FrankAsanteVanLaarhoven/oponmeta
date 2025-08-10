import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  ExternalLink, 
  Settings, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Users,
  ShoppingCart,
  Download,
  Filter,
  Eye,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Revenue = () => {
  const handlePaystackSettings = () => {
    // window.open('https://dashboard.paystack.com/', '_blank');
    toast.info('Payment dashboard would open here');
  };

  const transactionData = [
    { id: "TXN-001", date: "2024-01-15", type: "Sale", course: "React Development Mastery", amount: 89.99, status: "Completed", commission: 62.99 },
    { id: "TXN-002", date: "2024-01-14", type: "Sale", course: "Advanced JavaScript", amount: 79.99, status: "Completed", commission: 55.99 },
    { id: "TXN-003", date: "2024-01-13", type: "Payout", course: "Monthly Payout", amount: -1230.50, status: "Processed", commission: 0 },
    { id: "TXN-004", date: "2024-01-12", type: "Sale", course: "Python for Beginners", amount: 59.99, status: "Completed", commission: 41.99 },
    { id: "TXN-005", date: "2024-01-11", type: "Sale", course: "UI/UX Design Fundamentals", amount: 99.99, status: "Completed", commission: 69.99 },
    { id: "TXN-006", date: "2024-01-10", type: "Sale", course: "Data Science Bootcamp", amount: 149.99, status: "Pending", commission: 104.99 },
    { id: "TXN-007", date: "2024-01-09", type: "Sale", course: "Mobile App Development", amount: 119.99, status: "Completed", commission: 83.99 },
    { id: "TXN-008", date: "2024-01-08", type: "Refund", course: "React Development Mastery", amount: -89.99, status: "Processed", commission: -62.99 },
  ];

  const coursePerformance = [
    { course: "React Development Mastery", sales: 45, revenue: 4049.55, avgRating: 4.8 },
    { course: "Advanced JavaScript", sales: 32, revenue: 2559.68, avgRating: 4.7 },
    { course: "Python for Beginners", sales: 28, revenue: 1679.72, avgRating: 4.6 },
    { course: "UI/UX Design Fundamentals", sales: 22, revenue: 2199.78, avgRating: 4.9 },
    { course: "Data Science Bootcamp", sales: 18, revenue: 2699.82, avgRating: 4.5 },
  ];

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cyan-300">Revenue Monitoring</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Badge variant="secondary" className="text-green-600 bg-green-50">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            Live Data
          </Badge>
        </div>
      </div>

      {/* Main Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-300">$25,750.00</div>
            <div className="flex items-center text-sm text-green-600 mt-2">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Payouts
            </CardTitle>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-300">$1,230.50</div>
            <p className="text-sm text-gray-500 mt-2">Next payout: Aug 1, 2024</p>
            <div className="flex items-center text-sm text-orange-600 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>5 days remaining</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Sale Value
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-300">$49.99</div>
            <p className="text-sm text-gray-500 mt-2">Based on last 30 days</p>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+8.2% vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Students
            </CardTitle>
            <Users className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-300">2,847</div>
            <p className="text-sm text-gray-500 mt-2">Active enrollments</p>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>145 new this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-green-600">$8,250.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Month</span>
                <span className="font-semibold">$7,335.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Growth Rate</span>
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  +12.5%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Commission Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Your Share (70%)</span>
                <span className="font-semibold text-cyan-300">$18,025.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Platform Fee (30%)</span>
                <span className="font-semibold">$7,725.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Processing Fees</span>
                <span className="font-semibold text-red-600">-$385.50</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Payout Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">July 1, 2024</span>
                <span className="font-semibold">$2,150.00</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-600">Aug 1, 2024</span>
                <span className="font-semibold text-cyan-300">$1,230.50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Sep 1, 2024</span>
                <span className="font-semibold text-gray-500">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Course Performance</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Top Performing Courses</CardTitle>
              <p className="text-gray-600">Revenue and enrollment data for your most successful courses</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursePerformance.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{course.course}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">{course.sales} students</span>
                        <span className="text-sm text-gray-600">★ {course.avgRating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-cyan-300">${course.revenue.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">Total Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Transaction History</CardTitle>
                <p className="text-gray-600">Complete log of all sales, payouts, and refunds</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Course/Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionData.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={transaction.type === 'Sale' ? 'default' : transaction.type === 'Payout' ? 'secondary' : 'destructive'}
                            className={
                              transaction.type === 'Sale' ? 'bg-green-100 text-green-800' :
                              transaction.type === 'Payout' ? 'bg-[#16203a] text-cyan-300' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{transaction.course}</TableCell>
                        <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell className={transaction.commission < 0 ? 'text-red-600' : 'text-cyan-300'}>
                          ${Math.abs(transaction.commission).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={transaction.status === 'Completed' ? 'default' : transaction.status === 'Pending' ? 'secondary' : 'outline'}
                            className={
                              transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Revenue Trends</CardTitle>
                <p className="text-gray-600">Monthly revenue performance over time</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">January 2024</span>
                    <span className="text-lg font-bold text-cyan-300">$8,250.00</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">December 2023</span>
                    <span className="text-lg font-bold">$7,335.00</span>
                  </div>
                  <Progress value={76} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">November 2023</span>
                    <span className="text-lg font-bold">$6,890.00</span>
                  </div>
                  <Progress value={71} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">October 2023</span>
                    <span className="text-lg font-bold">$5,425.00</span>
                  </div>
                  <Progress value={56} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Key Insights</CardTitle>
                <p className="text-gray-600">AI-powered revenue analysis and recommendations</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800">Strong Growth</h4>
                        <p className="text-sm text-green-700">Your revenue is up 12.5% this month, outperforming the platform average of 8.2%.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <ShoppingCart className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Best Seller</h4>
                        <p className="text-sm text-blue-700">React Development Mastery is your top performer with 45 sales this month.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-800">Opportunity</h4>
                        <p className="text-sm text-orange-700">Consider creating advanced versions of your popular courses to increase revenue.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Payment Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Payment Integration & Settings</CardTitle>
          <p className="text-gray-600">Comprehensive payment processing and financial management</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Paystack Integration</h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PAY</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 mb-2">
                    Global Classroom integrates directly with Paystack for secure and reliable payment processing across Africa. 
                    Our platform handles currency conversion, fraud protection, and compliance automatically.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Automated commission calculations for various vendor tiers and regions are handled by the platform, 
                    with transparent fee structures and real-time reporting.
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={handlePaystackSettings}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Paystack Dashboard
                    </Button>
                    <Button variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Payment Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Security & Compliance</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">PCI DSS Level 1 Compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">3D Secure Authentication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Real-time Fraud Detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">GDPR & Data Protection</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Supported Currencies</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>USD, EUR, GBP</div>
                  <div>NGN, GHS, KES</div>
                  <div>ZAR, UGX, TZS</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Payout Methods</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Bank Transfer</div>
                  <div>Mobile Money</div>
                  <div>Digital Wallets</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Processing Time</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Sales: Instant</div>
                  <div>Payouts: 1-3 days</div>
                  <div>Refunds: 5-7 days</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Revenue;