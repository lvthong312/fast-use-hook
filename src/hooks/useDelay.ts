import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook tạo delay có thể:
 * - await trong async function
 * - cancel giữa chừng
 * - theo dõi trạng thái isWaiting (loading)
 */
export function useDelay() {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isWaiting, setIsWaiting] = useState(false);

    /** Gây trễ ms mili-giây (await được) */
    const delay = useCallback((ms: number): Promise<void> => {
        cancel(); // clear delay cũ nếu có
        setIsWaiting(true);

        return new Promise<void>((resolve, reject) => {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                setIsWaiting(false);
                resolve();
            }, ms);

            // Nếu cancel được gọi → reject promise
            const cancelHandler = () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                    setIsWaiting(false);
                    reject(new Error('Delay cancelled'));
                }
            };

            // Gắn cancelHandler để gọi được trong cancel()
            (cancel as any)._handler = cancelHandler;
        });
    }, []);

    /** Hủy delay hiện tại */
    const cancel = useCallback(() => {
        const handler = (cancel as any)._handler;
        if (handler) handler();
    }, []);

    // Cleanup khi component unmount
    useEffect(() => cancel, [cancel]);

    return { delay, cancel, isWaiting };
}
