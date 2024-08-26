/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CourseInformation from "../courseForm/CourseInformation";
import CourseData from "../courseForm/CourseData";
import CourseInstructor from "../courseForm/CourseInstructor";
import Courseoptions from "../courseForm/Courseoptions";
import { Link, useParams } from "react-router-dom";
import useCourse from "../../../hook/useCourse";
import { Course } from "../Interface/Courseinterface";
import { FaPlus } from "react-icons/fa";

import Swal from "sweetalert2";

const Updatecourse: React.FC = () => {
  const [active, setActive] = useState(0);
  const { id } = useParams();
  const { data } = useCourse();
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
  //  course content
  const [courseContentData, setCourseContentData] = useState([]);

  useEffect(() => {
    const course = data?.find((p: Course) => p.id === id);
    if (course) {
      setCourseInfo({
        title: course?.title,
        description: course?.description,
        price: course?.price,
        discount: course?.discount,
        thumbnail: course?.thumbnail,
        live_class: course?.live_class,
        total_subject: course?.total_subject,
        lecture_sheet: course?.lecture_sheet,
        total_exam: course?.total_exam,
        enrollment_last_date: course?.enrollment_last_date.length > 10 ? course.enrollment_last_date.slice(0, 10) : course.enrollment_last_date,
        type: course?.type,
        category: course?.category,
        status: course?.status,
      });

      setBenefit(course?.course_benefits || []);
      setDetails(course?.course_details || []);
      setInstructor(course?.course_instructors || []);

      setCourseContentData(course.course_content);
    }
  }, [data, id]);

  const handleSubmit = async () => {
    const combinedData = {
      id: id,
      ...courseInfo,
      course_details: courseDetails,
      course_instructors: instructor,
      course_benefits: benefits,
      course_content: [...courseContentData]
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/course/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        Swal.fire({
          title: "Good job!",
          text: "Course Update Success!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Something Wrong!",
          text: responseData.message,
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
    <div className="w-full mt-10 flex flex-col-reverse lg:flex-col  max-w-[1240px] mx-auto">
      <div className="flex justify-between items-center pe-10">
        <h1 className="montserrat font-semibold text-white text-[20px]">
          Update Your Course
        </h1>
        <div className="flex gap-2">
          <Link
            to={`/dashboard/course/video-upload/${id}`}
            className="bg montserrat font-semibold text-white py-2 px-3 flex justify-center items-center gap-2 rounded-xl w-[180]"
          >
            <FaPlus /> Add Lecture
          </Link>
          <Link
            to={`/dashboard/course/exam/${id}`}
            className="bg montserrat font-semibold text-white py-2 px-3 flex justify-center items-center gap-2 rounded-xl w-[180]"
          >
            <FaPlus /> Add Exam
          </Link>
        </div>
      </div>
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

      </div>
      <div className="lg:w-[20%] mt-[100px]  lg:fixed top-18 right-0">
        <Courseoptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Updatecourse;
