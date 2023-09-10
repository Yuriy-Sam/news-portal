"use client";
import { uploadImage } from "@/actions/uploadImages";
import { CustomButton } from "@/components";
import { SpinnerIcon } from "@/components/SVGIcons";
import {
  createPost,
  getCategories,
  useAppDispatch,
  useStateSelector,
} from "@/store";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomTextarea from "@/components/CustomTextarea";
import CustomImageBlock from "@/components/CustomImageBlock";

type ContentArrType = {
  type: "image" | "subtitle" | "content" | "mainImage" | "title";
  name?: string;
  title?: string;
  content?: any;
  containerStyles?: string;
  required?: boolean;
  file?: File;
};

const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
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
