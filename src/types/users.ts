export type User = {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  name?: string | null;
};
