import React from "react";
import CustomButton from "./CustomButton";
import Post from "./Post";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";

const ProfileSidebar = () => {
  return (
    <aside className=" w-[500px] py-7 px-7 relative border-l-primary-200 border-l-2  ">
      <div className=" absolute top-0 right-0 w-full py-7 px-7">
        <div className=" relative  w-full flex items-center justify-center pb-7  mb-7 after-line ">
          <CustomButton
            link="/login"
            containerStyles="btn_primary rounded-r-none btn_lg border-solid"
            text="LogIn"
          />
          <CustomButton
            link="/signup"
            containerStyles="btn_secondary  rounded-l-none btn_lg  after:animate-btn-anim hover:after:animate-none"
            text="SignUp"
          />
        </div>
        <div className=" pb-7  mb-7 after-line ">
          <h3 className="title_md">Continue Reading</h3>
          <Post data={posts[0]} />
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
