/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import a_unit from "../../assets/course/dua.jpg";
// import c_unit from "../../assets/course/duc.jpg";
// import b_unit from "../../assets/course/dubunit.jpg";
import CourseCard from "./CourseCard";

import useCourse from "../../hook/useCourse";
import Loader from "../utils/Lodder";
const Admissioncourselist: React.FC = () => {
  const { data, isLoading } = useCourse();
  const courses =data?.data
  return (
    <div className="grid w-3/4 grid-cols-1 gap-5 lg:grid-cols-3">
      {isLoading && <Loader />}
      {courses?.map((course: any) => (
        <div key={course._id}>
          <CourseCard data={course}></CourseCard>
        </div>
      ))}
    </div>
  );
};

export default Admissioncourselist;
