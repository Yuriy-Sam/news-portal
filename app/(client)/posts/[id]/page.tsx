import { CustomButton, Post } from "@/components";
import {
  BookmarkIcon,
  CommentIcon,
  EyeIcon,
  ShareIcon,
} from "@/components/SVGIcons";
import { posts } from "@/data/posts";
import {
  getPosts,
  getSinglePost,
  postActions,
  postReducer,
  updateViews,
  useAppDispatch,
  useStateSelector,
} from "@/store";
import Image from "next/image";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ContentType, PostType } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import CustomNotesButton from "@/components/CustomNotesButton";
import SinglePostPage from "@/components/pages/SinglePostPage";

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
// // export async function generateMetadata(
// //   { params, searchParams }: Props,
// //   parent?: ResolvingMetadata
// // ): Promise<Metadata> {
// //   // read route params
// //   const id = params.id;
// //   // fetch data
// //   const post = await fetch(`http://localhost:3000/api/post/${id}`)
// //     .then((res) => res.json())
// //     .catch(() => console.log("errrrr"));
// //   console.log("post getmeta - ", post);
// //   // optionally access and extend (rather than replace) parent metadata
// //   if (post) {
// //     return {
// //       title: "Hi " + post.title,
// //       // title: "Hello",
// //       description: "Generated by create next app",

// //       // openGraph: {
// //       //   images: [post.mainImage],
// //       // },
// //     };
// //   }
// // }
// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.id;
//   console.log("params.id", params.id);
//   // fetch data
//   const product = await fetch(`${__}/api/post/${id}`)
//     .then((res) => res.json())
//     .then((data) => data.post);

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product.title,
//     openGraph: {
//       images: [product.mainImage, ...previousImages],
//     },
//   };
// }
const PagePosts = ({ params, searchParams }: Props) => {
  return <SinglePostPage />;
};
export default PagePosts;
