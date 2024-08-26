/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useCourse from "../../../hook/useCourse";
import { Course } from "../Interface/Courseinterface";
import CourseContentcard from "./CourseContentcard";

const CourseContent: React.FC = () => {
    const { id } = useParams();
    const { data } = useCourse();
    const [courseContentData, setCourseContentData] = useState([
        {
            subject_id: '',
            subject_name: "Section 1",
            subject_content: [
                {
                    video_title: "",
                    video_link: "",
                    video_duration: "",
                    pdf_title: "",
                    pdf_link: "",
                },
            ],
            isExpanded: false, // Initially expanded
        },
    ]);
    const [selectedSection, setSelectedSection] = useState<number | null>(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [videoDuration, setVideoDuration] = useState("");
    const [pdfTitle, setPdfTitle] = useState("");
    const [pdfLink, setPdfLink] = useState("");
    const [selectedSubjectName, setSelectedSubjectName] = useState("");
    const [classNumber, setClassNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const course = data?.find((p: Course) => p.id === id);

        if (course) {
            const initialData = course.course_content.map((subject: any) => ({
                subject_id: subject.id,
                subject_name: subject.subject_name ? subject.subject_name : "Section 1",
                subject_content: subject.subject_content.length > 0
                    ? subject.subject_content.map((content: any) => ({
                        video_title: content.video_title,
                        video_link: content.video_link,
                        video_duration: content.video_duration,
                        pdf_title: content.pdf_title,
                        pdf_link: content.pdf_link,
                    }))
                    : [
                        {
                            video_title: "",
                            video_link: "",
                            video_duration: "",
                            pdf_title: "",
                            pdf_link: "",
                        },
                    ],
                isExpanded: true, // Initially expanded
            }));
            setCourseContentData(initialData);
        }
    }, [data, id]);

    const addNewSection = () => {
        const lastSection = courseContentData[courseContentData.length - 1];
        if (
            lastSection.subject_content[0].video_title === "" ||
            lastSection.subject_content[0].video_link === ""
        ) {
            alert("Please fill all fields in the current section before adding a new one.");
        } else {
            const newSection = {
                subject_id: '',
                subject_name: `Section ${courseContentData.length + 1}`,
                subject_content: [
                    {
                        video_title: "",
                        video_link: "",
                        video_duration: "",
                        pdf_title: "",
                        pdf_link: "",
                    },
                ],
                isExpanded: true, // Initially expanded
            };
            setCourseContentData([...courseContentData, newSection]);
        }
    };

    const handleVideoUpdate = () => {
        if (selectedSection !== null && selectedVideoIndex !== null) {
            const updatedContentData = courseContentData.map((section, index) => {
                if (index === selectedSection) {
                    const updatedContent = section.subject_content.map((content, idx) => {
                        if (idx === selectedVideoIndex) {
                            return {
                                video_title: videoTitle,
                                video_link: videoLink,
                                video_duration: videoDuration,
                                pdf_title: pdfTitle,
                                pdf_link: pdfLink,
                            };
                        }
                        return content;
                    });
                    return {
                        ...section,
                        subject_content: updatedContent,
                    };
                }
                return section;
            });
            setCourseContentData(updatedContentData);
            // Reset form fields after update
            setVideoTitle("");
            setVideoLink("");
            setVideoDuration("");
            setPdfTitle("");
            setPdfLink("");
            setSelectedVideoIndex(null);
            setIsModalOpen(false);
        }
    };

    const handleDeleteSection = (index: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedContentData = courseContentData.filter((_, i) => i !== index);
                setCourseContentData(updatedContentData);
                Swal.fire(
                    'Deleted!',
                    'Your section has been deleted.',
                    'success'
                );
            }
        });
    };

    const handleDeleteVideo = (sectionIndex: number, videoIndex: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedContentData = courseContentData.map((section, index) => {
                    if (index === sectionIndex) {
                        return {
                            ...section,
                            subject_content: section.subject_content.filter((_, i) => i !== videoIndex),
                        };
                    }
                    return section;
                });
                setCourseContentData(updatedContentData);
                Swal.fire(
                    'Deleted!',
                    'Your video has been deleted.',
                    'success'
                );
            }
        });
    };

    const handleSelectVideo = (sectionIndex: number, videoIndex: number) => {
        const selectedVideo = courseContentData[sectionIndex].subject_content[videoIndex];
        setSelectedSection(sectionIndex);
        setSelectedVideoIndex(videoIndex);
        setVideoTitle(selectedVideo.video_title);
        setVideoLink(selectedVideo.video_link);
        setVideoDuration(selectedVideo.video_duration);
        setPdfTitle(selectedVideo.pdf_title);
        setPdfLink(selectedVideo.pdf_link);
        setSelectedSubjectName(courseContentData[sectionIndex].subject_name);
        setIsModalOpen(true);
    };

    const handleAddVideoClick = (sectionIndex: number) => {
        const section = courseContentData[sectionIndex];
        setSelectedSection(sectionIndex);
        setSelectedSubjectName(section.subject_name);
        setClassNumber(section.subject_content.length + 1);
        setIsModalOpen(true);
    };

    const toggleSection = (index: number) => {
        const updatedContentData = courseContentData.map((section, i) => {
            if (i === index) {
                return {
                    ...section,
                    isExpanded: !section.isExpanded,
                };
            }
            return section;
        });
        setCourseContentData(updatedContentData);
    };

    return (
        <div className="flex p-4">
            <div className="w-1/3 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-white montserrat mb-4">Course Sections</h2>
                {courseContentData.map((section: any, sectionIndex: number) => (
                    <div key={sectionIndex} className="mb-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center cursor-pointer montserrat text-purple-500 hover:text-purple-700" onClick={() => toggleSection(sectionIndex)}>
                                {section.isExpanded ? (
                                    <AiOutlineMinusCircle className="mr-2 text-2xl" />
                                ) : (
                                    <AiOutlinePlusCircle className="mr-2 text-2xl" />
                                )}
                                <h3 className="text-lg font-semibold montserrat">{section.subject_name}</h3>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSelectedSection(sectionIndex)}
                                    className="text-[#b336ec] hover:text-[#ad11f5] montserrat"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteSection(sectionIndex)}
                                    className="text-red-500 hover:text-red-700 montserrat"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        {section.isExpanded && (
                            <div className="pl-4">
                                {section.subject_content.map((video: any, videoIndex: number) => (
                                    <div key={videoIndex} className="mb-2">
                                        <CourseContentcard
                                            handleSelectVideo={() => handleSelectVideo(sectionIndex, videoIndex)}
                                            handleDeleteVideo={() => handleDeleteVideo(sectionIndex, videoIndex)}
                                            content={video}
                                            index={videoIndex + 1}
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddVideoClick(sectionIndex)}
                                    className="mt-2 w-full bg-[#7710ec] text-white py-2 rounded-lg bg-opacity-70 hover:bg-opacity-100 montserrat"
                                >
                                    Add Video
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                <div
                    className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 montserrat mt-4"
                    onClick={addNewSection}
                >
                    <AiOutlinePlusCircle className="mr-2 text-2xl" />
                    <span className="text-lg">Add Section Here</span>
                </div>
            </div>
            <div className="w-1/3 pl-4">
                <div className="p-4 rounded-lg shadow-md">
                    {selectedSubjectName && (
                        <h2 className="text-xl text-white montserrat font-bold mb-4">
                            {selectedSubjectName} - Class {classNumber}
                        </h2>
                    )}
                    <h2 className="text-xl font-bold mb-4 text-white montserrat">Update/Upload Video</h2>
                    <div className="mb-4">
                        <label htmlFor="Video" className="text-white montserrat text-[18px] font-semibold">Video Title</label>
                        <input
                            type="text"
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                            placeholder="Video Title"
                            className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-white montserrat text-[18px] font-semibold">Video Link</label>
                        <input
                            type="text"
                            value={videoLink}
                            placeholder="Video Link"
                            onChange={(e) => setVideoLink(e.target.value)}
                            className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-white montserrat text-[18px] font-semibold">Video Duration</label>
                        <input
                            type="text"
                            value={videoDuration}
                            placeholder="Video Duration (minutes)"
                            onChange={(e) => setVideoDuration(e.target.value)}
                            className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-white montserrat text-[18px] font-semibold">PDF Title</label>
                        <input
                            type="text"
                            value={pdfTitle}
                            placeholder="PDF Title"
                            onChange={(e) => setPdfTitle(e.target.value)}
                            className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-white montserrat text-[18px] font-semibold">PDF Link</label>
                        <input
                            type="text"
                            value={pdfLink}
                            placeholder="PDF Link"
                            onChange={(e) => setPdfLink(e.target.value)}
                            className="py-2 px-2 bg-[#343335] outline-none text-white montserrat rounded-lg w-full"
                        />
                    </div>
                    <button
                        onClick={handleVideoUpdate}
                        className="gradient-button py-2 px-4 text-white w-full flex justify-center items-center montserrat font-semibold text-lg"
                    >
                        Update/Upload Video
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-1/3">
                        <h2 className="text-xl font-bold mb-4 montserrat">Update/Upload Video</h2>
                        <div className="mb-4">
                            <label htmlFor="Video" className="block text-gray-700 montserrat text-[18px] font-semibold">Video Title</label>
                            <input
                                type="text"
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                placeholder="Video Title"
                                className="py-2 px-2 border border-gray-300 rounded-lg w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 montserrat text-[18px] font-semibold">Video Link</label>
                            <input
                                type="text"
                                value={videoLink}
                                placeholder="Video Link"
                                onChange={(e) => setVideoLink(e.target.value)}
                                className="py-2 px-2 border border-gray-300 rounded-lg w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 montserrat text-[18px] font-semibold">Video Duration</label>
                            <input
                                type="text"
                                value={videoDuration}
                                placeholder="Video Duration (minutes)"
                                onChange={(e) => setVideoDuration(e.target.value)}
                                className="py-2 px-2 border border-gray-300 rounded-lg w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 montserrat text-[18px] font-semibold">PDF Title</label>
                            <input
                                type="text"
                                value={pdfTitle}
                                placeholder="PDF Title"
                                onChange={(e) => setPdfTitle(e.target.value)}
                                className="py-2 px-2 border border-gray-300 rounded-lg w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 montserrat text-[18px] font-semibold">PDF Link</label>
                            <input
                                type="text"
                                value={pdfLink}
                                placeholder="PDF Link"
                                onChange={(e) => setPdfLink(e.target.value)}
                                className="py-2 px-2 border border-gray-300 rounded-lg w-full"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg montserrat"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVideoUpdate}
                                className="bg-[#7710ec] text-white py-2 px-4 rounded-lg montserrat"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseContent;
