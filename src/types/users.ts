export type Role = 'user' | 'admin' | 'super_admin';

export type User = {
  id: string;
  email: string;
  role: Role;
  name?: string | null;
};
