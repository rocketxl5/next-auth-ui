/**
 * CLIENT AUTH REDIRECT HELPER
 * -------------------------------------------------------
 * Purpose:
 *   Determines where the user should be redirected
 *   after a successful sign-in.
 *
 * Rules:
 *   1. If a `from` query param exists, always use it
 *      (user attempted to access a protected route).
 *   2. Otherwise, redirect based on user role.
 *   3. Final fallback is the public home page.
 *
 * Security note:
 *   - This is UX logic only.
 *   - Real authorization is enforced by middleware
 *     and server-side role checks.
 * -------------------------------------------------------
 */

export type UserRole =
  | 'USER'
  | 'AUTHOR'
  | 'EDITOR'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export function getRedirectPathname(
  role: UserRole,
  from?: string | null
): string {
  if (from) return from;

  if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
    return '/dashboard';
  }

  return '/';
}
