import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessTokenEdge } from './src/lib/auth/tokens';
import { redirectToSignin } from './src/lib/auth/redirect';

const PROTECTED = ['/dashboard', '/admin'];
const ADMIN_ONLY = ['/admin']; // only /admin strictly admin

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static files and auth API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Only guard protected routes
  const mustProtect = PROTECTED.some((p) => pathname.startsWith(p));
  if (!mustProtect) return NextResponse.next();

  // Read accessToken cookie (edge-friendly)
  const token = req.cookies.get('accessToken')?.value;

  if (!token) {
    console.warn('[MIDDLEWARE] No access token found, redirecting to signin');
    return redirectToSignin(req);
  }

  // Verify token safely
  let payload;
  try {
    payload = await verifyAccessTokenEdge(token);
    console.info('[MIDDLEWARE] Payload:', payload);
  } catch (error) {
    console.warn('[MIDDLEWARE] Invalid token');
    return redirectToSignin(req);
  }

  // Role restriction
  const isAdminPage = ADMIN_ONLY.some((a) => pathname.startsWith(a));
  if (isAdminPage && !['ADMIN', 'SUPER_ADMIN'].includes(payload.role)) {
    console.warn(
      `[MIDDLEWARE] User role "${payload.role}" not allowed on admin page, redirecting to /`
    );
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Middleware matcher config
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
