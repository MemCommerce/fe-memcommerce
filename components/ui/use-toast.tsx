"use client";

import * as React from "react";
import { Toast, ToastProvider, ToastViewport, ToastProps } from "@/components/ui/toast";

interface ToastItem extends ToastProps {
  id: string;
}

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((props: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000); // auto dismiss
  }, []);

  const ToastContainer = () => (
    <ToastProvider>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
      <ToastViewport />
    </ToastProvider>
  );

  return { toast, ToastContainer };
};