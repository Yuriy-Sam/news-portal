"use client";

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
    if (status === "success" && isAuthUser) {
      return router.push("/");
    }
  }, [isAuthUser, status]);
  if (status === "error" && !isAuthUser) {
    return (
      <>
        <main className="w-full max-w-full overflow-hidden">{children}</main>
      </>
    );
  }
}
