export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export type User = {
  id: string;
  email: string;
  role: Role;
  name?: string | null;
};
