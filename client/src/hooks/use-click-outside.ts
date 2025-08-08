/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

type UseClickOutsideOptions = {
  handler: (event: MouseEvent | TouchEvent) => void;
  enabled?: boolean;
};

export function useClickOutside<T extends HTMLElement>(
  options: UseClickOutsideOptions
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!options.enabled) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      options.handler(event);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [options.enabled, options.handler]);

  return ref;
}
