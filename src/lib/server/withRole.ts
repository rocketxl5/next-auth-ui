// Wraps API route handler and enforces role.
import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from './requireRole';
import type { User, Role } from '@/types/users';

/**
 * Higher-order function for API route handlers
 * --------------------------------------------
 * - Checks user session and role using requireRole
 * - Passes typed `user` to the handler if authorized
 * - Returns proper JSON response if unauthorized or forbidden
 */

export function withRole(
  roles: Role[],
  handler: (req: NextRequest, user: User) => Promise<Response>
) {
  return async (req: NextRequest, user: User) => {
    try {
      // Run role check; requireRole internally reads the session
      const auth = await requireRole(roles);

      if (!auth.ok || !auth.user) {
        // Unauthorized (401) if not authenticated, Forbidden (403) if role mismatch
        const status = auth.reason === 'unauthenticated' ? 401 : 403;
        return NextResponse.json(
          { error: auth.reason || 'Forbidden' },
          { status }
        );
      }

      // Pass request and typed user to handler
      return handler(req, auth.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('withRole error', error);
      return NextResponse.json(
        {
          error: error.message || 'Internal Server Error',
        },
        { status: 500 }
      );
    }
  };
}
