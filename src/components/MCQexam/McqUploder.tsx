/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../redux/api/api";

interface Option {
  id: number;
  option: string;
}
interface mcqprop {
  subject: string;
}

const McqUploader: React.FC<mcqprop> = ({ subject }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { id: 1, option: "" },
    { id: 2, option: "" },
    { id: 3, option: "" },
    { id: 4, option: "" },
  ]);

  const handleOptionChange = (id: number, text: string) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, option: text } : option
      )
    );
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, { id: options.length + 1, option: "" }]);
    }
  };
  const [answerId, setAnswerId] = useState<number | null>(null);
  const removeOption = (id: number) => {
    setOptions(options.filter((option) => option.id !== id));
  };
  const { id } = useParams();
  
  const handleSubmit = async () => {
    // Handle form submission, e.g., send data to server

    const data = {
      subject: subject,
      question: question,
      options: options,
    };
    console.log(data)
    try {
      const response = await api.post(`/api/v1/exam/${id}`, data);
       console.log(response);
      if (response) {

        Swal.fire({
          title: "Good job!",
          text: "MCQ Create Success!",
          icon: "success",
        });
      }
    } catch (_error) {
       Swal.fire({
         title: "Try again!",
         icon: "error",
       });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-[#1d1d1d] shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 montserrat gradient-text">
        Upload MCQ
      </h2>
      <div className="mb-4">
        <label className="block text-lg  font-semibold montserrat text-white">
          Question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="py-2 px-2 bg-[#343335] text-white montserrat outline-none rounded-lg w-full mt-1"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block montserrat text-lg font-semibold text-white ">
          Options
        </label>
        {options.map((option) => (
          <div key={option.id} className="flex items-center mb-2">
            <textarea
              value={option.option}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className="py-2 px-2 bg-[#343335] text-white montserrat outline-none rounded-lg w-full mt-1"
            />
            {options.length > 4 && (
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                className="ml-2 p-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {options.length < 5 && (
          <button
            type="button"
            onClick={addOption}
            className="mt-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Add Option
          </button>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Answer
        </label>
        <select
          value={answerId ?? ""}
          onChange={(e) => setAnswerId(Number(e.target.value))}
          className="mt-1 block w-full p-2  bg-[#343335] text-white  rounded-md shadow-sm "
        >
          <option value="" disabled>
            Select the correct answer
          </option>
          {options.map((option) => (
            <option className="text-white" key={option.id} value={option.id}>
              {option.option}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full p-2 bg text-white rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default McqUploader;
