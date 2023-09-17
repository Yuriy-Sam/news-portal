"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import Post from "./Post";
import { categories } from "@/data/categories";
// import { posts } from "@/data/posts";
import Image from "next/image";
import { AuthUserType } from "@/types";
import { useStateSelector } from "@/store";

const ProfileSidebar = () => {
  // const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const authUser = useStateSelector((state) => state.user.authUser);
  const post = useStateSelector((state) => state.post.lastReadingPost);

  useEffect(() => {
    console.log("lastReadingPost --", post);
  }, [post]);
  return (
    <aside className="relative w-0  h-screen hidden md:block lg:min-w-[350px] ">
      <div className=" fixed top-0 right-100% h-screen  border-l-primary-200 border-l-2  py-7 px-7">
        {authUser ? (
          <div className="flex   items-center gap-2 sm:gap-3 pb-7    mb-7 after-line  ">
            <Image
              className="w-[50px] h-[50px] object-cover rounded-full"
              src={authUser.avatar || "/img/profile1.gif"}
              priority
              alt={authUser.firstName}
              width={60}
              height={60}
            />
            <div className="">
              <p className=" text-sm sm:text-base text-primary font-bold  ">
                {authUser.firstName + " " + authUser.lastName}
              </p>
              <p className="text-sm text-primary-500 ">{authUser.email}</p>
            </div>
          </div>
        ) : (
          <div className=" relative  w-full flex items-center justify-center pb-7  mb-7 after-line ">
            <CustomButton
              link="/login"
              containerStyles="btn_primary rounded-full rounded-r-none border-r-0 border-solid"
              text="Log In"
            />
            <CustomButton
              link="/signup"
              containerStyles="btn_secondary  rounded-full rounded-l-none border-l-0 after:animate-btn-anim hover:after:animate-none"
              text="Sign Up"
            />
          </div>
        )}
        {post && (
          <div className=" pb-7  mb-7 after-line ">
            <h3 className="title_md">Continue Reading</h3>
            <Post data={post} showText={false} imageSize={300} />
          </div>
        )}
        <div className=" ">
          <h3 className="title_md">More Interesting Topic</h3>
          <div className="">
            {categories.map((category) => {
              return (
                <CustomButton
                  key={category.value}
                  link={`/posts?categories=` + category.value}
                  containerStyles="btn_primary rounded-full border-solid text-sm px-4 py-2 m-1"
                  text={category.title}
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
