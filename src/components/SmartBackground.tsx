import React, { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SmartText } from './SmartText';

interface SmartBackgroundProps {
  children: ReactNode;
  lightBg?: string;
  darkBg?: string;
  originalBg?: string;
  className?: string;
  forceWhiteInLight?: boolean;
  autoTextContrast?: boolean;
  textContrastLevel?: 'AA' | 'AAA';
}

export const SmartBackground: React.FC<SmartBackgroundProps> = ({
  children,
  lightBg = 'bg-white',
  darkBg,
  originalBg,
  className = '',
  forceWhiteInLight = true,
  autoTextContrast = true,
  textContrastLevel = 'AA'
}) => {
  const { theme, resolvedTheme, getOptimalTextColor } = useTheme();

  const getBackgroundClass = () => {
    if (theme === 'light' && forceWhiteInLight) {
      return 'bg-white';
    }
    
    if (resolvedTheme === 'dark' && darkBg) {
      return darkBg;
    }
    
    if (originalBg && (theme === 'dark' || theme === 'system')) {
      return originalBg;
    }
    
    return lightBg;
  };

  const backgroundClass = getBackgroundClass();

  // Extract background color for contrast calculation
  const getBackgroundColor = () => {
    if (theme === 'light' && forceWhiteInLight) return '#ffffff';
    
    // Map Tailwind classes to hex values (extend as needed)
    const colorMap: { [key: string]: string } = {
      'bg-white': '#ffffff',
      'bg-black': '#000000',
      'bg-gray-50': '#f9fafb',
      'bg-gray-100': '#f3f4f6',
      'bg-gray-800': '#1f2937',
      'bg-gray-900': '#111827',
      'bg-blue-600': '#2563eb',
      'bg-blue-800': '#1e40af',
      'bg-indigo-600': '#4f46e5',
      'bg-purple-600': '#9333ea',
      // Add more as needed
    };

    return colorMap[backgroundClass] || '#ffffff';
  };

  const backgroundColor = getBackgroundColor();

  if (autoTextContrast) {
    return (
      <div 
        className={`${backgroundClass} transition-colors duration-300 ${className}`}
        style={{ backgroundColor }}
      >
        <SmartText
          backgroundColor={backgroundColor}
          contrastLevel={textContrastLevel}
          forceContrast
          className="w-full h-full"
          as="div"
        >
          {children}
        </SmartText>
      </div>
    );
  }

  return (
    <div className={`${backgroundClass} transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};
