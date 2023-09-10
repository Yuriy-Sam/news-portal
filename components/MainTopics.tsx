"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Swiper from "swiper";
// import { categories } from "@/data/categories";
import { ArrowIcon } from "./SVGIcons";

import "swiper/css";
import {
  categoryActions,
  categoryReducer,
  getCategories,
  useAppDispatch,
  useStateSelector,
} from "@/store";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const MainTopics = () => {
  const swiperRef = React.useRef<Swiper>();
  const [currentSlide, setCurrentSlide] = useState(1);
  const dispatch = useAppDispatch();
  const categories = useStateSelector((state) => state.category.categoryItems);
  const status = useStateSelector((state) => state.category.status);
  useEffect(() => {
    // if (status === "success") {
    const fetchCategoriesAndInitSwiper = async () => {
      await dispatch(getCategories()); // Wait for the categories to be fetched

      // if (status === "success") {
      swiperRef.current = new Swiper(".swiper", {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 3,
        breakpoints: {
          350: {
            slidesPerView: 2,
            spaceBetween: 3,
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1023: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1279: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        },
        loop: true,
        // autoplay: { delay: 5000 },
        speed: 500,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChange: () => {
            const realIndex = swiperRef.current?.realIndex;
            const slidesLength = swiperRef.current?.slides.length;
            const adjustedIndex = (realIndex! + slidesLength!) % slidesLength!;
            setCurrentSlide(adjustedIndex + 1);
          },
        },
      });
      // if (swiperRef.current) {
      swiperRef.current.update(); // Update the Swiper after fetching categories
      // }
    };
    // if (status === "success") {
    fetchCategoriesAndInitSwiper();
    // }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
    // }
  }, []);

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
    <section className="py-7 ">
      <div className=" flex justify-between items-center  mb-7">
        <h2 className="title mb-0">Topic Match for You</h2>
        <div className=" flex justify-center items-center ">
          {status === "success" && (
            <>
              <div className="swiper-button-prev ">
                <ArrowIcon iconStyles="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rotate-180 cursor-pointer" />
              </div>
              <p className=" font-bold text-sm sm:text-base">{currentSlide}</p>
              <span className=" mx-1 text-xl">/</span>
              <p className=" font-bold text-sm sm:text-base">
                {categories?.length || 1}
              </p>
              <div className="swiper-button-next">
                <ArrowIcon iconStyles="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] cursor-pointer" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* <div className=" flex justify-center items-center w-full "> */}
      {status === "loading" && (
        <div className=" grid grid-cols-3 auto-cols-auto gap-5 grid-rows-1 ">
          {renderLodingItems(3)}
        </div>
      )}
      {status === "success" && (
        <div className="swiper ">
          <div className="swiper-wrapper ">
            {categories &&
              categories.map((category) => {
                return (
                  <div key={category.value} className="swiper-slide ">
                    <Link
                      href={`/posts?categories=` + category.value}
                      className=" flex  justify-center items-center relative border-2 h-[120px] sm:h-[150px] lg:h-[180px]  rounded-xl overflow-hidden"
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
        </div>
      )}
    </section>
  );
};

export default MainTopics;
