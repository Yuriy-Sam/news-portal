"use client";
import React, { useState, useEffect } from "react";
import "@/styles/sidebar.css";
import Image from "next/image";
import Link from "next/link";

type NavLinkType = {
  link: string;
  title: string;
  image: string;
};
type NavLinkProps = {
  key: string;
  item: NavLinkType;
};
const navLinksArr: Array<NavLinkType> = [
  {
    title: "Home",
    link: "/",
    image: "home.svg",
  },
  {
    title: "Categories",
    link: "/categories",
    image: "category.svg",
  },
  {
    title: "Create post",
    link: "/create-post",
    image: "write.svg",
  },
  {
    title: "Settings",
    link: "/settings",
    image: "setting.svg",
  },
  {
    title: "Exit",
    link: "/login",
    image: "exit.svg",
  },
];
const NavLink = ({ item }: NavLinkProps) => {
  const [activeLink, setActiveLink] = useState<boolean>(false);
  return (
    <Link
      onMouseEnter={() => setActiveLink(true)}
      onMouseLeave={() => setActiveLink(false)}
      key={item.title}
      href={item.link}
      className="btn btn_primary"
    >
      {!activeLink ? (
        <Image
          src={"/icons/" + item.image}
          // src={"/icons/" + activeLink ? "light/" + item.image : item.image}
          alt={item.title}
          width={28}
          height={28}
        />
      ) : (
        <Image
          src={"/icons/light/" + item.image}
          alt={item.title}
          width={28}
          height={28}
        />
      )}

      <span>{item.title}</span>
    </Link>
  );
};

const Sidebar = () => {
  const renderNavLinks = (arr: Array<NavLinkType>) => {
    return arr.map((item) => {
      return <NavLink key={item.title} item={item} />;
    });
  };
  return (
    <aside className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__logo">Logo</div>
        <nav className="sidebar__nav">
          <ul>{renderNavLinks(navLinksArr.slice(0, -2))}</ul>
          <ul>{renderNavLinks(navLinksArr.slice(-2))}</ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
