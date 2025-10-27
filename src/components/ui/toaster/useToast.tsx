import { useToastContext } from "./ToastContext";
import { ToastAction } from "./Toaster";

export interface UseToastOptions {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  action?: ToastAction;
  duration?: number;
  dismissible?: boolean;
}

/**
 * Custom hook that provides a simplified interface for toast notifications
 * 
 * This hook wraps the ToastContext and provides a cleaner API for components
 * to show toast notifications without needing to access the context directly.
 * 
 * @returns Object containing toast management methods
 */
export const useToast = () => {
  const { show, dismiss, dismissAll } = useToastContext();

  const toast = {
    /**
     * Shows a new toast notification
     * 
     * @param options - Configuration for the toast notification
     * @returns The generated toast ID
     */
    show: (options: UseToastOptions) => {
      return show(options);
    },
    /**
     * Dismisses a specific toast by its ID
     * 
     * @param id - The ID of the toast to dismiss
     */
    dismiss,
    /**
     * Dismisses all active toast notifications
     */
    dismissAll,
  };

  return toast;
};
