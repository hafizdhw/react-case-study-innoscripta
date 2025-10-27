import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "./Toaster";

interface ToastContextType {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// Create the context with undefined default value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Hook to access the Toast context
 * 
 * @returns Toast context with all toast management methods
 * @throws Error if used outside of ToastProvider
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

/**
 * ToastProvider component that manages global toast notification state
 * 
 * This provider:
 * - Maintains a list of active toast notifications
 * - Provides methods to show, dismiss, and clear toasts
 * - Generates unique IDs for each toast
 * - Sets sensible defaults for toast properties
 * 
 * @param children - Child components that will have access to toast functionality
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Shows a new toast notification
   * 
   * @param toastData - Toast configuration (without ID, which is auto-generated)
   * @returns The generated toast ID for potential later dismissal
   */
  const show = useCallback((toastData: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000, // Default 5 seconds
      dismissible: true,
      type: "info",
      ...toastData,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  /**
   * Dismisses a specific toast by its ID
   * 
   * @param id - The ID of the toast to dismiss
   */
  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Dismisses all active toast notifications
   */
  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextType = {
    toasts,
    show,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
