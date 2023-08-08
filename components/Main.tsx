"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import Image from "next/legacy/image";
import { type } from "os";
import Link from "next/link";
import { posts } from "@/data/posts";
import { PostType } from "@/types";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { BookmarkIcon, ShareIcon } from "./SVGIcons";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getSinglePost, useAppDispatch, useStateSelector } from "@/store";
import { useParams } from "next/navigation";

const Main = () => {
  const dispatch = useAppDispatch();
  const post = useStateSelector((state) => state.post.singlePost);
  const status = useStateSelector((state) => state.post.singleStatus);
  useEffect(() => {
    dispatch(getSinglePost("bestToday"));
  }, []);
  const renderSkeleton = () => {
    return (
      <div className=" relative h-full w-full flex justify-between flex-col p-2 gap-4">
        <div
          role="status"
          className="flex items-center justify-center h-full w-full  bg-primary-300 rounded-lg animate-pulse dark:bg-primary-300"
        >
          <svg
            className="w-10 h-10 text-primary-200 dark:text-primary-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div className=" absolute bottom-0 left-0 w-full p-6">
          <div className=" h-3 w-1/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-3 mt-3 w-full  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-3 mt-3 w-3/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className="flex w-full items-center mt-8">
            <div className="h-[50px] w-[50px] mr-2 rounded-full bg-primary-300 animate-pulse dark:bg-primary-300"></div>

            <div className="  w-full">
              <div className=" h-3 w-2/4   bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
              <div className=" mt-2 h-3 w-1/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-7 ">
      <div className="flex justify-between  mb-7  items-center">
        <h2 className="title  mb-0">Article of The Day</h2>
        <CustomButton
          text="Load More"
          containerStyles="btn_primary dark:btn_primary border-solid rounded-full text-sm p-3 sm:py-4 sm:px-6 "
        />
      </div>
      <div className=" h-[300px] sm:h-[400px] lg:h-[500px]">
        {status === "loading" && renderSkeleton()}
        {status === "success" && post && <MainPost post={post} />}
      </div>
    </section>
  );
};

type MainPostProp = {
  post: PostType;
};
const MainPost = ({ post }: MainPostProp) => {
  const { _id, date, image, title, categories, autor } = post;
  return (
    <div className=" relative w-full h-full">
      <Link
        href={`/posts/${_id}`}
        className={`group/link  shadow-inner w-full h-full justify-between flex flex-col items-center relative rounded-lg overflow-hidden  `}
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

          <h3 className=" mb-4 text-lg sm:text-3xl text-white font-bold group-hover/link:underline">
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
            sizes="100vw"
            className="w-full h-auto"
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
            priority
            src={autor.avatar || "/img/profile.gif"}
            alt={autor.firstName + " " + autor.lastName || ""}
            width={40}
            height={40}
          />
          <div className="lg:flex  justify-center lg:items-center gap-3 ">
            <p className=" text-sm sm:text-lg text-primary-200 font-medium  ">
              {autor.firstName + " " + autor.lastName}
            </p>
            <span className=" w-[5px] h-[5px] bg-primary-400 rounded-full hidden lg:block   "></span>
            <p className="text-xs sm:text-base  text-primary-400">{date}</p>
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
