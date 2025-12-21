import { cookies } from 'next/headers';
import './globals.css';
import { ThemeProvider, type Theme } from '@/lib/theme/ThemeProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme: Theme =
    cookieStore.get('theme')?.value === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <body>
        <div className="w-full h-screen">
          <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}
