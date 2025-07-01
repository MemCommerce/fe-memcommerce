"use client";

import type React from "react";

import { CartProvider } from "@/lib/hooks/useCart";
import AuthProvider from "@/context/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
