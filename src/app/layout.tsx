import Providers from './providers';
import { Theme } from '@/components/providers/theme';
import { getCookie } from '@/lib/server/getCookie';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentTheme = await getCookie('theme');
  const theme: Theme = currentTheme === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <body>
        <Providers initialTheme={theme}>{children}</Providers>
      </body>
    </html>
  );
}
