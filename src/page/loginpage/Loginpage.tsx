/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { clearAuth, loginUser, setAuth } from "../../redux/userSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import Loader from "../../components/utils/Lodder";
import { decode } from "jwt-js-decode";
 // Assuming you have a Loader component
import Cookies from "js-cookie";
type Inputs = {
  email: string;
  password: string;
};

const Loginpage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const from = location.state?.from?.pathname || "/"; // Redirect to this page after login
  const user = useSelector((state: RootState) => state.user); // Accessing user state, including isLoading
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const actionResult = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );

      if (loginUser.fulfilled.match(actionResult)) {
        navigate(from, { replace: true });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${actionResult?.payload}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred during login",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = decode(token);
    const currentTime = Date.now() / 1000;
    return decoded?.exp && decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

useEffect(() => {
  const token = Cookies.get("accessToken");
  if (token && !isTokenExpired(token)) {
    try {
      const decoded = decode(token) as any;
      dispatch(setAuth({ user: decoded, accessToken: token }));
    } catch (error) {
      Cookies.remove("accessToken");
      dispatch(clearAuth());
    }
  } else {
    Cookies.remove("accessToken");
    dispatch(clearAuth());
  }
}, [dispatch]);
  // Show loader if user is in loading state
  if (user.isLoading) {
    return <Loader />; // Display a loader while the login request is processing
  }

  // Redirect if user is already authenticated
  if (user.isAuthenticated) {
    return <Navigate to={"/"} />;
  }

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
                Welcome Back!
              </div>

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
