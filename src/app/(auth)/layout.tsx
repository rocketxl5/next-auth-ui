// app/(auth)/layout.tsx
import { SignoutBtn } from '@/components/ui/button/SignoutBtn';
import { ThemeBtn } from '@/components/ui/button/ThemeBtn';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b p-4 flex justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex gap-4">
          <ThemeBtn />
          <form action="/api/auth/signout" method="POST">
            <SignoutBtn />
          </form>
        </div>
      </header>

      <main className="dark:bg-black dark:text-white mx-auto max-w-6xl p-6">
        {children}
      </main>
    </>
  );
}
