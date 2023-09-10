"use client";
// import { uploadPhoto } from "@/actions/uploadImages";
import { CustomButton } from "@/components";
import { registerUser, useAppDispatch, useStateSelector } from "@/store";
import { DropArgument } from "net";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { SpinnerIcon } from "@/components/SVGIcons";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File;
};
const compressImage = async (file: File, { quality = 1, type = file.type }) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // Draw to canvas
  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(imageBitmap, 0, 0);

  // Turn into Blob
  const blob: any | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality)
  );

  // Turn Blob into File
  return new File([blob as BlobPart], file.name, {
    type: blob.type,
  });
};

const PageSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<FormValues>({
    // mode: "onSubmit",
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);
  const [emailIsUnique, setEmailIsUnique] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  // setLoading(false);
  const [prevImg, setPrevImg] = useState<string>("/");
  const errMessage = useStateSelector(
    (state) => state.user.registerErrorMessage
  );

  const dispatch = useAppDispatch();
  const router = useRouter();
  // const success = useSearchParams().get("success");
  // console.log("searchParams", success);
  // if(success){

  // }
  // useEffect(() => {
  //   console.log("searchParams", success);
  // }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setEmailIsUnique(true);
    setLoading(true);

    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (uploadedImg) {
      // formData.append("file", uploadedImg);
      formData.append("upload_preset", "avatars_upload");
      formData.append("file", uploadedImg);

      // console.log("uploadedImg", uploadedImg);
      // await fetch(
      //   `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // )
      //   .then((res) => res.json())
      //   .then((data) => console.log("secrute imag cllloud: ", data))
      //   .catch((err) => console.log("Error cloouuuud:", err));
    }
    const res = await dispatch(registerUser(formData))
      .unwrap()
      .catch((err) => {
        console.error("register", err);
      });
    if (res) {
      router.push("/login?success=true");
    }
    setLoading(false);
  };
  const registerOptions = {
    firstName: {
      required: "First Name is required",
      pattern: {
        value: /^[a-zA-Z ]*$/,
        message: "Please Enter a valid first name",
      },
    },
    lastName: {
      required: "Last Name is required",
      pattern: {
        value: /^[a-zA-Z ]*$/,
        message: "Please Enter a valid last name",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please Enter a valid email",
      },
      validate: () => {
        if (!emailIsUnique) {
          return "Email is already in use";
        }
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
    confirmPassword: {
      required: true,
      validate: (val: string) => {
        if (watch("password") != val) {
          return "Your passwords do no match";
        }
      },
    },
  };

  const showProfileImg = (file: File) => {
    setUploadedImg(file);

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
    <section className=" w-full h-full flex justify-between  items-center">
      <div className=" px-4 w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" text-center w-full py-7 max-w-[450px]"
        >
          <h1 className="title mb-2 ">Create Your Account</h1>
          <p className={`subtitle__form ${errMessage ? "text-red-500" : ""}`}>
            {errMessage || "We've been waiting for you."}
          </p>
          <div className=" flex justify-between  items-start gap-4">
            <div className="form__item">
              <label className="form__label">
                First Name<span>*</span>
              </label>
              <input
                {...register("firstName", registerOptions.firstName)}
                name="firstName"
                type="text"
                className={`
                form__input ${errors?.firstName && "border-red-300"}
              `}
                autoComplete="on"
                placeholder="Enter your name"
              />
              {errors.firstName && (
                <p className="form__error">{errors.firstName.message}</p>
              )}
            </div>
            <div className="form__item">
              <label className="form__label">
                Last Name<span>*</span>
              </label>
              <input
                {...register("lastName", registerOptions.lastName)}
                name="lastName"
                type="text"
                className={`
                form__input ${errors?.lastName && "border-red-300"}
              `}
                autoComplete="on"
                placeholder="Enter your name"
              />
              {errors.lastName && (
                <p className="form__error">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="form__item ">
            <label className="form__label">
              Email<span>*</span>
            </label>
            <input
              {...register("email", registerOptions.email)}
              name="email"
              type="email"
              onBlur={() => setEmailIsUnique(true)}
              className={`
                form__input ${errors?.email && "border-red-300"}
              `}
              autoComplete="on"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="form__error">{errors.email.message}</p>
            )}
          </div>
          <div className="form__item ">
            <label className="form__label">
              Password<span>*</span>
            </label>

            <input
              {...register("password", registerOptions.password)}
              name="password"
              type="password"
              className={`
                form__input ${errors?.password && "border-red-300"}
              `}
              autoComplete="on"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="form__error">{errors.password.message}</p>
            )}
          </div>
          <div className="form__item ">
            <label className="form__label">
              Confirm Password<span>*</span>
            </label>

            <input
              {...register("confirmPassword", registerOptions.confirmPassword)}
              name="confirmPassword"
              type="password"
              className={`
                form__input ${errors?.confirmPassword && "border-red-300"}
              `}
              autoComplete="on"
              placeholder="Enter your password again"
            />
            {errors.confirmPassword && (
              <p className="form__error">{errors.confirmPassword.message}</p>
            )}
          </div>
          {/* <label
            htmlFor="inp-file"
            className="flex justify-start items-center w-full"
          >
            <p className=" p-2 rounded-md border-2 border-primary-500 bg-primary-200 font-bold text-primary-600  mr-4">
              Select your avatar
            </p>
            <input
              id="inp-file"
              onChange={(e) => showProfileImg(e)}
              onDrop={(e) => showProfileImg(e)}

              type="file"
              accept="image/*"
              //             className="block text-sm text-gray-500
              //   file:mr-4 file:py-2 file:px-4
              //   file:rounded-md file:border-0
              //   file:text-sm file:font-semibold
              //   file:bg-blue-500 file:text-white
              //   hover:file:bg-blue-600
              // "
              className="hidden"
            />

            {uploadedImg !== "/" && (
              <div className=" h-[70px] w-[70px] relative">
                <Image
                  id="uploaded-img"
                  className=" object-cover rounded-full"
                  src={uploadedImg}
                  fill
                  // width={50}
                  // height={100}
                  alt="your image"
                />
              </div>
            )}
          </label> */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className=" mb-5 flex items-center justify-between  w-full"
          >
            <label
              htmlFor="avatar"
              className=" w-full flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  <span className="font-semibold">Click to upload avatar</span>{" "}
                  or drag and drop
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

          <CustomButton
            type="submit"
            text={loading ? "Loading..." : "Create account"}
            isDisabled={loading}
            Icon={loading ? SpinnerIcon : undefined}
            iconStyles="w-5 h-5 mr-2"
            containerStyles="btn_secondary bg-primary w-full mb-5"
          />
          <div className="  flex items-center justify-center">
            <p className=" text-primary-600">{`Already have an account`}</p>
            <Link
              className=" ml-2 underline underline-offset-1 font-bold    "
              href={"/login"}
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
      <div className=" relative w-full h-full lg:block hidden">
        <Image
          src={"/img/bg-login.jpg"}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 100vw"
          alt="background image"
          priority
          className=" w-full h-full left-0 top-0 "
          quality={100}
        />
      </div>
    </section>
  );
};

export default PageSignUp;
