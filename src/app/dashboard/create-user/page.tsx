"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useRouter } from "next/navigation";

import { createUserSchema } from "@/schema";

import { IUserCreate } from "@/interfaces";
import { useState } from "react";

const CreateInvoice = () => {
  const [Error, setError] = useState("");
  const router = useRouter();

  const formik = useFormik<IUserCreate>({
    enableReinitialize: true, // Enable reinitialization
    initialValues: {
      username: "",
      email: "",
      password: "",
      basicPayForThisMonth: 0,
      committedHoursForThisMonth: 0,
      role: "",
      type: "",
      joiningDate: "",
    },
    validationSchema: createUserSchema,
    onSubmit: async (values) => {
      
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/register-user`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("User created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/dashboard");
      } catch (error: any) {
        setError(error.response.data.message);
        console.error("API Errorsss:", error.response.data.data.message);
      }
    },
  });

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create new user
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              {[
                {
                  name: "username",
                  label: "Username",
                  title: "Enter your username",
                },
                {
                  name: "email",
                  label: "Email",
                  title: "Enter your email",
                  type: "email",
                },
                {
                  name: "password",
                  label: "Password",
                  title: "Enter your password",
                  type: "text",
                },
                {
                  name: "basicPayForThisMonth",
                  label: "Basic Pay",
                  title: "Enter your Base Salary decided with your company",
                },
                {
                  name: "committedHoursForThisMonth",
                  label: "Committed Hours",
                  title:
                    "Enter your Working hours decided with your company for month",
                },
                {
                  name: "type",
                  label: "Job type",
                  title: "Enter your job type",
                },
                { name: "role", label: "Role", title: "Enter your Role" },
                {
                  name: "joiningDate",
                  label: "Joining date",
                  title: "Enter joining date",
                  type: "date",
                },
              ].map((item) => (
                <div key={item.name}>
                  <label
                    htmlFor={item.name}
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {item.label}
                  </label>
                  <input
                    type={item.type || "text"}
                    id={item.name}
                    name={item.name}
                    className={`bg-gray-50 border ${
                      formik.errors[item.name as keyof IUserCreate] &&
                      formik.touched[item.name as keyof IUserCreate]
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  `}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[item.name as keyof IUserCreate]}
                  />
                  {formik.errors[item.name as keyof IUserCreate] &&
                    formik.touched[item.name as keyof IUserCreate] && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors[item.name as keyof IUserCreate]}
                      </p>
                    )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              {Error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {Error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CreateInvoice;
