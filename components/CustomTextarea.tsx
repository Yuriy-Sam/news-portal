"use client";

import React from "react";
// type ContentArrType = {
//   type: "image" | "subtitle" | "content" | "mainImage" | "title";
//   name?: string;
//   title?: string;
//   content?: any;
//   containerStyles?: string;
//   required?: boolean;
//   file?: File;
// };

type CustomTextareaProps = {
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  containerStyles: string;
  register?: any;

  name: string;
};

const CustomTextarea = ({
  register,
  handleKeyDown,
  placeholder,
  containerStyles,
  name,
}: CustomTextareaProps) => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = scrollHeight + "px";
  };
  return (
    <textarea
      {...register}
      onChange={handleInput}
      onKeyDown={(e) => handleKeyDown(e)}
      className={`w-full outline-none min-h-0  overflow-y-hidden resize-none ${containerStyles}`}
      placeholder={placeholder}
    />
  );
};

export default CustomTextarea;
