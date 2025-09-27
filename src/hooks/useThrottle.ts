import { useEffect, useRef, useState } from "react";

/**
 * useThrottle
 * 
 * Trả về giá trị được throttle: giá trị chỉ được cập nhật **tối đa 1 lần trong mỗi `delay` ms**.
 * Thích hợp dùng cho:
 * - Scroll position
 * - Input gõ liên tục nhưng chỉ muốn update state sau 1 khoảng
 * - Event liên tục nhưng muốn giảm số lần re-render
 * 
 * @param value Giá trị gốc
 * @param delay Thời gian throttle (ms)
 * @returns Giá trị đã throttle
 * 
 * @example
 * const throttledValue = useThrottle(searchText, 1000);
 * // searchText thay đổi liên tục, nhưng throttledValue chỉ update mỗi 1s
 */
export function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastExecuted.current >= delay) {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }
    }, delay - (Date.now() - lastExecuted.current));

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
}
