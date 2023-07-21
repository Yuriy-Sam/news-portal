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
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  console.log("Header");
  return (
    <header className="after-line relative w-full block pb-7">
      <div className="flex justify-between items-center">
        <div className=" flex items-center justify-between w-full lg:w-auto lg:justify-center ">
          <div className="w-[50px] mr-5 lg:w-0  lg:mr-0"></div>
          <div className="header__search flex items-center justify-between  border-0 border-primary-200  p-0 rounded-full lg:border-2 lg:py-3 lg:px-5 ">
            <input
              className="mr-0 w-0 h-7 focus:outline-0 p-0  text-lg lg:mr-1 lg:py-2 lg:px-1 lg:w-full"
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
              activeIconColor={isMobile ? "#cccccc" : "#000"}
              curentIconColor={isMobile ? "#000" : "#cccccc"}
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
