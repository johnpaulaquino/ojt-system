'use client';

import * as React from 'react';
import { ThemeProvider as ThemeProviderNext } from 'next-themes';

export function NextThemesProvider({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProviderNext>) {
  return (
    <ThemeProviderNext
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </ThemeProviderNext>
  );
}