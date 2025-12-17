/**
 * AUTH TOKEN HELPERS
 * -------------------------------------------------------
 * Purpose:
 *   Centralizes all JWT token creation and verification
 *   to ensure consistent logic and strict security.
 *
 * Responsibilities:
 *   - Generate short-lived access tokens
 *   - Generate long-lived refresh tokens
 *   - Verify token signatures and decode payloads
 *
 * Design goals:
 *   - Keep token logic isolated from route handlers
 *   - Make token behavior easy to audit and change
 *   - Prevent duplication and misconfiguration
 *
 * Security notes:
 *   - Secrets are loaded from environment variables
 *   - Access tokens are short-lived to reduce exposure
 *   - Refresh tokens support rotation and revocation
 *   - No sensitive data is stored in the payload
 *
 * Used by:
 *   - /api/auth/signin
 *   - /api/auth/signup
 *   - /api/auth/refresh
 *   - Middleware / protected route handlers
 * -------------------------------------------------------
 */

import jwt, { JwtPayload } from 'jsonwebtoken';
import { authConfig } from './config';

/**
 * Token payload shared across auth flows
 */
type TokenPayload = {
  id: string;
  email?: string;
  role?: string;
};

/**
 * Create short-lived access token
 */
export function createAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, authConfig.accessSecret, {
    expiresIn: authConfig.accessExpires,
  });
}

/**
 * Create long-lived refresh token
 * (minimal payload by design)
 */
export function createRefreshToken(payload: { id: string }) {
  return jwt.sign(payload, authConfig.refreshSecret, {
    expiresIn: authConfig.refreshExpires,
  });
}

/**
 * Verify and decode refresh token
 */
export function verifyRefreshToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, authConfig.refreshSecret);

  if (typeof decoded === 'string') {
    throw new Error('Invalid refresh token payload');
  }

  return decoded;
}

/**
 * Verify and decode access token
 */
export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, authConfig.accessSecret);

  if (typeof decoded === 'string') {
    throw new Error('Invalid token payload');
  }

  return decoded;
}
