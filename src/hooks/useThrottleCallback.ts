import { useMemo, useRef } from "react";

/**
 * useThrottleCallback
 * 
 * Trả về **callback được throttle**: chỉ được gọi tối đa **1 lần trong mỗi `delay` ms**.
 * Thích hợp dùng cho:
 * - Button nhấn nhiều lần nhưng muốn giới hạn số lần trigger
 * - Scroll event, resize event hoặc input liên tục
 * 
 * @param callback Hàm gốc
 * @param delay Thời gian throttle (ms)
 * @returns Callback đã throttle
 * 
 * @example
 * const handlePress = useThrottleCallback(() => console.log("Clicked!"), 1000);
 * // Khi nhấn button liên tục, log chỉ chạy 1 lần mỗi 1 giây
 */
export function useThrottleCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number = 500
): T {
    const lastExecuted = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    return useMemo(() => {
        const throttled = ((...args: any[]) => {
            const now = Date.now();
            const remaining = delay - (now - lastExecuted.current);

            if (remaining <= 0) {
                lastExecuted.current = now;
                callback(...args);
            } else {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    lastExecuted.current = Date.now();
                    callback(...args);
                }, remaining);
            }
        }) as T;

        return throttled;
    }, [callback, delay]);
}
