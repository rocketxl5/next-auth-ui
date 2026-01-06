import { requireAuth } from '@/lib/server/requireAuth';

export default async function ManagePosts() {
  const { user } = await requireAuth({
    roles: ['ADMIN', 'SUPER_ADMIN'],
  });

  return (
    <div>
      <h1>Admin Settings Page</h1>
      <p>Welcome, {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Here you can configure site-wide settings.</p>
      <p>Placeholder page for CMS + E-commerce template.</p>
    </div>
  );
}
