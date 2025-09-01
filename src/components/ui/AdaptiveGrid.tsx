import React from 'react';
import { cn } from '@/lib/utils';

interface AdaptiveGridProps {
  children: React.ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
    wide?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  autoFit?: boolean;
  autoFill?: boolean;
}

export const AdaptiveGrid: React.FC<AdaptiveGridProps> = ({ 
  children, 
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = '',
  as: Component = 'div',
  autoFit = false,
  autoFill = false
}) => {
  const gapClasses = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  // Auto-fit/fill grid for responsive behavior
  if (autoFit || autoFill) {
    const gridStyle = autoFit 
      ? `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
      : `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`;

    return (
      <Component 
        className={cn(
          'grid w-full',
          gapClasses[gap],
          className
        )}
        style={{ 
          gridTemplateColumns: autoFit 
            ? 'repeat(auto-fit, minmax(280px, 1fr))'
            : 'repeat(auto-fill, minmax(280px, 1fr))'
        }}
      >
        {children}
      </Component>
    );
  }

  // Traditional responsive grid
  const gridClasses = [
    `grid-cols-${columns.mobile}`,
    `sm:grid-cols-${columns.mobile}`,
    `md:grid-cols-${columns.tablet}`,
    `lg:grid-cols-${columns.desktop}`,
    columns.wide ? `xl:grid-cols-${columns.wide}` : ''
  ].filter(Boolean);

  return (
    <Component 
      className={cn(
        'grid w-full',
        gridClasses,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </Component>
  );
};

// Predefined grid layouts
export const CourseGrid: React.FC<Omit<AdaptiveGridProps, 'columns'>> = (props) => (
  <AdaptiveGrid 
    columns={{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }} 
    gap="lg"
    {...props} 
  />
);

export const CardGrid: React.FC<Omit<AdaptiveGridProps, 'columns'>> = (props) => (
  <AdaptiveGrid 
    columns={{ mobile: 1, tablet: 2, desktop: 3 }} 
    gap="md"
    {...props} 
  />
);

export const FeatureGrid: React.FC<Omit<AdaptiveGridProps, 'columns'>> = (props) => (
  <AdaptiveGrid 
    columns={{ mobile: 1, tablet: 2, desktop: 4 }} 
    gap="lg"
    {...props} 
  />
);

export const AutoGrid: React.FC<Omit<AdaptiveGridProps, 'columns'>> = (props) => (
  <AdaptiveGrid 
    autoFit 
    gap="md"
    {...props} 
  />
);

export const MasonryGrid: React.FC<Omit<AdaptiveGridProps, 'columns'>> = (props) => (
  <AdaptiveGrid 
    autoFill 
    gap="sm"
    {...props} 
  />
);
