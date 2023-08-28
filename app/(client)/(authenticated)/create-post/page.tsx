"use client";
import { uploadImage } from "@/actions/uploadImages";
import { CustomButton } from "@/components";
import { SpinnerIcon } from "@/components/SVGIcons";
import {
  createPost,
  getCategories,
  postActions,
  postReducer,
  useAppDispatch,
  useStateSelector,
} from "@/store";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";

import { error } from "console";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File;
};
type ContentArrType = {
  type: "image" | "subtitle" | "content" | "mainImage" | "title";
  name?: string;
  title?: string;
  content?: any;
  containerStyles?: string;
  required?: boolean;
  file?: File;
};

type CustomTextareaProps = {
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  containerStyles: string;
  register?: any;

  name: string;
};
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
        console.log("setImageArr state", newArr);
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
const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    watch,

    setError,
    formState: { errors },
  } = useForm<any>({
    mode: "onSubmit",
    // mode: "onBlur",
  });
  const dispatch = useAppDispatch();

  const [contentArr, setContentArr] = useState<Array<ContentArrType>>([]);
  const [imageArr, setImageArr] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [activeAddMenu, setActiveAddMenu] = useState<boolean>(false);
  const categories = useStateSelector((state) => state.category.categoryItems);
  const autorId = useStateSelector((state) => state.user.authUser?._id);
  const router = useRouter();

  useEffect(() => {
    if (contentArr.length === 0) {
      addContentSection("title");
      addContentSection("mainImage");
    }
  }, []);

  const removeContentSection = (n: string) => {
    setContentArr((state) => state.filter((el) => el.name !== n));
  };
  const addContentSection = (t: string) => {
    setCount((state) => state + 1);
    const key = `${t}-${count}`;
    switch (t) {
      case "title":
        setContentArr((state) => [
          ...state,
          {
            type: "title",
            name: "title",
            containerStyles: " mb-5",
            required: true,
            content: (
              <CustomTextarea
                name={`title`}
                placeholder="Title"
                register={register("title", { required: "Title is required" })}
                handleKeyDown={handleKeyDown}
                containerStyles="title mb-0 text-5xl h-[48px]"
              />
            ),
          },
        ]);
        break;
      case "mainImage":
        setContentArr((state) => [
          ...state,
          {
            type: "mainImage",
            name: "mainImage",
            containerStyles: "mb-11",
            required: true,
            content: (
              <CustomImageBlock
                setImageArr={setImageArr}
                register={register("mainImage", {
                  required: "Image is required",
                })}
                name={"mainImage"}
              />
            ),
          },
        ]);
        break;
      case "content":
        setContentArr((state) => [
          ...state,
          {
            type: "content",
            name: key,
            containerStyles: "mb-5",
            content: (
              <CustomTextarea
                name={key}
                register={register(key, {
                  required: "Content is required",
                })}
                placeholder="Content"
                handleKeyDown={handleKeyDown}
                containerStyles="title mb-0 text-2xl font-normal h-[30px]"
              />
            ),
          },
        ]);
        break;
      case "subtitle":
        setContentArr((state) => [
          ...state,
          {
            type: "subtitle",
            name: key,
            containerStyles: "mt-3 mb-4",
            content: (
              <CustomTextarea
                name={key}
                register={register(key, {
                  required: "Subtitle is required",
                })}
                placeholder="Subtitle"
                handleKeyDown={handleKeyDown}
                containerStyles="title mb-0 text-4xl h-[40px]"
              />
            ),
          },
        ]);
        break;

      case "image":
        setContentArr((state) => [
          ...state,
          {
            type: "image",
            name: key,
            containerStyles: "mb-11",

            content: (
              <CustomImageBlock
                setImageArr={setImageArr}
                register={register(key, {
                  required: "Image is required",
                })}
                name={key}
              />
            ),
          },
        ]);
        break;

      default:
        break;
    }
    setActiveAddMenu(false);
  };
  useEffect(() => {
    dispatch(getCategories()); // Wait for the categories to be fetched
  }, []);
  const renderContentSections = (arr: ContentArrType[]) => {
    return arr.map((el) => (
      <div key={el.name} className={`relative w-full ${el.containerStyles}`}>
        {el.content}
        {el && (
          <ErrorMessage
            errors={errors}
            name={el.name!}
            render={({ message }) => (
              <p className="mt-1 text-xl text-red-400">{message}</p>
            )}
          />
        )}
        {!el.required && (
          <div
            onClick={() => removeContentSection(el.name!)}
            className=" cursor-pointer absolute top-0 -right-[35px]  w-[30px] h-[30px] rounded-full border-2 border-primary-300 flex justify-center items-center text-primary-300 hover:border-primary-600 hover:text-primary-600"
          >
            <span className="text-center font-black ">X</span>
          </div>
        )}
      </div>
    ));
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);

    console.log("formmm data --- ", data);
    const formData = new FormData();
    const uploadPromises = imageArr.map(async (el) => {
      return uploadImage(el.file, "posts_upload");
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const uploadImageArr: any[] = uploadedImages.map((url, index) => ({
      name: imageArr[index].name,
      content: url,
    }));

    // const uploadImageArr: any[] = imageArr.map((el, index) => ({
    //   name: el.name,
    //   content: el.name,
    // }));

    formData.append("autorId", autorId!);
    formData.append("category", data.category);
    contentArr.map((el) => {
      formData.append(
        el.type,
        el.type === "image" || el.type === "mainImage"
          ? (uploadImageArr.filter((v) => v.name === el.name)[0]
              ?.content as string)
          : data[el.name!]
      );
    });
    const res = await dispatch(createPost(formData));
    if (res.payload.postCreated) {
      router.push(`/posts/${res.payload.postCreated._id}?success=true`);
      setLoading(false);
    }
    // console.log("formDataformData --- ", formData);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line creation
    }
  };

  const addContentArr: ContentArrType[] = [
    { type: "subtitle", title: "Subtitle" },
    { type: "content", title: "Content" },
    { type: "image", title: "Image" },
  ];
  return (
    <section className="py-7  w-full ">
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className=" mb-2">
          <select
            defaultValue={"nothing"}
            {...register("category", {
              required: "Please select category",
              validate: (v) => v !== "nothing" || "Please select category",
            })}
            className=" border-white text-xl py-2 font-semibold    text-primary-500"
          >
            <option value="nothing" disabled hidden>
              Select Category
            </option>
            {categories?.map((el) => {
              return (
                <option
                  className=" font-medium "
                  key={el.value}
                  value={el.value}
                >
                  {el.title}
                </option>
              );
            })}
          </select>
          <ErrorMessage
            errors={errors}
            name={"category"}
            render={({ message }) => (
              <p className="mt-1 text-xl text-red-400">{message}</p>
            )}
          />
        </div>
        {/* <div className=" mb-5">
          <CustomTextarea
            name={`title`}
            placeholder="Title"
            register={register("title", { required: "Title is required" })}
            handleKeyDown={handleKeyDown}
            containerStyles="title mb-0 text-5xl h-[48px]"
          />
          <ErrorMessage
            errors={errors}
            name={`title`}
            render={({ message }) => (
              <p className=" mt-1 text-xl text-red-400 ">{message}</p>
            )}
          />
        </div>
        <div className=" mb-11">
          <CustomImageBlock
            setImageArr={setImageArr}
            register={register("mainImage", { required: "Image is required" })}
            name="mainImage"
          />
          <ErrorMessage
            errors={errors}
            name={`mainImage`}
            render={({ message }) => (
              <p className=" mt-1 text-xl text-red-400 ">{message}</p>
            )}
          />
        </div> */}
        {/* <CustomTextarea
          register={register("subtitle")}
          placeholder="Subtitle"
          handleKeyDown={handleKeyDown}
          containerStyles="title text-4xl mb-4 h-[40px]"
        />
        <CustomTextarea
          register={register("content")}
          placeholder="Content"
          handleKeyDown={handleKeyDown}
          containerStyles="title text-2xl font-normal h-[30px] mb-5"
        /> */}
        <div className=" w-full relative pr-[35px]">
          {renderContentSections(contentArr)}
        </div>
        <div className="relative">
          <div
            className={` ${
              activeAddMenu ? "visible" : "invisible"
            }  absolute bottom-full p-4 pt-9 px-8 mb-3 rounded  text-xl  border-solid border-2 font-bold left-1/2 -translate-x-1/2 bg-white shadow-lg `}
          >
            <div className=" relative flex justify-center items-center uppercase text-primary-600 mb-2">
              <p className=" text-lg">Select to add</p>{" "}
              <span
                onClick={() => setActiveAddMenu(false)}
                className=" cursor-pointer absolute p-3 py-1  -top-8 -right-8"
              >
                X
              </span>
            </div>
            <ul>
              {...addContentArr.map((el) => (
                <li key={el.type} className=" py-1">
                  <CustomButton
                    containerStyles="btn_primary border-solid w-full text-xl p-3 text-primary-600"
                    text={el.title}
                    handleClick={() => addContentSection(el.type)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <CustomButton
            containerStyles="btn_primary border-solid w-full text-xl mb-6 text-primary-600"
            text="+ Add New Section"
            handleClick={() => setActiveAddMenu((state) => !state)}
          />
        </div>

        <div className="flex  justify-center ">
          <CustomButton
            type="submit"
            containerStyles={`btn_secondary px-11 bg-green-400 border-solid text-xl ${
              loading
                ? "bg-white text-primary hover:text-primary"
                : "bg-green-400"
            }`}
            text={loading ? "Loading..." : "Publish"}
            isDisabled={loading}
            iconStyles="w-5 h-5 mr-2 "
            Icon={loading ? SpinnerIcon : undefined}
          />
        </div>
      </form>
    </section>
  );
};

export default CreatePostPage;
