"use client";

import { useRegisterUserMutation } from "@/redux/api/baseApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  // profilePicture?: FileList | null;
};

export default function SignupPage() {
  const { register, handleSubmit, watch, reset } = useForm<FormData>();
  const [signup, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data Submitted:", data);
    try {
      const { ...userData } = data;
      const res = await signup(userData).unwrap();
      if (res?.success && res?.data?.id) {
        const authData = { email: res?.data?.email, password: data?.password };
        toast.success(res?.message);
        router.replace("/login");
        console.log(authData);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      toast.error(error?.data?.message);
    } finally {
      // Reset form after submission if needed
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-bgUpdate">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 max-w-lg bg-blue p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium  mb-1"
          >
            First Name
          </label>
          <div className="">
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              className="w-full p-3   rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white bg-darkBlue"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium  mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
            className="w-full p-3   rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white bg-darkBlue"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="userName"
            {...register("userName", { required: true })} // Update key here
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white bg-darkBlue"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium  mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full p-3   rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white bg-darkBlue"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium  mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white bg-darkBlue"
          />
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Picture (Optional)
          </label>
          <input
            type="file"
            id="profilePicture"
            {...register("profilePicture")}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-purple-600 text-white bg-darkBlue rounded-lg font-bold hover:bg-bgUpdate transition"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm ">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
