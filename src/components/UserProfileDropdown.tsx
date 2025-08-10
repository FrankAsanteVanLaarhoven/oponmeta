import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  CreditCard, 
  Crown, 
  LogOut, 
  ChevronDown, 
  Bell,
  Globe,
  Palette,
  BookOpen,
  Users,
  HelpCircle,
  FileText,
  Zap
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTranslation } from 'react-i18next';

const UserProfileDropdown: React.FC = () => {
  const { user, logout, updatePreferences } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleThemeChange = async (theme: 'light' | 'dark' | 'system') => {
    await updatePreferences({ theme });
  };

  const handleLanguageChange = async (language: string) => {
    await updatePreferences({ language });
  };

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'pro': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSubscriptionIcon = (plan: string) => {
    switch (plan) {
      case 'enterprise': return <Crown size={16} className="text-purple-600" />;
      case 'pro': return <Crown size={16} className="text-blue-600" />;
      case 'basic': return <Crown size={16} className="text-green-600" />;
      default: return <User size={16} className="text-gray-600" />;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10"
          onClick={() => navigate('/signin')}
        >
          {t('signIn')}
        </Button>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
          onClick={() => navigate('/signup')}
        >
          {t('signUp')}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-white/10 transition-colors rounded-lg"
      >
        <div className="relative">
          <img
            src={user.avatar || '/placeholder.svg'}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover border-2 border-white/20"
          />
          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-white/70">{user.email}</div>
        </div>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar || '/placeholder.svg'}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`text-xs ${getSubscriptionColor(user.subscription.plan)}`}>
                    {getSubscriptionIcon(user.subscription.plan)}
                    <span className="ml-1 capitalize">{user.subscription.plan}</span>
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Zap size={12} className="mr-1" />
                    {user.credits} credits
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
              >
                <User size={14} className="mr-1" />
                Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  navigate('/subscription');
                  setIsOpen(false);
                }}
              >
                <Crown size={14} className="mr-1" />
                Upgrade
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="py-1">
            <button
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <User size={16} className="mr-3 text-gray-500" />
              Profile & Settings
            </button>

            <button
              onClick={() => {
                navigate('/credits');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <CreditCard size={16} className="mr-3 text-gray-500" />
              Credits & Billing
            </button>

            <button
              onClick={() => {
                navigate('/subscription');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Crown size={16} className="mr-3 text-gray-500" />
              Subscription
            </button>

            <button
              onClick={() => {
                navigate('/my-courses');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <BookOpen size={16} className="mr-3 text-gray-500" />
              My Courses
            </button>

            <button
              onClick={() => {
                navigate('/community');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Users size={16} className="mr-3 text-gray-500" />
              Community
            </button>

            <button
              onClick={() => {
                navigate('/documentation');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FileText size={16} className="mr-3 text-gray-500" />
              Documentation
            </button>

            <button
              onClick={() => {
                navigate('/support');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <HelpCircle size={16} className="mr-3 text-gray-500" />
              Support
            </button>
          </div>

          {/* Preferences Section */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Preferences
            </div>
            
            {/* Theme Toggle */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Palette size={14} className="mr-2 text-gray-500" />
                <span className="text-xs text-gray-700 dark:text-gray-200">Theme</span>
              </div>
              <div className="flex space-x-1">
                {(['light', 'dark', 'system'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`px-2 py-1 text-xs rounded ${
                      user.preferences.theme === theme
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe size={14} className="mr-2 text-gray-500" />
                <span className="text-xs text-gray-700 dark:text-gray-200">Language</span>
              </div>
              <select
                value={user.preferences.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>

          {/* Sign Out */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded"
            >
              <LogOut size={16} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown; 