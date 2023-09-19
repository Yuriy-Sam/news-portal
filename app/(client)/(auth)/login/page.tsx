"use client";
import { CustomButton } from "@/components";
import { EyeIcon } from "@/components/SVGIcons";
import { getNotes, loginUser, useAppDispatch, useStateSelector } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const PageLogin = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const errMessage = useStateSelector((state) => state.user.loginErrorMessage);
  const dispatch = useAppDispatch();
  const success = useSearchParams().get("success");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const [fetchErr, setFetchErr] = useState("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //   const res = await fetch(
    //     `/api/auth?email=${data.email}&password=${data.password}`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => console.log(data.user));
    // console.log("loginUser form");
    const res = await dispatch(
      loginUser({ email: data.email, password: data.password })
    );
    // .unwrap()
    // .catch((err) => {
    //   console.error("login ", err);
    // });
    if (res) {
      await dispatch(getNotes());
      // router.push("/");
    }
  }; // const [uploadedImg, setUploadedImg] = useState("/");
  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please Enter a valid email",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <section className=" w-full h-full flex justify-between  items-center ">
      <div className=" w-full flex justify-center items-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" text-center w-full max-w-[400px]"
          action=""
        >
          <h1 className={`title mb-2 ${success && "text-green-400"}`}>
            {success ? "Successful Registration" : "Welcome Back"}
          </h1>
          <p
            className={`text-md mb-5 text-primary-500 form__subtitle ${
              errMessage ? "text-red-500" : ""
            }`}
          >
            {errMessage || "Please enter your details."}
          </p>

          <div className="form__item ">
            <label className="form__label">
              Email<span>*</span>
            </label>
            <input
              {...register("email", registerOptions.email)}
              name="email"
              type="email"
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
            <div
              className={`
                form__input p-0 overflow-hidden flex justify-between items-center ${
                  errors?.password && "border-red-300"
                }
              `}
            >
              <input
                {...register("password", registerOptions.password)}
                name="password"
                type={showPassword ? "text" : "password"}
                className={`
            p-2 outline-none w-full mr-2 ${errors?.password && "border-red-300"}
              `}
                autoComplete="on"
                placeholder="Enter your password"
              />

              <div className=" relative">
                <CustomButton
                  Icon={EyeIcon}
                  iconStyles="w-[20px] text-primary-600 "
                  containerStyles="p-2"
                  handleClick={() => setShowPassword((prev) => !prev)}
                />
                <span
                  className={`absolute  w-[3px] h-6 bg-primary-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-r-[2px] border-white rounded-full -rotate-45  ${
                    showPassword ? "invisible" : "visible"
                  }`}
                ></span>
              </div>
            </div>
            {errors.password && (
              <p className="form__error">{errors.password.message}</p>
            )}
          </div>
          <div className=" flex justify-between items-center mb-5">
            <div className="flex items-center mr-4">
              <input
                {...register("remember")}
                id="remember"
                name="remember"
                checked={true}
                type="checkbox"
                value=""
                className=" accent-primary text-lg font-medium w-4 h-4 "
              />
              <label htmlFor="remember" className="ml-2  text-primary-600 ">
                Remember me
              </label>
            </div>
            <Link
              href={"/"}
              className=" text-primary-500 underline underline-offset-1"
            >
              Forgot password
            </Link>
          </div>
          <CustomButton
            type="submit"
            text={"Log In"}
            containerStyles="btn_secondary bg-primary w-full mb-5"
          />
          <div className="  flex items-center justify-center">
            <p className=" text-primary-600">{`Don't have an account?`}</p>
            <Link
              className=" ml-2 underline underline-offset-1 font-bold    "
              href={"/signup"}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <div className=" relative w-full h-full  lg:block hidden">
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

export default PageLogin;
