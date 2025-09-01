import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ContrastInfo {
  backgroundColor: string;
  textColor: string;
  contrastRatio: number;
  isAccessible: boolean;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
  isSystemDark: boolean;
  toggleTheme: () => void;
  cycleTheme: () => void;
  getContrastColor: (backgroundColor: string) => string;
  calculateContrast: (color1: string, color2: string) => number;
  getOptimalTextColor: (backgroundColor: string) => ContrastInfo;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Utility functions for color contrast calculation
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (lum1: number, lum2: number): number => {
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'theme-preference'
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    updateSystemTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  // Load saved theme preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    setMounted(true);
  }, [storageKey]);

  const resolvedTheme: 'light' | 'dark' = theme === 'system' ? systemTheme : theme;
  const isSystemDark = systemTheme === 'dark';

  // Calculate contrast between two colors
  const calculateContrast = useCallback((color1: string, color2: string): number => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 1;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    return getContrastRatio(lum1, lum2);
  }, []);

  // Get optimal text color for given background
  const getContrastColor = useCallback((backgroundColor: string): string => {
    const rgb = hexToRgb(backgroundColor);
    if (!rgb) return resolvedTheme === 'dark' ? '#f8fafc' : '#1a1a1a';
    
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    
    // Use WCAG AA standard (4.5:1) as threshold
    return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
  }, [resolvedTheme]);

  // Get detailed contrast information
  const getOptimalTextColor = useCallback((backgroundColor: string): ContrastInfo => {
    const whiteContrast = calculateContrast(backgroundColor, '#ffffff');
    const blackContrast = calculateContrast(backgroundColor, '#1a1a1a');
    
    const useWhite = whiteContrast > blackContrast;
    const textColor = useWhite ? '#ffffff' : '#1a1a1a';
    const contrastRatio = useWhite ? whiteContrast : blackContrast;
    
    return {
      backgroundColor,
      textColor,
      contrastRatio,
      isAccessible: contrastRatio >= 4.5 // WCAG AA standard
    };
  }, [calculateContrast]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');
    
    // Apply new theme
    root.setAttribute('data-theme', theme);
    root.classList.add(resolvedTheme);
    
    // Set color-scheme for system theme
    if (theme === 'system') {
      root.style.colorScheme = 'light dark';
    } else {
      root.style.colorScheme = theme;
    }
    
    // Save theme preference
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }

    // Dispatch theme change event
    const event = new CustomEvent('themeChange', {
      detail: { theme, resolvedTheme, systemTheme }
    });
    window.dispatchEvent(event);
  }, [theme, resolvedTheme, mounted, storageKey, systemTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  const cycleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    isSystemDark,
    toggleTheme,
    cycleTheme,
    getContrastColor,
    calculateContrast,
    getOptimalTextColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
