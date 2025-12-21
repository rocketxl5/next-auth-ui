export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <nav className="space-y-2">
        <a href="/dashboard">Overview</a>
        <a href="/dashboard/users">Users</a>
        <a href="/dashboard/settings">Settings</a>
      </nav>
    </aside>
  );
}