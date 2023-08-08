"use client";
import { CustomButton, Post } from "@/components";
// import { posts } from "@/data/posts";
import { getPosts, useAppDispatch, useStateSelector } from "@/store";
import { PostType } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PagePosts = () => {
  const dispatch = useAppDispatch();
  const posts = useStateSelector((state) => state.post.postItems);
  const status = useStateSelector((state) => state.post.status);
  const params = useSearchParams();
  const [storagePosts, setStoragePosts] = useState<Array<PostType>>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(6);
  const handleNewPosts = (n: number) => {
    setOffset((state) => state + n);
    setLimit((state) => state + n);
  };
  const categoryParam = params.get("categories");
  let customSearchParams = "";
  customSearchParams += `offset=${offset}`;
  customSearchParams += `&limit=${limit}`;
  if (categoryParam) {
    customSearchParams += `&categories=${categoryParam}`;
  }

  useEffect(() => {
    dispatch(getPosts(customSearchParams));
  }, [offset, limit]);
  useEffect(() => {
    if (posts) {
      setStoragePosts((state) => [...state, ...posts]);
    }
  }, [posts]);
  useEffect(() => {
    setStoragePosts([]);
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

  return (
    <section className="py-7 ">
      <h2 className="title">New Posts</h2>
      <div className=" grid grid-cols-1 gap-5 grid-rows-1 md:grid-cols-2 sm:grid-cols-2 ">
        {storagePosts?.map((post: PostType, i: number) => {
          return <Post key={i} data={post} imageSize={800} />;
        })}
        {status === "loading" && renderLodingItems(2)}
      </div>
      {status === "success" && storagePosts?.length >= limit && (
        <div className=" w-full text-center mt-6">
          <CustomButton
            handleClick={() => handleNewPosts(6)}
            text="Load More"
            containerStyles="btn_primary border-solid rounded-full text-sm p-3 sm:py-3 sm:px-6 "
          />
        </div>
      )}
    </section>
  );
};

export default PagePosts;
