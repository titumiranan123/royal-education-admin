// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { FaPencilAlt } from "react-icons/fa";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

// import Swal from "sweetalert2";
// import { useParams } from "react-router-dom";

// type Props = {
//     courseContentData: any;
//     setCourseContentData: (courseContentData: any) => void;
//     active: number;
//     setActive: (active: number) => void;
// };

// const Demo: React.FC = () => {
//     const [active, setActive] = useState(0)
//     const [courseContentData, setCourseContentData] = useState([
//         {
//             subject: "Section 1",
//             content: [
//                 {
//                     title: "",
//                     videoUrl: "",
//                     videoLength: "",
//                     pdf_title: "",
//                     pdf_link: "",
//                 },
//             ],
//         },
//     ]);
//     const [isCollapsed, setCollapsed] = useState(
//         Array(courseContentData.length).fill(false)
//     );
//     console.log("demo", courseContentData);
//     const handleRemoveSection = (sectionIndex: number) => {
//         const updatedData = [...courseContentData];
//         updatedData.splice(sectionIndex, 1);
//         setCourseContentData(updatedData);
//     };

//     const AddNewSection = () => {
//         if (
//             courseContentData[courseContentData.length - 1].content[0].title === "" ||
//             courseContentData[courseContentData.length - 1].content[0].videoUrl ===
//             ""
//         ) {
//             alert("Fill all fields");
//         } else {
//             const newSection = {
//                 subject: `Section ${courseContentData.length + 1}`,
//                 content: [
//                     {
//                         title: "",
//                         videoUrl: "",
//                         videoLength: "",
//                         pdf_title: "",
//                         pdf_link: "",
//                     },
//                 ],
//             };
//             setCourseContentData([...courseContentData, newSection]);
//         }
//     };

