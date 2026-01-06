import { SignOutBtn } from '@/components/ui/button/SignOutBtn';
import { ThemeBtn } from '@/components/ui/button/ThemeBtn';

export default function Header() {
  return (
    <header className="border-b p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex gap-4">
        <ThemeBtn />
        <form action="/api/auth/signout" method="POST">
          <SignOutBtn />
        </form>
      </div>
    </header>
  );
}
