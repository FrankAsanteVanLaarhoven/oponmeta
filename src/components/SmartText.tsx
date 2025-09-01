import React, { ReactNode, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SmartTextProps {
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  forceContrast?: boolean;
  contrastLevel?: 'AA' | 'AAA'; // WCAG compliance levels
  style?: React.CSSProperties;
}

export const SmartText: React.FC<SmartTextProps> = ({
  children,
  backgroundColor,
  className = '',
  as: Component = 'span',
  forceContrast = false,
  contrastLevel = 'AA',
  style = {},
  ...props
}) => {
  const { getOptimalTextColor, theme, resolvedTheme } = useTheme();
  const [computedStyle, setComputedStyle] = useState<React.CSSProperties>({});
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef && !backgroundColor && !forceContrast) {
      setComputedStyle({});
      return;
    }

    let bgColor = backgroundColor;

    // If no background color provided, get computed background color
    if (!bgColor && elementRef) {
      const computed = window.getComputedStyle(elementRef);
      bgColor = computed.backgroundColor;
      
      // Convert rgb/rgba to hex if needed
      if (bgColor.startsWith('rgb')) {
        const values = bgColor.match(/\d+/g);
        if (values && values.length >= 3) {
          bgColor = `#${parseInt(values[0]).toString(16).padStart(2, '0')}${parseInt(values[1]).toString(16).padStart(2, '0')}${parseInt(values[2]).toString(16).padStart(2, '0')}`;
        }
      }
    }

    if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
      const contrastInfo = getOptimalTextColor(bgColor);
      const minRatio = contrastLevel === 'AAA' ? 7 : 4.5;
      
      if (contrastInfo.contrastRatio >= minRatio || forceContrast) {
        setComputedStyle({
          color: contrastInfo.textColor,
        });
      } else {
        // Fallback to theme-appropriate color if contrast is insufficient
        setComputedStyle({
          color: resolvedTheme === 'dark' ? '#f8fafc' : '#1a1a1a',
        });
      }
    } else {
      // Use theme default colors
      setComputedStyle({
        color: theme === 'light' ? '#1a1a1a' : 
               theme === 'dark' ? '#f8fafc' : 
               'var(--foreground)',
      });
    }
  }, [backgroundColor, elementRef, forceContrast, contrastLevel, getOptimalTextColor, theme, resolvedTheme]);

  const combinedStyle = {
    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...style,
    ...computedStyle,
  };

  return (
    <Component
      ref={setElementRef}
      className={className}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};
