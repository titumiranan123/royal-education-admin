/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import google from "../../assets/auth/Google.png";
import facebook from "../../assets/auth/facebook.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import logo from "../../assets/logo.png";
import { fireConfig } from "../../firebase/firebase.config";
import { login } from "../../redux/userSlice";


type Inputs = {
  email: string;
  password: string;
};

const Loginpage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSocialLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(fireConfig.auth, provider);
      const user = result.user;
      const data = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };
      if (user) {
        const response = await fetch(
          `http://localhost:3000/api/v1/loginwithsocialmedia`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const userData = await response.json();

        if (userData.success) {
          dispatch(login(userData.data));
          navigate("/");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: userData.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await response.json();

      if (user.success) {
        dispatch(login(user.data));
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: user.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-[1440px] min-h-screen mx-auto relative py-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex items-center">
          <div className="text-white">
            <img className="h-auto w-40" src={logo} alt="Logo" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-[85px] p-[2px] rounded-lg">
            <div className="w-[95%] mx-auto md:w-[500px] flex justify-center items-center px-10  flex-col rounded-lg h-full bg-[#201E35]">
              <div className="mt-[32px] text-white text-[20px] font-bold">
                Log In
              </div>
              <p className="banglafont mt-4 text-center text-sm text-white">
                আপনার <span>Email</span> এবং <span>পাসওয়ার্ড</span> দিয়ে লগ ইন
                করুন যেগুলো রেজিস্ট্রেশনের সময় ব্যবহার করেছিলেন। অথবা,{" "}
                <span>Google</span> বা <span>Facebook</span> আইকন ব্যবহার করে লগ
                ইন করতে পারেন।
              </p>

              <div className="py-[29px] px-[22px]">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-[10px]"
                >
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
                      className="lg:w-[426px] lg:h-[44px] rounded-[8px] bg-[#201E35] focus:outline-none border text-white mt-[10px] border-white py-2 px-4"
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
                      })}
                      id="password"
                      className="lg:w-[426px] lg:h-[44px] rounded-[8px] bg-[#201E35] focus:outline-none border text-white mt-[10px] border-white py-2 px-4"
                    />
                    {errors.password && (
                      <span className="text-red-500 text-[14px]">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="gradient-button mt-[15px] h-[50px] w-full text-white text-[16px] font-bold"
                  >
                    Log In
                  </button>
                </form>
                <div className="flex justify-center mt-6 gap-1 items-center">
                  <span className="border text-white border-white w-[35%] h-[1px]"></span>
                  <p className="text-white w-[28%]">Or login With</p>
                  <span className="border border-white w-[35%] h-[1px]"></span>
                </div>
                <div className="mt-4 mb-4 flex justify-center items-center gap-5">
                  <img
                    onClick={() => handleSocialLogin(fireConfig.googleProvider)}
                    src={google}
                    alt="Google Login"
                    className="cursor-pointer"
                  />
                  <img
                    onClick={() =>
                      handleSocialLogin(fireConfig.facebookProvider)
                    }
                    src={facebook}
                    alt="Facebook Login"
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-white text-center">
                  Don't have an Account?{" "}
                  <Link to="/signup" className="text-[#DC02CE] underline">
                    Sign Up
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

export default Loginpage;
