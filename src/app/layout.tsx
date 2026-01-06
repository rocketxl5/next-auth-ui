import { getCookie } from '@/lib/server/getCookie';
import { Theme } from '@/components/providers/theme';
import Providers from './providers';
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTheme = await getCookie('theme');
  const theme: Theme = currentTheme === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en" className={theme}>
      <body>
        <Providers initialTheme={theme}>{children}</Providers>
      </body>
    </html>
  );
}
