import { useEffect, useState, useCallback } from 'react';

interface UseMakeApiExampleOptions<T> {
    delay?: number; // thời gian delay giả lập API
    immediate?: boolean; // có chạy ngay khi mount không
    mockData: T; // dữ liệu giả
}

interface UseMakeApiExampleReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    execute: () => Promise<T>;
}
/**
 * Giả lập API call với delay và dữ liệu mock
 *
 * @param mockData    Dữ liệu giả lập trả về
 * @param delayMs     Thời gian delay (ms)
 * @param shouldFail  Có muốn giả lập lỗi không (default: false)
 * @returns Promise<T>
 *
 * @example
 * const user = await fakeApi({ name: "John" }, 1000);
 */
export function makeApi<T>(
    mockData: T,
    delayMs: number = 800,
    shouldFail: boolean = false
): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            if (shouldFail && Math.random() < 0.3) {
                reject(new Error("Fake API failed"));
            } else {
                resolve(mockData);
            }
        }, delayMs);

        // Optional cleanup/cancel
        return () => clearTimeout(timer);
    });
}

export function useMakeApiExample<T>(options: UseMakeApiExampleOptions<T>): UseMakeApiExampleReturn<T> {
    const { delay = 800, immediate = true, mockData } = options;
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise((res) => setTimeout(res, delay));
            setData(mockData);
            return mockData;
        } catch (err) {
            const e = err instanceof Error ? err : new Error('Unknown error');
            setError(e);
            throw e;
        } finally {
            setLoading(false);
        }
    }, [delay, mockData]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate]);

    return { data, loading, error, execute };
}