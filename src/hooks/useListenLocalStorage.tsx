import { useEffect, useState } from "react";

/**
 * Custom hook that listens for changes to a localStorage key
 * 
 * This hook provides reactive access to localStorage values by:
 * - Reading the initial value from localStorage
 * - Listening for storage events from other tabs/windows
 * - Listening for custom 'localstorage-update' events from the same tab
 * - Updating the state whenever the localStorage value changes
 * 
 * This is useful for components that need to react to localStorage changes
 * without manually polling or managing event listeners.
 * 
 * @param key - The localStorage key to listen for changes
 * @returns The current value of the localStorage key, or null if not found
 */
export function useListenLocalStorage(key: string): string | null {
  // Initialize state with current localStorage value
  const [value, setValue] = useState<string | null>(() => {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
  });

  useEffect(() => {
    /**
     * Handles storage events from other tabs/windows
     * This fires when localStorage is modified in a different tab
     */
    function handleStorage(event: StorageEvent) {
      if (event.storageArea === localStorage && event.key === key) {
        setValue(event.newValue);
      }
    }

    // Listen for cross-tab storage changes
    window.addEventListener("storage", handleStorage);

    /**
     * Handles localStorage changes within the same tab
     * This is needed because the 'storage' event only fires for cross-tab changes
     */
    function checkLocalChange() {
      setValue(localStorage.getItem(key));
    }

    // Listen for same-tab changes via custom event
    window.addEventListener("localstorage-update", checkLocalChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("localstorage-update", checkLocalChange);
    };
  }, [key]);

  return value;
}
