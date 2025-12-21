'use client';

import { ThemeProvider } from '../theme/ThemeProvider';

export function AppProviders({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: 'light' | 'dark';
}) {
  return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
}
