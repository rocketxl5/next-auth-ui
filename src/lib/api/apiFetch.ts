/**
 * API FETCH HELPER (Client-side)
 * -------------------------------------------------------
 * Purpose:
 *   Provides a centralized fetch wrapper that automatically
 *   handles authentication using access + refresh tokens.
 *
 * Why this exists:
 *   - Access tokens are short-lived and may expire at any time
 *   - Refresh tokens allow sessions to continue without forcing
 *     the user to re-authenticate
 *   - Next.js does NOT refresh tokens automatically
 *
 * Responsibilities:
 *   1. Perform a normal authenticated fetch request
 *   2. Detect expired access tokens (401 responses)
 *   3. Call /api/auth/refresh to rotate tokens when needed
 *   4. Retry the original request once with fresh credentials
 *
 * What this helper DOES:
 *   - Sends cookies automatically (httpOnly auth cookies)
 *   - Refreshes tokens silently when access expires
 *   - Prevents duplicated auth logic in components
 *   - Keeps auth flow predictable and centralized
 *
 * What this helper DOES NOT do:
 *   - Does not run on the server or middleware
 *   - Does not manage React state or UI
 *   - Does not retry indefinitely (prevents infinite loops)
 *   - Does not handle redirects or navigation
 *
 * Usage:
 *   const res = await apiFetch('/api/protected/resource');
 *   const data = await res.json();
 *
 * Failure behavior:
 *   - If refresh fails, the promise rejects
 *   - Callers should treat this as "session expired"
 *     and redirect to /signin or show a message
 *
 * Environment:
 *   - Client-side only ('use client')
 *   - Relies on secure httpOnly cookies
 *
 * Security notes:
 *   - Refresh token is never exposed to JavaScript
 *   - Token rotation happens server-side only
 *   - Only a single retry is allowed per request
 * -------------------------------------------------------
 */

'use client';

export async function apiFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  let res = await fetch(input, {
    ...init,
    credentials: 'include',
  });

  // Access token expired → try refresh
  if (res.status === 401) {
    const refreshRes = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    // Refresh failed → session is dead
    if (!refreshRes.ok) {
      throw new Error('Session expired');
    }

    // Retry original request once
    res = await fetch(input, {
      ...init,
      credentials: 'include',
    });
  }

  return res;
}