/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import Courseoptions from "./Courseoptions";
import CourseData from "./CourseData";
// import CourseContent from "./CourseContent";
import CourseInstructor from "./CourseInstructor";
import Swal from "sweetalert2";
import api from "../../../redux/api/api";

const Createcourse: React.FC = () => {
  const [active, setActive] = useState(0);
  const [benefits, setBenefit] = useState([{ title: "" }]);

  const [courseInfo, setCourseInfo] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    thumbnail: "",
    live_class: "",
    total_subject: "",
    lecture_sheet: "",
    total_exam: "",
    enrollment_last_date: "",
    type: " ",
    category: "",
    status: "",
  });
  
  const [courseDetails, setDetails] = useState([
    { title: "", description: "" },
  ]);

  const [instructor, setInstructor] = useState([
    {
      img: "",
      name: "",
      experience: "",
      institute: "",
    },
  ]);

  // const [courseContentData, setCourseContentData] = useState([
  //   {
  //     sectionTitle: "Section 1",
  //     content: [
  //       {
  //         title: "",
  //         videoUrl: "",
  //         description: "",
  //         videoLength: "",
  //         links: [{ title: "", url: "" }],
  //       },
  //     ],
  //   },
  // ]);

  const handleSubmit = async () => {
    const combinedData = {
      ...courseInfo,
      course_details: courseDetails,
      course_instructors: instructor,
      course_benefits: benefits,
    };
    try {
      const response = await api.post("/api/v1/course",combinedData);

      if (response.data.success) {
        Swal.fire({
          title: "Good job!",
          text: "Course Create Success!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Something Wrong!",
          icon: "error",
        });
      }
    } catch (error) {
   
      Swal.fire({
        title: "Something Wrong!",
        text: (error as any).message,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full flex flex-col-reverse lg:flex-col  max-w-[1240px] mx-auto">
      <div className="lg:w-[70%] w-full">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefit={setBenefit}
            active={active}
            setActive={setActive}
            courseDetails={courseDetails}
            setDetails={setDetails}
          />
        )}
        {active === 2 && (
          <CourseInstructor
            instructor={instructor}
            setInstructor={setInstructor}
            handleSubmit={handleSubmit}
            active={active}
            setActive={setActive}
          />
        )}
        {/* {active === 3 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )} */}
      </div>
      <div className="lg:w-[20%] mt-[100px]  lg:fixed top-18 right-0">
        <Courseoptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Createcourse;
