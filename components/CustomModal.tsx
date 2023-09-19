"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
interface CustomModalProps {
  title?: string;
  show?: boolean;
  content?: React.ReactNode;
  buttons?: React.ReactNode;
}
const CustomModal = ({ title, content, buttons, show }: CustomModalProps) => {
  const [isShow, setIsShow] = useState<boolean>(show || false);
  useEffect(() => {
    const body = document.body;
    if (isShow) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isShow]);
  useEffect(() => {
    setIsShow(show!);
  }, [show]);
  return (
    <div
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      className={`   z-[99]   fixed w-full h-full top-0 left-0 flex items-center justify-center  ${
        isShow ? "flex" : "hidden"
      }`}
    >
      <div
        onClick={() => setIsShow(false)}
        className={`z-[99] absolute w-full h-full bg-slate-600 ${
          isShow ? "opacity-50" : "opacity-0"
        }`}
      ></div>
      <div
        className={`z-[100] p-5  sm:p-10 max-w-[700px] w-full h-full  ${
          isShow ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className=" relative text-primary-600 w-full max-h-full h-auto flex flex-col justify-between items-center p-5 py-7 bg-white rounded-lg ">
          <CustomButton
            text="X"
            type="button"
            handleClick={() => setIsShow(false)}
            containerStyles="btn_primary    rounded-lg after:hidden  absolute top-3 right-3 text-2xl w-10 h-10 p-0 flex justify-center items-center  hover:bg-primary-300 "
          />
          {/* <div className=" absolute top-3 right-5 text-2xl ">X</div> */}
          <h2 className="text-primary font-bold mb-4  text-2xl">
            Welcome to Scope
          </h2>
          <div className=" max-h-screen overflow-y-auto ">
            <div className=" mb-4 w-full  ">
              <b>Scope</b> is your reliable source of up-to-date news. We
              provide unique functionality to make your stay on our site as
              comfortable and informative as possible.
            </div>
            <div className=" w-full">
              The main functionality of the Scope site includes:
            </div>
            <ul className=" mb-4 ml-2">
              <li>
                <b>-Keeping up with the latest news: </b> We are constantly
                updated to keep you up to date with the most important events.
              </li>
              <li>
                <b>- Convenient search and sorting of articles: </b>
                Our powerful search tool allows you to quickly find the
                materials you are interested in and sort them by various
                parameters.
              </li>
            </ul>
            <div className=" w-full">
              When you register on Scope, you get even more functionality:
            </div>
            <ul className=" mb-4 ml-2">
              <li>
                <b>- Create your own profile: </b>
                Your personal profile allows you to save customizations and
                receive personalized recommendations.
              </li>
              <li>
                <b>- Create and publish articles: </b>
                Become part of our community and share your opinions and
                knowledge by creating your own articles.
              </li>
              <li>
                <b>- Adding articles to bookmarks: </b>
                Save the most important and interesting articles for further
                reading and sharing with friends.
              </li>
            </ul>
            <div className=" mb-4 w-full">
              <b>Scope</b> is a place where information is accessible and
              convenient. Join us right now and stay informed!
            </div>
          </div>

          <div className="  w-full flex justify-between  items-center gap-5 pt-3 border-t-2   ">
            <CustomButton
              text="Log In"
              type="button"
              containerStyles="btn_primary  border-solid border-primary-400  rounded after:-left-16  w-full "
              link="/login"
              handleClick={() => setIsShow(false)}
            />
            <CustomButton
              text="Sign Up"
              containerStyles="btn_secondary  border-primary rounded after:-left-16  w-full  hover:border-primary-400 bg-primary "
              link="/signup"
              handleClick={() => setIsShow(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
