/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/Store";
import Loader from "../components/utils/Lodder";
import { decode } from "jwt-js-decode";
import { clearAuth, logout, setAuth } from "../redux/userSlice";
import Cookies from "js-cookie";

interface Props {
  children: React.ReactNode;
}

const Privateroute: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);

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

  if (user.isLoading) {
    return <Loader />;
  }

  // Redirect to login if user is not authenticated
  if (!user.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Check if the user role is 'admin' and log them out
  if (user.user?.role !== "admin") {
    dispatch(logout());
    return <Navigate to="/login" />; // Redirect to login after logout
  }


  // Render the children components if authentication is successful
  return <>{children}</>;
};

export default Privateroute;
