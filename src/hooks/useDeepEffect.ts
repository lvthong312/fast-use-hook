import { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";

/**
 * useDeepEffect
 * Giống useEffect nhưng dependencies được so sánh deep.
 */
export function useDeepEffect(
    effect: React.EffectCallback,
    deps: any[]
): void {
    const ref = useRef<any[]>([]);

    if (!isEqual(ref.current, deps)) {
        ref.current = deps;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, ref.current);
}
