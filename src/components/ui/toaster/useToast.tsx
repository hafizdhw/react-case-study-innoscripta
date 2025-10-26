import { useToastContext } from "./ToastContext";
import { ToastAction } from "./Toaster";

export interface UseToastOptions {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  action?: ToastAction;
  duration?: number;
  dismissible?: boolean;
}

export const useToast = () => {
  const { show, dismiss, dismissAll } = useToastContext();

  const toast = {
    show: (options: UseToastOptions) => {
      return show(options);
    },
    dismiss,
    dismissAll,
  };

  return toast;
};
