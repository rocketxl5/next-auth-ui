import { redirect } from 'next/navigation';

export default function DashboardIndex() {
  redirect('/dashboard/overview'); // or /dashboard/overview
}