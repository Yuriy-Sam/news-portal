"use client";

import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <>
      <main className="w-full max-w-full overflow-hidden">{children}</main>
    </>
  );
}
