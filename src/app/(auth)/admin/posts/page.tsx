import { requireAuth } from '@/lib/server/guards';

export default async function ManagePosts() {
  const { user } = await requireAuth({
    roles: ['admin', 'super_admin'],
  });

  return (
    <div>
      <h1>Admin Posts Page</h1>
      <p>Welcome, {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Here you can manage posts.</p>
      <p>Placeholder page for CMS + E-commerce template.</p>
    </div>
  );
}
