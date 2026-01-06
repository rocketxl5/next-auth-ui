import { SignoutBtn } from '@/components/ui/Button/SignoutBtn';
import { ThemeBtn } from '@/components/ui/Button/ThemeBtn';

export default function Header() {
  return (
    <header className="border-b p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex gap-4">
        <ThemeBtn />
        <form action="/api/auth/signout" method="POST">
          <SignoutBtn />
        </form>
      </div>
    </header>
  );
}
