import { getCookie } from './getCookie';
import { verifyAccessToken } from '../auth/tokens';
import { User } from '@/types/users';

export type Session = { user: User } | null;

export async function getSession(): Promise<Session> {
  const token = await getCookie('accessToken');

  if (!token) return null;

  try {
    const payload = verifyAccessToken(token);
 console.log(payload);
 
    const user: User = {
      id: payload.id,
      role: payload.role,
      email: payload.email,
    };
    return { user };
  } catch {
    return null;
  }
}
