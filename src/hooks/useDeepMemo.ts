import { useRef } from "react";
import isEqual from "lodash/isEqual";

/**
 * useDeepMemo
 * Giống useMemo nhưng dependencies được so sánh deep.
 */
export function useDeepMemo<T>(factory: () => T, deps: any[]): T {
    const ref = useRef<{ deps: any[]; value: T }>(undefined);

    if (!ref.current || !isEqual(ref.current.deps, deps)) {
        ref.current = { deps, value: factory() };
    }

    return ref.current.value;
}
