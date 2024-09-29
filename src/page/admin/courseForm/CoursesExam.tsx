/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import useCourse from '../../../hook/useCourse';
import { Course } from '../Interface/Courseinterface';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { MdOutlinePublishedWithChanges, MdOutlineUnpublished } from 'react-icons/md';
import api from '../../../redux/api/api';
import { Link } from 'react-router-dom';

interface Exam {
    id: string;
    subject_id: string;
    exam_name: string;
    time: string;
    exam_type: string;
    publish: number;
    questions: any[];
}

interface Subject {
    subject_id: string;
    subject_name: string;
    exam: Exam[];
    isExpanded: boolean;
}

interface Props {
    id: string;
}

const CoursesExam: React.FC<Props> = ({ id }) => {
    const { data, refetch } = useCourse();
  
    const [courseContentData, setCourseContentData] = useState<Subject[]>([]);

    useEffect(() => {
        const course = data?.find((p: Course) => p.id === id);
        if (course) {
            const initialData = course.course_content.map((subject: any) => ({
                subject_id: subject.id,
                subject_name: subject.subject_name || 'Section 1',
                exam: subject.exam.length > 0 ? subject.exam : [
                    {
                        id: '',
                        subject_id: subject.id,
                        exam_name: '',
                        time: '',
                        exam_type: '',
                        publish: 0,
                        questions: []
                    }
                ],
                isExpanded: true,
            }));
            setCourseContentData(initialData);
        }
    }, [data, id]);

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

    const handleCreateExam = (sectionIndex: string) => {
      Swal.fire({
        title: "Create Exam",
        html: `<div class="swal2-content">
        <input id="examName" class=" my-2 p-2 bg-gray-800 text-white rounded-lg w-[300px] focus:outline-none border-none" placeholder="Exam Name">
        <input id="examTime" class=" focus:outline-none border-none my-2 p-2 bg-gray-800 text-white rounded-lg w-[300px]" placeholder="Exam Time">
        
        <select id="examType" class="swal2-select swal-selects my-2 p-2 bg-gray-800 text-white rounded-lg w-[300px]">
          <option value="written">Written</option>
          <option value="mcq">MCQ</option>
        </select>
        
        <input id="totalQuestion" type="number" class="hidden my-2 p-2 bg-gray-800 outline-none text-white rounded-lg w-[300px]" placeholder="Total Questions">
      </div>`,
        focusConfirm: false,
        confirmButtonText: "Upload",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        didOpen: () => {
          const examTypeElement = document.getElementById(
            "examType"
          ) as HTMLSelectElement;
          const totalQuestionElement = document.getElementById(
            "totalQuestion"
          ) as HTMLInputElement;

          // Add event listener to show/hide the totalQuestion input based on examType selection
          examTypeElement.addEventListener("change", () => {
            if (examTypeElement.value === "mcq") {
              totalQuestionElement.classList.remove("hidden"); // Show the totalQuestion input for MCQ
            } else {
              totalQuestionElement.classList.add("hidden"); // Hide the totalQuestion input for other types
            }
          });
        },
        preConfirm: () => {
          const examName = (
            document.getElementById("examName") as HTMLInputElement
          ).value;
          const examTime = (
            document.getElementById("examTime") as HTMLInputElement
          ).value;
          const examType = (
            document.getElementById("examType") as HTMLSelectElement
          ).value;
          const totalQuestion = (
            document.getElementById("totalQuestion") as HTMLInputElement
          ).value;

          const data: any = {
            subject_id: sectionIndex,
            exam_name: examName,
            time: examTime,
            exam_type: examType,
            publish: false,
          };

          if (examType === "mcq") {
            data.totalQuestion = totalQuestion; // Add totalQuestion only for MCQ type
          }

          // API call to create the exam
          return api
            .post("/api/v1/create-exam", data)
            .then((_response) => {
              refetch();
              Swal.fire("Exam Created!", "", "success");
            })
            .catch((_error) => {
              refetch();
              Swal.fire("Exam Creation Failed!", "", "error");
            });
        },
      });
    };


    const handleUpdateExam = (sectionIndex: number, examIndex: number) => {
        const exam = courseContentData[sectionIndex].exam[examIndex];
        console.log(exam)
        Swal.fire({
            title: 'Update Exam',
            html:
                `<div class="swal2-content">
          <input id="examName" value="${exam.exam_name}" class=" my-2 p-2 bg-gray-800 text-white rounded-lg w-[300px] focus:outline-none border-none" placeholder="Exam Name">
          <input id="examTime" value="${exam.time}" class=" focus:outline-none border-none my-2 p-2 bg-gray-800 text-white rounded-lg w-[300px]" placeholder="Exam Time">
          <select id="examType" class="swal2-select my-2 p-2 bg-gray-800 text-white rounded-lg w-[300px]">
            <option value="written" ${exam.exam_type === 'written' ? 'selected' : ''}>Written</option>
            <option value="mcq" ${exam.exam_type === 'mcq' ? 'selected' : ''}>MCQ</option>
          </select>
        </div>`,
            focusConfirm: false,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const examName = (document.getElementById('examName') as HTMLInputElement).value;
                const examTime = (document.getElementById('examTime') as HTMLInputElement).value;
                const examType = (document.getElementById('examType') as HTMLSelectElement).value;
                const data = {
                  subject_id: exam.subject_id,
                  exam_name: examName,
                  time: examTime,
                  exam_type: examType,
                  publish: false,
                };

                 api
                   .put(`/api/v1/exam-update/${exam.id}`, data)
                   .then((_response) => {
                     refetch();
          
                     Swal.fire("Exam Updated!", "", "success");
                   })
                   .catch((_error) => {
                     Swal.fire("Exam Update Failed!", "", "error");
                   });
                
            }
        });
    };

    const handleUploadQuestion = (sectionIndex: number) => {
        Swal.fire({
            html:
                `
                <div class="swal2-content">
          <p class="text-white font-semibold montserrat text-[24px]"> Written Question File </p>
          <input id="writtenQuestionFile" class="my-2 p-2 bg-gray-800 text-white rounded-lg w-[300px] focus:outline-none border-none" placeholder="Written Question File">
        </div>
        `,
            focusConfirm: false,
            preConfirm: () => {
                const writtenQuestionFile = (document.getElementById('writtenQuestionFile') as HTMLInputElement).value;
                console.log(writtenQuestionFile, sectionIndex);
                Swal.fire('Question Created!', '', 'success');
            }
        });
    };
     const handleDeleteVideo = (
       examid: string
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
           api
             .delete(`/api/v1/exam-delete/${examid}`)
             .then((response) => {
               console.log(response);
               refetch(); // Optionally refetch any related data if necessary
               Swal.fire("Deleted!", "Your exam has been deleted.", "success");
             })

             .catch((error) => {
               Swal.fire("Error!", "Failed to delete exam.", "error");
               console.error("Delete error:", error);
             });
         } else {
           Swal.fire("Cancel Delete!", "", "error");
         }
       });
     };
   
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4">Course Exam</h2>
        {courseContentData.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="mb-4 bg-gray-900 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center px-4 py-2">
              <div
                className="flex items-center cursor-pointer text-purple-500 hover:text-purple-700"
                onClick={() => toggleSection(sectionIndex)}
              >
                {section.isExpanded ? (
                  <AiOutlineMinusCircle className="mr-2 text-2xl" />
                ) : (
                  <AiOutlinePlusCircle className="mr-2 text-2xl" />
                )}
                <h3 className="text-lg font-semibold">
                  {section.subject_name}
                </h3>
              </div>
            </div>
            {section.isExpanded && (
              <div className="px-4 py-2">
                {section.exam.length > 0 &&
                  section.exam.map((exam, examIndex) => (
                    <div
                      key={examIndex}
                      className="mb-2 flex justify-between items-center bg-gray-800 p-2 rounded-lg"
                    >
                      <div>
                        <h4 className="text-md font-semibold text-white">
                          {exam.exam_name}
                        </h4>
                        <p className="text-gray-400">Type: {exam.exam_type}</p>
                        <p className="text-gray-400">Time: {exam.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        {exam.exam_type !== "written" ? (
                          <Link
                            to={`/dashboard/course/insert-mcq/${exam.id}`}
                            className="text-yellow-500 hover:text-yellow-700"
                          >
                            Mcq Upload
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleUploadQuestion(sectionIndex)}
                            className="text-yellow-500 hover:text-yellow-700"
                          >
                            Questions Upload
                          </button>
                        )}
                        {exam.publish ? (
                          <button className="text-yellow-500 hover:text-yellow-700">
                            <MdOutlineUnpublished size={20} />
                          </button>
                        ) : (
                          <button className="text-slate-600 pointer-events-none">
                            <MdOutlinePublishedWithChanges size={20} />
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleUpdateExam(sectionIndex, examIndex)
                          }
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <AiOutlineEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(exam.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  onClick={() => handleCreateExam(section.subject_id as string)}
                  className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  Create Exam
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
};

export default CoursesExam;
