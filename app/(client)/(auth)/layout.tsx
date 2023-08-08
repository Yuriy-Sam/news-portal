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
  const storedUser = localStorage.getItem("user");
  useEffect(() => {
    if (storedUser) {
      return router.push("/");
    }
  }, []);
  if (!storedUser) {
    return (
      <>
        <main className="w-full max-w-full overflow-hidden">{children}</main>
      </>
    );
  }
}
