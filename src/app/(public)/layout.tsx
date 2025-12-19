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

      <main className=" mx-auto max-w-5xl p-6">
        <div className="bg-white dark:bg-black">{children}</div>
      </main>

      <footer className="border-t p-4 text-sm text-gray-500">
        © {new Date().getFullYear()}
      </footer>
    </>
  );
}
