import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera, 
  Shield, 
  Award, 
  BookOpen, 
  Clock, 
  Target,
  Star,
  Trophy,
  TrendingUp,
  Globe,
  Languages,
  Bell,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  timezone: string;
  language: string;
  bio: string;
  avatar: string;
  dateOfBirth: string;
  joinDate: string;
  isVerified: boolean;
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    publicProfile: boolean;
  };
  learningStats: {
    totalCourses: number;
    completedCourses: number;
    totalHours: number;
    averageScore: number;
    streakDays: number;
    achievements: number;
  };
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Mock user profile data
  const [profileData, setProfileData] = useState<UserProfileData>({
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    timezone: 'America/New_York',
    language: 'English',
    bio: 'Passionate learner focused on digital marketing and web development. Always eager to expand my knowledge and skills.',
    avatar: '/api/placeholder/150/150',
    dateOfBirth: '1990-05-15',
    joinDate: '2024-01-15',
    isVerified: true,
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      publicProfile: true,
    },
    learningStats: {
      totalCourses: 12,
      completedCourses: 8,
      totalHours: 156,
      averageScore: 87,
      streakDays: 7,
      achievements: 15,
    }
  });

  const [editedData, setEditedData] = useState<UserProfileData>(profileData);

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // Here you would typically make an API call to change the password
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password changed successfully!');
  };

  const achievements = [
    { id: '1', title: 'First Course Completed', icon: '🎓', description: 'Completed your first course', earnedDate: '2024-01-20' },
    { id: '2', title: 'Perfect Score', icon: '⭐', description: 'Achieved 100% on a course assessment', earnedDate: '2024-01-25' },
    { id: '3', title: 'Streak Master', icon: '🔥', description: 'Maintained 7-day learning streak', earnedDate: '2024-02-01' },
    { id: '4', title: 'Social Learner', icon: '👥', description: 'Participated in 10 discussions', earnedDate: '2024-02-05' },
    { id: '5', title: 'Quick Learner', icon: '⚡', description: 'Completed 5 courses in one month', earnedDate: '2024-02-10' },
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
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.firstName}
                      onChange={(e) => setEditedData({...editedData, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.lastName}
                      onChange={(e) => setEditedData({...editedData, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{profileData.email}</p>
                    {profileData.isVerified && (
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.country}
                      onChange={(e) => setEditedData({...editedData, country: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.country}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedData.dateOfBirth}
                      onChange={(e) => setEditedData({...editedData, dateOfBirth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-gray-900">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editedData.bio}
                    onChange={(e) => setEditedData({...editedData, bio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.bio}</p>
                )}
              </div>
            </motion.div>

            {/* Learning Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.learningStats.totalCourses}</p>
                  <p className="text-sm text-gray-600">Total Courses</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.learningStats.completedCourses}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.learningStats.totalHours}</p>
                  <p className="text-sm text-gray-600">Hours Learned</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.learningStats.averageScore}%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.learningStats.streakDays}</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-8 w-8 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.learningStats.achievements}</p>
                  <p className="text-sm text-gray-600">Achievements</p>
                </div>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Earned on {achievement.earnedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <button className="absolute bottom-4 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-600">Member since {new Date(profileData.joinDate).toLocaleDateString()}</p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">Change Password</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">Account Settings</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  onClick={() => navigate('/help')}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <HelpCircle className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">Help & Support</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">Email Notifications</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={profileData.preferences.emailNotifications}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      preferences: {
                        ...profileData.preferences,
                        emailNotifications: e.target.checked
                      }
                    })}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">Push Notifications</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={profileData.preferences.pushNotifications}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      preferences: {
                        ...profileData.preferences,
                        pushNotifications: e.target.checked
                      }
                    })}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">Public Profile</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={profileData.preferences.publicProfile}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      preferences: {
                        ...profileData.preferences,
                        publicProfile: e.target.checked
                      }
                    })}
                    className="rounded"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Change Password
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
