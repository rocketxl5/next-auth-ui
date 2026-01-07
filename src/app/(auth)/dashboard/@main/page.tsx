import { requireAuth } from '@/lib/server/requireAuth';

export default async function AdminDashboard() {
  await requireAuth({
    roles: ['ADMIN', 'SUPER_ADMIN'],
  });

  return (
    <main className="flex-1 p-6 bg-bg">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <p className="text-sm text-muted">
        This is the starting point for administrative features.
      </p>
    </main>
  );
}
