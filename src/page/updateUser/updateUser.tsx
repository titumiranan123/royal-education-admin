/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  mobile?: string;
  college?: string;
};

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();



  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const info = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      college: data.college,
    };

    fetch("https://test.royaleducation.online/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((info: any) => {
        if (info.success) {
          navigate("/dashboard/user");
          Swal.fire({
            position: "center",
            icon: "success",
            title: info.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: info.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-12 bg-[#131129]">
      <div className="shadow-lg rounded-lg w-full max-w-4xl p-8 bg-[#272758]">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Update Your Information
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row lg:space-x-12"
        >
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-50 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 "
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-50 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 "
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-8">
            {/* Mobile Number */}
            <div className="flex flex-col">
              <label
                htmlFor="mobile"
                className="text-gray-50 font-medium mb-1"
              >
                Mobile Number (Optional)
              </label>
              <input
                type="text"
                id="mobile"
                {...register("mobile")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 "
              />
            </div>

            {/* College */}
            <div className="flex flex-col">
              <label
                htmlFor="college"
                className="text-gray-50 font-medium mb-1"
              >
                College (Optional)
              </label>
              <input
                type="text"
                id="college"
                {...register("college")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 "
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8 lg:col-span-2">
            <button
              type="submit"
              className=" lg:w-[200px] py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 h-[60px] w-[180px]"
            >
              Update Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
