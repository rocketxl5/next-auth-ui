// app/(protected)/user/layout.tsx
import { AccountLayout } from '@/components/layout/AccountLayout';
import { requireRole } from '@/lib/server/requireRole';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

type RootLayoutProps = {
  children: React.ReactNode;
};

// Protected Layout for Auth Users
export default async function UserLayout(props: RootLayoutProps) {
  const auth = await requireRole([Role.USER]);

  if (!auth.ok) {
    if (auth.reason === 'unauthenticated') redirect('/auth/signin');
    else redirect('/'); // forbidden
  }
  return <AccountLayout context="user" {...props} />;
}
