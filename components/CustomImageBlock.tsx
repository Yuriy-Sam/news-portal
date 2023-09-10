"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type CustomImageBlockProps = {
  register?: any;
  setImageArr: (state: any) => void;

  name: string;
};
const CustomImageBlock = ({
  register,
  name,
  setImageArr,
}: CustomImageBlockProps) => {
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  useEffect(() => {
    if (uploadImg) {
      setImageArr((state: any) => {
        let newArr = [];
        newArr = state.filter((el: any) => el.name !== name);
        newArr.push({ name: name, file: uploadImg });
        return newArr;
      });
    }
  }, [uploadImg]);
  const showProfileImg = (file: File) => {
    setPrevImg(URL.createObjectURL(file));
    setUploadImg(file);
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0] as File;
    if (file) {
      showProfileImg(file);
    }
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
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className=" mt-4 max-h-[1000px] h-full flex items-center justify-between  max-w-auto"
    >
      {!prevImg && !uploadImg && (
        <label
          htmlFor={name}
          className=" w-full h-[500px] flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center p-5 text-center">
            <svg
              className="w-8  h-8 mb-2 text-gray-500 dark:text-gray-400"
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
            <p className="mb-1 text-lg text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload image</span> or
              drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG or GIF
            </p>
          </div>
          <input
            {...register}
            name={name}
            id={name}
            accept="image/*"
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e)}
          />
        </label>
      )}
      {prevImg && uploadImg && (
        <div className=" h-full text-center w-full relative flex  justify-center items-center">
          <Image
            id="uploaded-img"
            className=" object-cover max-h-[600px] max-w-full  rounded  w-full"
            src={prevImg}
            // fill
            width={1000}
            height={500}
            alt="your image"
          />
          {prevImg && (
            <div
              onClick={() => {
                setPrevImg(null);
                setUploadImg(null);
              }}
              className=" cursor-pointer absolute top-2 right-2 text-primary bg-white rounded-md border-2 p-1 opacity-50 border-primary-600 flex justify-center items-center  hover:opacity-100 "
            >
              Change Image
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CustomImageBlock;
