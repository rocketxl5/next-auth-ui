'use client';

import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeBtn() {
    const {theme, toggleTheme} = useTheme();

    return (
        <button onClick={toggleTheme}>
            Change Theme: {theme}
        </button>
    )
}