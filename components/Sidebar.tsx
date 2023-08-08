"use client";
import React, { useState, useEffect, ReactNode } from "react";
import "@/styles/sidebar.css";
import Image from "next/legacy/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

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
import { AuthUserType } from "@/types";
import { useAppDispatch, useStateSelector, userActions } from "@/store";

type NavLinkType = {
  link?: string;
  prompt: string;
  Icon: React.ComponentType<IconProps>;
  handle?: () => void;
};
type NavLinkProps = {
  key: string;
  item: NavLinkType;
  show?: boolean;
};
type SidebarProps = {
  show?: boolean;
};

const Sidebar = () => {
  const router = useRouter();
  const authUser = useStateSelector((state) => state.user.authUser);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(false);
    // dispatch(userActions.getAuthUser());
  }, []);

  // const { systemTheme, theme, setTheme } = useTheme();

  const navLinksArr: Array<NavLinkType> = [
    {
      prompt: "Home",
      link: "/",
      Icon: HomeIcon,
      handle: () => {
        setShow(false);
      },
    },
    {
      prompt: "All Posts",
      link: "/posts",
      Icon: TrendsIcon,
      handle: () => {
        setShow(false);
      },
    },
    {
      prompt: "Categories",
      link: "/categories",
      Icon: CategoryIcon,
      handle: () => {
        setShow(false);
      },
    },
    {
      prompt: "Create post",
      link: "/create-post",
      Icon: WriteIcon,
      handle: () => {
        setShow(false);
      },
    },
    {
      prompt: "Settings",
      // link: "/settings",
      Icon: SettingIcon,
      handle: () => {
        setShow(false);
      },
    },
    {
      prompt: "Exit",
      // link: "/login",
      Icon: ExitIcon,
      handle: () => {
        setShow(false);
        dispatch(userActions.leaveUser());
        router.push("/login");
      },
    },
  ];

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser) as AuthUserType;
  //     // setAuthUser(parsedUser);
  //   }
  // }, []);

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
  const NavLink = ({ item, show }: NavLinkProps) => {
    return (
      <CustomButton
        key={item.prompt}
        text={show ? item.prompt : undefined}
        link={item.link || undefined}
        prompt={item.prompt}
        containerStyles="btn_primary  min-w-full items-center gap-4  justify-start lg:gap-0  "
        iconStyles={show ? "w-[25px] h-[25px]" : "w-[25px] h-[25px]"}
        Icon={item.Icon}
        handleClick={item.handle}
      />
    );
  };
  return (
    <aside className="  min-h-screen  w-0 lg:w-[30px] lg:px-14 px-0 ">
      <CustomButton
        containerStyles=" btn_primary border-primary p-0 absolute top-0 left-5 sm:left-7 mt-7 z-50"
        Icon={HamburgerIcon}
        iconStyles={"w-[50px] h-[50px]"}
        handleClick={() => setShow(true)}
      />
      <div
        className={` z-50 fixed transition-all  top-0 border-r-2 bg-white border-primary-200 h-full px-7 py-10  lg:left-0 lg:px-5 ${
          show ? "left-0" : "-left-full"
        } `}
      >
        <div className=" text-xl font-bold uppercase text-center">Scope</div>

        <nav className=" h-full flex flex-col items-center justify-between pt-5 pb-6">
          <ul className="flex flex-col items-center  w-full gap-3">
            {authUser ? (
              <div className="flex  items-center gap-2 sm:gap-3  lg:hidden border-2 rounded-lg   p-2 mb-1 ">
                <Image
                  className=" rounded-full"
                  src={"/img/profile1.gif"}
                  priority
                  alt={authUser.firstName}
                  width={40}
                  height={40}
                />
                <div className="">
                  <p className=" text-sm text-primary font-bold  ">
                    {authUser.firstName + " " + authUser.lastName}
                  </p>
                  <p className="text-xs text-primary-500 ">{authUser.email}</p>
                </div>
              </div>
            ) : (
              <div
                className={` w-full relative ${
                  show ? "flex" : "hidden"
                }  items-center justify-between  `}
              >
                <CustomButton
                  link="/login"
                  containerStyles="btn_primary border-primary text-sm rounded-full rounded-r-none  px-3 w-full  border-r-0 border-solid"
                  text="Log In"
                  handleClick={() => setShow(!show)}
                />
                <CustomButton
                  link="/signup"
                  containerStyles="btn_secondary  border-primary text-sm  rounded-full rounded-l-none px-3  w-full  border-l-0 after:animate-btn-anim hover:after:animate-none"
                  text="Sign Up"
                  handleClick={() => setShow(!show)}
                />
              </div>
            )}
            {renderNavLinks(
              authUser ? navLinksArr.slice(0, -2) : navLinksArr.slice(0, -3)
            )}
          </ul>
          <ul className="flex flex-col items-center w-full gap-3">
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
        onClick={() => setShow(false)}
      ></div>
    </aside>
  );
};

export default Sidebar;
