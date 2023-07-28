"use client";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full max-w-full overflow-hidden">{children}</main>
    </>
  );
}
