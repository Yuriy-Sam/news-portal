"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Swiper from "swiper";
import { categories } from "@/data/categories";
import { ArrowIcon } from "./SVGIcons";

import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const MainTopics = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Navigation, Autoplay],
      slidesPerView: 3,
      spaceBetween: 15,
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
      autoplay: { delay: 5000 },
      speed: 500,
      // pagination: {
      //   el: ".swiper-pagination",
      //   type: "progressbar",
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: () => {
          const realIndex = swiper.realIndex;
          const slidesLength = swiper.slides.length;
          const adjustedIndex = (realIndex + slidesLength) % slidesLength;
          setCurrentSlide(adjustedIndex + 1);
          // setCurrentSlide(adjustedIndex + 1);
        },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <section className="py-7 ">
      <div className=" flex justify-between items-center  mb-7">
        <h2 className="title mb-0">Topic Match for You</h2>
        <div className=" flex justify-center items-center ">
          <div className="swiper-button-prev ">
            <ArrowIcon iconStyles="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rotate-180 cursor-pointer" />
          </div>
          <p className=" font-bold text-sm sm:text-base">{currentSlide}</p>
          <span className=" mx-1 text-xl">/</span>
          <p className=" font-bold text-sm sm:text-base">{categories.length}</p>
          <div className="swiper-button-next">
            <ArrowIcon iconStyles="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* <div className=" flex justify-center items-center w-full "> */}
      <div className="swiper ">
        <div className="swiper-wrapper ">
          {categories.map((category) => {
            return (
              <div key={category.value} className="swiper-slide ">
                <Link
                  href={`/categories/` + category.value}
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
    </section>
  );
};

export default MainTopics;
