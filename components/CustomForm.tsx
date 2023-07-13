"use client";

import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const CustomForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch("example"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="mr-2" defaultValue="test" {...register("example")} />
      <input
        className="mr-2"
        {...register("exampleRequired", { required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default CustomForm;
