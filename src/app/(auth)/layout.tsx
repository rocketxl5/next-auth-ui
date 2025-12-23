export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // validate session here
  return children;
}