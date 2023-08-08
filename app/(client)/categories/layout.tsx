"use client";

import { Header, ProfileSidebar } from "@/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full mx-5 sm:mx-10  max-w-[1100px] py-7 block overflow-hidden">
        <Header />
        {children}
      </main>
      <ProfileSidebar />
    </>
  );
}
