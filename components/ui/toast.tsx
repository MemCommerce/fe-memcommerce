"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;

export interface ToastProps extends React.ComponentProps<typeof ToastPrimitive.Root> {
  variant?: "default" | "destructive";
}

export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Root ref={ref} className={cn("bg-white dark:bg-gray-800 border rounded-md p-4 shadow-md", className)} {...props} />
  )
);
Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentProps<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("font-semibold text-sm", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentProps<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("text-sm text-gray-500 dark:text-gray-300", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

export const ToastClose = ToastPrimitive.Close;

export const ToastViewport = () => (
  <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[360px] max-w-full z-50 outline-none" />
);