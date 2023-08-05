"use client";
import {
  BreakingNews,
  CustomButton,
  CustomModal,
  Header,
  Main,
} from "@/components";
import { getCategories, useAppDispatch, useStateSelector } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";

export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const categories = useStateSelector((state) => state.category.categoryItems);
  const status = useStateSelector((state) => state.category.status);
  useEffect(() => {
    dispatch(getCategories()); // Wait for the categories to be fetched
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
          role="status"
          className="flex items-center justify-center h-full max-w-full py-16 bg-primary-300 rounded-lg animate-pulse dark:bg-primary-300"
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
      );
    }
    return items;
  };

  return (
    <>
      <section className="py-7 ">
        <h2 className="title">New Posts</h2>
        <div className=" grid grid-cols-1 gap-5 grid-rows-[200px] auto-rows-[200px] md:grid-cols-2 sm:grid-cols-2 ">
          {status === "loading" && renderLodingItems(3)}
          {status === "success" &&
            categories?.map((category) => {
              return (
                <div key={category.value} className="swiper-slide ">
                  <Link
                    href={`/posts?categories=` + category.value}
                    className=" flex  justify-center items-center relative border-2 h-full rounded-xl overflow-hidden"
                  >
                    <Image
                      src={`/img/categories/${category.image}`}
                      alt="asdasdas"
                      className=" -z-10 h-full w-full absolute  object-cover "
                      width={300}
                      height={180}
                    />
                    <p className=" p-2 sm:p-3 text-sm sm:text-xl lg:text-2xl text-center uppercase font-black bg-white bg-opacity-60 rounded-md backdrop-blur-sm">
                      {category.title}
                    </p>
                  </Link>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
