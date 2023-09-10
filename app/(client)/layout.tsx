"use client";
import {
  getAuthUser,
  getNotes,
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

  useEffect(() => {
    dispatch(getAuthUser());
    dispatch(getNotes());
  }, []);
  return <>{children}</>;
}
