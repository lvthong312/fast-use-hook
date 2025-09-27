import { useMemo, useRef } from "react";

/**
 * useDebounceCallback
 * 
 * Debounce một callback function: 
 * - Callback chỉ được gọi sau khi ngừng gọi liên tục trong `delay` ms.
 * - Thích hợp cho: input typing, API call, search, scroll event,...
 * 
 * @param callback Hàm gốc cần debounce
 * @param delay Thời gian debounce (ms)
 * @returns Callback đã debounce
 * 
 * @example
 * const handleChange = useDebounceCallback((text) => console.log(text), 500);
 * <TextInput onChangeText={handleChange} />
 */
export function useDebounceCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number = 500
): T {
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);

    return useMemo(() => {
        const debounced = ((...args: any[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        }) as T;

        return debounced;
    }, [callback, delay]);
}
