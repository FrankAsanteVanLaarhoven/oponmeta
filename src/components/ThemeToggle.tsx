import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Light theme' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Dark theme' },
    { value: 'auto', label: 'Auto', icon: Monitor, description: 'System preference' },
  ] as const;

  return (
    <div className="relative group">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 border border-transparent hover:border-yellow-400/30"
        aria-label="Toggle theme"
        title="Change theme"
      >
        {theme === 'light' && <Sun className="w-5 h-5 text-yellow-400" />}
        {theme === 'dark' && <Moon className="w-5 h-5 text-blue-300" />}
        {theme === 'auto' && <Monitor className="w-5 h-5 text-gray-300" />}
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-3 border-b border-yellow-300">
          <h3 className="text-white font-bold text-sm uppercase tracking-wide">Theme Settings</h3>
          <p className="text-yellow-100 text-xs mt-1">Choose your preferred appearance</p>
        </div>
        
        <div className="py-2">
          {themes.map(({ value, label, icon: Icon, description }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`w-full flex items-center px-4 py-4 text-left transition-all duration-200 relative group ${
                theme === value 
                  ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-900 border-l-4 border-yellow-500' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {/* Active indicator */}
              {theme === value && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              )}
              
              {/* Icon container */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-200 ${
                theme === value 
                  ? 'bg-yellow-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-yellow-100 group-hover:text-yellow-600'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className={`font-bold text-base mb-1 ${
                  theme === value ? 'text-yellow-900' : 'text-gray-900'
                }`}>
                  {label}
                </div>
                <div className={`text-sm ${
                  theme === value ? 'text-yellow-700' : 'text-gray-500'
                }`}>
                  {description}
                </div>
              </div>
              
              {/* Selection indicator */}
              {theme === value && (
                <div className="ml-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Theme will be saved automatically</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
