"use client";
import { CustomButton, CustomModal } from "@/components";
import {
  getAuthUser,
  getNotes,
  getUserById,
  useAppDispatch,
  useStateSelector,
  userActions,
} from "@/store";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const isAuthUser = useStateSelector((state) => state.user.isAuthUser);
  // useEffect(() => {
  //   if (!isAuthUser) {
  //     const timeout = setTimeout(() => {
  //       console.log("setTimeout");
  //       setShowModal(true);
  //       console.log("showModal", showModal);
  //     }, 5000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [isAuthUser]);
  useEffect(() => {
    dispatch(getAuthUser());
    dispatch(getNotes());
  }, []);
  return (
    <>
      {/* <CustomModal show={showModal} /> */}
      {children}
    </>
  );
}
