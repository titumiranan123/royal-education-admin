/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../../redux/api/api";

const QuizForm = ({  examId }:any) => {
  const [question_text, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (index:any, value:any) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const optionLabels = ["A", "B", "C", "D", "E"];
  const uploadMcq = () => {
    const data = {
      question_text,
      options,
      answer,
      exam_id: examId,
    };
    api.post("/api/v1/insert-mcq", data)
      .then((_response) => {
    
        Swal.fire("Mcq  upload!", "", "success");
      })
      .catch((_error) => {
        Swal.fire(`Failed to mcq upload`, "", "error");
      });
    
    setQuestion("");
    setOptions(["", "", "", "", ""]);
    setAnswer("");
 
  };

  return (
    <div className="z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[800px] h-auto">
      
        <h1 className="text-2xl font-bold mb-4">Create a Quiz Question</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question:
          </label>
          <textarea
            value={question_text}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Options:
        </label>
        <div className="mb-4 grid grid-cols-2 gap-5">
          {options.map((option, index) => (
            <div key={index} className="mb-2 flex items-center">
              <span className="mr-2 font-bold">{optionLabels[index]}.</span>
              <textarea
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${optionLabels[index]}`}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Answer:
          </label>
          <select
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          >
            <option value="" disabled>
              Select correct answer
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {optionLabels[index]}: {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            type="button"
            onClick={() => uploadMcq()} // Replace with your save function
          >
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
