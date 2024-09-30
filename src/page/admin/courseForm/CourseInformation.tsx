/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

type props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};
const CourseInformation: React.FC<props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  console.log(courseInfo)
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg p-[2px] rounded-lg mt-5">
      <div className=" bg-[#181717] w-full h-auto pb-10  m-auto p-10 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 ">
            <label className="text-white me-2 font-semibold text-xl flex w-[30%] montserrat">
              Course Title
            </label>
            <input
              type="text"
              value={courseInfo.title}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, title: e.target.value });
              }}
              placeholder="Enter course title"
              className="py-2 px-2 bg-[#343335] text-white montserrat outline-none rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-3 mt-2 ">
            <label className="text-white me-2 font-semibold text-xl flex w-[30%] montserrat">
              Slug (Route)
            </label>
            <input
              type="text"
              value={courseInfo.slug}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, slug: e.target.value });
              }}
             
              placeholder="Enter course slug (e.g. dhaka-university-c-unit-admission-course)"
              className="py-2 px-2 bg-[#343335] text-white montserrat outline-none rounded-lg w-full"
            />
          </div>
          <br />
          <div className="flex montserrat flex-col gap-3">
            <label className="text-white me-2 font-semibold text-xl flex w-[30%]">
              Course Description
            </label>

            <textarea
              value={courseInfo.description}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  description: e.target.value,
                });
              }}
              placeholder="Enter course description"
              className="p-4 bg-[#343335] text-white montserrat h-[200px]  outline-none rounded-lg w-full"
            ></textarea>
          </div>
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col gap-3 mt-5 w-full">
              <label className="text-white me-2 font-semibold text-[20px] flex items-center montserrat">
                Type
              </label>
              <select
                required
                value={courseInfo.type}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,
                    type: e.target.value,
                  });
                }}
                id="name"
                className="py-2 bg-[#343335] text-white px-2 montserrat font-semibold outline-none rounded-lg"
              >
                <option>Course</option>
                <option>Exam</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 mt-5 w-full">
              <label className="text-white me-2 font-semibold text-[20px] flex items-center montserrat">
                Course Type
              </label>
              <select
                required
                value={courseInfo.course_type}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,
                    course_type: e.target.value,
                  });
                }}
                id="name"
                className="py-2 bg-[#343335] text-white px-2 montserrat font-semibold outline-none rounded-lg"
              >
                <option>Free Course</option>
                <option>Paid Course</option>
                <option>Free Exam</option>
                <option>Paid Exam</option>
              </select>
            </div>
          </div>
          {(courseInfo.course_type === "Paid Course" ||
            courseInfo.course_type === "Paid Exam") && (
            <div className="flex lg:flex-row flex-col mt-5 justify-between gap-5">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-white me-2 font-semibold text-[20px] flex items-center montserrat">
                  Course price
                </label>
                <div className="">
                  <input
                    type="text"
                    value={courseInfo.price}
                    onChange={(e: any) => {
                      setCourseInfo({
                        ...courseInfo,
                        price: e.target.value,
                      });
                    }}
                    placeholder="Enter course price (e.g. 1200 tk)"
                    className="py-2 px-2 bg-[#343335] text-white outline-none montserrat font-bold rounded-lg w-full "
                  />{" "}
                </div>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label className="text-white me-2 font-semibold text-xl flex  items-center montserrat">
                  Discount
                </label>
                <div className="flex  items-center gap-5">
                  <input
                    type="text"
                    value={courseInfo.discount}
                    onChange={(e: any) => {
                      setCourseInfo({
                        ...courseInfo,
                        discount: e.target.value,
                      });
                    }}
                    placeholder="Enter discount (e.g. 10%)"
                    className="py-2 px-2 bg-[#343335] text-white outline-none montserrat font-bold rounded-lg w-full "
                  />{" "}
                </div>
              </div>
            </div>
          )}
          <div className="flex lg:flex-row flex-col mt-5 justify-between gap-5">
            <div className="flex flex-col gap-3 w-full">
              <label className="text-white me-2 font-semibold text-[20px] montserrat flex items-center">
                Total Live Class or Recorded Class
              </label>
              <input
                type="number"
                value={courseInfo.live_class}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,

                    live_class: e.target.value,
                  });
                }}
                placeholder="Total Video (e.g. 20 videos )"
                className="py-2 px-2 bg-[#343335] text-white font-bold montserrat outline-none rounded-lg "
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <label className="text-white me-2 font-semibold text-xl flex  items-center montserrat">
                Total Exam
              </label>
              <input
                type="text"
                required
                value={courseInfo.total_exam}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,

                    total_exam: e.target.value,
                  });
                }}
                placeholder="Total Exam (e.g 20 exam)"
                className="py-2 font-bold bg-[#343335] text-white px-2 montserrat outline-none rounded-lg "
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col  mt-5 justify-between gap-5">
            <div className="flex flex-col gap-3 w-full">
              <label className="text-white me-2 font-semibold text-[20px] flex items-center montserrat">
                Subject Names
              </label>
              <input
                required
                value={courseInfo.total_subject}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,

                    total_subject: e.target.value,
                  });
                }}
                placeholder="Subject Names (e.g. Physic, Chemistry....)"
                className="py-2 px-2 bg-[#343335] text-white montserrat font-semibold outline-none rounded-lg "
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <label className="text-white me-2 font-semibold text-xl flex  items-center montserrat">
                Lecutre Sheet
              </label>
              <input
                value={courseInfo.lecture_sheet}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,

                    lecture_sheet: e.target.value,
                  });
                }}
                placeholder="Total Lecture Sheet (e.g. 20 ) "
                className="py-2 px-2 bg-[#343335] text-white montserrat font-semibold outline-none rounded-lg "
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col  mt-5 justify-between gap-5">
            <div className="flex flex-col gap-3 w-full">
              <label className="text-white me-2 font-semibold text-[20px] flex items-center montserrat">
                Course Category
              </label>
              <select
                required
                value={courseInfo.category}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,
                    category: e.target.value,
                  });
                }}
                className="py-2 px-2 bg-[#343335] text-white montserrat font-semibold outline-none rounded-lg"
              >
                <option>Cadet </option>
                <option>SSC</option>
                <option>HSC</option>
                <option>Admission</option>
                <option>Skill</option>
                <option>Job</option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-3">
              <label className="text-white me-2 font-semibold text-xl flex  items-center montserrat">
                Enrollment Last Date
              </label>
              <input
                type="date"
                required
                value={courseInfo.enrollment_last_date}
                onChange={(e: any) => {
                  setCourseInfo({
                    ...courseInfo,
                    enrollment_last_date: e.target.value,
                  });
                }}
                placeholder="Last date"
                className="py-2 px-2 montserrat font-semibold outline-none rounded-lg bg-[#343335] text-white"
              />
            </div>
          </div>

          <div className="bg p-[1px] md:w-[645px]  mt-10 rounded-xl">
            <div className=" bg-[#0D0C11] rounded-xl md:w-[643px]  h-[200px] md:h-[400px]  flex justify-center items-center  ">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                name=""
                id="file"
                className="hidden"
              />
              <label
                htmlFor="file"
                className={`w-full  p-3  flex items-center justify-center ${
                  dragging ? "bg-blue-500 " : "bg-transparent"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {courseInfo.thumbnail ? (
                  <img
                    src={courseInfo.thumbnail}
                    className="max-h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white">
                    Drag and drop your thumnail here or click to browse
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className="w-full mt-10 flex items-center justify-end">
            <input
              type="submit"
              onClick={() => setActive(active + 1)}
              value="Next"
              className="btn w-[180px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseInformation;
