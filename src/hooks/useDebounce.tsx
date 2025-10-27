import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a value and optionally executes a callback
 * 
 * This hook is useful for optimizing performance by delaying the execution
 * of expensive operations (like API calls or complex calculations) until
 * the user has stopped making changes for a specified delay period.
 * 
 * Common use cases:
 * - Search input fields (wait for user to stop typing)
 * - Form validation (avoid validating on every keystroke)
 * - API calls triggered by user input
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds before updating the debounced value
 * @param callback - Optional callback function to execute when debounced value changes
 * @returns Object containing the debounced value
 */
export const useDebounce = <T,>(
  value: T,
  delay: number,
  callback?: (value: T) => void
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Update debounced value after the specified delay
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  // Execute callback when debounced value changes
  useEffect(() => {
    callback?.(debouncedValue);
  }, [debouncedValue]);

  return { debouncedValue };
};
