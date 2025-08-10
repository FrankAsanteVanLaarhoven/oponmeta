import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Debounce hook for performance optimization
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for performance optimization
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Memoized calculation hook
export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T => {
  return useCallback(callback, dependencies);
};

// Performance observer hook for monitoring
export const usePerformanceObserver = () => {
  const [metrics, setMetrics] = useState<{
    navigationTiming?: PerformanceNavigationTiming;
    paintTiming?: PerformanceEntry[];
  }>({});

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Get navigation timing
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Get paint timing
      const paintTiming = performance.getEntriesByType('paint');
      
      setMetrics({
        navigationTiming,
        paintTiming,
      });

      // Observe new paint entries
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          setMetrics(prev => ({
            ...prev,
            paintTiming: [...(prev.paintTiming || []), ...entries],
          }));
        });

        try {
          observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        } catch (e) {
          // Some browsers may not support all entry types
          console.warn('Performance Observer not fully supported');
        }

        return () => observer.disconnect();
      }
    }
  }, []);

  return metrics;
};

// Intersection observer hook for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
};

// Prefetch hook for resource preloading
export const usePrefetch = () => {
  const prefetchedResources = useRef(new Set<string>());

  const prefetch = useCallback((url: string, type: 'script' | 'style' | 'image' = 'script') => {
    if (prefetchedResources.current.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    
    if (type === 'style') {
      link.as = 'style';
    } else if (type === 'image') {
      link.as = 'image';
    } else {
      link.as = 'script';
    }

    document.head.appendChild(link);
    prefetchedResources.current.add(url);
  }, []);

  return { prefetch };
};