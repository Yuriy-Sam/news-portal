import { categories } from "@/data/categories";
import React from "react";
import CustomButton from "./CustomButton";
import { posts } from "@/data/posts";
import Post from "./Post";

const BreakingNews = () => {
  return (
    <section className="py-7 ">
      <h2 className="title">Breaking News</h2>
      {/* <div className="mb-5 flex wf  flex-nowrap">
        {categories.map((category) => {
          return (
            <CustomButton
              key={category.value}
              link={`/categories/` + category.value}
              containerStyles="btn_primary rounded-full border-solid text-base px-6 py-2 m-1"
              text={category.title}
            />
          );
        })}
      </div> */}
      <div className=" grid grid-cols-1 gap-5 grid-rows-2 md:grid-cols-2 sm:grid-cols-2 ">
        {posts.slice(0, 6).map((post, i) => {
          return <Post key={i} data={post} imageSize={800} />;
        })}
      </div>
      <div className=" w-full text-center mt-6">
        <CustomButton
          text="Load More"
          containerStyles="btn_primary border-solid rounded-full text-sm p-3 sm:py-3 sm:px-6 "
        />
      </div>
    </section>
  );
};

export default BreakingNews;
