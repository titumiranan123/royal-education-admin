/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import user from "../../assets/courseimg/user.png";

import video from "../../assets/icon/video.png";
import mcq from "../../assets/icon/mcq.png";
import exam from "../../assets/icon/exam.png";
import Courseaccordion from "../../components/coursedetailscarousel/details/Detailscourseaccordion";
import { LuCheckCircle2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import useCourse from "../../hook/useCourse";
import book from "../../assets/icon/book.png";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const Coursedetails: React.FC = () => {
  const [courseData, setCourseData] = useState<any>({
    _id: "",
    thumbnail: "",
    title: "",
    description: "",
    course_details: [{ title: "" }],
    type: "",

    live_class: "",
    total_subject: "",
    lecture_sheet: "",
    total_exam: "",

    price: "",
    course_instructors: [
      { img: "", name: "", institution: "", experience: "" },
    ],
    status: "",
    enrollment_last_date: "",
  });
  const user = useSelector((state: any) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleEnrollClick = () => {
    if (user.user && user?.isAuthenticated) {
      setIsModalOpen(true);
    } else {
      Swal.fire({
        title: "Not Logged In",
        text: "You need to log in to enroll. Do you want to go to the login page?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const { data } = useCourse();
  useEffect(() => {
    const course = data?.find((item: any) => item.id === params.id);
    if (course) {
      setCourseData(course);
    }
  }, [params.id, data]);
  const onSubmit = async (formData: any) => {
    const info = {
      enrolled_course_id: params?.id,
      userId: user.user._id,
      bkash_number: formData.mobile,
      trxId: formData.trxId,
    };

    fetch(`http://localhost:3000/api/v1/enrollments`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Enrollment Submitted",
            showConfirmButton: false,
            timer: 3500,
          });
          setIsModalOpen(false);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  if (!courseData) {
    return <div>Lodding .............</div>;
  }

  return (
    <div className="min-h-screen mt-10 max-w-[1340px] mx-auto">
      <div className="text-center font-bold montserrat text-white text-[36px]">
        Course Details
      </div>
      <div className="grid lg:grid-cols-3 relative md:grid-cols-1  lg:px-0 p-5 gap-5 ">
        <div className="lg:col-span-2 md:col-span-1  mt-10">
          <div>
            <h1 className="text-[44px] text-white font-bold montserrat banglafont">
              {courseData.title}
            </h1>
            <p className="text-white mt-5 banglafont">
              {courseData.description}
            </p>
          </div>
          <div>
            <h1 className="text-[28px] mt-10 text-white font-bold montserrat">
              কোর্স ইন্সট্রাক্টর
            </h1>
            <div className="mt-10 p-[1px] md:w-full w-[350px] rounded-[10px] bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE]">
              <div className="h-auto rounded-[10px]  w-full bg-[#201E35] p-1 text-white py-10 px-5">
                {courseData?.course_instructors?.map((user: any) => (
                  <div className="flex gap-5 items-center">
                    <img className="rounded-full w-14 h-14" src={user.img} />
                    <div>
                      <h1 className="montserrat">{user.name}</h1>
                      <h1 className="montserrat text-[12px]">
                        {user.institute}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* কোর্সটি করে যা শিখবেন */}
            <div className="mt-10">
              <h1 className="text-[24px] text-white font-bold montserrat">
                কোর্সটি করে যা শিখবেন
              </h1>
              <div className="mt-10 p-[1px] md:w-full w-[350px] rounded-[10px] bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE]">
                <div
                  className={`h-auto rounded-[10px]   bg-[#201E35]  text-white p-10 ${
                    courseData?.course_benefits?.length > 2
                      ? "grid lg:grid-cols-2 grid-cols-1 md:w-full w-[350px] gap-5 "
                      : "grid grid-cols-1"
                  }`}
                >
                  {courseData?.course_benefits &&
                    courseData?.course_benefits?.map(
                      (data: { title: string }, index: number) => (
                        <div className="" key={index}>
                          <div className="flex items-center  gap-5">
                            <LuCheckCircle2 className="text-[#DC02CE] text-3xl" />
                            {data.title}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
            {/* কোর্স সম্পর্কে বিস্তারিত */}
            <div className="mt-10">
              <h1 className="text-[24px] text-white font-bold montserrat">
                কোর্স সম্পর্কে বিস্তারিত
              </h1>
              <div className="mt-10 p-[1px] md:w-full w-[350px] rounded-[10px] bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE]">
                <div className="h-auto rounded-[10px]  w-full bg-[#201E35] p-1 text-white">
                  <Courseaccordion items={courseData?.course_details} />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h1 className="text-[24px] text-white font-bold montserrat">
                আরো জানতে কল করুন ?
              </h1>
              <div className="mt-10 p-[1px] rounded-[10px] w-[350px] bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE]">
                <div className="h-auto rounded-[10px] py-5 px-5 w-full bg-[#201E35] p-1 text-white">
                  <a
                    href="tel:01960807711"
                    className="flex justify-center items-center"
                  >
                    <h3 className="ml-2 text-base font-medium gradient-text  md:text-lg">
                      কল করুন 01960807711 নম্বরে
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 md:w-full w-[360px] h-[700px] lg:sticky lg:top-10   ">
          <div className="mx-auto bg-[#201E35] pb-10  -mt-20 ms-2">
            <div className="w-full h-[260px]">
              <img
                className="rounded-xl  w-full h-[260px] p-4  mx-auto"
                src={courseData.thumbnail}
                alt=""
              />
            </div>
            <div className="px-10 flex flex-col gap-5">
              <p className="text-white">
                <span className="text-xl font-bold">Price :</span>{" "}
                <span className="line-through"> {courseData.price} Tk.</span>
                <span className="ms-3">
                  {courseData &&
                  courseData.price != null &&
                  courseData.discount != null
                    ? (
                        courseData.price -
                        (courseData.price * courseData.discount) / 100
                      ).toFixed(2) + " Tk."
                    : "Free"}
                </span>
              </p>
              <div className="flex  gap-2">
                <div className="p-[1px] bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE] rounded-[10px] flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="bg-[#201E35] text-white py-2 px-3 rounded-[8px]"
                  />
                </div>
                <button className="  text-white font-bold py-2 px-6 rounded-[8px]  bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE] ">
                  Apply
                </button>
              </div>

              <button
                className="btn bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE] text-white px-2 py-2 text-center w-full font-bold rounded-md"
                onClick={handleEnrollClick}
              >
                Enroll Now
              </button>
              <div className="text-white flex flex-col gap-2 ">
                <div className="flex bg-[#2E2A50] py-2 px-2 w-[50%] rounded-md gap-2">
                  <img src={video} alt="" />
                  <p>{courseData.live_class} Videos</p>
                </div>
                <div className="flex bg-[#2E2A50] py-2 px-2 w-[50%] rounded-md gap-2">
                  <img src={mcq} alt="" />
                  <p>{courseData.total_exam} Exam </p>
                </div>
                <div className="flex bg-[#2E2A50] py-2 px-2 w-[50%] rounded-md gap-2">
                  <img src={exam} alt="" />
                  <p>{courseData.lecture_sheet} Lecture Sheet</p>
                </div>
                <div className="flex flex-wrap bg-[#2E2A50] items-center rounded-md py-2 px-2 ">
                  <img src={book} alt="" />
                  <div className="flex rounded-md items-center  gap-2">
                    {courseData?.total_subject
                      ?.split(" ")
                      .map((book: string, index: number) => (
                        <p
                          className="flex capitalize bg-[#2E2A50] py-2 px-2  w-[50%] items-center rounded-md gap-2"
                          key={index}
                        >
                          {book}
                        </p>
                      ))}
                  </div>
                  <p> </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="justify-between hidden mt-4 text-[12px] text-center text-gray-400 md:flex md:flex-col lg:flex lg:flex-row">
              <span>কোর্সটি সম্পর্কে বিস্তারিত জানতে</span>
              <span className="flex items-center justify-center ml-2 underline cursor-pointer text-green">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                </svg>{" "}
                <a href="tel:01960807711" className="ml-1">
                  ফোন করুন (01960807711)
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <dialog id="my_modal_3" className="modal w-[280px] mx-auto scale-150">
        <div className="modal-box">
          <form method="dialog">
      
            <button className="btn btn-sm btn-circle btn-ghost absolute scale-75 right-0 top-0">
              ✕
            </button>
          </form>
          <h3 className="font-bold montserrat text-sm">
            Pay <span className="line-through"> {courseData.price} Tk. </span>
            {courseData &&
            courseData.price != null &&
            courseData.discount != null
              ? (
                  courseData.price -
                  (courseData.price * courseData.discount) / 100
                ).toFixed(2) + " Tk."
              : "Free"}{" "}
            <br />
            <span className="text-[12px]">by Bkash / Nogad / Roket </span>
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className="flex flex-col mt-5">
              <label
                htmlFor="email"
                className="gradient-text font-semibold montserrat text-[12px]"
              >
                Mobile Number <span></span>
              </label>
              <input
                type="text"
                {...register("mobile", {
                  required: "Mobile Number  is required",
                })}
                id="mobile"
                className=" lg:h-[30px] rounded-[8px] bg-[#201E35] focus:outline-none outline-none border text-white mt-[5px] border-white py-2 px-4"
              />
              {errors.mobile && (
                <span className="text-red-500 text-[14px]">
                  {(errors as any).mobile.message}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-2">
              <label
                htmlFor="email"
                className="gradient-text font-semibold montserrat text-[12px]"
              >
                Trx :
              </label>
              <input
                type="trxId"
                {...register("trxId", {
                  required: "TrxId  is required",
                })}
                id="trxid"
                className=" lg:h-[30px] rounded-[8px] bg-[#201E35] font-normal focus:outline-none outline-none border text-white mt-[5px] border-white py-2 px-4"
              />
              {errors.trxId && (
                <span className="text-red-500 text-[14px]">
                  {(errors as any).trxId.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="gradient-button mt-[15px] h-[30px] w-full montserrat text-white text-[14px] "
              onClick={() => setIsModalOpen(false)}
            >
              Submit
            </button>
          </form>
        </div>
      </dialog> */}
      {isModalOpen && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed  w-full top-0 left-0 right-0 z-50 mx-auto scale-125 p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-black bg-opacity-60 flex items-center justify-center"
        >
          <div className="relative  w-[340px] max-w-2xl max-h-full">
            <div className="relative bg-[#201E35] rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6  py-6 lg:px-8">
                <h3 className="mb-4 mt-8 text-[14px] font-medium text-center text-white">
                  বিকাশ / নগদ /রকেটের মাধ্যমে
                  <span className="line-through indent-6">
                    {" "}
                    {courseData.price} Tk.{" "}
                  </span>
                  {courseData &&
                  courseData.price != null &&
                  courseData.discount != null
                    ? (
                        courseData.price -
                        (courseData.price * courseData.discount) / 100
                      ).toFixed(2) + " Tk."
                    : "Free"}{" "}
                  <br />
                  <span className="text-[1spx]">Send Money করুন</span> Fill the
                  form
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block mb-2 text-sm font-medium text-white  montserrat"
                    >
                      Bkash / Nogod /Roket Mobile No:
                    </label>
                    <input
                      {...register("mobile", { required: true })}
                      type="text"
                      id="mobile"
                      className="bg-gray-50  montserrat border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter your mobile number"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1  montserrat">
                        Mobile number is required.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="trxId"
                      className="block mb-2 text-sm font-medium  montserrat text-white"
                    >
                      Transaction ID
                    </label>
                    <input
                      {...register("trxId", { required: true })}
                      type="text"
                      id="trxId"
                      className="bg-gray-50 border border-gray-300  montserrat text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter transaction ID"
                    />
                    {errors.trxId && (
                      <p className="text-red-500 text-sm mt-1  montserrat">
                        Transaction ID is required.
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    onClick={handleEnrollClick}
                    className="w-full text-white bg-gradient-to-r from-[#DC02CE] to-[#5C53FE]  text-[16px] montserrat font-mono font-bold py-2 px-4 rounded-[10px]"
                  >
                    Enroll Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coursedetails;
