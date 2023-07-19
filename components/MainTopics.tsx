import { categories } from "@/data/categories";
import React from "react";
import CustomButton from "./CustomButton";
import { posts } from "@/data/posts";
import Post from "./Post";

const MainTopics = () => {
  return (
    <section className="py-7 ">
      <h2 className="title">Topic Match for You</h2>
      <div className="py-5">
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
      </div>
      <div className=" grid grid-cols-3 gap-7 grid-rows-2 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 ">
        {posts.slice(0, 5).map((post, i) => {
          return <Post key={i} data={post} imageSize={500} />;
        })}
      </div>
    </section>
  );
};

export default MainTopics;
