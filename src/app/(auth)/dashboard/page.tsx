import { redirect } from 'next/navigation';

export default function DashboardIndex() {
  redirect('/dashboard'); // or /dashboard/overview
}