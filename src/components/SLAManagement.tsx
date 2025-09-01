import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Phone, 
  Mail,
  MessageSquare,
  User,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Shield,
  Target,
  Flag,
  Bell,
  Settings,
  Users,
  HeadphonesIcon,
  FileText,
  Star,
  Award,
  Timer,
  Stopwatch,
  Hourglass,
  CalendarDays,
  Clock3,
  AlertCircle,
  Info,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Send,
  Archive
} from 'lucide-react';

interface SLATicket {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'system_outage' | 'feature_failure' | 'functional_issue' | 'general_inquiry';
  status: 'open' | 'in_progress' | 'resolved' | 'escalated' | 'closed';
  reportedBy: string;
  assignedTo: string;
  reportedAt: Date;
  initialResponseAt?: Date;
  resolvedAt?: Date;
  escalationLevel: number;
  slaBreach: boolean;
  responseTime: number; // in minutes
  resolutionTime: number; // in minutes
  customerSatisfaction?: number;
  tags: string[];
}

interface SLAMetrics {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  averageResponseTime: number;
  averageResolutionTime: number;
  slaComplianceRate: number;
  customerSatisfactionScore: number;
  escalationRate: number;
}

interface SLAConfig {
  critical: { initialResponse: number; resolution: number };
  high: { initialResponse: number; resolution: number };
  medium: { initialResponse: number; resolution: number };
  low: { initialResponse: number; resolution: number };
}

