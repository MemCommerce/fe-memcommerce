"use client"

import type React from "react"

import { CartProvider } from "@/lib/hooks/useCart"

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
