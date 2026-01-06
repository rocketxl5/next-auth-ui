import { requireAuth } from '@/lib/server/requireAuth';

export default async function ManageUsers() {
  const { user } = await requireAuth({
    roles: ['admin', 'super_admin'],
  });

  return (
    <div>
      <h1>Admin Users Page</h1>
      <p>Welcome, {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Here you can manage users.</p>
      <p>Placeholder page for CMS + E-commerce template.</p>
    </div>
  );
}
