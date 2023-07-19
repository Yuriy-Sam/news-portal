"use client";
import React from "react";
import styles from "@/styles/header.module.css";
import Image from "next/legacy/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { BookmarksIcon, SearchIcon } from "./SVGIcons";

type HeaderProps = {
  // handleShowSidebar?: () => void;
};
const Header = ({}: HeaderProps) => {
  console.log("Header");
  return (
    <header className="after-line relative w-full block pb-7">
      <div className="flex justify-between items-center">
        <div className=" flex items-center justify-center ">
          <div className="lg:w-[50px] lg:mr-5"></div>
          <div className="header__search w-[320px] flex items-center justify-between border-2 border-primary-200 p-3 px-5 rounded-full sm:border-none lg:p-0 lg:w-auto">
            <input
              className="mr-1 w-full h-7 focus:outline-0 py-2 px-1 text-lg lg:mr-0 lg:p-0 lg:w-0"
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
              containerStyles=" px-3 py-0"
              Icon={SearchIcon}
              curentIconColor="#cccccc"
              activeIconColor="#000"
              imageSize={30}
            />
            {/* </Link> */}
          </div>
        </div>

        <CustomButton
          link="/favoriate"
          containerStyles="btn_primary px-3"
          Icon={BookmarksIcon}
          curentIconColor="#000"
          activeIconColor="#fff"
          imageSize={30}
        />
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
