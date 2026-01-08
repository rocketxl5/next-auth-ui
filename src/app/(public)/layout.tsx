// app/(public)/layout.tsx
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b p-4">
        <h1 className="text-lg font-semibold">Public Area</h1>
      </header>
      <main className="min-h-screen mx-auto max-w-5xl">{children}</main>
      <footer className="border-t p-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
