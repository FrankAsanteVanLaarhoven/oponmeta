// Core hooks
export { useCourseFilters } from './useCourseFilters';
export { useMultilingualContent, useContentBySlug, useContentStats } from './useMultilingualContent';
export { useLocalStorage, useLocalStorageMulti, useSessionStorage } from './useLocalStorage';
export { useApi, useGet, usePost, usePut, useDelete, usePatch } from './useApi';
export { useDebounce, useDebouncedCallback, useThrottle, useThrottledValue } from './useDebounce';

// Performance hooks
export { default as usePerformance } from './use-performance';

// Toast hooks
export { useToast } from './use-toast';

// Mobile hooks
export { useMobile } from './use-mobile';

// Additional utility hooks
export { usePrevious } from './usePrevious';
export { useInterval } from './useInterval';
export { useTimeout } from './useTimeout';
export { useClickOutside } from './useClickOutside';
export { useKeyPress } from './useKeyPress';
export { useScrollPosition } from './useScrollPosition';
export { useWindowSize } from './useWindowSize';
export { useMediaQuery } from './useMediaQuery';
