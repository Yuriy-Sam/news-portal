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
  const isAuthUser = useStateSelector((state) => state.user.isAuthUser);
  const status = useStateSelector((state) => state.user.userStatus);

  useEffect(() => {
    if (status === "error" && !isAuthUser) {
      return router.push("/login");
    }
  }, [isAuthUser, status]);
  if (status === "success" && isAuthUser) {
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
