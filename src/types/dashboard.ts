import { User } from './users';
import { UserSettings } from './settings';

export type DashboardUser = User;

export type DashboardData = {
  user: DashboardUser;
  settings: UserSettings | null;
};
