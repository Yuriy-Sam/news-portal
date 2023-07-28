"use client";
import React, { useState, useEffect, ReactNode } from "react";
import "@/styles/sidebar.css";
import Image from "next/legacy/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";
import {
  CategoryIcon,
  ExitIcon,
  HamburgerIcon,
  HomeIcon,
  IconProps,
  SettingIcon,
  TrendsIcon,
  WriteIcon,
} from "./SVGIcons";
import { AuthUser } from "@/types";

type NavLinkType = {
  link?: string;
  prompt: string;
  Icon: React.ComponentType<IconProps>;
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
    Icon: HomeIcon,
  },
  {
    prompt: "All News",
    link: "#",
    Icon: TrendsIcon,
  },
  {
    prompt: "Categories",
    link: "/categories",
    Icon: CategoryIcon,
  },
  {
    prompt: "Create post",
    // link: "/create-post",
    Icon: WriteIcon,
  },
  {
    prompt: "Settings",
    // link: "/settings",
    Icon: SettingIcon,
  },
  {
    prompt: "Exit",
    // link: "/login",
    Icon: ExitIcon,
  },
];
const NavLink = ({ item, show }: NavLinkProps) => {
  return (
    <CustomButton
      key={item.prompt}
      text={show ? item.prompt : undefined}
      link={item.link || undefined}
      prompt={item.prompt}
      containerStyles="btn_primary  w-full items-center  gap-4 justify-start lg:gap-0"
      Icon={item.Icon}
      iconStyles={show ? "w-[30px] h-[30px]" : "w-[25px] h-[25px]"}
    />
  );
};

const Sidebar = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as AuthUser;
      setAuthUser(parsedUser);
    }
  }, []);

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
    <aside className="  h-screen w-0 lg:w-[30px] lg:px-14 px-0 ">
      <CustomButton
        containerStyles=" btn_primary border-primary p-0 absolute top-0 left-5 sm:left-7 mt-7 z-50"
        Icon={HamburgerIcon}
        currentIconColor="red"
        activeIconColor="#fff"
        iconStyles={"w-[50px] h-[50px]"}
        handleClick={() => setShow(!show)}
      />
      <div
        className={` z-50 fixed transition-all  top-0 border-r-2 bg-white border-primary-200 h-screen px-7 py-10  lg:left-0 lg:px-5 ${
          show ? "left-0" : "-left-full"
        } `}
      >
        <div className=" text-xl font-bold uppercase text-center">Scope</div>
        <nav className=" h-full flex flex-col items-center justify-between pt-10 pb-6">
          <ul className="flex flex-col items-center gap-3">
            {renderNavLinks(navLinksArr.slice(0, -2))}
          </ul>
          <ul className="flex flex-col items-center gap-3">
            {renderNavLinks(
              authUser ? navLinksArr.slice(-2) : navLinksArr.slice(-2, -1)
            )}
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
