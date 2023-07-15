import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "./CustomButton";
import { PostType } from "@/types";

type PostProps = {
  data: PostType;
};
const Post = ({ data }: PostProps) => {
  const { url, image, title, imageSize, text } = data;
  return (
    <>
      <Link
        className=" max-w-xs w-full block post-shadow hover:shadow-lg transition-all hover:p-2 hover:shadow-primary-400 rounded"
        href={url}
      >
        <Image
          className=" h-40 rounded w-full mb-2 object-cover "
          src={image}
          alt={title}
          width={imageSize || 300}
          height={(imageSize && imageSize / 1.5) || 200}
        />
        <div className="">
          <h3 className="title_md">{title}</h3>
          <p className=" text-primary-600 text-xs h-auto">
            {Number(text.length) > 250 && text.slice(0, 120) + "..."}
          </p>
        </div>
      </Link>
    </>
  );
};

export default Post;
