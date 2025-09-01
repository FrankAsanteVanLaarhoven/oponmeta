import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  safeArea?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'lg', 
  className = '',
  as: Component = 'div',
  padding = 'md',
  safeArea = false
}) => {
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  };

  const safeAreaClasses = safeArea ? 'pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right' : '';

  return (
    <Component 
      className={cn(
        'mx-auto w-full',
        sizeClasses[size],
        paddingClasses[padding],
        safeAreaClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};

// Specialized container variants
export const PageContainer: React.FC<Omit<ContainerProps, 'size'>> = (props) => (
  <Container size="lg" {...props} />
);

export const ContentContainer: React.FC<Omit<ContainerProps, 'size'>> = (props) => (
  <Container size="md" {...props} />
);

export const MobileContainer: React.FC<Omit<ContainerProps, 'size'>> = (props) => (
  <Container size="sm" safeArea {...props} />
);

export const FullWidthContainer: React.FC<Omit<ContainerProps, 'size'>> = (props) => (
  <Container size="full" {...props} />
);
