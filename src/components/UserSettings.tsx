import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Languages, 
  Moon, 
  Sun, 
  Monitor, 
  Smartphone, 
  Tablet,
  Eye,
  EyeOff,
  Lock,
  Key,
  Smartphone as Mobile,
  Mail,
  X,
  Save,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SettingsData {
  account: {
    email: string;
    username: string;
    language: string;
    timezone: string;
    dateFormat: string;
    currency: string;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
    showProgress: boolean;
    allowMessages: boolean;
    allowFriendRequests: boolean;
  };
  notifications: {
    email: {
      courseUpdates: boolean;
      newMessages: boolean;
      achievements: boolean;
      marketing: boolean;
      weeklyDigest: boolean;
    };
    push: {
      courseUpdates: boolean;
      newMessages: boolean;
      achievements: boolean;
      reminders: boolean;
    };
    inApp: {
      courseUpdates: boolean;
      newMessages: boolean;
      achievements: boolean;
      systemUpdates: boolean;
    };
  };
  security: {
    twoFactorAuth: boolean;
    loginNotifications: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'small' | 'medium' | 'large';
    compactMode: boolean;
    showAnimations: boolean;
  };
}

const UserSettings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const [settings, setSettings] = useState<SettingsData>({
    account: {
      email: 'john.doe@example.com',
      username: 'johndoe',
      language: 'English',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD'
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showProgress: true,
      allowMessages: true,
      allowFriendRequests: true
    },
    notifications: {
      email: {
        courseUpdates: true,
        newMessages: true,
        achievements: true,
        marketing: false,
        weeklyDigest: true
      },
      push: {
        courseUpdates: true,
        newMessages: true,
        achievements: true,
        reminders: true
      },
      inApp: {
        courseUpdates: true,
        newMessages: true,
        achievements: true,
        systemUpdates: true
      }
    },
    security: {
      twoFactorAuth: false,
      loginNotifications: true,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    appearance: {
      theme: 'auto',
      fontSize: 'medium',
      compactMode: false,
      showAnimations: true
    }
  });

  const handleSave = () => {
    // Here you would typically make an API call to save the settings
    alert('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    // Here you would typically make an API call to delete the account
    alert('Account deletion initiated. You will receive a confirmation email.');
    setShowDeleteModal(false);
  };

  const handleExportData = () => {
    // Here you would typically generate and download user data
    alert('Data export initiated. You will receive an email with your data.');
    setShowExportModal(false);
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/student-portal')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <X className="h-4 w-4 mr-2 rotate-45" />
            Back to Student Portal
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and security</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={settings.account.email}
                          onChange={(e) => setSettings({
                            ...settings,
                            account: { ...settings.account, email: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                          type="text"
                          value={settings.account.username}
                          onChange={(e) => setSettings({
                            ...settings,
                            account: { ...settings.account, username: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          value={settings.account.language}
                          onChange={(e) => setSettings({
                            ...settings,
                            account: { ...settings.account, language: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Chinese">Chinese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={settings.account.timezone}
                          onChange={(e) => setSettings({
                            ...settings,
                            account: { ...settings.account, timezone: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/Denver">Mountain Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Paris">Paris</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => setSettings({
                          ...settings,
                          privacy: { ...settings.privacy, profileVisibility: e.target.value as any }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Show Email Address</h3>
                          <p className="text-sm text-gray-600">Allow others to see your email address</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.showEmail}
                          onChange={(e) => setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, showEmail: e.target.checked }
                          })}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Show Phone Number</h3>
                          <p className="text-sm text-gray-600">Allow others to see your phone number</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.showPhone}
                          onChange={(e) => setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, showPhone: e.target.checked }
                          })}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Show Learning Progress</h3>
                          <p className="text-sm text-gray-600">Allow others to see your course progress</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.showProgress}
                          onChange={(e) => setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, showProgress: e.target.checked }
                          })}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
                  <div className="space-y-8">
                    {/* Email Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(settings.notifications.email).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                              <p className="text-sm text-gray-600">Receive email notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setSettings({
                                ...settings,
                                notifications: {
                                  ...settings.notifications,
                                  email: {
                                    ...settings.notifications.email,
                                    [key]: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <Mobile className="h-5 w-5 mr-2" />
                        Push Notifications
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(settings.notifications.push).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                              <p className="text-sm text-gray-600">Receive push notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setSettings({
                                ...settings,
                                notifications: {
                                  ...settings.notifications,
                                  push: {
                                    ...settings.notifications.push,
                                    [key]: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => alert('Two-factor authentication setup would be initiated here')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          settings.security.twoFactorAuth
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {settings.security.twoFactorAuth ? 'Enabled' : 'Enable'}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Login Notifications</h3>
                          <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.security.loginNotifications}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, loginNotifications: e.target.checked }
                          })}
                          className="rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                      <select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Appearance Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['light', 'dark', 'auto'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setSettings({
                              ...settings,
                              appearance: { ...settings.appearance, theme: theme as any }
                            })}
                            className={`p-4 rounded-lg border-2 text-center ${
                              settings.appearance.theme === theme
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-center mb-2">
                              {theme === 'light' && <Sun className="h-6 w-6 text-yellow-500" />}
                              {theme === 'dark' && <Moon className="h-6 w-6 text-gray-600" />}
                              {theme === 'auto' && <Monitor className="h-6 w-6 text-blue-500" />}
                            </div>
                            <span className="text-sm font-medium capitalize">{theme}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                      <select
                        value={settings.appearance.fontSize}
                        onChange={(e) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, fontSize: e.target.value as any }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Compact Mode</h3>
                          <p className="text-sm text-gray-600">Reduce spacing for a more compact layout</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.appearance.compactMode}
                          onChange={(e) => setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, compactMode: e.target.checked }
                          })}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Show Animations</h3>
                          <p className="text-sm text-gray-600">Enable smooth transitions and animations</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.appearance.showAnimations}
                          onChange={(e) => setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, showAnimations: e.target.checked }
                          })}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center px-4 py-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Delete Account</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center mb-4">
              <Download className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Export Data</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Export all your data including profile information, course progress, achievements, and settings. You will receive an email with the download link.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Data
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
