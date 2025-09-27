import { useEffect, useRef } from "react";

/**
 * useInterval
 * 
 * Giống `setInterval` nhưng tích hợp vào React hook:
 * - Gọi callback liên tục mỗi `delay` ms
 * - Tự clear khi unmount hoặc khi delay thay đổi
 * 
 * Thích hợp dùng cho:
 * - Timer
 * - Đồng hồ đếm ngược
 * - Polling API định kỳ
 * 
 * @param callback Hàm được gọi mỗi khoảng delay
 * @param delay Khoảng thời gian (ms). Nếu null, interval không chạy
 * 
 * @example
 * useInterval(() => console.log("Tick"), 1000); // log mỗi 1 giây
 */
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // lưu callback mới nhất
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id); // clear khi unmount hoặc delay thay đổi
    }, [delay]);
}
