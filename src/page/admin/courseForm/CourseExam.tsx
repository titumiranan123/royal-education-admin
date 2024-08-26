// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useParams } from "react-router-dom";
// import useCourse from "../../../hook/useCourse";



// interface Subject {
//   id: string;
//   name: string;
// }

// interface Question {
//   id: number;
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

// const CourseExam: React.FC = () => {
//   const { id } = useParams();
//   const { data, isLoading } = useCourse();
//   const [course, setCourse] = useState<any | null>(null); // Use any for flexibility in course data
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState<string[]>(["", "", "", ""]);
//   const [correctAnswer, setCorrectAnswer] = useState("");

//   useEffect(() => {
//     if (data) {
//       const foundCourse = data.find((p: any) => p.id === id);
//       setCourse(foundCourse);

//       if (foundCourse) {
//         const initialSubjects = foundCourse.course_content.map((sub: any) => ({
//           id: sub.subject_id,
//           name: sub.subject_name,
//         }));
//         setSubjects(initialSubjects);
//       }
//     }
//   }, [data, id]);

//   const handleSubjectSelect = (subjectId: string) => {
//     setSelectedSubject(subjectId);
//     setQuestions([]); // Clear questions when selecting a new subject
//   };

//   const addQuestion = () => {
//     if (
//       questionText.trim() === "" ||
//       options.some((opt) => opt.trim() === "") ||
//       correctAnswer.trim() === ""
//     ) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Please fill out all fields for the question and options!",
//       });
//       return;
//     }

//     const newQuestion: Question = {
//       id: questions.length + 1,
//       question: questionText,
//       options: options.map((opt) => opt.trim()),
//       correctAnswer: correctAnswer.trim(),
//     };

//     setQuestions([...questions, newQuestion]);
//     // Clear fields after adding question
//     setQuestionText("");
//     setOptions(["", "", "", ""]);
//     setCorrectAnswer("");
//   };

//   const handleOptionChange = (index: number, value: string) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//   };

//   const handleRemoveQuestion = (questionId: number) => {
//     const updatedQuestions = questions.filter((q) => q.id !== questionId);
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmitExam = () => {
//     // Here you can submit exam details and questions to your backend or perform any necessary actions
//     console.log({
//       selectedSubject,
//       questions,
//     });
//     // Optionally, you can show a success message or navigate to another page
//     Swal.fire({
//       icon: "success",
//       title: "Exam Created!",
//       text: "Your exam has been successfully created.",
//     });
//     // Reset form after submission
//     setSelectedSubject(null);
//     setQuestions([]);
//   };

//   return (
//     <div className="container mx-auto p-4">

//       {subjects.map((subject) => (
//         <div key={subject.id} className="mb-4">
//           <h1 className="text-2xl font-bold mb-4">{subject.name}</h1>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">
//               Questions
//             </label>
//             <div className="space-y-4">
//               {selectedSubject === subject.id &&
//                 questions.map((question) => (
//                   <div key={question.id} className="p-4 border rounded-lg">
//                     <p className="font-bold mb-2">{question.question}</p>
//                     <ul className="list-disc list-inside">
//                       {question.options.map((option, index) => (
//                         <li
//                           key={index}
//                           className={
//                             option === question.correctAnswer
//                               ? "text-green-500"
//                               : ""
//                           }
//                         >
//                           {option}
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() => handleRemoveQuestion(question.id)}
//                       className="mt-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
//                     >
//                       Remove Question
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           {selectedSubject === subject.id && (
//             <div className="mb-4">
//               <label className="block text-gray-700 font-bold mb-2">
//                 Add New Question
//               </label>
//               <div className="space-y-2">
//                 <textarea
//                   value={questionText}
//                   onChange={(e) => setQuestionText(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg"
//                   placeholder="Enter question"
//                   rows={3}
//                 />
//                 {options.map((option, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                     className="w-full px-4 py-2 border rounded-lg"
//                     placeholder={`Option ${index + 1}`}
//                   />
//                 ))}
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Correct Answer</label>
//                   <input
//                     type="text"
//                     value={correctAnswer}
//                     onChange={(e) => setCorrectAnswer(e.target.value)}
//                     className="w-full px-4 py-2 border rounded-lg"
//                     placeholder="Enter correct answer"
//                   />
//                 </div>
//                 <button
//                   onClick={addQuestion}
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Add Question
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//       <button
//         onClick={handleSubmitExam}
//         className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
//       >
//         Create Exam
//       </button>
//     </div>
//   );
// };

// export default CourseExam;
import React from 'react';
import { useParams } from 'react-router-dom';
// import useCourse from '../../../hook/useCourse';

const CourseExam: React.FC = () => {
  const { id } = useParams()
  // const { data } = useCourse()

  console.log(id)
  return (
    <div>

    </div>
  );
};

export default CourseExam;
