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
import Loader from "../../../components/utils/Lodder";

const CourseContent: React.FC = () => {
    const { id: courseId } = useParams();
    const { data, refetch,isLoading } = useCourse();
    const [courseContentData, setCourseContentData] = useState([
        {
            subject_id: '',
            subject_name: "Section 1",
            subject_content: [
                {
                    id:'',
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



    useEffect(() => {
        const course = data?.find((p: Course) => p?.id === courseId);
        if (course) {
            const initialData = course?.course_content?.map((subject: any) => ({
                subject_id: subject?.id,
                subject_name: subject?.subject_name ? subject?.subject_name : "Section 1",
                subject_content: subject?.subject_content?.length > 0
                    ? subject?.subject_content?.map((content: any) => ({
                        id:content?.id,
                        video_title: content?.video_title,
                        video_link: content?.video_link,
                        video_duration: content?.video_duration,
                        pdf_title: content?.pdf_title,
                        pdf_link: content?.pdf_link,
                    }))
                    : [
                        {
                            id:"",
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


    const addNewSection = (id:string) => {
        const newSection = {
            subject_id: '',
            subject_name: `Section ${courseContentData?.length + 1}`,
            subject_content: [
                {
                    id:'',
                    video_title: "",
                    video_link: "",
                    video_duration: "",
                    pdf_title: "",
                    pdf_link: "",
                },
            ],
            isExpanded: true, // Initially expanded
        };
        const data = {
          subject_name: `Section ${courseContentData?.length + 1}`,
          course_id: id,
        };
        api.post("/api/v1/subject", data)
        .then((_res)=>{

           refetch();
           Swal.fire("subject created!", "", "success");
        })
        .catch((_err)=>{
 Swal.fire("subject create failed !", "", "error");
        })
        setCourseContentData([...courseContentData, newSection]);
    };

    const updateSubject = (subject: any, courseId:string) => {
      Swal.fire({
        title: "Update/Upload Video",
        html: `
        <div class="swal2-content ">
          <div class="mb-4">
            <label for="subjectName" class="block text-white montserrat text-[18px] font-semibold">Video Title</label>
            <input
              id="subjectName"
              type="text"
              placeholder="Video Title"
                 value="${subject.subject_name}" 
              class="py-2 px-2 border border-gray-300 rounded-lg w-full text-gray-700"
            />
          </div>
        
        </div>
      `,
        showCancelButton: true,
        confirmButtonText: "Upload",
        cancelButtonText: "Cancel",
        preConfirm: () => {
          const subject_name = (
            document.getElementById("subjectName") as HTMLInputElement
          ).value;

          const info = {
            id: subject.subject_id,
            course_id: courseId,
            subject_name: subject_name,
          };

          api
            .put(`/api/v1/subject/${subject.id}`, info)
            .then((_response) => {
              refetch();
              Swal.fire("Subject  updated !", "", "success");
            })
            .catch((_error) => {
              Swal.fire(`Failed to subject update`, "", "error");
            });
        },
      });
    };
const handleDeleteSection = (id: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      
      api
        .delete(`/api/v1/subject/${id}`)
        .then((_response) => {
        refetch()
          Swal.fire("Deleted!", "Your section has been deleted.", "success");
        })
        .catch((_err) => {
          
          Swal.fire("Failed to Delete!", "", "error");
        });
      
    }
  });
};
    const handleVideoUpdate = ( id: string,subject_id:string,video:any) => {
 
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
                 value="${video.video_title}" 
              class="py-2 px-2 border border-gray-300 rounded-lg w-full text-gray-700"
            />
          </div>
          <div class="mb-4">
            <label for="videoLink" class="block text-white montserrat text-[18px] font-semibold">Video Link</label>
            <input
              id="videoLink"
               value="${video.video_link}" 
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
       value="${video.video_duration}" 
              placeholder="Video Duration (minutes)"
              class="py-2 px-2 border border-gray-300 rounded-lg w-full text-gray-700"
            />
          </div>
          <div class="mb-4">
            <label for="pdfTitle" class="block text-white montserrat text-[18px] font-semibold">PDF Title</label>
            <input
              id="pdfTitle"
              type="text"
                   value="${video.pdf_title}" 
              placeholder="PDF Title"
              class="py-2 px-2 border text-gray-700 border-gray-300 rounded-lg w-full"
            />
          </div>
          <div class="mb-4">
            <label for="pdfLink" class="block text-white montserrat text-[18px] font-semibold">PDF Link</label>
            <input
              id="pdfLink"
              type="text"
               value="${video.pdf_link}" 
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
               id: id,
               subject_id: subject_id,
               video_title: videoTitle,
               video_link: videoLink,
               video_duration: videoDuration,
               pdf_title: pdfTitle,
               pdf_link: pdfLink,
             };

             api
               .put(`/api/v1/course-content-update/${id}`, info)
               .then((_response) => {
                 refetch();
                 Swal.fire("Video  updated !", "", "success");
               })
               .catch((_error) => {
                 Swal.fire(`Failed to Video update`, "", "error");
               });
           },
         });

    };

    const handleDeleteVideo = (
      sectionIndex: number,
      videoIndex: number,
      videoId: string
    ) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the delete API
          api.delete(`/api/v1/course-content-delete/${videoId}`)
            .then((response) => {
              console.log(response)
              const updatedContentData = courseContentData.map(
                (section, index) => {
                  if (index === sectionIndex) {
                    return {
                      ...section,
                      subject_content: section.subject_content.filter(
                        (_, i) => i !== videoIndex
                      ),
                    };
                  }
                  return section;
                }
              );
              setCourseContentData(updatedContentData);
              refetch(); // Optionally refetch any related data if necessary
              Swal.fire("Deleted!", "Your video has been deleted.", "success");
            })
            
            .catch((error) => {
              console.log(error)
              // Handle error
              Swal.fire("Error!", "Failed to delete video.", "error");
              console.error("Delete error:", error);
            });
        } else {
          Swal.fire("Cancel Delete!", "", "error");
        }
      });
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
      
          
            // setVideoTitle(videoTitle);
            // setVideoLink(videoLink);
            // setVideoDuration(videoDuration);
            // setPdfTitle(pdfTitle);
            // setPdfLink(pdfLink);

            // handleVideoUpdate();
          },
        });
        console.log(id)
    }

    if(isLoading){
      return <Loader />
    }
    return (
      <div className="flex p-4 gap-5 ">
        <div className="w-1/2 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-white montserrat mb-4">
            Course Video
          </h2>
          {courseContentData.map((section: any, sectionIndex: number) => (
            <div
              key={sectionIndex}
              className=" mb-4 p-2 bg-gray-900 rounded-lg shadow-md"
            >
              <div className="flex p-2 justify-between items-center">
                <div
                  className="flex items-center cursor-pointer montserrat text-purple-500 hover:text-purple-700"
                  onClick={() => toggleSection(sectionIndex)}
                >
                  {section.isExpanded ? (
                    <AiOutlineMinusCircle className="mr-2 text-2xl" />
                  ) : (
                    <AiOutlinePlusCircle className="mr-2 text-2xl" />
                  )}
                  <h3 className="text-lg font-semibold montserrat">
                    {section.subject_name}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      
                      updateSubject(section, courseId as string);
                    }}
                    className="text-[#b336ec] hover:text-[#ad11f5] montserrat"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.subject_id)}
                    className="text-red-500 hover:text-red-700 montserrat"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
              {section.isExpanded && (
                <div className="pl-2">
                  {section.subject_content.map(
                    (video: any, videoIndex: number) => (
                      <div key={videoIndex} className="mb-2">
                        <CourseContentcard
                          handleDeleteVideo={() =>
                            handleDeleteVideo(
                              sectionIndex,
                              videoIndex,
                              video.id
                            )
                          }
                          handleVideoUpdate={() => {
                        
                            handleVideoUpdate(
                              video.id,
                              section.subject_id,
                              video
                            );
                          }}
                          content={video}
                          index={videoIndex + 1}
                        />
                      </div>
                    )
                  )}
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
            onClick={() => addNewSection(courseId as string)}
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
