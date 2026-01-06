'use client';

import { ThemeBtn } from '../ui/button/ThemeBtn';
import type { Role } from '@/types/users';

type HeaderProps = {
  role?: Role;
  showThemeToggle?: boolean;
};

export function Header({ role, showThemeToggle = true }: HeaderProps) {
  let title = 'CMS'; //default for public

  if (role === 'ADMIN' || role === 'SUPER_ADMIN') title = 'Admin';
  else if (role === 'USER') title = 'Dashboard';

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="font-semibold">{title}</div>
      <div className="flex items-center gap-4">
        {showThemeToggle && <ThemeBtn />}
      </div>
    </header>
  );
}
