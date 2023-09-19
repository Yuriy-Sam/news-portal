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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isAuthUser = useStateSelector((state) => state.user.isAuthUser);
  // const userStatus = useStateSelector((state) => state.user.userStatus);
  useEffect(() => {
    if (!isAuthUser && pathname !== "login" && pathname !== "singup") {
      console.log("setTimeout");
      const timeout = setTimeout(() => {
        setShowModal(true);
        console.log("showModal", showModal);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthUser]);
  const firstRender = async () => {
    await dispatch(getAuthUser());
    await dispatch(getNotes());
    // if (userStatus === "error" && !isAuthUser) {
    //   const timeout = setTimeout(() => {
    //     setShowModal(true);
    //     console.log("showModal", showModal);
    //   }, 5000);
    //   return () => clearTimeout(timeout);
    // }
  };
  useEffect(() => {
    firstRender();
  }, []);
  return (
    <>
      <CustomModal show={showModal} />
      {children}
    </>
  );
}
