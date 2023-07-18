"use client";
import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/legacy/image";
import { type } from "os";
import Link from "next/link";
import { posts } from "@/data/posts";
import { PostType } from "@/types";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

const Main = () => {
  const image =
    "https://localnews8.b-cdn.net/2023/07/cnn-L19jb21wb25lbnRzL2ltYWdlL2luc3RhbmNlcy9pbWFnZS04YzdhNjU3NjMzZmIxNGM1ZDBjNmEwODlkMjBlNTMyYQ-L19wYWdlcy9oX2YxMjg3YjZjNGQwODI0M2UzY2JjNjFiNDRmMGIxZGU0-300-1440x810.jpg";

  return (
    <section className="py-7 ">
      <div className="flex justify-between   items-center">
        <h2 className="title">Article of The Day</h2>
        <CustomButton
          text="Load More"
          containerStyles="btn_primary border-solid rounded-full text-sm  "
        />
      </div>
      <div className="h-[500px] lg:h-[400px] mt-7 ">
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
  // format(new Date(), "'Today is a' eeee")
  //=> "Today is a Monday"

  const datePublished = formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
  });

  console.log(dateNow);
  // formatRelative(subDays(new Date(), 3), new Date())
  return (
    <Link
      href={"/"}
      className={` shadow-inner w-full h-full justify-between flex flex-col items-center relative rounded-lg overflow-hidden  `}
    >
      <div className=" h-full"></div>
      <div className=" w-full box-border p-6 bg-gradient-to-t from-primary  to-[100%]   ">
        <div className=" flex gap-2 mb-2 ">
          {categories?.map((category) => {
            return (
              <p key={category.value} className=" text-xl text-white  ">
                {category.title},
              </p>
            );
          })}
        </div>

        <h3 className=" mb-4 text-3xl text-white font-bold">{title}</h3>
        <div className=" flex justify-between items-center">
          <div className="flex text-white  items-center gap-3 ">
            <Image
              className=" rounded-full"
              src={autor.image}
              alt={autor.name || ""}
              objectFit="cover"
              width={40}
              height={40}
            />
            <p className="text-lg text-primary-200 font-medium  ">
              {autor.name}
            </p>
            <span className=" w-[5px] h-[5px] bg-primary-400 rounded-full mt-1"></span>
            <p className="text-primary-400">{datePublished}</p>
          </div>
          <div className="">
            <CustomButton
              containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-2"
              // className="border-white  border-2"
              activeStyles="border-white "
              image={"bookmark.svg"}
              imageSize={30}
            />
            <CustomButton
              containerStyles="btn_secondary border-none bg-none after:hidden py-1 px-2"
              activeStyles="border-white "
              image={"share.svg"}
              imageSize={30}
            />
          </div>
        </div>
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
  );
};
export default Main;
