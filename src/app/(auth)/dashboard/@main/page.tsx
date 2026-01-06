import { requireAuth } from '@/lib/server/requireAuth';

export default async function AdminDashboard() {
  const { user } = await requireAuth({
    roles: ['ADMIN', 'SUPER_ADMIN'],
  });

  return (
    <main className="flex-1 p-6 bg-bg">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Placeholder page for CMS + E-commerce template.</p>
    </main>
  );
}
