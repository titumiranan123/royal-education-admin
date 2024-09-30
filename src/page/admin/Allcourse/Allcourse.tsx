/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import useCourse from "../../../hook/useCourse";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../../components/utils/Lodder";
import Swal from "sweetalert2";
import api from "../../../redux/api/api";

const Allcourse: React.FC = () => {
  const { data: course, isLoading, refetch } = useCourse();

  // State for filtering and searching
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (isLoading) {
    return <Loader />;
  }

  const deleteCourse = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await api.delete(`/api/v1/course/${id}`);

        if (data.success) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Course has been deleted successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete Course",
          icon: "error",
        });
      }
    }
  };

  // Filter and search logic
  const filteredCourses = course?.filter((data: any) => {
    // Filter by course type
    const matchType =
      selectedType === "All" || data.course_type === selectedType;

    // Filter by search query (case-insensitive)
    const matchSearch = data.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Return only courses that match both type and search
    return matchType && matchSearch;
  });

  return (
    <div className="text-white min-h-screen max-w-[1240px] mx-auto">
      <div>
        <div className="mt-20 flex justify-between items-center md:flex-nowrap gap-5 flex-wrap">
          <div className="flex justify-center items-center lg:gap-20 md:flex-nowrap gap-5 flex-wrap">
            <p className="gradient-text text-[24px] font-bold">All Courses</p>
            <div className="bg p-[2px] rounded-lg">
              <div className="text-white bg-[#272758] rounded-lg px-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 outline-none focus:outline-none rounded-lg bg-[#272758] "
                />
                <FaSearch className="text-xl " />
              </div>
            </div>
          </div>

          <select
            className="bg outline-none focus:outline-none rounded-lg py-2 px-4"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option className="gradient-text select-bg" value="All">
              All Types
            </option>
            <option className="gradient-text select-bg" value="Free Course">
              Free Course
            </option>
            <option className="gradient-text select-bg" value="Paid Course">
              Paid Course
            </option>
            <option className="gradient-text select-bg" value="Free Exam">
              Free Exam
            </option>
            <option className="gradient-text select-bg" value="Paid Exam">
              Paid Exam
            </option>
          </select>
        </div>
        <div className="bg h-[2px] w-full mt-4"></div>
      </div>

      {filteredCourses?.map((data: any) => (
        <div
          className="flex bg justify-between items-center mt-4 rounded-lg p-[1px]"
          key={data.id}
        >
          <div className="bg-[#111111] w-full flex md:justify-between md:flex-nowrap justify-center gap-5 flex-wrap items-center p-4 rounded-lg">
            <div>
              <img
                className="w-[200px] rounded-lg h-[150px]"
                src={data.thumbnail}
                alt={data.title}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="montserrat text-[20px] font-bold">{data.title}</p>
              <p className="montserrat">
                Course Type:{" "}
                <span className="gradient-text font-semibold capitalize">
                  {data.course_type}
                </span>
              </p>
              <p className="montserrat">
                Total Enrolled:{" "}
                <span className="gradient-text font-semibold capitalize">
                  {data.enrolled || 5}
                </span>
              </p>
              <p className="montserrat">
                Course Started:{" "}
                <span className="gradient-text font-semibold capitalize">
                  5 days left
                </span>
              </p>
            </div>
            <div className="flex justify-center gap-5">
              <Link
                to={`/dashboard/course/${data.id}`}
                className="gradient-button py-3 px-5 font-bold"
              >
                Update
              </Link>
              <button
                onClick={() => deleteCourse(data.id)}
                className="gradient-button py-3 px-5 font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allcourse;
