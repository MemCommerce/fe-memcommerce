"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

type Attribute = "class" | "data-theme" | "data-mode";

export interface ThemeProviderProps {
  children: ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const NextThemesProvider = dynamic(() => import("next-themes").then((mod) => mod.ThemeProvider), { ssr: false });

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
