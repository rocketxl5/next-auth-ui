// src/types/dashboard.ts
export type UserTheme = 'light' | 'dark' | 'system'


export type UserSettings = {
  theme: UserTheme
}

export type DashboardUser = {
  id: string
  email: string
  name: string | null
  role: 'user' | 'admin'
}

export type DashboardData = {
  user: DashboardUser
  settings: UserSettings | null
}