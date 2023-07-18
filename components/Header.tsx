"use client";
import React from "react";
import styles from "@/styles/header.module.css";
import Image from "next/legacy/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
const Header = () => {
  return (
    <header className="after-line relative w-full block pb-7">
      <div className="flex justify-between items-center">
        <div className=" flex items-center justify-center">
          <CustomButton
            containerStyles="btn_primary border-primary p-0 mr-5 hidden lg:flex"
            image="hamburger.svg"
            imageSize={50}
          />
          <div className="header__search w-[320px] flex items-center justify-between border-2 border-primary-200 p-3 px-5 rounded-full ">
            <input
              className="mr-1 w-full h-7 focus:outline-0 py-2 px-1 text-lg"
              type="text"
              placeholder="Search article you want..."
            />
            <Link className=" flex items-center justify-center" href={"/"}>
              <Image
                width={30}
                height={30}
                src={"/icons/search.svg"}
                alt="search"
              />
            </Link>
          </div>
        </div>

        <CustomButton
          link="/favoriate"
          containerStyles="btn_primary px-3"
          image="bookmarks.svg"
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
