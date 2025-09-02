import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/context/NotificationContext';
import { 
  ArrowLeft, 
  Settings, 
  Bell, 
  Globe, 
  Mic, 
  Volume2, 
  Clock, 
  Shield,
  Palette,
  Languages,
  User,
  Save,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

const CompanionsSettings: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { companions, removeCompanion } = useAppContext();

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    language: 'en',
    theme: 'light',
    autoSave: true,
    sessionTimeout: 30,
    
    // Audio Settings
    voiceEnabled: true,
    voiceVolume: 80,
    voiceSpeed: 1.0,
    voiceGender: 'neutral',
    
    // Notification Settings
    sessionReminders: true,
    achievementNotifications: true,
    weeklyReports: true,
    emailNotifications: false,
    
    // Privacy Settings
    dataCollection: true,
    analyticsSharing: false,
    publicProfile: false,
    
    // Performance Settings
    autoQuality: true,
    maxSessions: 10,
    cacheEnabled: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    showNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your companion settings have been updated successfully.'
    });
  };

  const handleExportData = () => {
    const data = {
      companions,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `companions-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification({
      type: 'success',
      title: 'Data Exported',
      message: 'Your companions data has been exported successfully.'
    });
  };

  const handleDeleteCompanion = (companionId: string, companionName: string) => {
    if (window.confirm(`Are you sure you want to delete "${companionName}"? This action cannot be undone.`)) {
      removeCompanion(companionId);
      showNotification({
        type: 'success',
        title: 'Companion Deleted',
        message: `${companionName} has been removed from your library.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/companions-library')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Companions Settings</h1>
                          <p className="text-white text-lg">Customise your AI companion experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Settings */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Settings className="w-5 h-5 text-blue-600" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-black">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                      <SelectTrigger className="mt-1 bg-white text-black border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-black">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                      <SelectTrigger className="mt-1 bg-white text-black border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Auto-save sessions</Label>
                    <p className="text-xs text-black font-medium">Automatically save session progress</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-black">Session timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="mt-1 w-32 bg-white text-black border-gray-300"
                    min="5"
                    max="120"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Audio Settings */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Mic className="w-5 h-5 text-green-600" />
                  Audio Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Voice enabled</Label>
                    <p className="text-xs text-black font-medium">Enable voice interactions</p>
                  </div>
                  <Switch
                    checked={settings.voiceEnabled}
                    onCheckedChange={(checked) => handleSettingChange('voiceEnabled', checked)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-black">Volume</Label>
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.voiceVolume}
                      onChange={(e) => handleSettingChange('voiceVolume', parseInt(e.target.value))}
                      className="mt-1"
                    />
                    <span className="text-xs text-black">{settings.voiceVolume}%</span>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-black">Speed</Label>
                    <Select value={settings.voiceSpeed.toString()} onValueChange={(value) => handleSettingChange('voiceSpeed', parseFloat(value))}>
                      <SelectTrigger className="mt-1 bg-white text-black border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="0.5">Slow</SelectItem>
                        <SelectItem value="1.0">Normal</SelectItem>
                        <SelectItem value="1.5">Fast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-black">Voice Gender</Label>
                    <Select value={settings.voiceGender} onValueChange={(value) => handleSettingChange('voiceGender', value)}>
                      <SelectTrigger className="mt-1 bg-white text-black border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Bell className="w-5 h-5 text-yellow-600" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Session reminders</Label>
                    <p className="text-xs text-black font-medium">Get reminded about ongoing sessions</p>
                  </div>
                  <Switch
                    checked={settings.sessionReminders}
                    onCheckedChange={(checked) => handleSettingChange('sessionReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Achievement notifications</Label>
                    <p className="text-xs text-black font-medium">Celebrate your learning milestones</p>
                  </div>
                  <Switch
                    checked={settings.achievementNotifications}
                    onCheckedChange={(checked) => handleSettingChange('achievementNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Weekly reports</Label>
                    <p className="text-xs text-black font-medium">Receive weekly learning summaries</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Email notifications</Label>
                    <p className="text-xs text-black font-medium">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Shield className="w-5 h-5 text-red-600" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Data collection</Label>
                    <p className="text-xs text-black font-medium">Allow data collection for improvement</p>
                  </div>
                  <Switch
                    checked={settings.dataCollection}
                    onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Analytics sharing</Label>
                    <p className="text-xs text-black font-medium">Share anonymous usage analytics</p>
                  </div>
                  <Switch
                    checked={settings.analyticsSharing}
                    onCheckedChange={(checked) => handleSettingChange('analyticsSharing', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-black">Public profile</Label>
                    <p className="text-xs text-black font-medium">Make your profile visible to others</p>
                  </div>
                  <Switch
                    checked={settings.publicProfile}
                    onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Save className="w-5 h-5 text-blue-600" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleSaveSettings} className="w-full text-black">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
                <Button onClick={handleExportData} variant="outline" className="w-full text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full text-black">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </CardContent>
            </Card>

            {/* Your Companions */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <User className="w-5 h-5 text-green-600" />
                  Your Companions ({companions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {companions.map((companion) => (
                    <div key={companion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{companion.avatar}</span>
                        <div>
                          <p className="font-medium text-sm text-black">{companion.name}</p>
                          <p className="text-xs text-black">{companion.subject}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCompanion(companion.id, companion.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {companions.length === 0 && (
                    <p className="text-sm text-black font-medium text-center py-4">
                      No companions created yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanionsSettings;
