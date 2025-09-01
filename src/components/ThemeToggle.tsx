import React, { useState } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SmartText } from './ui/SmartText';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'buttons';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  showLabels = true,
  className = ''
}) => {
  const { theme, setTheme, resolvedTheme, systemTheme, cycleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const getThemeIcon = (themeType: string) => {
    const iconSize = iconSizes[size];
    
    switch (themeType) {
      case 'light':
        return <Sun size={iconSize} />;
      case 'dark':
        return <Moon size={iconSize} />;
      case 'system':
        return <Monitor size={iconSize} />;
      default:
        return <Sun size={iconSize} />;
    }
  };

  const getThemeLabel = (themeType: string) => {
    switch (themeType) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Theme';
    }
  };

  const getCurrentThemeLabel = () => {
    if (theme === 'system') {
      return `System (${systemTheme})`;
    }
    return getThemeLabel(theme);
  };

  // Button variant
  if (variant === 'button') {
    return (
      <button
        onClick={cycleTheme}
        className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${sizeClasses[size]} ${className}`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
      >
        <SmartText
          backgroundColor="#ffffff"
          forceContrast
          className="flex items-center gap-2"
        >
          {getThemeIcon(theme)}
          {showLabels && <span>{getCurrentThemeLabel()}</span>}
        </SmartText>
      </button>
    );
  }

  // Buttons variant
  if (variant === 'buttons') {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    
    return (
      <div className={`flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-600 dark:bg-gray-800 ${className}`}>
        {themes.map((themeType) => (
          <button
            key={themeType}
            onClick={() => setTheme(themeType)}
            className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              theme === themeType
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            } ${sizeClasses[size]}`}
            aria-label={`Switch to ${getThemeLabel(themeType)} mode`}
          >
            <SmartText
              backgroundColor={theme === themeType ? '#3b82f6' : '#ffffff'}
              forceContrast
              className="flex items-center gap-2"
            >
              {getThemeIcon(themeType)}
              {showLabels && <span>{getThemeLabel(themeType)}</span>}
            </SmartText>
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${sizeClasses[size]} ${className}`}
        aria-label="Theme options"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <SmartText
          backgroundColor="#ffffff"
          forceContrast
          className="flex items-center gap-2"
        >
          {getThemeIcon(theme)}
          {showLabels && <span>{getCurrentThemeLabel()}</span>}
        </SmartText>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {(['light', 'dark', 'system'] as const).map((themeType) => (
            <button
              key={themeType}
              onClick={() => {
                setTheme(themeType);
                setIsDropdownOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <SmartText
                backgroundColor="#ffffff"
                forceContrast
                className="flex items-center gap-3"
              >
                {getThemeIcon(themeType)}
                <span>{getThemeLabel(themeType)}</span>
              </SmartText>
              {theme === themeType && (
                <Check size={16} className="text-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
