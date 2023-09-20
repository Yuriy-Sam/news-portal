"use client";
import { CustomButton, Post } from "@/components";
import {
  BookmarkIcon,
  CommentIcon,
  EyeIcon,
  ShareIcon,
} from "@/components/SVGIcons";
import { posts } from "@/data/posts";
import {
  getPosts,
  getSinglePost,
  postActions,
  postReducer,
  updateViews,
  useAppDispatch,
  useStateSelector,
} from "@/store";
import Image from "next/image";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ContentType, PostType } from "@/types";
import CustomNotesButton from "@/components/CustomNotesButton";

const PagePosts = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const post = useStateSelector((state) => state.post.singlePost)!;
  const status = useStateSelector((state) => state.post.singleStatus);

  useEffect(() => {
    const asyncRender = async () => {
      const res = await dispatch(getSinglePost(id));
      dispatch(updateViews(id));
      if (res.payload.post) {
        dispatch(postActions.createLastPost(res.payload.post));
      }
    };
    asyncRender();
  }, []);
  if (status === "error") {
    notFound();
  }
  const renderLodingItems = (n: number) => {
    const items = [];
    for (let i = 1; i <= n; i++) {
      items.push(
        <div
          key={i}
          className="h-full w-full flex justify-between flex-col p-2 gap-4"
        >
          <div className=" h-3 mt-9 w-full  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-3  w-3/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className="flex w-full items-center mt-5">
            <div className="h-[50px] w-[50px] mr-2 rounded-full bg-primary-300 animate-pulse dark:bg-primary-300"></div>

            <div className="  w-full">
              <div className=" h-3 w-1/4   bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
              <div className=" mt-2 h-3 w-1/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
            </div>
          </div>
          <div
            key={i}
            role="status"
            className="flex items-center justify-center w-full h-[500px] py-16 bg-primary-300 rounded-lg animate-pulse dark:bg-primary-300"
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
          <div className=" h-3  mt-3 w-full  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-3 w-full  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
          <div className=" h-3 w-3/4  bg-primary-300 rounded animate-pulse dark:bg-primary-300"></div>
        </div>
      );
    }
    return items;
  };
  const renderContentItems = (arr: ContentType[]) => {
    return arr.map((el, i) => {
      switch (el.type) {
        case "image":
          return (
            <Image
              key={el.type + "-" + i}
              className=" mt-8 max-h-[500px] mb-11 rounded w-full object-cover "
              src={el.value}
              alt={el.type + "-" + i}
              // layout="responsive"
              priority
              width={1000}
              height={500}
            />
          );
        case "subtitle":
          return (
            <h2
              key={el.type + "-" + i}
              className="title mt-3 mb-4 sm:text-4xl text-3xl "
            >
              {el.value}
            </h2>
          );

        case "content":
          return (
            <div
              key={el.type + "-" + i}
              className="title sm:text-2xl  text-xl font-normal mb-5"
            >
              {el.value}
            </div>
          );

        default:
          break;
      }
    });
  };
  if (status === "loading") {
    return <section className="py-7 ">{renderLodingItems(1)}</section>;
  }
  if (status === "success") {
    const {
      _id,
      title,
      autor,
      mainImage,
      content,
      categories,
      date,
      isNotes,
      views,
    } = post as PostType;

    return (
      <section className="py-7 ">
        <div className="">
          <div className=" flex justify-between  items-center">
            {categories?.map((el) => {
              return (
                <p
                  key={el.value}
                  className="text-lg py-2 font-semibold    text-primary-500"
                >
                  {el.title}
                </p>
              );
            })}
            <div className=" flex justify-start items-center">
              <p className="text-primary-500 text-md  font-medium   mr-[3px]">
                {views}
              </p>
              <EyeIcon color="primary-500" iconStyles="w-[20px] h-[20px]" />
              <p className="text-primary-500 text-md  font-medium ml-2 mr-[1px]">
                0
              </p>

              <CommentIcon
                color="primary-500"
                iconStyles="w-[20px] h-[20px] text-primary-500"
              />
            </div>
          </div>
          <h1 className="title text-3xl ">{title}</h1>
          <div className="  w-full flex justify-between items-center py-2 px-1 group-hover:px-2 hover:transition-all   duration-300   ">
            <div className="flex text-white  items-center gap-2 ">
              <div className="sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] ">
                <Image
                  className="rounded-full block sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover"
                  src={autor.avatar || "/img/profile.gif"}
                  alt={autor.firstName + " " + autor.lastName || ""}
                  // objectFit="cover"
                  // layout="responsive"
                  width={50}
                  height={50}
                />
              </div>
              <div className="">
                <p className="sm:text-lg text-base text-primary-600 font-medium  ">
                  {autor.firstName + " " + autor.lastName}
                </p>
                {/* <span className=" w-[3px] h-[3px] bg-primary-400 rounded-full"></span> */}
                <p className=" text-sm   text-primary-400">{date}</p>
              </div>
            </div>
            <div className="">
              {/* <CustomButton
                containerStyles="btn_primary border-none bg-none after:hidden py-1 px-2  text-primary-600"
                activeStyles="border-white "
                Icon={BookmarkIcon}
                iconStyles={"sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"}
              /> */}
              <CustomNotesButton
                isNotes={isNotes!}
                id={_id}
                containerStyles="btn_primary border-none bg-none after:hidden py-1 px-2  text-primary-600"
                activeContainerStyles="hover:text-primary text-primary "
                // activeStyles="border-white "
                iconStyles={"sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"}
              />

              <CustomButton
                containerStyles="btn_primary border-none bg-none after:hidden py-1 px-2 text-primary-600"
                activeStyles="border-white "
                Icon={ShareIcon}
                iconStyles={"sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]"}
              />
            </div>
          </div>
          <Image
            className=" mt-8 max-h-[500px] mb-11 rounded w-full object-cover "
            src={mainImage}
            alt={title}
            // layout="responsive"
            priority
            width={1000}
            height={500}
          />
          {/* <p className=" mt-5 text-lg">{text}</p> */}
          {renderContentItems(content)}
        </div>
      </section>
    );
  }
};
export default PagePosts;
