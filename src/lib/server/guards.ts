import { redirect } from 'next/navigation';
import { requireRole } from '../auth/role';
import type { User } from '@/types/users';

type RequireAuthOptions = {
  roles?: User['role'] | User['role'][];
};

export async function requireAuth(
  options: RequireAuthOptions = {}
): Promise<{ user: User }> {
  const { roles } = options;

  if (roles) {
    const auth = await requireRole(roles);

    if (!auth.ok) {
      redirect('/auth/signin');
    }

    return { user: auth.user };
  }

  // If no roles → just authentication
  const auth = await requireRole([]); // just checks session

  if (!auth.ok) {
    redirect('/auth/signin');
  }

  return { user: auth.user };
}
