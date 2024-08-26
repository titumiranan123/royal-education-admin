// MultiStepForm.tsx

import React, { useState } from "react";

interface FormData {
  courseTitle: string;
  courseDescription: string;
  courseVideo: File | null;
  mcqExam: File | null;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    courseTitle: "",
    courseDescription: "",
    courseVideo: null,
    mcqExam: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="min-h-screen">
            <h2 className="text-white">Course Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="courseTitle" className="text-white">
                  Course Title:
                </label>
                <input
                  type="text"
                  id="courseTitle"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="courseDescription" className="text-white mt-4">
                  Course Description:
                </label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={formData.courseDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="courseDescription" className="text-white mt-4">
                  Course Piture:
                </label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={formData.courseDescription}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  className="btn mt-10"
                  type="button"
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="min-h-screen ">
            <h2 className="text-white font-bold text-2xl">
              Course Video Upload
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 ">
                <label htmlFor="courseVideo" className="text-white">
                  Upload Course Video:
                </label>
                <input
                  type="file"
                  id="courseVideo"
                  className="text-white"
                  name="courseVideo"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-between mt-10">
                <button
                  className="btn"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  Previous
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="min-h-screen">
            <h2 className="text-xl font-bold text-white">MCQ Exam Upload</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 flex-col">
                <label htmlFor="mcqExam" className="text-white">
                  Upload MCQ Exam:
                </label>
                <input
                  type="file"
                  id="mcqExam"
                  className=""
                  name="mcqExam"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-between items-center mt-10">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setStep(2)}
                >
                  Previous
                </button>
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="max-w-[1240px] mx-auto pt-10">{renderStep()}</div>;
};

export default MultiStepForm;