//     const newContentHandler = (sectionIndex: number) => {
//         const currentSection = courseContentData[sectionIndex];
//         if (
//             currentSection.content[0].title === "" ||
//             currentSection.content[0].videoUrl === ""
//         ) {
//             alert("Please fill all fields");
//         } else {
//             const newContent = {
//                 title: "",
//                 videoLink: "",
//                 videoLength: "",
//                 pdf_title: "",
//                 pdf_link: "",
//             };
//             const updatedSections = [...courseContentData];
//             updatedSections[sectionIndex].content.push(newContent);
//             setCourseContentData(updatedSections);
//         }
//     };
//     const handleCollapseToggle = (index: number) => {
//         const updatedCollapsed = [...isCollapsed];
//         updatedCollapsed[index] = !updatedCollapsed[index];
//         setCollapsed(updatedCollapsed);
//     };
//     const { id } = useParams();
//     const handleSubmit = async () => {
//         try {
//             const combinedData = {
//                 courseId: id,
//                 courseContent: [...courseContentData],
//             };
//             console.log(combinedData);
//             const response = await fetch(
//                 `http://localhost:3000/api/v1/upload-video/${id}`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(combinedData),
//                 }
//             );
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             const responseData = await response.json();
//             if (responseData) {
//                 Swal.fire({
//                     title: "Good job!",
//                     text: "Lecture upload success!",
//                     icon: "success",
//                 });
//             }
//         } catch (error) {
//             console.error("Error posting data:", error);
//         }
//     };
//     return (
//         <div>
//             {courseContentData.map((section: any, sectionIndex: number) => (
//                 <div key={sectionIndex} className="mt-5">
//                     <div className="bg  p-[1px] rounded-lg">
//                         <div className="w-full flex justify-between bg-[#120f29] p-4 rounded-lg">
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     className="text-[20px] w-min cursor-pointer bg-[#120f29] text-white py-2 px-2 outline-none"
//                                     value={section.subject}
//                                     onChange={(e) => {
//                                         const updatedData = [...courseContentData];
//                                         updatedData[sectionIndex].subject = e.target.value;
//                                         setCourseContentData(updatedData);
//                                     }}
//                                 />
//                                 <label htmlFor="section_title">
//                                     <FaPencilAlt className="cursor-pointer text-white " />
//                                 </label>
//                             </div>
//                             <AiOutlineDelete
//                                 className="text-white text-[20px] cursor-pointer"
//                                 onClick={() => handleRemoveSection(sectionIndex)}
//                             />
//                         </div>
//                         {section.content.map((item: any, contentIndex: number) => (
//                             <div
//                                 key={contentIndex}
//                                 className="w-full bg-[#120f29] p-4 rounded-lg mt-[1px]"
//                             >
//                                 <div className="flex justify-between items-center">
//                                     <p className="text-white">{item.title}</p>
//                                     <div className="flex items-center gap-2">
//                                         <AiOutlineDelete
//                                             className="text-white text-[20px] cursor-pointer"
//                                             onClick={() => {
//                                                 const updatedData = [...courseContentData];
//                                                 updatedData[sectionIndex].content.splice(
//                                                     contentIndex,
//                                                     1
//                                                 );
//                                                 setCourseContentData(updatedData);
//                                             }}
//                                         />
//                                         <MdOutlineKeyboardArrowDown
//                                             className="text-white text-xl cursor-pointer"
//                                             onClick={() => handleCollapseToggle(contentIndex)}
//                                         />
//                                     </div>
//                                 </div>
//                                 {!isCollapsed[contentIndex] && (
//                                     <div>
//                                         <div className="flex flex-col gap-4 mt-5">
//                                             <label
//                                                 htmlFor="Video"
//                                                 className="text-white montserrat text-[18px] font-semibold"
//                                             >
//                                                 Video Title
//                                             </label>
//                                             <input
//                                                 onChange={(e) => {
//                                                     const updatedData = [...courseContentData];
//                                                     updatedData[sectionIndex].content[
//                                                         contentIndex
//                                                     ].title = e.target.value;
//                                                     setCourseContentData(updatedData);
//                                                 }}
//                                                 value={item.title}
//                                                 type="text"
//                                                 placeholder="Video Title "
//                                                 className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
//                                             />
//                                         </div>
//                                         <div className="flex flex-col gap-4 mt-5">
//                                             <label
//                                                 htmlFor="Video"
//                                                 className="text-white montserrat font-semibold text-lg"
//                                             >
//                                                 Video URL
//                                             </label>
//                                             <input
//                                                 onChange={(e) => {
//                                                     const updatedData = [...courseContentData];
//                                                     updatedData[sectionIndex].content[
//                                                         contentIndex
//                                                     ].videoUrl = e.target.value;
//                                                     setCourseContentData(updatedData);
//                                                 }}
//                                                 value={item.videoUrl}
//                                                 type="text"
//                                                 placeholder="Video Url"
//                                                 className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
//                                             />
//                                         </div>
//                                         <div className="flex flex-col gap-4 mt-5">
//                                             <label
//                                                 htmlFor="Video"
//                                                 className="text-white montserrat font-semibold text-lg"
//                                             >
//                                                 Video Length (in Minutes)
//                                             </label>
//                                             <input
//                                                 onChange={(e) => {
//                                                     const updatedData = [...courseContentData];
//                                                     updatedData[sectionIndex].content[
//                                                         contentIndex
//                                                     ].videoLength = e.target.value;
//                                                     setCourseContentData(updatedData);
//                                                 }}
//                                                 value={item.videoLength}
//                                                 type="text"
//                                                 placeholder="Video Length"
//                                                 className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
//                                             />
//                                         </div>
//                                         {/* Links */}
//                                         <div className="mb-3 block">
//                                             <div>
//                                                 <div className="flex flex-col gap-4 mt-2">
//                                                     <label
//                                                         htmlFor="Video"
//                                                         className="text-white montserrat font-semibold text-lg"
//                                                     >
//                                                         Class Pdf
//                                                     </label>
//                                                     <input
//                                                         value={item.pdf_title}
//                                                         onChange={(e) => {
//                                                             const updatedData = [...courseContentData];
//                                                             updatedData[sectionIndex].content[
//                                                                 contentIndex
//                                                             ].pdf_title = e.target.value;
//                                                             setCourseContentData(updatedData);
//                                                         }}
//                                                         placeholder="Title"
//                                                         type="text"
//                                                         className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
//                                                     />
//                                                     <input
//                                                         value={item.pdf_link}
//                                                         onChange={(e) => {
//                                                             const updatedData = [...courseContentData];
//                                                             updatedData[sectionIndex].content[
//                                                                 contentIndex
//                                                             ].pdf_link = e.target.value;
//                                                             setCourseContentData(updatedData);
//                                                         }}
//                                                         placeholder="Pdf Link"
//                                                         type="url"
//                                                         className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <p
//                                                 className="flex cursor-pointer text-white items-center text-[18px]"
//                                                 onClick={() => newContentHandler(sectionIndex)}
//                                             >
//                                                 <AiOutlinePlusCircle className="mr-2 text-white montserrat font-semibold text-lg " />
//                                                 Add New Content
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//             <div
//                 className="flex items-center cursor-pointer text-white"
//                 onClick={AddNewSection}
//             >
//                 <AiOutlinePlusCircle className="mr-2" />
//                 Add Section Here
//             </div>
//             <div className="flex justify-between items-center">
//                 <input
//                     type="submit"
//                     onClick={() => setActive(active - 1)}
//                     value="Prev"
//                     className="btn w-[180px]"
//                 />
//                 <input
//                     type="submit"
//                     onClick={handleSubmit}
//                     value="Submit"
//                     className="btn w-[180px]"
//                 />
//             </div>
//         </div>
//     );
// };

// export default Demo;
