import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from './role';

export function withRole(
  roles: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (req: NextRequest, user: any) => Promise<Response>
) {
  return async (req: NextRequest) => {
    try {
      // Run role check
      // If OK, return decoded JWT payload
      const user = await requireRole(roles);

      // Pass request and user payload to handler
      return handler(req, user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return NextResponse.json({ error: error.message || 'Forbidden' });
    }
  };
}
