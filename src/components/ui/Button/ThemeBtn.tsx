'use client';

import { useTheme } from "@/lib/theme/ThemeProvider";

export function ThemeBtn() {
    const {theme, toggleTheme} = useTheme();

    return (
        <button onClick={toggleTheme}>
            Change Theme: {theme}
        </button>
    )
}