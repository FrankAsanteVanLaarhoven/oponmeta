import { useState, useCallback, useRef, useEffect } from 'react';

interface TouchPosition {
  x: number;
  y: number;
}

interface SwipeState {
  isSwiping: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
  velocity: number;
  startTime: number;
}

interface TouchHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

interface UseTouchOptions {
  threshold?: number;
  velocityThreshold?: number;
  preventDefault?: boolean;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', distance: number) => void;
  onTap?: (position: TouchPosition) => void;
  onLongPress?: (position: TouchPosition) => void;
  longPressDelay?: number;
}

export const useTouch = (options: UseTouchOptions = {}) => {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    preventDefault = false,
    onSwipe,
    onTap,
    onLongPress,
    longPressDelay = 500
  } = options;

  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwiping: false,
    direction: null,
    distance: 0,
    velocity: 0,
    startTime: 0
  });

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const lastTapTime = useRef<number>(0);
  const lastTapPosition = useRef<TouchPosition | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    const position = {
      x: touch.clientX,
      y: touch.clientY
    };

    setTouchStart(position);
    setSwipeState(prev => ({
      ...prev,
      startTime: Date.now(),
      isSwiping: false,
      direction: null,
      distance: 0,
      velocity: 0
    }));

    // Start long press timer
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress(position);
      }, longPressDelay);
    }
  }, [preventDefault, onLongPress, longPressDelay]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;

    if (preventDefault) {
      e.preventDefault();
    }

    // Clear long press timer on movement
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > threshold) {
      const direction = Math.abs(deltaX) > Math.abs(deltaY)
        ? (deltaX > 0 ? 'right' : 'left')
        : (deltaY > 0 ? 'down' : 'up');

      const currentTime = Date.now();
      const timeElapsed = currentTime - swipeState.startTime;
      const velocity = distance / timeElapsed;

      setSwipeState({
        isSwiping: true,
        direction,
        distance,
        velocity,
        startTime: swipeState.startTime
      });
    }
  }, [touchStart, threshold, preventDefault, swipeState.startTime]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const touch = e.changedTouches[0];
    const endPosition = {
      x: touch.clientX,
      y: touch.clientY
    };

    const deltaX = endPosition.x - touchStart.x;
    const deltaY = endPosition.y - touchStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const currentTime = Date.now();
    const timeElapsed = currentTime - swipeState.startTime;
    const velocity = distance / timeElapsed;

    // Determine if it's a swipe or tap
    if (distance > threshold && velocity > velocityThreshold) {
      const direction = Math.abs(deltaX) > Math.abs(deltaY)
        ? (deltaX > 0 ? 'right' : 'left')
        : (deltaY > 0 ? 'down' : 'up');

      if (onSwipe) {
        onSwipe(direction, distance);
      }
    } else if (distance < 10 && timeElapsed < 300) {
      // It's a tap
      const now = Date.now();
      const isDoubleTap = now - lastTapTime.current < 300 && 
        lastTapPosition.current &&
        Math.abs(endPosition.x - lastTapPosition.current.x) < 30 &&
        Math.abs(endPosition.y - lastTapPosition.current.y) < 30;

      if (onTap) {
        onTap(endPosition);
      }

      lastTapTime.current = now;
      lastTapPosition.current = endPosition;
    }

    // Reset state
    setTouchStart(null);
    setSwipeState({
      isSwiping: false,
      direction: null,
      distance: 0,
      velocity: 0,
      startTime: 0
    });
  }, [touchStart, threshold, velocityThreshold, onSwipe, onTap, swipeState.startTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  const touchHandlers: TouchHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };

  return {
    swipeState,
    touchHandlers,
    isTouching: !!touchStart,
    reset: () => {
      setTouchStart(null);
      setSwipeState({
        isSwiping: false,
        direction: null,
        distance: 0,
        velocity: 0,
        startTime: 0
      });
    }
  };
};

// Specialized touch hooks for common use cases
export const useSwipe = (onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void) => {
  return useTouch({
    onSwipe: (direction) => onSwipe(direction),
    threshold: 50
  });
};

export const useTap = (onTap: (position: TouchPosition) => void) => {
  return useTouch({
    onTap,
    threshold: 10
  });
};

export const useLongPress = (onLongPress: (position: TouchPosition) => void, delay = 500) => {
  return useTouch({
    onLongPress,
    longPressDelay: delay
  });
};
