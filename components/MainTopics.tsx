"use client";
import { categories } from "@/data/categories";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { posts } from "@/data/posts";
import Post from "./Post";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
// import Swiper bundle with all modules installed
import Swiper from "swiper";

// import "swiper/css/swiper.min.css";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowIcon } from "./SVGIcons";
import Link from "next/link";
import Image from "next/image";

const MainTopics = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  useEffect(() => {
    // Initialize the Swiper instance when the component mounts
    const swiper = new Swiper(".swiper", {
      // Configure the swiper options here
      // For example, you can set direction, pagination, etc.
      modules: [Navigation, Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 3,
      breakpoints: {
        // when window width is <= 499px
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
        // when window width is <= 999px
        // xl: { max: "1279px" },
        // lg: { max: "1023px" },
        // md: { max: "767px" },
        // sm: { max: "639px" },
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

      <div className=" flex justify-center items-center flex-nowrap w-full ">
        <div className="swiper">
          <div className="swiper-wrapper ">
            {categories.map((category) => {
              return (
                <div key={category.value} className="swiper-slide p-1 ">
                  {/* <CustomButton
                    link={`/categories/` + category.value}
                    containerStyles="btn_primary rounded-lg border-solid text-lg uppercase h-28 m-1 w-full "
                    text={category.title}
                  /> */}
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
          {/* <div className="swiper-pagination"></div> */}
        </div>

        {/* <Swiper
          className=""
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination
          spaceBetween={50}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {categories.map((category) => {
            return (
              <SwiperSlide key={category.value}>
                <CustomButton
                  link={`/categories/` + category.value}
                  containerStyles="btn_primary rounded-lg border-solid text-lg uppercase h-28 m-1 w-full"
                  text={category.title}
                />
              </SwiperSlide>
            );
          })}
        </Swiper> */}
      </div>
    </section>
  );
};

export default MainTopics;
