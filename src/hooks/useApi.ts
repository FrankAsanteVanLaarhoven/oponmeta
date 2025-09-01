import { useState, useCallback, useRef } from 'react';

export interface ApiResponse<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface UseApiReturn<T> extends ApiResponse<T> {
  execute: (url?: string, options?: ApiOptions) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>(defaultUrl?: string, defaultOptions?: ApiOptions): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (url?: string, options?: ApiOptions): Promise<T | null> => {
    const finalUrl = url || defaultUrl;
    const finalOptions = { ...defaultOptions, ...options };

    if (!finalUrl) {
      setError('URL is required');
      return null;
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithRetry(
        finalUrl,
        finalOptions,
        abortControllerRef.current.signal
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted, don't set error
        return null;
      }
      
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [defaultUrl, defaultOptions]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

// Helper function for retrying requests
async function fetchWithRetry(
  url: string,
  options: ApiOptions,
  signal: AbortSignal
): Promise<Response> {
  const { retries = 3, retryDelay = 1000, timeout = 10000, ...fetchOptions } = options;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: AbortSignal.any([signal, controller.signal]),
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : undefined,
      });

      clearTimeout(timeoutId);

      if (response.ok || attempt === retries) {
        return response;
      }

      // Wait before retrying
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
      }
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }

  throw new Error('Max retries exceeded');
}

// Hook for GET requests
export function useGet<T = any>(url?: string, options?: Omit<ApiOptions, 'method'>) {
  return useApi<T>(url, { ...options, method: 'GET' });
}

// Hook for POST requests
export function usePost<T = any>(url?: string, options?: Omit<ApiOptions, 'method'>) {
  return useApi<T>(url, { ...options, method: 'POST' });
}

// Hook for PUT requests
export function usePut<T = any>(url?: string, options?: Omit<ApiOptions, 'method'>) {
  return useApi<T>(url, { ...options, method: 'PUT' });
}

// Hook for DELETE requests
export function useDelete<T = any>(url?: string, options?: Omit<ApiOptions, 'method'>) {
  return useApi<T>(url, { ...options, method: 'DELETE' });
}

// Hook for PATCH requests
export function usePatch<T = any>(url?: string, options?: Omit<ApiOptions, 'method'>) {
  return useApi<T>(url, { ...options, method: 'PATCH' });
}
