import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  Trash2,
  Lock,
  Unlock,
  Activity,
  Database,
  FileText,
  DollarSign,
  Globe,
  Cpu,
  HardDrive,
  Network,
  Bell,
  UserCheck,
  UserX,
  Settings2,
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Info,
  Filter
} from 'lucide-react';
import { authService } from '../services/authService';
import { UserRole, Permission } from '../types/auth';

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalRevenue: number;
  systemUptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkTraffic: number;
  securityAlerts: number;
  complianceIssues: number;
}

interface SecurityAlert {
  id: string;
  type: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
  affectedUsers?: number;
}

interface ComplianceIssue {
  id: string;
  type: 'gdpr' | 'pci' | 'security' | 'privacy';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  dueDate: Date;
  status: 'open' | 'in_progress' | 'resolved';
}

interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  success: boolean;
  ipAddress: string;
}

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalUsers: 15420,
    activeUsers: 8920,
    totalCourses: 1247,
    totalRevenue: 2847500,
    systemUptime: 99.97,
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 78,
    networkTraffic: 1250,
    securityAlerts: 3,
    complianceIssues: 2
  });

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    {
      id: '1',
      type: 'high',
      title: 'Multiple Failed Login Attempts',
      description: 'User account showing suspicious login patterns',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: false,
      affectedUsers: 1
    },
    {
      id: '2',
      type: 'medium',
      title: 'Unusual API Activity',
      description: 'Spike in API requests from single IP address',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      resolved: false
    }
  ]);

  const [complianceIssues, setComplianceIssues] = useState<ComplianceIssue[]>([
    {
      id: '1',
      type: 'gdpr',
      severity: 'high',
      title: 'Data Retention Policy Review',
      description: 'User data retention policies need updating for GDPR compliance',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'open'
    },
    {
      id: '2',
      type: 'pci',
      severity: 'medium',
      title: 'Payment Security Audit',
      description: 'Quarterly PCI DSS compliance audit due',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'in_progress'
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    // Load audit logs
    const logs = authService.getAuditLogs({
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      success: undefined
    });
    setAuditLogs(logs.slice(0, 50)); // Show last 50 entries
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSecurityAction = (alertId: string, action: 'resolve' | 'dismiss') => {
    setSecurityAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: action === 'resolve' }
          : alert
      )
    );
  };

  const handleComplianceAction = (issueId: string, action: 'resolve' | 'in_progress') => {
    setComplianceIssues(prev => 
      prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: action === 'resolve' ? 'resolved' : 'in_progress' }
          : issue
      )
    );
  };

  const exportAuditLogs = () => {
    const logs = authService.getAuditLogs();
    const csvContent = [
      'Timestamp,User ID,Action,Resource,Success,IP Address',
      ...logs.map(log => 
        `${log.timestamp.toISOString()},${log.userId},${log.action},${log.resource},${log.success},${log.ipAddress}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
                      <h1 className="text-3xl font-bold text-black">Super Admin Dashboard</h1>
        <p className="text-black mt-2">Enterprise governance and system administration</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-1 text-black border-black">
                <Shield className="h-4 w-4 text-black" />
                <span className="text-black">Super Admin</span>
              </Badge>
              <Button variant="outline" onClick={exportAuditLogs} className="text-black border-black">
                <Download className="h-4 w-4 mr-2 text-black" />
                Export Logs
              </Button>
            </div>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{systemMetrics.systemUptime}%</div>
              <p className="text-xs text-black">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Active Users</CardTitle>
              <Users className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{systemMetrics.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-black">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{systemMetrics.securityAlerts}</div>
              <p className="text-xs text-black">
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Compliance Issues</CardTitle>
              <FileText className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{systemMetrics.complianceIssues}</div>
              <p className="text-xs text-black">
                Pending resolution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-gray-300">
            <TabsTrigger value="overview" className="text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">Overview</TabsTrigger>
            <TabsTrigger value="security" className="text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">Security</TabsTrigger>
            <TabsTrigger value="compliance" className="text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">Compliance</TabsTrigger>
            <TabsTrigger value="users" className="text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">User Management</TabsTrigger>
            <TabsTrigger value="audit" className="text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">Audit Logs</TabsTrigger>
            <TabsTrigger value="system" className="text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Performance */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-black">
                    <Cpu className="h-5 w-5 text-black" />
                    <span>System Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-black">
                      <span>CPU Usage</span>
                      <span>{systemMetrics.cpuUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.cpuUsage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-black">
                      <span>Memory Usage</span>
                      <span>{systemMetrics.memoryUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-black">
                      <span>Disk Usage</span>
                      <span>{systemMetrics.diskUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.diskUsage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Overview */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-black">
                    <DollarSign className="h-5 w-5 text-black" />
                    <span>Revenue Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-black">
                    ${(systemMetrics.totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-sm text-black">
                    Total platform revenue
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm text-black">
                      <span>This Month</span>
                      <span className="text-green-600">+8.2%</span>
                    </div>
                    <div className="flex justify-between text-sm text-black">
                      <span>Last Month</span>
                      <span className="text-green-600">+12.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Quick Actions</CardTitle>
                <CardDescription className="text-black">Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-gray-100">
                    <UserCheck className="h-6 w-6 mb-2 text-black" />
                    <span className="text-sm text-black">Approve Users</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-gray-100">
                    <Settings2 className="h-6 w-6 mb-2 text-black" />
                    <span className="text-sm text-black">System Config</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-gray-100">
                    <Database className="h-6 w-6 mb-2 text-black" />
                    <span className="text-sm text-black">Backup System</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col text-black border-black hover:bg-gray-100">
                    <Zap className="h-6 w-6 mb-2 text-black" />
                    <span className="text-sm text-black">Performance</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Alerts */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-black">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>Security Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityAlerts.filter(alert => !alert.resolved).map(alert => (
                      <Alert key={alert.id} className={alert.type === 'high' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-black">{alert.title}</p>
                              <p className="text-sm text-black">{alert.description}</p>
                              <p className="text-xs text-black mt-1">
                                {alert.timestamp.toLocaleString()}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleSecurityAction(alert.id, 'resolve')} className="text-black border-black">
                                Resolve
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleSecurityAction(alert.id, 'dismiss')} className="text-black">
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Metrics */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Security Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-black">Failed Login Attempts</span>
                    <Badge variant="outline">24 (last 24h)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Suspicious IPs</span>
                    <Badge variant="outline">3 blocked</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">2FA Adoption</span>
                    <Badge variant="outline">78%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Security Score</span>
                    <Badge className="bg-green-100 text-green-800">92/100</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Compliance Issues</CardTitle>
                <CardDescription className="text-black">Track and manage compliance requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black">Issue</TableHead>
                      <TableHead className="text-black">Type</TableHead>
                      <TableHead className="text-black">Severity</TableHead>
                      <TableHead className="text-black">Due Date</TableHead>
                      <TableHead className="text-black">Status</TableHead>
                      <TableHead className="text-black">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceIssues.map(issue => (
                      <TableRow key={issue.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-black">{issue.title}</p>
                            <p className="text-sm text-black">{issue.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="uppercase">
                            {issue.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-black">
                          {issue.dueDate.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {issue.status === 'open' && (
                              <Button size="sm" onClick={() => handleComplianceAction(issue.id, 'in_progress')} className="text-black bg-white border border-black">
                                Start
                              </Button>
                            )}
                            {issue.status === 'in_progress' && (
                              <Button size="sm" onClick={() => handleComplianceAction(issue.id, 'resolve')} className="text-black bg-white border border-black">
                                Resolve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">User Management</CardTitle>
                <CardDescription className="text-black">Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{systemMetrics.totalUsers}</div>
                    <div className="text-sm text-black">Total Users</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{systemMetrics.activeUsers}</div>
                    <div className="text-sm text-black">Active Users</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">23</div>
                    <div className="text-sm text-black">Pending Approval</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black">Recent User Activity</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black">User</TableHead>
                        <TableHead className="text-black">Role</TableHead>
                        <TableHead className="text-black">Last Activity</TableHead>
                        <TableHead className="text-black">Status</TableHead>
                        <TableHead className="text-black">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-black">john.doe@example.com</TableCell>
                        <TableCell>
                          <Badge variant="outline">Instructor</Badge>
                        </TableCell>
                        <TableCell className="text-black">2 hours ago</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="text-black border-black">
                              <Eye className="h-4 w-4 text-black" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-black border-black">
                              <Lock className="h-4 w-4 text-black" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Audit Logs</CardTitle>
                <CardDescription className="text-black">System activity and security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-black border-black">
                      <Download className="h-4 w-4 mr-2 text-black" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="text-black border-black">
                      <Filter className="h-4 w-4 mr-2 text-black" />
                      Filter
                    </Button>
                  </div>
                  <div className="text-sm text-black">
                    Showing last 50 entries
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black">Timestamp</TableHead>
                      <TableHead className="text-black">User</TableHead>
                      <TableHead className="text-black">Action</TableHead>
                      <TableHead className="text-black">Resource</TableHead>
                      <TableHead className="text-black">IP Address</TableHead>
                      <TableHead className="text-black">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm text-black">
                          {log.timestamp.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-black">{log.userId}</TableCell>
                        <TableCell className="text-sm text-black">{log.action}</TableCell>
                        <TableCell className="text-sm text-black">{log.resource}</TableCell>
                        <TableCell className="text-sm text-black">{log.ipAddress}</TableCell>
                        <TableCell>
                          {log.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Configuration */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-black">Maintenance Mode</span>
                    <Button size="sm" variant="outline" className="text-black border-black">Disabled</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Auto Backup</span>
                    <Button size="sm" variant="outline" className="text-black border-black">Enabled</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Rate Limiting</span>
                    <Button size="sm" variant="outline" className="text-black border-black">Enabled</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Monitoring */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Performance Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-black">Response Time</span>
                      <span className="text-black">245ms</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-black">Error Rate</span>
                      <span className="text-black">0.02%</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-black">Uptime</span>
                      <span className="text-black">99.97%</span>
                    </div>
                    <Progress value={99.97} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Database Status */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Database Status</CardTitle>
              </CardHeader>
                              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-semibold text-black">Primary DB</div>
                    <Badge className="bg-green-100 text-green-800 mt-2">Healthy</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-semibold text-black">Replica DB</div>
                    <Badge className="bg-green-100 text-green-800 mt-2">Synced</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <HardDrive className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <div className="text-lg font-semibold text-black">Backup</div>
                    <Badge className="bg-green-100 text-green-800 mt-2">Latest</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
