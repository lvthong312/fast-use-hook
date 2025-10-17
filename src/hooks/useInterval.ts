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
interface IOptions {
    delay: number | null
    stop?: boolean | null
}
export function useInterval(callback: () => void, options: IOptions) {
    const id = useRef<any>(null)
    useEffect(() => {
        if (options?.delay === null) return;
        if (options?.stop === true) {
            clearInterval(id?.current)
            return;
        }
        id.current = setInterval(() => callback?.(), options?.delay);
        return () => clearInterval(id?.current); // clear khi unmount hoặc delay thay đổi
    }, [options?.delay, options?.stop]);
}
