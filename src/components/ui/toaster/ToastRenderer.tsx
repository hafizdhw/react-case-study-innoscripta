import { Toaster } from "./Toaster";
import { useToastContext } from "./ToastContext";

export const ToastRenderer = () => {
  const { toasts, dismiss } = useToastContext();
  return <Toaster toasts={toasts} onDismiss={dismiss} />;
};
