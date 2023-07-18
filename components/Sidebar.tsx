"use client";
import React, { useState, useEffect } from "react";
import "@/styles/sidebar.css";
import Image from "next/legacy/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";

type NavLinkType = {
  link: string;
  prompt: string;
  image: string;
};
type NavLinkProps = {
  key: string;
  item: NavLinkType;
  show?: boolean;
};
type SidebarProps = {
  show?: boolean;
};

const navLinksArr: Array<NavLinkType> = [
  {
    prompt: "Home",
    link: "/",
    image: "home.svg",
  },
  {
    prompt: "Categories",
    link: "/categories",
    image: "category.svg",
  },
  {
    prompt: "Create post",
    link: "/create-post",
    image: "write.svg",
  },
  {
    prompt: "Settings",
    link: "/settings",
    image: "setting.svg",
  },
  {
    prompt: "Exit",
    link: "/login",
    image: "exit.svg",
  },
];
const NavLink = ({ item, show }: NavLinkProps) => {
  return (
    <CustomButton
      key={item.prompt}
      text={show ? item.prompt : undefined}
      link={item.link}
      containerStyles="btn_primary  w-full items-center justify-start lg:gap-2"
      activeStyles="btn_active"
      image={item.image}
      imageSize={show ? 25 : 30}
    />
  );
};

const Sidebar = () => {
  console.log("Sidebar");

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);
  const renderNavLinks = (arr: Array<NavLinkType>) => {
    return arr.map((item) => {
      return <NavLink key={item.prompt} show={show} item={item} />;
    });
  };
  return (
    <aside className="  h-screen w-[160px] lg:w-0 ">
      <CustomButton
        containerStyles=" btn_primary border-primary p-0 absolute top-0 left-7 mt-7 z-50"
        image="hamburger.svg"
        imageSize={50}
        handleClick={() => setShow(!show)}
      />
      <div
        className={` z-50 fixed transition-all   top-0 left-0 border-r-2 bg-white border-primary-200 h-screen px-4 py-10 lg:-left-full ${
          show ? "lg:left-0" : "lg:-left-full"
        }`}
      >
        <div className=" text-xl font-bold uppercase text-center">Scope</div>
        <nav className=" h-full flex flex-col items-center justify-between pt-10 pb-6">
          <ul className="flex flex-col items-center gap-3">
            {renderNavLinks(navLinksArr.slice(0, -2))}
          </ul>
          <ul className="flex flex-col items-center gap-3">
            {renderNavLinks(navLinksArr.slice(-2))}
          </ul>
        </nav>
      </div>
      <div
        className={`z-40 fixed top-0 left-0 w-full h-full bg-black opacity-50 ${
          show ? "visible" : "invisible"
        } `}
        onClick={() => setShow(!show)}
      ></div>
    </aside>
  );
};

export default Sidebar;
