"use client";

import { Header, ProfileSidebar } from "@/components";
import {
  getUserById,
  useAppDispatch,
  useStateSelector,
  userActions,
} from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const storedUser = localStorage.getItem("user");
  useEffect(() => {
    if (!storedUser) {
      return router.push("/login");
    }
  }, []);
  if (storedUser) {
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
}
