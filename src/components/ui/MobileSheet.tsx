import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTouch } from '@/hooks/useTouch';

interface MobileSheetProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  title?: string;
  className?: string;
  fullHeight?: boolean;
  showCloseButton?: boolean;
  showDragHandle?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  preventClose?: boolean;
}

export const MobileSheet: React.FC<MobileSheetProps> = ({
  trigger,
  children,
  side = 'bottom',
  title,
  className = '',
  fullHeight = false,
  showCloseButton = true,
  showDragHandle = true,
  onOpen,
  onClose,
  preventClose = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Touch handling for drag interactions
  const { touchHandlers, swipeState } = useTouch({
    onSwipe: (direction, distance) => {
      if (side === 'bottom' && direction === 'down' && distance > 100) {
        handleClose();
      } else if (side === 'top' && direction === 'up' && distance > 100) {
        handleClose();
      } else if (side === 'left' && direction === 'left' && distance > 100) {
        handleClose();
      } else if (side === 'right' && direction === 'right' && distance > 100) {
        handleClose();
      }
    },
    threshold: 50
  });

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const handleClose = () => {
    if (preventClose) return;
    setIsOpen(false);
    onClose?.();
  };

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Side-specific classes
  const getSideClasses = () => {
    const baseClasses = 'fixed z-50 bg-white shadow-mobile-lg';
    
    switch (side) {
      case 'top':
        return cn(
          baseClasses,
          'top-0 left-0 right-0',
          fullHeight ? 'h-full' : 'max-h-[90vh]',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        );
      case 'right':
        return cn(
          baseClasses,
          'top-0 right-0 bottom-0',
          fullHeight ? 'w-full' : 'max-w-[90vw]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        );
      case 'bottom':
        return cn(
          baseClasses,
          'bottom-0 left-0 right-0',
          fullHeight ? 'h-full' : 'max-h-[90vh]',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        );
      case 'left':
        return cn(
          baseClasses,
          'top-0 left-0 bottom-0',
          fullHeight ? 'w-full' : 'max-w-[90vw]',
          isOpen ? '-translate-x-0' : '-translate-x-full'
        );
      default:
        return baseClasses;
    }
  };

  const getDragHandleClasses = () => {
    switch (side) {
      case 'top':
        return 'bottom-0 left-1/2 transform -translate-x-1/2';
      case 'right':
        return 'left-0 top-1/2 transform -translate-y-1/2';
      case 'bottom':
        return 'top-0 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'right-0 top-1/2 transform -translate-y-1/2';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Trigger */}
      <div onClick={handleOpen} className="cursor-pointer">
        {trigger}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={handleClose}
        />
      )}

      {/* Sheet */}
      <div
        className={cn(
          getSideClasses(),
          'transition-transform duration-300 ease-out',
          className
        )}
        style={{
          transform: isDragging ? `translateY(${dragOffset}px)` : undefined
        }}
        {...touchHandlers}
      >
        {/* Header */}
        {(title || showCloseButton || showDragHandle) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {/* Drag Handle */}
            {showDragHandle && (
              <div className={cn(
                'absolute w-12 h-1 bg-gray-300 rounded-full',
                getDragHandleClasses()
              )} />
            )}

            {/* Title */}
            {title && (
              <h3 className="text-lg font-semibold text-black flex-1 text-center">
                {title}
              </h3>
            )}

            {/* Close Button */}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close sheet"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(
          'flex flex-col h-full',
          fullHeight ? 'h-full' : 'max-h-full',
          'safe-area-inset-bottom',
          'pb-safe-bottom'
        )}>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Specialized sheet variants
export const BottomSheet: React.FC<Omit<MobileSheetProps, 'side'>> = (props) => (
  <MobileSheet side="bottom" {...props} />
);

export const TopSheet: React.FC<Omit<MobileSheetProps, 'side'>> = (props) => (
  <MobileSheet side="top" {...props} />
);

export const SideSheet: React.FC<Omit<MobileSheetProps, 'side'> & { side: 'left' | 'right' }> = ({ side, ...props }) => (
  <MobileSheet side={side} {...props} />
);

export const FullScreenSheet: React.FC<Omit<MobileSheetProps, 'side' | 'fullHeight'>> = (props) => (
  <MobileSheet side="bottom" fullHeight {...props} />
);
