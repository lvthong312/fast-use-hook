import { useCallback, useEffect, useState } from "react";

interface UseMultipleAsyncOptions {
  immediate?: boolean; // có chạy ngay khi mount không
  onSuccess?: (data: any) => void
}

// interface AsyncResult<T> {
//   value: T | null;
//   error: Error | null;
// }

interface UseMultipleAsyncReturn<T> {
  execute: () => Promise<(T | undefined)[]>;
  loading: boolean;
  data: (T | null)[];
  errors: (Error | null)[];
}

/**
 * useMultipleAsync
 *
 * Chạy nhiều async function song song (Promise.allSettled)
 * và quản lý state loading, error, value cho từng function.
 *
 * @param asyncFunctions Danh sách các async function không có tham số
 * @param options.immediate true nếu muốn chạy ngay khi mount
 *
 * @example
 * const { data, errors, loading, execute } = useMultipleAsync([
 *   () => fetchUser(),
 *   () => fetchPosts(),
 * ], { immediate: true });
 *
 * const [user, posts] = data;
 */
export function useMultipleAsync<T>(
  asyncFunctions?: Array<any> | null | undefined,
  options: UseMultipleAsyncOptions = {},
  deps = []
): UseMultipleAsyncReturn<T> {
  const { immediate = false, onSuccess } = options;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<(T | null)[]>([]);
  const [errors, setErrors] = useState<(Error | null)[]>([]);

  const execute = useCallback(async () => {
    if (!asyncFunctions || asyncFunctions.length === 0) {
      setData([]);
      setErrors([]);
      return [];
    }

    setLoading(true);
    try {
      const settled = await Promise.allSettled(asyncFunctions);
      const values: (T | null)[] = [];
      const errs: (Error | null)[] = [];

      for (const r of settled) {
        if (r.status === "fulfilled") {
          values.push(r?.value as T);
          errs.push(null);
        } else {
          values.push(null);
          errs.push(r.reason as Error);
        }
      }
      if(onSuccess && typeof onSuccess === 'function') {
        onSuccess(values)
      }
      setData(values);
      setErrors(errs);
      return values.map(v => v ?? undefined);
    } finally {
      setLoading(false);
    }
  }, [...deps]);

  useEffect(() => {
    if (immediate) execute();
  }, [immediate, ...deps]);

  return { execute, loading, data, errors };
}
