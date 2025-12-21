import { ReactNode } from 'react';
export default function DashboardLayout({
  header,
  sidebar,
  main,
}: {
  header: ReactNode;
  sidebar: ReactNode;
  main: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {header}

      <div className="flex flex-1">
        {sidebar}
        <main className="flex-1 p-6">{main}</main>
      </div>
    </div>
  );
}
