/**
 * SERVER GUARDS (AUTH + REDIRECTS)
 * --------------------------------------------------
 * Purpose:
 * - Protect server components, pages, and layouts
 * - Enforce authentication and optional role authorization
 * - Handle redirects for unauthenticated / unauthorized access
 *
 * What this file DOES:
 * - Calls `requireRole()` to validate access
 * - Performs redirects using `next/navigation`
 * - Returns typed user data for authorized requests
 *
 * What this file DOES NOT do:
 * - Decode JWTs or read cookies directly
 * - Contain business logic
 * - Run in client components
 *
 * Design notes:
 * - This is the UX boundary for auth (redirects live here)
 * - Pages should call `requireAuth()` instead of auth helpers
 * - Keeps pages clean and free of auth boilerplate
 *
 * Intended usage:
 * - Server Components
 * - Layouts
 * - Route-level protection
 */

import { redirect } from 'next/navigation';
import { requireRole } from './requireRole';
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
