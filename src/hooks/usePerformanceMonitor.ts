import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(0);
  const metrics = useRef<PerformanceMetrics>({
    renderTime: 0,
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
  });

  const startRender = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  const endRender = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current;
    metrics.current.renderCount++;
    metrics.current.lastRenderTime = renderTime;
    metrics.current.renderTime = renderTime;
    
    // Calculate running average
    metrics.current.averageRenderTime = 
      (metrics.current.averageRenderTime * (metrics.current.renderCount - 1) + renderTime) / 
      metrics.current.renderCount;

    // Log performance warnings
    if (renderTime > 16.67) { // 60fps threshold
      console.warn(`🚨 Performance Warning: ${componentName} took ${renderTime.toFixed(2)}ms to render (target: <16.67ms)`);
    }

    // Log metrics every 10 renders
    if (metrics.current.renderCount % 10 === 0) {
      console.log(`📊 ${componentName} Performance Metrics:`, {
        renderCount: metrics.current.renderCount,
        averageRenderTime: metrics.current.averageRenderTime.toFixed(2) + 'ms',
        lastRenderTime: metrics.current.lastRenderTime.toFixed(2) + 'ms',
      });
    }
  }, [componentName]);

  useEffect(() => {
    startRender();
    endRender();
  });

  return {
    metrics: metrics.current,
    startRender,
    endRender,
  };
};

// Hook for measuring specific operations
export const useOperationTimer = (operationName: string) => {
  const startTime = useRef<number>(0);

  const startOperation = useCallback(() => {
    startTime.current = performance.now();
  }, []);

  const endOperation = useCallback(() => {
    const duration = performance.now() - startTime.current;
    console.log(`⏱️ ${operationName} took ${duration.toFixed(2)}ms`);
    return duration;
  }, [operationName]);

  return { startOperation, endOperation };
};

// Hook for measuring API call performance
export const useAPIPerformance = () => {
  const apiMetrics = useRef<Map<string, { count: number; totalTime: number; averageTime: number }>>(new Map());

  const measureAPI = useCallback(async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const duration = performance.now() - startTime;
      
      // Update metrics
      const current = apiMetrics.current.get(endpoint) || { count: 0, totalTime: 0, averageTime: 0 };
      current.count++;
      current.totalTime += duration;
      current.averageTime = current.totalTime / current.count;
      apiMetrics.current.set(endpoint, current);

      // Log slow API calls
      if (duration > 1000) {
        console.warn(`🐌 Slow API Call: ${endpoint} took ${duration.toFixed(2)}ms`);
      }

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`❌ API Error: ${endpoint} failed after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  }, []);

  const getAPIMetrics = useCallback(() => {
    return Object.fromEntries(apiMetrics.current);
  }, []);

  return { measureAPI, getAPIMetrics };
};



