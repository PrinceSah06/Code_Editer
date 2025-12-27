import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [useDebouncedvalue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setInterval(
      () => {
        setDebounceValue(value);
      },

      delay
    );
    return () => clearInterval(handler);
  }, [value, delay]);

  return useDebouncedvalue;
}
