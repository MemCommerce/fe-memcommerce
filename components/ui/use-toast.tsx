"use client";

import * as React from "react";
import { Toaster, toast as shadToast, ToastProps } from "@/components/ui/toast"; 


export const useToast = () => {
  const toast = React.useCallback(
    (props: ToastProps) => {
      shadToast(props);
    },
    []
  );

  return { toast };
};