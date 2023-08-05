import Link from "next/link";
import React from "react";
import CustomButton from "./CustomButton";

const NotFound = () => {
  return (
    <div className=" w-full px-3  py-11  flex justify-center items-center">
      <div className=" max-w-[500px] text-center">
        <div className=" text-7xl  font-bold">404</div>
        <h2 className=" text-xl  font-bold mb-2">Page Not Found</h2>
        <p className=" mb-4">{`Oops... The link you clicked may be broken or the page may have been removed. We're sorry.`}</p>
        <CustomButton
          link="/"
          containerStyles="btn_secondary after:animate-btn-anim hover:after:animate-none"
          text="Home Page"
        />
      </div>
    </div>
  );
};

export default NotFound;
