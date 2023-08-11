"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File;
};
const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<FormValues>({
    // mode: "onSubmit",
    mode: "onBlur",
    // defaultValues: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });
  const [prevImg, setPrevImg] = useState<string>("/");
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);

  const handleInput = (e: any) => {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = scrollHeight + "px";
  };
  const showProfileImg = (file: File) => {
    setUploadedImg(file);
    console.log("file ---", file);
    console.log("file type ---", file.type);

    // if (file) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onloadend = async (event) => {
    //     setUploadedImg(reader.result);
    //     console.log("render result ", reader.result);
    //     console.log("render event result ", event.target?.result);
    //   };
    // }
    setPrevImg(URL.createObjectURL(file));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("e.target", e.target.files);
    const file = e.target.files?.[0] as File;
    if (file) {
      showProfileImg(file);
    }
    // const file = e.target.files?.[0] as File;
    // if (file) {
    //   showProfileImg(file);
    // }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      showProfileImg(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <section className="py-7">
      {/* <form action="">
        <textarea
          onInput={(e) => handleInput(e)}
          className="title w-full mb-2 min-h-[30px]  outline-none   overflow-y-hidden resize-none"
          placeholder="Title"
        />
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className=" mb-5 h-[300px] flex items-center justify-between  w-full"
        >
          <label
            htmlFor="avatar"
            className=" w-full h-full flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center p-2">
              <svg
                className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload avatar</span> or
                drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or GIF
              </p>
            </div>
            <input
              {...register("avatar")}
              name="avatar"
              id="avatar"
              accept="image/*"
              type="file"
              className="hidden"
              onChange={(e) => handleUpload(e)}
            />
          </label>
          {prevImg !== "/" && (
            <div className="  ml-4 h-full w-auto relative">
              <Image
                id="uploaded-img"
                className=" object-cover rounded-full min-h-[90px] min-w-[90px] h-[90px] w-[90px]"
                src={prevImg}
                // fill
                width={100}
                height={100}
                alt="your image"
              />
            </div>
          )}
        </div>
      </form> */}
    </section>
  );
};

export default CreatePostPage;
