/**
 * CURRENT USER ROUTE
 * -------------------------------------------------------
 * Purpose:
 *   Returns the currently authenticated user's information.
 *
 * Flow:
 *   1. Read accessToken from cookies
 *   2. Verify JWT
 *   3. Fetch user info from DB (optional select fields)
 *   4. Return user info
 *   5. On failure: return 401 Unauthorized
 *
 * Security notes:
 *   - Only safe user fields returned (no password / refresh token)
 *   - Access token verification is required
 *
 * Method: GET /api/auth/me
 * Access: Authenticated (access token)
 * -------------------------------------------------------
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCookie } from '@/lib/server/cookies';
import { verifyAccessToken } from '@/lib/auth/tokens';
import { unauthorized, internalServerError } from '@/lib/http';

export async function GET() {
  try {
    const accessToken = await getCookie('accessToken');

    if (!accessToken) {
      return unauthorized();
    }

    let decoded;
    try {
      decoded = verifyAccessToken(accessToken);
    } catch {
      return unauthorized();
    }

    const userId = decoded.id as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return unauthorized();
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('ME ROUTE ERROR:', error);
    return internalServerError();
  }
}
