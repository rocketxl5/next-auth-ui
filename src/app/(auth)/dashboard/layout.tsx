import { ReactNode } from 'react';

export default function DashboardLayout({
  header,
  sidebar,
  main,
  footer,
}: {
  header: ReactNode;
  sidebar: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {header}
      <div className="flex flex-1">
        {sidebar}
        {main}
      </div>
      {footer}
    </div>
  );
}
