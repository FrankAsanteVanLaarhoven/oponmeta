import { useTheme } from '../context/ThemeContext';

export const useThemeColors = () => {
  const { isDark } = useTheme();

  return {
    // Background colors
    bg: {
      primary: isDark ? 'bg-gray-900' : 'bg-white',
      secondary: isDark ? 'bg-gray-800' : 'bg-gray-50',
      tertiary: isDark ? 'bg-gray-700' : 'bg-gray-100',
      card: isDark ? 'bg-gray-800' : 'bg-white',
    },
    
    // Text colors
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-300' : 'text-gray-600',
      muted: isDark ? 'text-gray-400' : 'text-gray-500',
      accent: 'text-blue-600 dark:text-blue-400',
    },
    
    // Border colors
    border: {
      primary: isDark ? 'border-gray-700' : 'border-gray-200',
      secondary: isDark ? 'border-gray-600' : 'border-gray-300',
      accent: 'border-blue-500 dark:border-blue-400',
    },
    
    // Button colors
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    
    // Input colors
    input: {
      bg: isDark ? 'bg-gray-800' : 'bg-white',
      border: isDark ? 'border-gray-600' : 'border-gray-300',
      text: isDark ? 'text-white' : 'text-gray-900',
      placeholder: isDark ? 'placeholder-gray-400' : 'placeholder-gray-500',
    },
    
    // Shadow colors
    shadow: {
      sm: isDark ? 'shadow-gray-900/50' : 'shadow-gray-200',
      md: isDark ? 'shadow-gray-900/30' : 'shadow-gray-300',
      lg: isDark ? 'shadow-gray-900/40' : 'shadow-gray-400',
    },
    
    // Brand colors (your platform colors)
    brand: {
      primary: 'bg-[#0a174e]',
      primaryHover: 'hover:bg-[#1a2a6b]',
      secondary: 'bg-[#FFD700]',
      secondaryHover: 'hover:bg-[#f4c430]',
      accent: 'bg-[#11235a]',
    },
  };
};
