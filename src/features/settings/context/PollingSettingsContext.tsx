import React, { createContext, useContext, ReactNode } from 'react';
import { useListenLocalStorage } from '../../../hooks/useListenLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../../../utils/constant';

export interface PollingSettingsContextType {
  pollingInterval: number;
  setPollingInterval: (interval: number) => void;
}

const PollingSettingsContext = createContext<PollingSettingsContextType | undefined>(undefined);

interface PollingSettingsProviderProps {
  children: ReactNode;
}

export const PollingSettingsProvider = ({ children }: PollingSettingsProviderProps) => {
  // Listen to localStorage changes for polling interval
  const pollingIntervalValue = useListenLocalStorage(LOCAL_STORAGE_KEYS.POLLING_INTERVAL);
  
  // Parse the stored value, default to 10 seconds if not set or invalid
  const pollingInterval = pollingIntervalValue ? parseInt(pollingIntervalValue, 10) : 10;
  
  const setPollingInterval = (interval: number) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.POLLING_INTERVAL, interval.toString());
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('localstorage-update'));
  };

  const value: PollingSettingsContextType = {
    pollingInterval: isNaN(pollingInterval) ? 10 : pollingInterval,
    setPollingInterval,
  };

  return (
    <PollingSettingsContext.Provider value={value}>
      {children}
    </PollingSettingsContext.Provider>
  );
};

export const usePollingSettings = (): PollingSettingsContextType => {
  const context = useContext(PollingSettingsContext);
  if (context === undefined) {
    throw new Error('usePollingSettings must be used within a PollingSettingsProvider');
  }
  return context;
};
