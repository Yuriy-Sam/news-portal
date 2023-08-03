"use client";
import { CustomButton, Post } from "@/components";
import { BookmarkIcon, ShareIcon } from "@/components/SVGIcons";
import { posts } from "@/data/posts";
import {
  getPosts,
  getSinglePost,
  useAppDispatch,
  useStateSelector,
} from "@/store";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

const PagePosts = () => {
  const datePublished = formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
  });
  const dispatch = useAppDispatch();
  // const posts = useStateSelector((state) => state.post.postItems);
  const { id } = useParams();
  const status = useStateSelector((state) => state.post.status);
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    dispatch(getSinglePost(id));
  }, []);
  const renderLodingItems = (n: number) => {
    const items = [];
    for (let i = 1; i <= n; i++) {
      items.push(
        <div
          key={i}
          className="h-full w-full flex justify-between flex-col p-2 gap-4"
        >
          <div
            key={i}
            role="status"
            className="flex items-center justify-center w-full py-16 bg-primary-300 rounded-lg animate-pulse dark:bg-primary-300"
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
          <div className=" h-2 w-1/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-2 mt-3 w-full  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-2  w-3/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-2  mt-3 w-full  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-2 w-full  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-2 w-3/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className="flex w-full items-center mt-8">
            <div className="h-[30px] w-[30px] mr-2 rounded-full bg-primary-300 animate-pulse dark:bg-primary-300"></div>

            <div className="  w-full">
              <div className=" h-2 w-2/4   bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
              <div className=" mt-2 h-2 w-1/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
            </div>
          </div>
        </div>
      );
    }
    return items;
  };
  const { title, autor, image, text, categories } = posts[0];
  return (
    <section className="py-7 ">
      <h1 className="title ">{title}</h1>
      {/* <div className=" flex justify-start items-center gap-2 mb-5">
        {categories?.map((el) => {
          return (
            <p className=" text-base  text-primary-600" key={el.value}>
              {el.title + ","}
            </p>
          );
        })}
      </div> */}
      <div className="  w-full flex justify-between items-center py-2 px-1 group-hover:px-2 hover:transition-all   duration-300   ">
        <div className="flex text-white  items-center gap-2 ">
          <div className="w-[50px] h-[50px] ">
            <Image
              className="rounded-full"
              src={"/img/profile.gif"}
              alt={autor.firstName + " " + autor.lastName || ""}
              objectFit="cover"
              layout="responsive"
              width={50}
              height={50}
            />
          </div>
          <div className="">
            <p className="text-lg text-primary-600 font-medium  ">
              {autor.firstName + " " + autor.lastName}
            </p>
            {/* <span className=" w-[3px] h-[3px] bg-primary-400 rounded-full"></span> */}
            <p className=" text-sm   text-primary-400">{datePublished}</p>
          </div>
        </div>
        <div className="">
          <CustomButton
            containerStyles="btn_primary border-none bg-none after:hidden py-1 px-2  text-primary-600"
            activeStyles="border-white "
            Icon={BookmarkIcon}
            iconStyles={"w-[25px] h-[25px]"}
          />
          <CustomButton
            containerStyles="btn_primary border-none bg-none after:hidden py-1 px-2 text-primary-600"
            activeStyles="border-white "
            Icon={ShareIcon}
            iconStyles={"w-[25px] h-[25px]"}
          />
        </div>
      </div>
      <Image
        className=" mt-5 max-h-[500px]  rounded w-full object-cover "
        src={image}
        alt={title}
        layout="responsive"
        width={1000}
        height={500}
      />
      <p className=" mt-5 text-lg">{text}</p>
    </section>
  );
};

export default PagePosts;
