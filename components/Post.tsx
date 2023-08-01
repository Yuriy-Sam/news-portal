// "use client";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import CustomButton from "./CustomButton";
import { PostType } from "@/types";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { BookmarkIcon, ShareIcon } from "./SVGIcons";

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
  const { url, image, title, text, autor, categories } = data;
  const datePublished = formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="group  group-hover:transition-all   duration-300  p-1 post-shadow hover:shadow-lg hover:shadow-primary-400 hover:p-0  relative h-full w-full rounded overflow-hidden">
      <Link
        className={`group/link relative flex justify-between h-full flex-col w-full  rounded ${containerStyles}`}
        href={url}
      >
        <div className="">
          <Image
            className="  rounded w-full object-cover "
            src={image}
            alt={title}
            layout="responsive"
            width={imageSize || 500}
            height={(imageSize && imageSize / 2) || 200}
          />
          <div className="flex flex-col justify-between mt-2 group-hover:px-2 hover:transition-all   duration-300   ">
            <div className="">
              <div className=" flex justify-start items-center gap-2 mb-1">
                {categories?.map((el) => {
                  return (
                    <p className=" text-sm  text-primary-600" key={el.value}>
                      {el.title + ","}
                    </p>
                  );
                })}
              </div>

              <h3 className="title_md group-hover/link:underline decoration-primary-600">
                {title}
              </h3>
              {showText && (
                <p className=" text-primary-600 text-sm ">
                  {Number(text.length) > 250 && text.slice(0, 120) + "..."}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" h-[60px]"></div>
      </Link>
      <div className=" absolute bottom-0 left-0 w-full flex justify-between items-center py-2 px-1 group-hover:px-2 hover:transition-all   duration-300   ">
        <div className="flex text-white  items-center gap-2 ">
          <div className="w-[30px] h-[30px] ">
            <Image
              className="rounded-full"
              src={autor.image}
              alt={autor.name || ""}
              objectFit="cover"
              layout="responsive"
              width={30}
              height={30}
            />
          </div>
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
            containerStyles="btn_primary border-none bg-none after:hidden py-1 px-2  text-primary-600"
            activeStyles="border-white "
            Icon={BookmarkIcon}
            iconStyles={"w-[20px] h-[20px]"}
          />
          <CustomButton
            containerStyles="btn_primary border-none bg-none after:hidden py-1 px-2 text-primary-600"
            activeStyles="border-white "
            Icon={ShareIcon}
            iconStyles={"w-[20px] h-[20px]"}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