const SLAManagement: React.FC = () => {
  const [tickets, setTickets] = useState<SLATicket[]>([
    {
      id: '1',
      title: 'System Login Failure',
      description: 'Users unable to access the platform',
      priority: 'critical',
      category: 'system_outage',
      status: 'resolved',
      reportedBy: 'john.doe@company.com',
      assignedTo: 'tech-support',
      reportedAt: new Date('2024-01-15T09:00:00'),
      initialResponseAt: new Date('2024-01-15T09:45:00'),
      resolvedAt: new Date('2024-01-15T12:30:00'),
      escalationLevel: 0,
      slaBreach: false,
      responseTime: 45,
      resolutionTime: 210,
      customerSatisfaction: 4,
      tags: ['login', 'authentication', 'urgent']
    },
    {
      id: '2',
      title: 'Course Video Not Loading',
      description: 'Video content fails to load for premium courses',
      priority: 'high',
      category: 'feature_failure',
      status: 'in_progress',
      reportedBy: 'jane.smith@company.com',
      assignedTo: 'content-team',
      reportedAt: new Date('2024-01-16T14:00:00'),
      initialResponseAt: new Date('2024-01-16T16:30:00'),
      escalationLevel: 1,
      slaBreach: true,
      responseTime: 150,
      resolutionTime: 0,
      tags: ['video', 'content', 'premium']
    }
  ]);

  const [metrics, setMetrics] = useState<SLAMetrics>({
    totalTickets: 2,
    openTickets: 1,
    resolvedTickets: 1,
    averageResponseTime: 97.5,
    averageResolutionTime: 210,
    slaComplianceRate: 50,
    customerSatisfactionScore: 4,
    escalationRate: 50
  });

  const [slaConfig] = useState<SLAConfig>({
    critical: { initialResponse: 60, resolution: 240 }, // 1 hour, 4 hours
    high: { initialResponse: 240, resolution: 1440 }, // 4 hours, 1 day
    medium: { initialResponse: 1440, resolution: 4320 }, // 24 hours, 3 days
    low: { initialResponse: 2880, resolution: 10080 } // 48 hours, 7 days
  });

  const [showTicketForm, setShowTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<SLATicket>>({});

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSLAStatus = (ticket: SLATicket) => {
    const config = slaConfig[ticket.priority];
    const responseBreach = ticket.responseTime > config.initialResponse;
    const resolutionBreach = ticket.resolutionTime > config.resolution;
    
    if (responseBreach || resolutionBreach) {
      return { breached: true, type: responseBreach ? 'response' : 'resolution' };
    }
    return { breached: false, type: null };
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    return `${Math.floor(minutes / 1440)}d ${Math.floor((minutes % 1440) / 60)}h`;
  };

  const createTicket = async () => {
    const ticket: SLATicket = {
      id: Date.now().toString(),
      title: newTicket.title || '',
      description: newTicket.description || '',
      priority: newTicket.priority as any,
      category: newTicket.category as any,
      status: 'open',
      reportedBy: newTicket.reportedBy || '',
      assignedTo: '',
      reportedAt: new Date(),
      escalationLevel: 0,
      slaBreach: false,
      responseTime: 0,
      resolutionTime: 0,
      tags: newTicket.tags || []
    };

    setTickets([...tickets, ticket]);
    setNewTicket({});
    setShowTicketForm(false);
  };

  const escalateTicket = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, escalationLevel: ticket.escalationLevel + 1, status: 'escalated' }
        : ticket
    ));
  };

  const resolveTicket = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      const resolvedTicket = {
        ...ticket,
        status: 'resolved',
        resolvedAt: new Date(),
        resolutionTime: Math.floor((new Date().getTime() - ticket.reportedAt.getTime()) / (1000 * 60))
      };
      setTickets(prev => prev.map(t => t.id === ticketId ? resolvedTicket : t));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">SLA Management</h1>
              <p className="text-black font-medium">Service Level Agreement Monitoring & Escalation</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">
                <Clock className="h-4 w-4 mr-1" />
                {metrics.slaComplianceRate}% SLA Compliance
              </Badge>
              <Button onClick={() => setShowTicketForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>

        {/* SLA Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Target className="h-5 w-5" />
              <span className="text-black font-bold">SLA Configuration</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              Response and resolution time targets by priority level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-red-800">Critical</h3>
                  <Badge className="bg-red-100 text-red-800">System Outage</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Initial Response:</span>
                    <span className="text-black font-bold">&lt;1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Resolution Time:</span>
                    <span className="text-black font-bold">&lt;4 hours</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-orange-800">High</h3>
                  <Badge className="bg-orange-100 text-orange-800">Major Feature</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Initial Response:</span>
                    <span className="text-black font-bold">&lt;4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Resolution Time:</span>
                    <span className="text-black font-bold">&lt;1 business day</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-yellow-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-yellow-800">Medium</h3>
                  <Badge className="bg-yellow-100 text-yellow-800">Functional Issue</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Initial Response:</span>
                    <span className="text-black font-bold">&lt;24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Resolution Time:</span>
                    <span className="text-black font-bold">&lt;3 business days</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-green-800">Low</h3>
                  <Badge className="bg-green-100 text-green-800">General Inquiry</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Initial Response:</span>
                    <span className="text-black font-bold">&lt;48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Resolution Time:</span>
                    <span className="text-black font-bold">&lt;7 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{metrics.totalTickets}</div>
              <p className="text-xs text-black">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{metrics.openTickets}</div>
              <p className="text-xs text-black">Requiring attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">SLA Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{metrics.slaComplianceRate}%</div>
              <Progress value={metrics.slaComplianceRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{formatTime(metrics.averageResponseTime)}</div>
              <p className="text-xs text-black">Initial response</p>
            </CardContent>
          </Card>
        </div>

        {/* Support Channels */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <HeadphonesIcon className="h-5 w-5" />
              <span className="text-black font-bold">Support Channels</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              Available during business hours (9 AM - 6 PM GMT)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Mail className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-bold text-black mb-1">Email Support</h3>
                <p className="text-sm text-black mb-2">support@oponm.com</p>
                <Badge className="bg-green-100 text-green-800">24/7</Badge>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Phone className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-bold text-black mb-1">Phone Support</h3>
                <p className="text-sm text-black mb-2">+44 20 1234 5678</p>
                <Badge className="bg-blue-100 text-blue-800">Business Hours</Badge>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-bold text-black mb-1">Live Chat</h3>
                <p className="text-sm text-black mb-2">Available on platform</p>
                <Badge className="bg-purple-100 text-purple-800">Real-time</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Activity className="h-5 w-5" />
              <span className="text-black font-bold">Support Tickets</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              Monitor and manage support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => {
                const slaStatus = getSLAStatus(ticket);
                return (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {slaStatus.breached && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            SLA Breach
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {ticket.escalationLevel > 0 && (
                          <Badge className="bg-purple-100 text-purple-800">
                            Level {ticket.escalationLevel}
                          </Badge>
                        )}
                        <span className="text-sm text-black">
                          #{ticket.id}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-black mb-1">{ticket.title}</h3>
                    <p className="text-black mb-2">{ticket.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-black mb-2">
                      <span>Reported by: {ticket.reportedBy}</span>
                      <span>Assigned to: {ticket.assignedTo || 'Unassigned'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-black mb-3">
                      <span>Reported: {ticket.reportedAt.toLocaleString()}</span>
                      {ticket.initialResponseAt && (
                        <span>Response: {ticket.initialResponseAt.toLocaleString()}</span>
                      )}
                      {ticket.resolvedAt && (
                        <span>Resolved: {ticket.resolvedAt.toLocaleString()}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-black">Response: {formatTime(ticket.responseTime)}</span>
                        <span className="text-black">Resolution: {formatTime(ticket.resolutionTime)}</span>
                        {ticket.customerSatisfaction && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-black">{ticket.customerSatisfaction}/5</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {ticket.status === 'open' && (
                          <Button size="sm" onClick={() => escalateTicket(ticket.id)}>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Escalate
                          </Button>
                        )}
                        {ticket.status === 'in_progress' && (
                          <Button size="sm" onClick={() => resolveTicket(ticket.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* New Ticket Form */}
        {showTicketForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-black">Create Support Ticket</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newTicket.title || ''}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    placeholder="Brief description of the issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={3}
                    value={newTicket.description || ''}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Detailed description of the issue..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Priority</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newTicket.priority || ''}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                  >
                    <option value="">Select Priority</option>
                    <option value="critical">Critical - System Outage</option>
                    <option value="high">High - Major Feature Failure</option>
                    <option value="medium">Medium - Functional Issue</option>
                    <option value="low">Low - General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Category</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newTicket.category || ''}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="system_outage">System Outage</option>
                    <option value="feature_failure">Feature Failure</option>
                    <option value="functional_issue">Functional Issue</option>
                    <option value="general_inquiry">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Reporter Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newTicket.reportedBy || ''}
                    onChange={(e) => setNewTicket({...newTicket, reportedBy: e.target.value})}
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowTicketForm(false)}>
                  Cancel
                </Button>
                <Button onClick={createTicket}>
                  Create Ticket
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SLAManagement;
