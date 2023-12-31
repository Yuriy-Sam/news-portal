"use client";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "@/styles/header.module.css";
import Image from "next/legacy/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { BookmarksIcon, SearchIcon } from "./SVGIcons";
import { createNotes, useAppDispatch, useStateSelector } from "@/store";
import { usePathname, useRouter } from "next/navigation";

type HeaderProps = {
  // handleShowSidebar?: () => void;
};
const Header = ({}: HeaderProps) => {
  // const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const authUser = useStateSelector((state) => state.user.authUser);
  const notes = useStateSelector((state) => state.notes.notesItems);

  const [notesCount, setnNotesCount] = useState(notes.length || 0);
  console.log("pathname --", pathname);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchParam = formData.get("searchParam");
    router.push(`/posts?${searchParam && `searchtext=${searchParam}`}`);
  };
  useEffect(() => {
    if (notes) {
      setnNotesCount(notes.length);
    }
  }, [notes]);
  return (
    <header
      className={`  after-line relative w-full block pb-5 lg:pb-7  ${
        pathname === "/posts" ? "lg:hidden" : "block"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className=" flex items-center justify-between w-full lg:w-auto lg:justify-center ">
          <div
            className={`w-[50px] h-[40px] mr-5 lg:w-0 lg:h-0 lg:mr-0 `}
          ></div>
          {pathname !== "/posts" ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="header__search flex items-center justify-between  border-0 border-primary-200  p-0 rounded-full lg:border-2 lg:py-2 lg:px-5 "
            >
              <input
                name="searchParam"
                className="mr-0 w-0 h-7 focus:outline-0 p-0 max-w-[170px]  text-base lg:mr-1 lg:py-3 lg:px-1 lg:w-auto"
                type="text"
                placeholder="Search article you want..."
              />
              {/* <Link className=" flex items-center justify-center" href={"/"}> */}
              {/* <Image
              width={30}
              height={30}
              src={"/icons/search.svg"}
              alt="search"
            /> */}
              <CustomButton
                containerStyles="px-2 lg:py-0 hover:text-primary lg:text-primary-400"
                Icon={SearchIcon}
                type="submit"
                // activeIconColor="primary-400"
                // currentIconColor="primary-200"
                iconStyles={"w-[25px] h-[25px]"}
              />
              {/* </Link> */}
            </form>
          ) : (
            <div className=""></div>
          )}
        </div>

        {authUser ? (
          <>
            <div className=" relative ">
              <CustomButton
                link="/notes"
                containerStyles="btn_primary px-3"
                Icon={BookmarksIcon}
                iconStyles={"w-[30px] h-[30px]"}
              />
              {notes.length > 0 && (
                <span className="absolute top-1 right-1 bg-primary-300  border-2 border-primary  text-primary font-bold text-xs h-[25px] w-[25px] flex justify-center items-center rounded-full">
                  {notes.length}
                </span>
              )}
            </div>

            {/* <div className="flex  items-center gap-2 sm:gap-3  lg:hidden ">
              <Image
                className=" rounded-full"
                src={"/img/profile1.gif"}
                priority
                alt={authUser.firstName}
                width={60}
                height={60}
              />
              <div className="">
                <p className=" text-sm sm:text-base text-primary font-bold  ">
                  {authUser.firstName + " " + authUser.lastName}
                </p>
                <p className="text-sm text-primary-500 ">{authUser.email}</p>
              </div>
            </div> */}
          </>
        ) : (
          <div className=" ml-3 relative hidden sm:flex items-center justify-center   lg:hidden">
            <CustomButton
              link="/login"
              containerStyles="btn_primary text-base rounded-full rounded-r-none  px-3 min-w-[100px] border-r-0 border-solid"
              text="Log In"
            />
            <CustomButton
              link="/signup"
              containerStyles="btn_secondary text-base  rounded-full rounded-l-none px-3  min-w-[100px] border-l-0 after:animate-btn-anim hover:after:animate-none"
              text="Sign Up"
            />
          </div>
        )}

        {/* <div className="flex justify-between items-center gap-5">

          <CustomButton
            link="/login"
            containerStyles="btn_primary rounded-full btn_lg border-solid"
            text="LogIn"
          />
          <CustomButton
            link="/signup"
            containerStyles="btn_secondary rounded-full btn_lg  after:animate-btn-anim hover:after:animate-none"
            text="SignUp"
          />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
