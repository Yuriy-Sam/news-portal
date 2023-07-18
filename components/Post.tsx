"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import CustomButton from "./CustomButton";
import { PostType } from "@/types";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

type PostProps = {
  data: PostType;
  imageSize?: number;
  containerStyles?: string;
  showText?: boolean;
};
const Post = ({
  data,
  imageSize,
  containerStyles,
  showText = true,
}: PostProps) => {
  const { url, image, title, text, autor } = data;
  const datePublished = formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
  });

  return (
    <>
      <Link
        className={` relative flex justify-between  flex-col w-full post-shadow hover:shadow-md transition-all hover:p-1 hover:shadow-primary-400 rounded ${containerStyles}`}
        href={url}
      >
        <div
          className="
        "
        >
          <Image
            className="  rounded w-full mb-2 object-cover "
            src={image}
            alt={title}
            width={imageSize || 500}
            height={(imageSize && imageSize / 2) || 200}
          />
          <div className="flex flex-col justify-between  ">
            <div className="">
              <h3 className="title_md">{title}</h3>
              {showText && (
                <p className=" text-primary-600 text-sm ">
                  {Number(text.length) > 250 && text.slice(0, 120) + "..."}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" flex justify-between items-center py-2">
          <div className="flex text-white  items-center gap-2 ">
            <Image
              className=" rounded-full"
              src={autor.image}
              alt={autor.name || ""}
              objectFit="cover"
              width={30}
              height={30}
            />
            <div className="">
              <p className="text-sm text-primary-600 font-medium  ">
                {autor.name}
              </p>
              {/* <span className=" w-[3px] h-[3px] bg-primary-400 rounded-full"></span> */}
              <p className=" text-xs   text-primary-400">{datePublished}</p>
            </div>
          </div>
          <div className="">
            <CustomButton
              containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-2"
              // className="border-white  border-2"
              activeStyles="border-white "
              image={"bookmark.svg"}
              imageSize={20}
            />
            <CustomButton
              containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-2"
              activeStyles="border-white "
              image={"share.svg"}
              imageSize={20}
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
