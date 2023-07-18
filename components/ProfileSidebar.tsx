"use client";
import React from "react";
import CustomButton from "./CustomButton";
import Post from "./Post";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";

const ProfileSidebar = () => {
  console.log("ProfSidebar");

  return (
    <aside className="relative w-[500px] lg:w-[400px]  h-screen md:hidden  ">
      <div className=" fixed top-0 right-100% h-screen  border-l-primary-200 border-l-2  py-7 px-7">
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
        <div className=" pb-7  mb-7 after-line ">
          <h3 className="title_md">Continue Reading</h3>
          <Post data={posts[0]} showText={false} imageSize={300} />
        </div>
        <div className=" ">
          <h3 className="title_md">More Interesting Topic</h3>
          <div className="">
            {categories.map((category) => {
              return (
                <CustomButton
                  key={category.value}
                  link={`/categories/` + category.value}
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
