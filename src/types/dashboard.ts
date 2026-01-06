// src/types/dashboard.ts
export type UserTheme = 'light' | 'dark' | 'system'


export type UserSettings = {
  theme: UserTheme
}

export type DashboardUser = {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
};

export type DashboardData = {
  user: DashboardUser
  settings: UserSettings | null
}