"use client";

import * as React from "react";
import { Toast as RadixToast, ToastTitle, ToastDescription, ToastProvider, ToastViewport } from "@/components/ui/toast";

interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((props: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const ToastContainer = () => (
    <ToastProvider>
      {toasts.map((t) => (
        <RadixToast key={t.id}>
          {t.title && <ToastTitle>{t.title}</ToastTitle>}
          {t.description && <ToastDescription>{t.description}</ToastDescription>}
        </RadixToast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );

  return { toast, ToastContainer };
};
