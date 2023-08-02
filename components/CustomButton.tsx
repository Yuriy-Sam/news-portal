"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, memo, useState } from "react";
import { IconProps } from "./SVGIcons";

type CustomButtonProps = {
  link?: string;
  text?: string;
  activeIconColor?: string;
  currentIconColor?: string;
  Icon?: React.ComponentType<IconProps>;
  prompt?: string | null;
  type?: "button" | "submit" | "reset";
  containerStyles?: string;
  activeStyles?: string;
  handleClick?: () => void;
  isDisabled?: boolean;
  iconStyles?: string;
};

const CustomButton = ({
  link,
  text,
  type,
  prompt,
  containerStyles,
  handleClick,
  isDisabled,
  iconStyles,
  Icon,
  activeStyles,
  activeIconColor,
  currentIconColor,
}: CustomButtonProps) => {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(pathname === link);
  const handlerActive = (val: boolean) => {
    if (pathname === link) {
      setActive(true);
    } else {
      setActive(val);
    }
  };
  return (
    <>
      {link ? (
        <Link
          onMouseEnter={() => handlerActive(true)}
          onMouseLeave={() => handlerActive(false)}
          href={link}
          title={prompt || ""}
          onClick={handleClick}
          className={`btn ${containerStyles} ${
            pathname === link ? activeStyles || "btn_active" : null
          } `}
        >
          {Icon && (
            <Icon
              iconStyles={iconStyles}
              color={active ? activeIconColor : currentIconColor}
            />
          )}

          {text && <p className=" w-full text-canter">{text}</p>}
        </Link>
      ) : (
        <button
          disabled={isDisabled || false}
          type={type || "button"}
          className={`btn ${containerStyles}`}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onClick={handleClick}
        >
          {Icon && (
            <Icon
              iconStyles={iconStyles}
              // color={active ? "green-500" : "red-500"}
              color={active ? activeIconColor : currentIconColor}
            />
          )}
          {text && <p>{text}</p>}
        </button>
      )}
    </>
  );
};

export default memo(CustomButton);
