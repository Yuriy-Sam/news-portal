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
  curentIconColor?: string;
  Icon?: React.ComponentType<IconProps>;
  prompt?: string | null;
  type?: "button" | "submit" | "reset";
  containerStyles?: string;
  activeStyles?: string;
  handleClick?: () => void;
  isDisabled?: boolean;
  imageSize?: number;
};

const CustomButton = ({
  link,
  text,
  type,
  prompt,
  containerStyles,
  handleClick,
  isDisabled,
  imageSize = 28,
  Icon,
  activeStyles,
  activeIconColor,
  curentIconColor,
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
          className={`btn ${containerStyles} ${
            pathname === link ? activeStyles || "btn_active" : null
          } `}
        >
          {Icon && (
            <Icon
              imageSize={imageSize}
              color={active ? activeIconColor : curentIconColor}
            />
          )}
          {/* {image ? (
            //  (
            //   <>
            //     <Image
            //       className={"hidden" + active ? `hidden` : ""}
            //       priority
            //       src={"/icons/" + image}
            //       // src={"/icons/" + active ? "light/" + image : image}
            //       alt={image}
            //       width={imageSize}
            //       height={imageSize}
            //     />

            //     <Image
            //       className={"hidden" + !active ? `hidden` : ""}
            //       priority
            //       src={"/icons/light/" + image}
            //       alt={image}
            //       width={imageSize}
            //       height={imageSize}
            //     />
            //   </>
            // )
            active ? (
              <Image
                className={"hidden" + !active ? `hidden` : ""}
                priority
                src={"/icons/active/" + image}
                alt={image}
                width={imageSize}
                height={imageSize}
              />
            ) : (
              <Image
                // className={"hidden" + active ? `hidden` : ""}
                priority
                src={"/icons/" + image}
                // src={"/icons/" + active ? "light/" + image : image}
                alt={image}
                width={imageSize}
                height={imageSize}
              />
            )
          ) : null} */}
          <p>{text}</p>
          {prompt && <span>{prompt}</span>}
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
              imageSize={imageSize}
              color={active ? activeIconColor : curentIconColor}
            />
          )}
          {text && <p>{text}</p>}
        </button>
      )}
    </>
  );
};

export default memo(CustomButton);
