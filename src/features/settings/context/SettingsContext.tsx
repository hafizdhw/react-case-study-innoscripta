import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useListenLocalStorage } from "../../../hooks/useListenLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../../utils/constant";

export interface SettingsContextType {
  pollingInterval: number;
  setPollingInterval: (interval: number) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  // Listen to localStorage changes for polling interval
  const pollingIntervalValue = useListenLocalStorage(
    LOCAL_STORAGE_KEYS.POLLING_INTERVAL
  );
  // Listen to localStorage changes for dark mode
  const darkModeValue = useListenLocalStorage(LOCAL_STORAGE_KEYS.DARK_MODE);

  // Parse the stored values with defaults
  const pollingInterval = pollingIntervalValue
    ? parseInt(pollingIntervalValue, 10)
    : 10;
  const darkMode = darkModeValue === "true";

  const setPollingInterval = (interval: number) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.POLLING_INTERVAL,
      interval.toString()
    );
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("localstorage-update"));
  };

  const setDarkMode = (enabled: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DARK_MODE, enabled.toString());
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("localstorage-update"));
  };

  // Apply dark mode class to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const value: SettingsContextType = {
    pollingInterval: isNaN(pollingInterval) ? 10 : pollingInterval,
    setPollingInterval,
    darkMode,
    setDarkMode,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
