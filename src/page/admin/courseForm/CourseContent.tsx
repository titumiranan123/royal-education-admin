/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useCourse from "../../../hook/useCourse";
import { Course } from "../Interface/Courseinterface";
import CourseContentcard from "./CourseContentcard";
import CoursesExam from "./CoursesExam";
import api from "../../../redux/api/api";

const CourseContent: React.FC = () => {
    const { id: courseId } = useParams();
    const { data, refetch } = useCourse();
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
    // const [selectedSubjectName, setSelectedSubjectName] = useState("");
    // const [classNumber, setClassNumber] = useState(1);


    useEffect(() => {
        const course = data?.find((p: Course) => p.id === courseId);

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
    }, [data, courseId]);

    const addNewSection = () => {
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
            console.log(updatedContentData)
            // Reset form fields after update
            resetModalFields();

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
                refetch()
                Swal.fire(
                    'Deleted!',
                    'Your video has been deleted.',
                    'success'
                );
            }
            else{
                 Swal.fire(
                   "Cancel Delete!",
                   "",
                   "error"
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
        // setSelectedSubjectName(courseContentData[sectionIndex].subject_name);

    };

    const resetModalFields = () => {
        setVideoTitle("");
        setVideoLink("");
        setVideoDuration("");
        setPdfTitle("");
        setPdfLink("");
    };

    // const handleAddVideoClick = (sectionIndex: number) => {
    //     resetModalFields();
    //     // const section = courseContentData[sectionIndex];
    //     setSelectedSection(sectionIndex);
    //     // setSelectedSubjectName(section.subject_name);
    //     // setClassNumber(section.subject_content.length + 1);
    //     setIsModalOpen(true);
    // };

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
    const upLoadVideo = (id: any) => {
        Swal.fire({
          title: "Update/Upload Video",
          html: `
        <div class="swal2-content ">
          <div class="mb-4">
            <label for="videoTitle" class="block text-white montserrat text-[18px] font-semibold">Video Title</label>
            <input
              id="videoTitle"
              type="text"
              placeholder="Video Title"
              class="py-2 px-2 border border-gray-300 rounded-lg w-full text-gray-700"
            />
          </div>
          <div class="mb-4">
            <label for="videoLink" class="block text-white montserrat text-[18px] font-semibold">Video Link</label>
            <input
              id="videoLink"
              type="text"
          
              placeholder="Video Link"
              class="py-2 px-2 border border-gray-300 rounded-lg w-full text-gray-700"
            />
          </div>
          <div class="mb-4">
            <label for="videoDuration" class="block text-white montserrat text-[18px] font-semibold">Video Duration</label>
            <input
              id="videoDuration"
              type="text"
    
              placeholder="Video Duration (minutes)"
              class="py-2 px-2 border border-gray-300 rounded-lg w-full text-gray-700"
            />
          </div>
          <div class="mb-4">
            <label for="pdfTitle" class="block text-white montserrat text-[18px] font-semibold">PDF Title</label>
            <input
              id="pdfTitle"
              type="text"
          
              placeholder="PDF Title"
              class="py-2 px-2 border text-gray-700 border-gray-300 rounded-lg w-full"
            />
          </div>
          <div class="mb-4">
            <label for="pdfLink" class="block text-white montserrat text-[18px] font-semibold">PDF Link</label>
            <input
              id="pdfLink"
              type="text"
          
              placeholder="PDF Link"
              class="py-2 px-2 border text-gray-700 border-gray-300 rounded-lg w-full"
            />
          </div>
        </div>
      `,
          showCancelButton: true,
          confirmButtonText: "Upload",
          cancelButtonText: "Cancel",
          preConfirm: () => {
            const videoTitle = (
              document.getElementById("videoTitle") as HTMLInputElement
            ).value;
            const videoLink = (
              document.getElementById("videoLink") as HTMLInputElement
            ).value;
            const videoDuration = (
              document.getElementById("videoDuration") as HTMLInputElement
            ).value;
            const pdfTitle = (
              document.getElementById("pdfTitle") as HTMLInputElement
            ).value;
            const pdfLink = (
              document.getElementById("pdfLink") as HTMLInputElement
            ).value;
            const info = {
              subject_id: id,
              video_title: videoTitle,
              video_link: videoLink,
              video_duration: videoDuration,
              pdf_title: pdfTitle,
              pdf_link: pdfLink,
            };

             api.post("/api/v1/course-content", info)
               .then((_response) => {

                  refetch();
                  Swal.fire("Video  upload!", "", "success");
              
               })
               .catch((_error) => {
                 Swal.fire(`Failed to Video upload`, "", "error");
               });
      
          
            setVideoTitle(videoTitle);
            setVideoLink(videoLink);
            setVideoDuration(videoDuration);
            setPdfTitle(pdfTitle);
            setPdfLink(pdfLink);

            handleVideoUpdate();
          },
        });
        console.log(id)
    }

    return (
        <div className="flex p-4 gap-5 ">
            <div className="w-1/2 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-white montserrat mb-4">Course Video</h2>
                {courseContentData.map((section: any, sectionIndex: number) => (
                    <div key={sectionIndex} className=" mb-4 p-2 bg-gray-900 rounded-lg shadow-md">
                        <div className="flex p-2 justify-between items-center">
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
                                    <AiOutlineEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDeleteSection(sectionIndex)}
                                    className="text-red-500 hover:text-red-700 montserrat"
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </div>
                        </div>
                        {section.isExpanded && (
                            <div className="pl-2">
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
                                    onClick={() => upLoadVideo(section.subject_id)}
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

            <div className="w-1/2">
                <CoursesExam id={courseId as string} />
            </div>



        </div>
    );
};

export default CourseContent;
