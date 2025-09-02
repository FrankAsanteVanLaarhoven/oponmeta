import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Globe,
  FileText,
  Users,
  Database,
  Key,
  Eye,
  EyeOff,
  Download,
  Trash2,
  RefreshCw,
  Bell,
  Settings,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Flag,
  UserCheck,
  UserX,
  ShieldCheck,
  AlertCircle,
  Info,
  ExternalLink
} from 'lucide-react';

interface DataBreach {
  id: string;
  type: 'personal_data' | 'financial_data' | 'system_access' | 'encryption_failure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedUsers: number;
  discoveredAt: Date;
  reportedAt: Date;
  status: 'investigating' | 'contained' | 'resolved' | 'reported';
  notificationSent: boolean;
  regulatoryReported: boolean;
}

interface DataTransfer {
  id: string;
  sourceCountry: string;
  destinationCountry: string;
  dataType: string;
  transferMechanism: 'SCC' | 'IDTA' | 'adequacy_decision' | 'binding_corporate_rules';
  status: 'pending' | 'approved' | 'active' | 'suspended';
  approvalDate?: Date;
  expiryDate?: Date;
  complianceScore: number;
}

interface ComplianceStatus {
  gdpr: boolean;
  ukDataProtection: boolean;
  nigerianDataProtection: boolean;
  encryptionAtRest: boolean;
  encryptionInTransit: boolean;
  breachNotification: boolean;
  dataRetention: boolean;
  userConsent: boolean;
  dataPortability: boolean;
  rightToErasure: boolean;
}

