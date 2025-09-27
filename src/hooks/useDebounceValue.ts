import { useEffect, useState } from "react";

/**
 * useDebounceValue
 * 
 * Trả về giá trị debounce, tự clear timeout cũ khi gõ liên tục.
 * Thích hợp dùng cho:
 * - Input typing
 * - Search/filter list
 * - Call API sau khi user ngừng gõ
 * 
 * @param initialValue Giá trị ban đầu
 * @param delay Thời gian debounce (ms), mặc định 500ms
 * @param onDebouncedChange Callback chạy khi debounce xong, ví dụ call API
 * @returns { value, setValue, debouncedValue }
 * 
 * @example
 * const { value, setValue, debouncedValue } = useDebounceValue("", 500, (val) => {
 *   console.log("Debounced value:", val); // call API ở đây
 * });
 * <TextInput value={value} onChangeText={setValue} />
 */
export function useDebounceValue<T = string>(
    initialValue: T = undefined as T,
    delay: number = 500,
    onDebouncedChange?: (value: T) => void
) {
    const [value, setValue] = useState<T>(initialValue);
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            onDebouncedChange?.(value);
        }, delay);

        return () => clearTimeout(handler); // tự clear timeout trước đó
    }, [value, delay, onDebouncedChange]);

    return { value, setValue, debouncedValue };
}
