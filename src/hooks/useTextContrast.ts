import { useTheme } from '../context/ThemeContext';
import { useMemo } from 'react';

export const useTextContrast = (backgroundColor?: string) => {
  const { getOptimalTextColor, calculateContrast, resolvedTheme } = useTheme();

  return useMemo(() => {
    if (!backgroundColor) {
      return {
        color: resolvedTheme === 'dark' ? '#f8fafc' : '#1a1a1a',
        contrastRatio: 21, // Maximum possible ratio
        isAccessible: true,
      };
    }

    const contrastInfo = getOptimalTextColor(backgroundColor);
    
    return {
      color: contrastInfo.textColor,
      contrastRatio: contrastInfo.contrastRatio,
      isAccessible: contrastInfo.isAccessible,
      backgroundColor,
    };
  }, [backgroundColor, getOptimalTextColor, resolvedTheme]);
};
