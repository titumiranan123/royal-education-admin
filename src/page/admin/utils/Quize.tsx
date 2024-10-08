/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useMemo } from "react";
import Swal from "sweetalert2";
import api from "../../../redux/api/api";
import JoditEditor from "jodit-react";
import useExam from "../../../hook/useExam";

const QuizForm = ({ examId }: any) => {
  const [question_text, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [answer, setAnswer] = useState("");
 const { data, refetch } = useExam(examId);

  const handleOptionChange = (index: any, value: any) => {
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
    api
      .post("/api/v1/insert-mcq", data)
      .then((_response) => {
        refetch()
        Swal.fire("MCQ uploaded!", "", "success");
      })
      .catch((_error) => {
        Swal.fire(`Failed to upload MCQ`, "", "error");
      });

    setQuestion("");
    setOptions(["", "", "", "", ""]);
    setAnswer("");
  };

  // Jodit Editor Configuration for both Question and Options
  const editor = useRef(null);
  const placeholder = "Enter your question here...";
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      height: 200,
      toolbarAdaptive: false,
      toolbarSticky: false,
    }),
    [placeholder]
  );
  
    const optionConfig = useMemo(
      () => ({
        readonly: false, // Enables editing
        placeholder: "Enter your content here...",
        height: 300, // Set editor height
        toolbarSticky: false, // Prevent sticky toolbar
        toolbarAdaptive: false, // Make the toolbar not adaptive
        buttons: [
          "bold",
          "italic",
          "underline",
          "superscript",
          "subscript",
          "|", // Added superscript and subscript
          "ul",
          "ol",
          "|",
          "left",
          "center",
          "right",
        ], // Toolbar buttons
        buttonsXS: ["bold", "italic", "superscript", "subscript"], // Buttons on smaller screens
      }),
      []
    );


  return (
    <div className="z-50 flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-60 max-w-[1100px] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full ">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create a Quiz Question
        </h1>
        <div className="flex justify-between items-center">
          <p className="text-2xl text-gray-800 font-bold">{data?.exam_name}</p>
          <p className="text-xl text-gray-800 font-bold flex gap-2">
            Total Question:
            <span>
              {data?.totalInsert}/{data?.totalQuestion}
            </span>
          </p>
        </div>

        {/* Question Input */}
        <div className="mb-6 ">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Question:
          </label>
          <div className="border question border-gray-300 rounded-md  bg-gray-50 h-[300px] transition duration-150 ease-in-out">
            <JoditEditor
              ref={editor}
              value={question_text}
              config={config}
              onBlur={(newContent) => setQuestion(newContent)}
              onChange={(newContent) => setQuestion(newContent)}
            />
          </div>
        </div>

        {/* Options Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Options:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((option, index) => (
              <div key={index} className="flex  gap-2">
                <span className="font-bold text-gray-700">
                  {optionLabels[index]}.
                </span>
                <div className="border optionsarea border-gray-300 rounded-md bg-gray-50 transition duration-150 ease-in-out">
                  <JoditEditor
                    ref={editor}
                    value={option}
                    config={optionConfig}
                    onBlur={(newContent) =>
                      handleOptionChange(index, newContent)
                    }
                    onChange={(newContent) =>
                      handleOptionChange(index, newContent)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Correct Answer:
          </label>
          <select
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
          >
            <option value="" disabled>
              Select the correct answer
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {optionLabels[index]}:{" "}
                <div dangerouslySetInnerHTML={{ __html: option }} />
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={uploadMcq}
          >
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
