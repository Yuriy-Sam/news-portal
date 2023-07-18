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
const NavLink = ({ item }: NavLinkProps) => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<boolean>(false);
  return (
    <CustomButton
      key={item.prompt}
      prompt={item.prompt}
      link={item.link}
      containerStyles="btn_primary"
      activeStyles="btn_active"
      image={item.image}
      imageSize={25}
    />
    // <Link
    //   onMouseEnter={() => setActiveLink(true)}
    //   onMouseLeave={() => setActiveLink(false)}
    //   key={item.title}
    //   href={item.link}
    //   className="btn btn_primary"
    // >
    //   {!activeLink ? (
    //     <Image
    //       src={"/icons/" + item.image}
    //       // src={"/icons/" + activeLink ? "light/" + item.image : item.image}
    //       alt={item.title}
    //       width={28}
    //       height={28}
    //     />
    //   ) : (
    //     <Image
    //       src={"/icons/light/" + item.image}
    //       alt={item.title}
    //       width={28}
    //       height={28}
    //     />
    //   )}

    //   <span>{item.title}</span>
    // </Link>
  );
};

const Sidebar = () => {
  console.log("Sidebar");

  const renderNavLinks = (arr: Array<NavLinkType>) => {
    return arr.map((item) => {
      return <NavLink key={item.prompt} item={item} />;
    });
  };
  return (
    <aside className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__logo">
          Yus
          <br />
          News
        </div>
        <nav className="sidebar__nav">
          <ul>{renderNavLinks(navLinksArr.slice(0, -2))}</ul>
          <ul>{renderNavLinks(navLinksArr.slice(-2))}</ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
