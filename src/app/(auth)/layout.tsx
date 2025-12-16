// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b p-4 flex justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>

        <form action="/api/auth/signout" method="POST">
          <button className="text-sm underline">
            Sign out
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        {children}
      </main>
    </>
  );
}
