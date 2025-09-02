import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const touchButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-primary',
        link: 'text-primary underline-offset-4 hover:underline focus:ring-primary',
        // Mobile-specific variants
        mobile: 'bg-oponm-600 text-white hover:bg-oponm-700 focus:ring-oponm-500 shadow-mobile',
        'mobile-secondary': 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
        'mobile-ghost': 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-8 text-lg',
        // Touch-optimised sizes
        touch: 'min-h-[44px] min-w-[44px] px-4 py-2 text-base',
        'touch-lg': 'min-h-[48px] min-w-[48px] px-6 py-3 text-lg',
        'touch-xl': 'min-h-[56px] min-w-[56px] px-8 py-4 text-xl',
        // Mobile-specific sizes
        mobile: 'min-h-[44px] px-6 py-3 text-base font-semibold',
        'mobile-lg': 'min-h-[48px] px-8 py-4 text-lg font-semibold',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      rounded: 'default',
    },
  }
);

export interface TouchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof touchButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const TouchButton = React.forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    rounded,
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(touchButtonVariants({ variant, size, fullWidth, rounded, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

TouchButton.displayName = 'TouchButton';

// Specialized button variants for mobile
export const MobileButton: React.FC<Omit<TouchButtonProps, 'variant' | 'size'>> = (props) => (
  <TouchButton variant="mobile" size="mobile" {...props} />
);

export const MobileSecondaryButton: React.FC<Omit<TouchButtonProps, 'variant' | 'size'>> = (props) => (
  <TouchButton variant="mobile-secondary" size="mobile" {...props} />
);

export const TouchButtonLarge: React.FC<Omit<TouchButtonProps, 'size'>> = (props) => (
  <TouchButton size="touch-lg" {...props} />
);

export const FullWidthButton: React.FC<Omit<TouchButtonProps, 'fullWidth'>> = (props) => (
  <TouchButton fullWidth {...props} />
);

export { TouchButton };
export { touchButtonVariants };
