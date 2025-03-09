import { useState, useEffect } from 'react';
import { FlowApiClient } from './FlowApiClient';
import { getAuthToken } from './AuthStorage';

// Singleton instance of the API client
const apiClient = new FlowApiClient();

interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T>(
  apiMethod: (client: FlowApiClient, ...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(options.immediate === true);

  const execute = async (...args: any[]): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if token exists before making the request
      
      
      const result = await apiMethod(apiClient, ...args);
      const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;
      setData(parsedResult);
      options.onSuccess?.(parsedResult);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute().catch(console.error);
    }
  }, []);

  return {
    data,
    error,
    loading,
    execute,
  };
}