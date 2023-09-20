import { Header, ProfileSidebar } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Categories - Scope",
};
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
