"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themeNames } from "@/lib/theme-config";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      themes={themeNames}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}