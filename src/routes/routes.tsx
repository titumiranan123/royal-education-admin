import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../page/admin/layout/DashboardLayout";
import Dashboard from "../page/admin/Dashborad/Dashboard";
import Invoice from "../page/admin/Invoice/Invoice";
import Users from "../page/admin/user/User";
import Createcourse from "../page/admin/courseForm/Createcourse";
import Allcourse from "../page/admin/Allcourse/Allcourse";
import Updatecourse from "../page/admin/Updatecourse/Updatecourse";
import Updatelayout from "../page/admin/Updatecourse/Updatelayout";
import CourseContent from "../page/admin/courseForm/CourseContent";
import Loginpage from "../page/loginpage/Loginpage";
import Privateroute from "./Privateroute";
import Adduser from "../page/adduser/Adduser";
import UpdateUser from "../page/updateUser/updateUser";
import Mannagement from "../page/Mannagement/Mannagement";
import Insertmcq from "../page/admin/CourseContent/Insertmcq";


export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/",
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
        path: "dashboard/all-course",
        element: <Allcourse />,
      },

      {
        path: "dashboard/invoice",
        element: <Invoice />,
      },
      {
        path: "dashboard/user",
        element: <Users />,
      },
      {
        path: "dashboard/add-user",
        element: <Adduser />,
      },
      {
        path: "dashboard/update-user/:id",
        element: <UpdateUser />,
      },
      {
        path: "dashboard/create-course",
        element: <Createcourse />,
      },
      {
        path: "dashboard/mannage-team",
        element: <Mannagement />,
      },
      {
        path: "dashboard/course",
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
            path: "insert-mcq/:id",
            element: <Insertmcq />,
          },
        ],
      },
    ],
  },
]);
