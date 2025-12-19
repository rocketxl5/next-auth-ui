/**
 * ----------------------------------------------------------------------
 * Tailwind CSS Configuration
 * ----------------------------------------------------------------------
 *
 * Purpose:
 *   Configures Tailwind CSS for this Next.js project, including:
 *     - Content paths to scan for class names
 *     - Theme customizations and extensions
 *     - Dark mode behavior
 *     - Plugins
 *
 * Key Settings:
 *   - darkMode: 'class'
 *       Enables manual dark/light mode toggling via a `dark` class
 *       on the root HTML element. Alternative: 'media' (prefers-color-scheme)
 *
 *   - content: string[]
 *       Paths to all files Tailwind should scan for class names.
 *       Ensures unused CSS is purged in production.
 *
 *   - theme.extend
 *       Extend default Tailwind theme with custom colors, spacing, fonts, etc.
 *
 *   - plugins
 *       Add Tailwind plugins here (e.g., forms, typography, aspect-ratio).
 *
 * Notes:
 *   - This file is TypeScript-typed for IntelliSense and safety:
 *       `import type { Config } from 'tailwindcss'`
 *   - Make sure the content paths match your project folder structure
 *     (app, components, lib, etc.).
 *   - Use `darkMode: 'class'` for manual control; toggle dark/light mode
 *     by adding/removing the `dark` class on <html> or <body>.
 * ----------------------------------------------------------------------
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
