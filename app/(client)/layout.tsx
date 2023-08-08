"use client";
import {
  getUserById,
  useAppDispatch,
  useStateSelector,
  userActions,
} from "@/store";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const storedUser = localStorage.getItem("user");
  const user = useStateSelector((state) => state.user.authUser);
  console.log("storedUser", storedUser);
  useEffect(() => {
    if (storedUser && !user) {
      dispatch(getUserById(JSON.parse(storedUser)));
    }
    import("preline");
  }, []);
  return <>{children}</>;
}
