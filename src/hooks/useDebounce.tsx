import { useEffect, useRef, useState } from "react";

/**
 * A custom hook for debouncing a value.
 *
 * This hook delays updating the returned value until a specified amount of time has passed
 * since the last change to the input value. It is commonly used to optimize performance
 * by reducing the frequency of expensive operations triggered by user input, such as API calls.
 *
 * @template T The type of the value to debounce. Can be any type.
 * @param value The value to debounce.
 * @param delay The delay in milliseconds before the debounced value is updated (default: 0).
 * @returns The debounced value.
 */
export default function useDebounce<T>(value: T, delay: number = 0): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  /**
   * Ref to store the latest value passed to the hook.
   *
   * This is used to compare the current value with the latest value
   * inside the timeout callback to avoid stale closures.
   */
  const latestValueRef = useRef<T>(value);

  useEffect(() => {
    if (delay < 0) {
      console.error("useDebounce: Delay cannot be negative.");
      return;
    }

    latestValueRef.current = value;

    const timerId = setTimeout(() => {
      if (latestValueRef.current === value) {
        setDebouncedValue(latestValueRef.current);
      }
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes.

  return debouncedValue;
}
