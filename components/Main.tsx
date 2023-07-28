// "use client";
import React, { useEffect } from "react";
import CustomButton from "./CustomButton";
import Image from "next/legacy/image";
import { type } from "os";
import Link from "next/link";
import { posts } from "@/data/posts";
import { PostType } from "@/types";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { BookmarkIcon, ShareIcon } from "./SVGIcons";

const Main = () => {
  const image =
    "https://localnews8.b-cdn.net/2023/07/cnn-L19jb21wb25lbnRzL2ltYWdlL2luc3RhbmNlcy9pbWFnZS04YzdhNjU3NjMzZmIxNGM1ZDBjNmEwODlkMjBlNTMyYQ-L19wYWdlcy9oX2YxMjg3YjZjNGQwODI0M2UzY2JjNjFiNDRmMGIxZGU0-300-1440x810.jpg";

  return (
    <section className="py-7 ">
      <div className="flex justify-between  mb-7  items-center">
        <h2 className="title  mb-0">Article of The Day</h2>
        <CustomButton
          text="Load More"
          containerStyles="btn_primary border-solid rounded-full text-sm p-3 sm:py-4 sm:px-6 "
        />
      </div>
      <div className=" h-[300px] sm:h-[400px] lg:h-[500px]">
        {/* <div className="grid grid-cols-1 grid-rows-3 mt-7 gap-4"> */}
        {/* <div className="grid grid-cols-[3fr_1fr] grid-rows-3 mt-7 gap-4"> */}
        <MainPost
          post={posts[0]}
          // containerStyles="row-span-3"
        />
        {/* <MainPost url={url} title="asdjasdk asd asmkdls and asndklasn dl" />
        <MainPost url={url} title="asdjasdk asd asmkdls and asndklasn dl" />
        <MainPost url={url} title="asdjasdk asd asmkdls and asndklasn dl" /> */}
      </div>
    </section>
  );
};

type MainPostProp = {
  post: PostType;
};
const MainPost = ({ post }: MainPostProp) => {
  const { image, title, categories, autor } = post;
  const dateNow: Date = new Date();
  // let isMobile = false;
  // useEffect(() => {

  //     isMobile = window.matchMedia("(max-width: 640px)").matches;

  // }, []);

  // format(new Date(), "'Today is a' eeee")
  //=> "Today is a Monday"

  const datePublished = formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
  });

  console.log(dateNow);
  // formatRelative(subDays(new Date(), 3), new Date())
  return (
    <div className=" relative w-full h-full">
      <Link
        href={"/"}
        className={` shadow-inner w-full h-full justify-between flex flex-col items-center relative rounded-lg overflow-hidden  `}
      >
        <div className=" h-full"></div>
        <div className=" w-full box-border p-3 sm:p-6 bg-gradient-to-t from-primary  to-[100%]   ">
          <div className=" flex gap-2 mb-2 ">
            {categories?.map((category) => {
              return (
                <p
                  key={category.value}
                  className=" text-base sm:text-xl text-white  "
                >
                  {category.title},
                </p>
              );
            })}
          </div>

          <h3 className=" mb-4 text-lg sm:text-3xl text-white font-bold">
            {title}
          </h3>
          {/* <div className=" flex justify-between items-center">
          <div className="flex text-white  items-center gap-2 sm:gap-3 ">
            <Image
              className=" rounded-full"
              src={autor.image}
              alt={autor.name || ""}
              objectFit="cover"
              width={40}
              height={40}
            />
            <div className="lg:flex  justify-center lg:items-center gap-3 ">
              <p className=" text-sm sm:text-lg text-primary-200 font-medium  ">
                {autor.name}
              </p>
              <span className=" w-[5px] h-[5px] bg-primary-400 rounded-full hidden lg:block   "></span>
              <p className="text-xs sm:text-base  text-primary-400">
                {datePublished}
              </p>
            </div>
          </div>
          <div className="">
            <CustomButton
              containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-1 sm:px-2 mr-1"
              activeStyles="border-white "
              Icon={BookmarkIcon}
              currentIconColor="#b2b2b2"
              activeIconColor="#000"
              iconStyles={"w-[30px] h-[30px]"}
            />
            <CustomButton
              containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-1 sm:px-2"
              activeStyles="border-white "
              Icon={ShareIcon}
              currentIconColor="#b2b2b2"
              activeIconColor="#000"
              iconStyles={"w-[30px] h-[30px]"}
            />
          </div>
        </div> */}
          <div className="h-[40px] sm:h-[50px]"></div>
        </div>
        <div className="absolute top-0 left-0 -z-10 w-full h-full  rounded-lg overflow-hidden ">
          <Image
            priority
            src={image}
            alt={title || ""}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </Link>
      <div className=" absolute w-full bottom-0 left-0 p-3 sm:p-6 flex justify-between items-center">
        <div className="flex text-white  items-center gap-2 sm:gap-3 ">
          <Image
            className=" rounded-full"
            src={autor.image}
            alt={autor.name || ""}
            width={40}
            height={40}
          />
          <div className="lg:flex  justify-center lg:items-center gap-3 ">
            <p className=" text-sm sm:text-lg text-primary-200 font-medium  ">
              {autor.name}
            </p>
            <span className=" w-[5px] h-[5px] bg-primary-400 rounded-full hidden lg:block   "></span>
            <p className="text-xs sm:text-base  text-primary-400">
              {datePublished}
            </p>
          </div>
        </div>
        <div className="">
          <CustomButton
            containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-1 sm:px-2 mr-1"
            activeStyles="border-white "
            Icon={BookmarkIcon}
            currentIconColor="#b2b2b2"
            activeIconColor="#000"
            iconStyles={"w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"}
          />
          <CustomButton
            containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-1 sm:px-2"
            activeStyles="border-white "
            Icon={ShareIcon}
            currentIconColor="#b2b2b2"
            activeIconColor="#000"
            iconStyles={"w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"}
          />
        </div>
      </div>
    </div>
  );
};
export default Main;
