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
      <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {themes.map(({ value, label, icon: Icon, description }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                theme === value 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">{label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
