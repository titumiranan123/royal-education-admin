/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import google from "../../assets/auth/Google.png";
import facebook from "../../assets/auth/facebook.png";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};
import logo from "../../assets/logo.png";
const Singuppage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password", "");
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const info = {
      name: data.name,
      email: data.email,
      password: data.password,
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
        console.log(info);

        if (info.success) {
          navigate("/login");
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
    <div className="max-w-[1440px]  mx-auto relative pt-10 pb-10 ">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex items-center">
          <div className=" text-white">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="flex flex-col    justify-center items-center ">
          <div className="mt-[30px] text-white text-[20px] font-bold">
            Sing Up
          </div>
          <div className="mt-[85px] bg p-[2px] rounded-lg">
            <div className=" w-full rounded-lg h-full bg-[#201E35]">
              <div className="py-[29px] px-[22px]">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="  flex flex-col gap-[10px] "
                >
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true })}
                      className="lg:w-[426px] lg:h-[44px] rounded-[8px] bg-[#201E35] focus:outline-none outline-none border text-white mt-[10px] border-white py-2 px-4"
                    />
                    {errors.name?.type === "required" && (
                      <span role="alert" className="text-red-500 text-[14px]">
                        Name is Required
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email address is required",
                      })}
                      id="email"
                      className="lg:w-[426px] lg:h-[44px] rounded-[8px] bg-[#201E35] focus:outline-none outline-none border text-white mt-[10px] border-white py-2 px-4"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[14px]">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password" className="text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                          message:
                            "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number",
                        },
                      })}
                      id="password"
                      className="lg:w-[426px] lg:h-[44px] rounded-[8px] bg-[#201E35] focus:outline-none outline-none border text-white mt-[10px] border-white py-2 px-4"
                    />
                    {errors.password && (
                      <span className="text-red-500 text-[14px]">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirm_password" className="text-white">
                      Confirm Password
                    </label>
                    <input
                      type="text"
                      {...register("confirm_password", {
                        validate: (value) =>
                          value === password || "The Passwords do not match",
                      })}
                      id="confirm_password"
                      className="lg:w-[426px] lg:h-[44px] rounded-[8px] bg-[#201E35] focus:outline-none outline-none border text-white mt-[10px] border-white py-2 px-4"
                    />
                    {errors.confirm_password && (
                      <span className="text-red-500 text-[14px]">
                        {errors.confirm_password.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="gradient-button mt-[15px] h-[50px] w-full text-white text-[16px] font-bold"
                  >
                    Sing UP
                  </button>
                </form>
                <div className="flex justify-center mt-6 gap-1 items-center">
                  <span className="border text-white border-white w-[35%] h-[1px]"></span>
                  <p className="text-white w-[28%]">Or Sign Up With</p>
                  <span className="border border-white w-[35%] h-[1px]"></span>
                </div>
                <div className="mt-4 mb-4 flex justify-center items-center gap-5">
                  <img src={google} alt="" />
                  <img src={facebook} alt="" />
                </div>
                <p className="text-white text-center">
                  Already have an Account ?
                  <Link to={"/login"} className="text-[#DC02CE] underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[400px] top-0 left-10 z-10 bg-opacity-50 h-[400px] bg-[#5C53FE] blur-[106px] absolute"></div>
    </div>
  );
};

export default Singuppage;
