import React, { useState } from "react";
import Popup from "./Popup";



const MCQstore: React.FC = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showTitlePopup, setShowTitlePopup] = useState<boolean>(false);
  const [showSubjectPopup, setShowSubjectPopup] = useState<boolean>(false);

  const handleTitleCreate = (title: string) => {
    setTitles([...titles, title]);
    setShowTitlePopup(false);
  };

  const handleSubjectCreate = (subject: string) => {
    setSubjects([...subjects, subject]);
    setShowSubjectPopup(false);
  };

  return (
    <div>
      <div className="w-full py-3 px-5 h-[50px] rounded-2xl mt-10 bg flex justify-between">
        <div>Create Section</div>
        <div className="flex gap-4 text-white font-semibold montserrat">
          <div
            className="montserrat cursor-pointer flex justify-center items-center gap-2"
            onClick={() => setShowTitlePopup(true)}
          >
            <p>Create Title/Course</p>
          </div>
          <div
            className="montserrat cursor-pointer flex justify-center items-center gap-2"
            onClick={() => setShowSubjectPopup(true)}
          >
            <p>Create Subject</p>
          </div>
          <div className="montserrat cursor-pointer flex justify-center items-center gap-2">
            <p>Create MCQ</p>
          </div>
        </div>
      </div>
      {titles.map((title, index) => (
        <div
          key={index}
          className="w-full py-3 px-5  h-[50px] rounded-2xl mt-10 bg flex justify-between"
        >
          <div>{title}</div>
          <div className="flex  gap-4 text-white font-semibold montserrat">
            <div className="montserrat cursor-pointer flex justify-center items-center gap-2">
              <p>Create Title/Course</p>
            </div>
            <div className="montserrat cursor-pointer flex justify-center items-center gap-2">
              <p>Create Subject</p>
            </div>
            <div className="montserrat cursor-pointer flex justify-center items-center gap-2">
              <p>Create MCQ</p>
            </div>
          </div>
        </div>
      ))}
      {subjects.map((subject, index) => (
        <div
          key={index}
          className="w-full py-3 px-5  h-[50px] rounded-2xl mt-10 bg flex justify-between"
        >
          <div>{subject}</div>
          <div className="flex  gap-4 text-white font-semibold montserrat">
            <div className="montserrat cursor-pointer flex justify-center items-center gap-2">
              <p>Create Title/Course</p>
            </div>
            <div className="montserrat cursor-pointer flex justify-center items-center gap-2">
              <p>Create Subject</p>
            </div>
            <div className="montserrat cursor-pointer flex justify-center items-center gap-2">
              <p>Create MCQ</p>
            </div>
          </div>
        </div>
      ))}
      {showTitlePopup && (
        <Popup
          title="Create Title/Course"
          placeholder="Enter title/course name"
          onCreate={handleTitleCreate}
          onClose={() => setShowTitlePopup(false)}
        />
      )}
      {showSubjectPopup && (
        <Popup
          title="Create Subject"
          placeholder="Enter subject name"
          onCreate={handleSubjectCreate}
          onClose={() => setShowSubjectPopup(false)}
        />
      )}
    </div>
  );
};

export default MCQstore;
