/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
interface cardprop {
    item: any;
    contentIndex: any;
    courseContentData: any;
    setCourseContentData: any;
    sectionIndex: any;
    newContentHandler: any;
    subject_id: string
}
const SubjectCard: React.FC<cardprop> = ({ item, contentIndex, courseContentData, setCourseContentData, sectionIndex, newContentHandler, subject_id }) => {

    const handleSubmit = async () => {
        try {
            const combinedData = { subject_id, ...item }
            console.log(combinedData);
            const response = await fetch(
                `http://localhost:3000/api/v1/course-content`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(combinedData),
                }
            );
            const responseData = await response.json();
            if (responseData) {
                Swal.fire({
                    title: "Good job!",
                    text: "Lecture upload success!",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };
    return (
        <div>

            <div>
                <div className="flex flex-col gap-4 mt-5">
                    <label
                        htmlFor="Video"
                        className="text-white montserrat text-[18px] font-semibold"
                    >
                        Video Title
                    </label>
                    <input
                        onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[sectionIndex].subject_content[
                                contentIndex
                            ].video_title = e.target.value;
                            setCourseContentData(updatedData);
                        }}
                        value={item.video_title}
                        type="text"
                        placeholder="Video Title "
                        className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                    />
                </div>
                <div className="flex flex-col gap-4 mt-5">
                    <label
                        htmlFor="Video"
                        className="text-white montserrat font-semibold text-lg"
                    >
                        Video URL
                    </label>
                    <input
                        onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[sectionIndex].subject_content[
                                contentIndex
                            ].video_link = e.target.value;
                            setCourseContentData(updatedData);
                        }}
                        value={item.video_link}
                        type="text"
                        placeholder="Video Url"
                        className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                    />
                </div>
                <div className="flex flex-col gap-4 mt-5">
                    <label
                        htmlFor="Video"
                        className="text-white montserrat font-semibold text-lg"
                    >
                        Video Length (in Minutes)
                    </label>
                    <input
                        onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[sectionIndex].subject_content[
                                contentIndex
                            ].video_duration = e.target.value;
                            setCourseContentData(updatedData);
                        }}
                        value={item.video_duration}
                        type="text"
                        placeholder="Video Length"
                        className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                    />
                </div>
                {/* Links */}
                <div className="mb-3 block">
                    <div>
                        <div className="flex flex-col gap-4 mt-2">
                            <label
                                htmlFor="Video"
                                className="text-white montserrat font-semibold text-lg"
                            >
                                Class Pdf
                            </label>
                            <input
                                value={item.pdf_title}
                                onChange={(e) => {
                                    const updatedData = [...courseContentData];
                                    updatedData[sectionIndex].subject_content[
                                        contentIndex
                                    ].pdf_title = e.target.value;
                                    setCourseContentData(updatedData);
                                }}
                                placeholder="Title"
                                type="text"
                                className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                            />
                            <input
                                value={item.pdf_link}
                                onChange={(e) => {
                                    const updatedData = [...courseContentData];
                                    updatedData[sectionIndex].subject_content[
                                        contentIndex
                                    ].pdf_link = e.target.value;
                                    setCourseContentData(updatedData);
                                }}
                                placeholder="Pdf Link"
                                type="url"
                                className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                            />
                        </div>
                    </div>
                </div>
                <button className="mr-2 flex gradient-button py-2 px-4  text-white montserrat font-semibold text-lg " onClick={handleSubmit}>Publish Video</button>
                <div>
                    <p
                        className="flex cursor-pointer text-white items-center text-[18px]"
                        onClick={() => newContentHandler(sectionIndex)}
                    >
                        <AiOutlinePlusCircle className="mr-2 text-white montserrat font-semibold text-lg " />
                        Add New Content
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SubjectCard;