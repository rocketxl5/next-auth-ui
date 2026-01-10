import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header context="public" />
      <div className="min-h-screen mx-auto max-w-5xl">{children}</div>
      <Footer />
    </>
  );
}
