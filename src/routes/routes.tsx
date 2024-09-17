import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../page/admin/layout/DashboardLayout";
import Dashboard from "../page/admin/Dashborad/Dashboard";
import Invoice from "../page/admin/Invoice/Invoice";
import Users from "../page/admin/user/User";

import Createcourse from "../page/admin/courseForm/Createcourse";

import Allcourse from "../page/admin/Allcourse/Allcourse";
import Updatecourse from "../page/admin/Updatecourse/Updatecourse";
import MCQstore from "../page/admin/mcq/MCQstore";
import Updatelayout from "../page/admin/Updatecourse/Updatelayout";
import CourseContent from "../page/admin/courseForm/CourseContent";
import CourseExam from "../page/admin/courseForm/CourseExam";
import Loginpage from "../page/loginpage/Loginpage";
import Privateroute from "./Privateroute";
import Adduser from "../page/adduser/Adduser";
import UpdateUser from "../page/updateUser/updateUser";
import Mannagement from "../page/Mannagement/Mannagement";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Loginpage />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/dashboard",
    element: (
      <Privateroute>
        <DashboardLayout />
      </Privateroute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },

      {
        path: "all-course",
        element: <Allcourse />,
      },
      {
        path: "mcq-store",
        element: <MCQstore />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "user",
        element: <Users />,
      },
      {
        path: "add-user",
        element: <Adduser />,
      },
      {
        path: "update-user/:id",
        element: <UpdateUser />,
      },
      {
        path: "create-course",
        element: <Createcourse />,
      },
      {
        path: "mannage-team",
        element: <Mannagement />,
      },
      {
        path: "course",
        element: <Updatelayout />,
        children: [
          {
            path: ":id",
            element: <Updatecourse />,
          },
          {
            path: "video-upload/:id",
            element: <CourseContent />,
          },
          {
            path: "exam/:id",
            element: <CourseExam />,
          },
        ],
      },
    ],
  },
]);
