import { useEffect, useState } from "react";

/**
 * useDebounce
 * 
 * Debounce một giá trị trong một khoảng thời gian nhất định.
 * Thích hợp dùng cho:
 * - Input typing
 * - Search/filter list
 * - Call API sau khi user ngừng gõ
 * 
 * @param value Giá trị cần debounce
 * @param delay Thời gian debounce (ms), mặc định 500ms
 * @returns Giá trị đã debounce
 * 
 * @example
 * const debouncedSearch = useDebounce(searchText, 500);
 * // debouncedSearch chỉ thay đổi sau khi user ngừng gõ 500ms
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // tự clear timeout trước đó
  }, [value, delay]);

  return debouncedValue;
}
