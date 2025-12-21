'use client';

import { ThemeBtn } from '../ui/button/ThemeBtn';

type HeaderProps = {
  variant?: 'public' | 'auth' | 'admin';
  showThemeToggle?: boolean;
};

export function Header({
  variant = 'public',
  showThemeToggle = true,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="font-semibold">
        {variant === 'admin' && 'Admin'}
        {variant === 'auth' && 'Dashboard'}
        {variant === 'public' && 'My App'}
      </div>
      <div className="flex items-center gap-4">
        {showThemeToggle && <ThemeBtn />}
      </div>
    </header>
  );
}
