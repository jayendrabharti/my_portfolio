"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }){
  return (
    <NextThemeProvider
      attribute="class"
      storageKey="theme"
      defaultTheme="dark"
    >{children}</NextThemeProvider>
  );
}; 