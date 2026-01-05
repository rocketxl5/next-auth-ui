
import type { Role } from "@/types/users";
/**
 * Resolve post-auth redirect path
 * --------------------------------
 * - Honors explicit `from` param when provided
 * - Falls back to role-based default routes
 * - Pure helper (no redirects, no side effects)
 */

export function getRedirectPathname(
  role: Role,
  from?: string | null
): string {
  if (from) return from;

  switch (role) {
    case 'admin': 
    case 'super_admin':
      return '/dashboard'
    default: 
      return '/'
  }
}
