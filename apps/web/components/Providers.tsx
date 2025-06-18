"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import themes from "@cstn/ui/config/themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      themes={themes}
    >
      {children}
    </NextThemesProvider>
  )
}
