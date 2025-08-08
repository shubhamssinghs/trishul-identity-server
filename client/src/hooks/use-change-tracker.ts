/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

export function useChangeTracker<T>(current: T) {
  const [isDirty, setIsDirty] = useState(false);
  const initialRef = useRef<T>(deepClone(current));

  useEffect(() => {
    setIsDirty(!deepEqual(current, initialRef.current));
  }, [current]);

  const reset = () => {
    initialRef.current = deepClone(current);
    setIsDirty(false);
  };

  return {
    isDirty,
    initial: initialRef.current,
    current,
    reset,
  };
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function deepEqual(a: any, b: any): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}
