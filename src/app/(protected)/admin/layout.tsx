// app/(protected)/admin/layout.tsx
import { AccountLayout } from '@/components/layout/AccountLayout';
import { requireRole } from '@/lib/server/requireRole';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout(props: RootLayoutProps) {
  const auth = await requireRole([Role.ADMIN, Role.SUPER_ADMIN]);

  if (!auth.ok) {
    if (auth.reason === 'unauthenticated') redirect('/auth/signin');
    else redirect('/'); // forbidden
  }
  
  return <AccountLayout context="admin" {...props} />;
}