const DataProtectionModule: React.FC = () => {
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>({
    gdpr: true,
    ukDataProtection: true,
    nigerianDataProtection: true,
    encryptionAtRest: true,
    encryptionInTransit: true,
    breachNotification: false,
    dataRetention: true,
    userConsent: true,
    dataPortability: true,
    rightToErasure: true
  });

  const [dataBreaches, setDataBreaches] = useState<DataBreach[]>([
    {
      id: '1',
      type: 'personal_data',
      severity: 'medium',
                      description: 'Unauthorised access to user profile data',
      affectedUsers: 150,
      discoveredAt: new Date('2024-01-15T10:30:00'),
      reportedAt: new Date('2024-01-15T11:45:00'),
      status: 'resolved',
      notificationSent: true,
      regulatoryReported: true
    }
  ]);

  const [dataTransfers, setDataTransfers] = useState<DataTransfer[]>([
    {
      id: '1',
      sourceCountry: 'UK',
      destinationCountry: 'Nigeria',
      dataType: 'User profiles and course data',
      transferMechanism: 'SCC',
      status: 'active',
      approvalDate: new Date('2024-01-01'),
      expiryDate: new Date('2025-01-01'),
      complianceScore: 95
    }
  ]);

  const [showBreachForm, setShowBreachForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [newBreach, setNewBreach] = useState<Partial<DataBreach>>({});
  const [newTransfer, setNewTransfer] = useState<Partial<DataTransfer>>({});

  const getComplianceScore = () => {
    const total = Object.keys(complianceStatus).length;
    const compliant = Object.values(complianceStatus).filter(Boolean).length;
    return Math.round((compliant / total) * 100);
  };

  const getBreachSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransferStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const reportDataBreach = async () => {
    const breach: DataBreach = {
      id: Date.now().toString(),
      type: newBreach.type as any,
      severity: newBreach.severity as any,
      description: newBreach.description || '',
      affectedUsers: newBreach.affectedUsers || 0,
      discoveredAt: new Date(),
      reportedAt: new Date(),
      status: 'investigating',
      notificationSent: false,
      regulatoryReported: false
    };

    setDataBreaches([...dataBreaches, breach]);
    setNewBreach({});
    setShowBreachForm(false);

    // Simulate regulatory notification
    setTimeout(() => {
      setDataBreaches(prev => prev.map(b => 
        b.id === breach.id 
          ? { ...b, notificationSent: true, regulatoryReported: true }
          : b
      ));
    }, 2000);
  };

  const addDataTransfer = async () => {
    const transfer: DataTransfer = {
      id: Date.now().toString(),
      sourceCountry: newTransfer.sourceCountry || '',
      destinationCountry: newTransfer.destinationCountry || '',
      dataType: newTransfer.dataType || '',
      transferMechanism: newTransfer.transferMechanism as any,
      status: 'pending',
      complianceScore: 0
    };

    setDataTransfers([...dataTransfers, transfer]);
    setNewTransfer({});
    setShowTransferForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Data Protection & Compliance</h1>
              <p className="text-black font-medium">GDPR, UK, and Nigerian Data Law Compliance Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <ShieldCheck className="h-4 w-4 mr-1" />
                {getComplianceScore()}% Compliant
              </Badge>
              <Button variant="outline" onClick={() => setShowBreachForm(true)}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Breach
              </Button>
            </div>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-black">
                <Globe className="h-5 w-5" />
                <span className="text-black font-bold">Regulatory Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">GDPR Compliance</span>
                  <Badge className={complianceStatus.gdpr ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.gdpr ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">UK Data Protection</span>
                  <Badge className={complianceStatus.ukDataProtection ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.ukDataProtection ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Nigerian Data Protection</span>
                  <Badge className={complianceStatus.nigerianDataProtection ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.nigerianDataProtection ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-black">
                <Lock className="h-5 w-5" />
                <span className="text-black font-bold">Encryption Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Data at Rest</span>
                  <Badge className={complianceStatus.encryptionAtRest ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.encryptionAtRest ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Data in Transit</span>
                  <Badge className={complianceStatus.encryptionInTransit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.encryptionInTransit ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Breach Notification</span>
                  <Badge className={complianceStatus.breachNotification ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {complianceStatus.breachNotification ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-black">
                <Users className="h-5 w-5" />
                <span className="text-black font-bold">User Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Consent Management</span>
                  <Badge className={complianceStatus.userConsent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.userConsent ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Data Portability</span>
                  <Badge className={complianceStatus.dataPortability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.dataPortability ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Right to Erasure</span>
                  <Badge className={complianceStatus.rightToErasure ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {complianceStatus.rightToErasure ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Breaches */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-black font-bold">Data Breach Management</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              72-hour notification requirement for all data breaches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataBreaches.map((breach) => (
                <div key={breach.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getBreachSeverityColor(breach.severity)}>
                        {breach.severity.toUpperCase()}
                      </Badge>
                      <span className="text-black font-bold">{breach.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={breach.notificationSent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {breach.notificationSent ? 'Notified' : 'Pending'}
                      </Badge>
                      <Badge className={breach.regulatoryReported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {breach.regulatoryReported ? 'Reported' : 'Not Reported'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-black mb-2">{breach.description}</p>
                  <div className="flex items-center justify-between text-sm text-black">
                    <span>Affected Users: {breach.affectedUsers}</span>
                    <span>Discovered: {breach.discoveredAt.toLocaleString()}</span>
                    <span>Status: {breach.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cross-Border Data Transfers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-black">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="text-black font-bold">Cross-Border Data Transfers</span>
            </CardTitle>
            <CardDescription className="text-black font-medium">
              SCC, IDTA, and other lawful transfer mechanisms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataTransfers.map((transfer) => (
                <div key={transfer.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getTransferStatusColor(transfer.status)}>
                        {transfer.status.toUpperCase()}
                      </Badge>
                      <span className="text-black font-bold">
                        {transfer.sourceCountry} → {transfer.destinationCountry}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {transfer.transferMechanism}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {transfer.complianceScore}% Compliant
                      </Badge>
                    </div>
                  </div>
                  <p className="text-black mb-2">{transfer.dataType}</p>
                  <div className="flex items-center justify-between text-sm text-black">
                    <span>Approval: {transfer.approvalDate?.toLocaleDateString()}</span>
                    <span>Expiry: {transfer.expiryDate?.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Breach Report Form */}
        {showBreachForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-black">Report Data Breach</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Breach Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newBreach.type || ''}
                    onChange={(e) => setNewBreach({...newBreach, type: e.target.value})}
                  >
                    <option value="">Select Type</option>
                    <option value="personal_data">Personal Data</option>
                    <option value="financial_data">Financial Data</option>
                    <option value="system_access">System Access</option>
                    <option value="encryption_failure">Encryption Failure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Severity</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newBreach.severity || ''}
                    onChange={(e) => setNewBreach({...newBreach, severity: e.target.value})}
                  >
                    <option value="">Select Severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={3}
                    value={newBreach.description || ''}
                    onChange={(e) => setNewBreach({...newBreach, description: e.target.value})}
                    placeholder="Describe the data breach..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Affected Users</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newBreach.affectedUsers || ''}
                    onChange={(e) => setNewBreach({...newBreach, affectedUsers: parseInt(e.target.value)})}
                    placeholder="Number of affected users"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowBreachForm(false)}>
                  Cancel
                </Button>
                <Button onClick={reportDataBreach} className="bg-red-600 hover:bg-red-700">
                  Report Breach
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataProtectionModule;
