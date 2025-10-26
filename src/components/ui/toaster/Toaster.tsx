import React, { useEffect, useState, useCallback } from "react";
import "./Toaster.css";

export interface ToastAction {
  text: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  action?: ToastAction;
  duration?: number;
  dismissible?: boolean;
}

interface ToasterProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export const Toaster = ({ toasts, onDismiss }: ToasterProps) => {
  return (
    <div className="toaster">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300); // Match animation duration
  }, [onDismiss, toast.id]);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, handleDismiss]);

  const handleActionClick = () => {
    if (toast.action?.onClick) {
      toast.action.onClick();
    }
    handleDismiss();
  };

  return (
    <div
      className={`toast toast--${toast.type || "info"} ${isExiting ? "toast--exiting" : ""}`}
    >
      <div className="toast__content">
        <span className="toast__message">{toast.message}</span>
      </div>
      
      <div className="toast__actions">
        {toast.action && (
          <button
            className="toast__action-button"
            onClick={handleActionClick}
            type="button"
          >
            {toast.action.text}
          </button>
        )}
        
        {toast.dismissible !== false && (
          <button
            className="toast__close-button"
            onClick={handleDismiss}
            type="button"
            aria-label="Close toast"
          >
            <svg
              className="toast__close-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      
      {toast.duration && toast.duration > 0 && (
        <div
          className="toast__progress"
          style={{ animationDuration: `${toast.duration}ms` }}
        />
      )}
    </div>
  );
};
