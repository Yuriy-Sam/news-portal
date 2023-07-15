import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { type } from "os";
import Link from "next/link";

const Main = () => {
  const url =
    "https://localnews8.b-cdn.net/2023/07/cnn-L19jb21wb25lbnRzL2ltYWdlL2luc3RhbmNlcy9pbWFnZS04YzdhNjU3NjMzZmIxNGM1ZDBjNmEwODlkMjBlNTMyYQ-L19wYWdlcy9oX2YxMjg3YjZjNGQwODI0M2UzY2JjNjFiNDRmMGIxZGU0-300-1440x810.jpg";

  return (
    <section className="py-7 ">
      <div className="flex justify-between items-center">
        <h2 className="title">Article of The Day</h2>
        <CustomButton
          text="Load More"
          containerStyles="btn_primary border-solid rounded-full text-sm  "
        />
      </div>
      <div className="grid grid-cols-1 grid-rows-3 mt-7 gap-4">
        {/* <div className="grid grid-cols-[3fr_1fr] grid-rows-3 mt-7 gap-4"> */}
        <PostItem
          url={url}
          title="asdjasdk asd asmkdls and asndklasn dl"
          containerStyles="row-span-3"
        />
        {/* <PostItem url={url} title="asdjasdk asd asmkdls and asndklasn dl" />
        <PostItem url={url} title="asdjasdk asd asmkdls and asndklasn dl" />
        <PostItem url={url} title="asdjasdk asd asmkdls and asndklasn dl" /> */}
      </div>
    </section>
  );
};

type PostItemProp = {
  url: string;
  title?: string;
  containerStyles?: string;
  imageSize?: number;
};
const PostItem = ({ url, containerStyles, imageSize, title }: PostItemProp) => {
  return (
    <Link
      href={"/"}
      className={` relative bg-primary-400 rounded-lg overflow-hidden ${containerStyles} `}
    >
      <Image
        className=" z-0 absolute top-0 left-0 w-full h-full object-cover"
        src={url}
        width={imageSize || 1000}
        height={imageSize || 1000}
        alt={title || ""}
      />
      <div className=" h-15 w-full p-1 pt-7 absolute bottom-0 left-0 post-shadow ">
        <p className=" text-xl">{title}</p>
      </div>
    </Link>
  );
};
export default Main;
