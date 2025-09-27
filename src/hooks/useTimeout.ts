import { useEffect, useRef } from "react";

/**
 * useTimeout
 * 
 * Giống `setTimeout` nhưng tích hợp vào React hook:
 * - Gọi callback sau `delay` ms
 * - Tự clear khi unmount hoặc khi delay thay đổi
 * 
 * Thích hợp dùng cho:
 * - Hiển thị toast/timer
 * - Delay hành động sau animation hoặc input
 * 
 * @param callback Hàm được gọi sau delay
 * @param delay Thời gian chờ (ms). Nếu null, timeout không chạy
 * 
 * @example
 * useTimeout(() => console.log("Hello after 1s"), 1000);
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // cập nhật callback mới nhất
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
