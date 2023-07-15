import React from "react";
import styles from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
const Header = () => {
  return (
    <header className="after-line relative w-full block pb-7">
      <div className="flex justify-between items-center">
        <div className="header__search w-[320px] flex items-center justify-between border-2 border-primary-200 p-3 px-5 rounded-full ">
          <input
            className="mr-1 w-full h-7 focus:outline-0 py-2 px-1 text-lg"
            type="text"
            placeholder="Search article you want..."
          />
          <Link href={"/"}>
            <Image
              width={30}
              height={30}
              src={"/icons/search.svg"}
              alt="search"
            />
          </Link>
        </div>
        <CustomButton
          link="/favoriate"
          containerStyles="btn_primary rounded-full"
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
