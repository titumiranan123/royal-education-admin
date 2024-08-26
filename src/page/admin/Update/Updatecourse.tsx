// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useCourse from "../../../hook/useCourse";
// import { Course } from "../Interface/Courseinterface";

// const Updatecourse: React.FC = () => {
//   const { id } = useParams();
//   const { data } = useCourse();
//   useEffect(() => {
//     // const course = data?.data.find((p: Course) => p._id === id);
//   }, [data?.data, id]);

//   const [course, setCourse] = useState<Course>({
//     _id: "664eb3474e32c0d0851812c8",
//     title: "ঢাকা ভার্সিটি A Unit এডমিশন কোর্স - ২০২৪",
//     category: "Admission",
//     course_thumbnail: "image.png",
//     description: "প্রতিবছর লক্ষ লক্ষ...",
//     type: "free",
//     course_content: {
//       live_class: "20",
//       total_subject: ["Bangla", "English", "GK"],
//       lecture_sheet: "20",
//       total_exam: "20",
//     },
//     price: "5000",
//     enrollment_last_date: "2024-06-29",
//     course_details: [
//       {
//         title: "কোর্সটি যাদের জন্য ?",
//         description: "- HSC 24 ব্যাচের বিজ্ঞান বিভাগের পরীক্ষার্থীদের জন্য...",
//       },
//       {
//         title: "কোর্স টি তোমাদের যেভাবে প্রস্তুত করবে ?",
//         description: "- কমপ্লিট একাডেমিক প্ল্যান এর মাধ্যমে...",
//       },
//       {
//         title: "শেষ কথা :",
//         description: "বিজ্ঞান বিভাগের শিক্ষার্থীদের জন্য...",
//       },
//     ],
//     course_benefit: [
//       { title: "বেসিক ক্লিয়ার এর পাশাপাশি বিভিন্ন টপিকের শর্টকাট" },
//       { title: "পরীক্ষার মাধ্যমে পরীক্ষার হলের টাইম ম্যানেজমেন্ট" },
//       { title: "পরীক্ষার আগে প্রতিটি বিষয়ের ফাইনাল রিভিশন" },
//       { title: "এক্সপার্ট টিচারদের গাইডলাইন ও মেন্টরশিপ" },
//     ],
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setCourse({ ...course, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(course);
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Update Course</h1>
//         <div className="mb-4">
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Course Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={course.title}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="category"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Course Category
//           </label>
//           <input
//             type="text"
//             name="category"
//             value={course.category}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="course_thumbnail"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Course Thumbnail
//           </label>
//           <input
//             type="text"
//             name="course_thumbnail"
//             value={course.course_thumbnail}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Course Description
//           </label>
//           <textarea
//             name="description"
//             value={course.description}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="type"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Course Type
//           </label>
//           <input
//             type="text"
//             name="type"
//             value={course.type}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="price"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Course Price
//           </label>
//           <input
//             type="text"
//             name="price"
//             value={course.price}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="enrollment_last_date"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Enrollment Last Date
//           </label>
//           <input
//             type="text"
//             name="enrollment_last_date"
//             value={course.enrollment_last_date}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         <h2 className="text-xl font-bold mt-4 mb-2">Course Content</h2>
//         <div className="mb-4">
//           <label
//             htmlFor="live_class"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Live Classes
//           </label>
//           <input
//             type="text"
//             name="live_class"
//             value={course.course_content.live_class}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="total_subject"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Total Subjects
//           </label>
//           <input
//             type="text"
//             name="total_subject"
//             value={course.course_content.total_subject.join(", ")}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="lecture_sheet"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Lecture Sheets
//           </label>
//           <input
//             type="text"
//             name="lecture_sheet"
//             value={course.course_content.lecture_sheet}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="total_exam"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Total Exams
//           </label>
//           <input
//             type="text"
//             name="total_exam"
//             value={course.course_content.total_exam}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         <h2 className="text-xl font-bold mt-4 mb-2">Course Details</h2>
//         {course.course_details.map((detail, index) => (
//           <div key={index} className="mb-4">
//             <label
//               htmlFor={`detail_title_${index}`}
//               className="block text-sm font-medium text-gray-700"
//             >
//               Detail Title
//             </label>
//             <input
//               type="text"
//               name={`detail_title_${index}`}
//               value={detail.title}
//               onChange={(e) => {
//                 const newDetails = [...course.course_details];
//                 newDetails[index].title = e.target.value;
//                 setCourse({ ...course, course_details: newDetails });
//               }}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//             />
//             <label
//               htmlFor={`detail_description_${index}`}
//               className="block text-sm font-medium text-gray-700 mt-2"
//             >
//               Detail Description
//             </label>
//             <textarea
//               name={`detail_description_${index}`}
//               value={detail.description}
//               onChange={(e) => {
//                 const newDetails = [...course.course_details];
//                 newDetails[index].description = e.target.value;
//                 setCourse({ ...course, course_details: newDetails });
//               }}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//         ))}

//         <h2 className="text-xl font-bold mt-4 mb-2">Course Benefits</h2>
//         {course.course_benefit.map((benefit, index) => (
//           <div key={index} className="mb-4">
//             <label
//               htmlFor={`benefit_title_${index}`}
//               className="block text-sm font-medium text-gray-700"
//             >
//               Benefit Title
//             </label>
//             <input
//               type="text"
//               name={`benefit_title_${index}`}
//               value={benefit.title}
//               onChange={(e) => {
//                 const newBenefits = [...course.course_benefit];
//                 newBenefits[index].title = e.target.value;
//                 setCourse({ ...course, course_benefit: newBenefits });
//               }}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700"
//         >
//           Update Course
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Updatecourse;
