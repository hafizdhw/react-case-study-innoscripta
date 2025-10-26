import { useEffect, useState } from "react";

export function useListenLocalStorage(key: string): string | null {
  const [value, setValue] = useState<string | null>(() => {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
  });

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.storageArea === localStorage && event.key === key) {
        setValue(event.newValue);
      }
    }

    window.addEventListener("storage", handleStorage);

    // Listen also for same-tab changes
    function checkLocalChange() {
      setValue(localStorage.getItem(key));
    }

    window.addEventListener("localstorage-update", checkLocalChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("localstorage-update", checkLocalChange);
    };
  }, [key]);

  return value;
}
