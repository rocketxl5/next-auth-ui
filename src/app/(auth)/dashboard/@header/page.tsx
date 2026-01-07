import { SignoutBtn } from '@/components/ui/button/SignoutBtn';
import { ThemeBtn } from '@/components/ui/button/ThemeBtn';

type HeaderProps = {
  title?: string;
};

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  return (
    <header className="border-b p-4 flex justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex gap-4">
        <ThemeBtn />
        <form action="/api/auth/signout" method="POST">
          <SignoutBtn />
        </form>
      </div>
    </header>
  );
}
