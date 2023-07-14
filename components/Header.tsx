import React from "react";
import styles from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full block  p-5 py-7">
      <div className="flex justify-between items-center">
        <div className="header__search w-[320px] flex items-center justify-between border-2 border-primary-300 p-3 px-5 rounded-full ">
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
        <div className="flex justify-between items-center gap-5">
          <Image
            width={30}
            height={30}
            src={"/icons/bookmarks.svg"}
            alt="bookmarks"
          />
          <Link className="btn btn_primary btn_lg" href={"/login"}>
            LogIn
          </Link>
          <Link
            className="btn btn_secondary btn_lg  after:animate-btn-anim hover:after:animate-none"
            href={"/signup"}
          >
            SignUp
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
