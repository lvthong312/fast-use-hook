import { useCallback, useEffect, useState } from "react";

interface UseAsyncOptions {
  immediate?: boolean; // có chạy ngay khi mount không
}

interface UseAsyncReturn<T, A extends any[]> {
  execute: (...args: A) => Promise<T | undefined>;
  loading: boolean;
  error: Error | null;
  value: T | null;
}

/**
 * useAsync
 * 
 * Quản lý state (loading, error, value) cho async function.
 * Thích hợp dùng cho:
 * - Fetch API
 * - Async action khi mount hoặc khi người dùng trigger
 * 
 * @param asyncFunction Hàm async cần quản lý
 * @param options.immediate true nếu muốn chạy ngay khi mount
 * @returns { execute, loading, error, value }
 * 
 * @example
 * const { execute, loading, error, value } = useAsync(async (id) => {
 *   const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
 *   return res.json();
 * }, { immediate: true });
 */
export function useAsync<T, A extends any[]>(
  asyncFunction: (...args: A) => Promise<T>,
  options: UseAsyncOptions = {}
): UseAsyncReturn<T, A> {
  const { immediate = false } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [value, setValue] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: A | any) => {
      if (!asyncFunction) {
        setValue(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setValue(response);
        return response;
      } catch (err) {
        setError(err as Error);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { execute, loading, error, value };
}
