/**
 * REQUIRE ROLE HELPER
 * -------------------------------------------------------
 * Purpose:
 *   Enforces role-based access control in server-side code.
 *
 * Responsibilities:
 *   - Check if the currently authenticated user has at least
 *     one of the required roles
 *   - Throw an error or redirect if the user lacks permissions
 *
 * Design goals:
 *   - Keep role checks centralized and reusable
 *   - Integrate seamlessly with JWT payloads from access tokens
 *   - Compatible with both API routes and server components
 *   - Avoid duplicating role logic throughout the app
 *
 * Step-by-step behavior:
 *   1. Accept an array of required roles (e.g., ["ADMIN", "SUPER_ADMIN"])
 *   2. Retrieve the current user from request context or JWT
 *   3. Compare the user’s role against the required roles
 *   4. If the user’s role matches, return the user object
 *   5. If the user’s role does not match, throw an error or handle
 *      unauthorized access (redirect / API error)
 *
 * Security notes:
 *   - Assumes accessToken payload contains an uppercase role
 *   - Roles are compared case-insensitively if normalization is applied
 *   - Prevents unauthorized access to admin/protected pages
 *
 * Used by:
 *   - Admin pages and components
 *   - Middleware for protected routes
 *   - API endpoints requiring specific roles
 *
 * -------------------------------------------------------
 */

import { getSession } from '../server/session';
import type { User } from '@/types/users';

type AllowedRoles = User['role'] | User['role'][];

export async function requireRole(roles: AllowedRoles) {
  const session = await getSession();

  if (!session) {
    return { ok: false, reason: 'unauthenticated' } as const;
  }

  const userRole = session.user.role;

  const allowed = Array.isArray(roles) ? roles : [roles];

  if (!allowed.includes(userRole)) {
    return { ok: false, reason: 'forbidden' } as const;
  }

  return { ok: true, user: session.user } as const;
}
