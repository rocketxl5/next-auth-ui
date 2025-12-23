'use client';

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Theme } from "@/components/providers/theme";

export default function Providers({
    initialTheme,
    children,
}: {
    initialTheme: Theme,
    children: React.ReactNode
}) 
{
    return (
        <ThemeProvider initialTheme={initialTheme}>
            {children}
        </ThemeProvider>
    )
}
