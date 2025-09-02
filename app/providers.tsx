"use client";

import type React from "react";

import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";
import { ToastViewport } from "@radix-ui/react-toast";

export function Providers({ children }: { children: React.ReactNode }) {
 return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              {children}
              <ToastViewport />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
