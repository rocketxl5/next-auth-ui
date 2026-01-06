export const COOKIE_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  theme: 'theme',
} as const;

export type CookieKey = keyof typeof COOKIE_KEYS;
