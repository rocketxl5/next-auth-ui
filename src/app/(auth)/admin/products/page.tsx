import { requireAuth } from '@/lib/server/guards';

export default async function ManageProducts() {
  const { user } = await requireAuth({
    roles: ['admin', 'super_admin'],
  });

  return (
    <div>
      <h1>Admin Products Page</h1>
      <p>Welcome, {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Here you can manage products.</p>
      <p>Placeholder page for CMS + E-commerce template.</p>
    </div>
  );
}
