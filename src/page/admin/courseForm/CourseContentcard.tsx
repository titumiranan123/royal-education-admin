import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface CourseContentCardProps {

  handleDeleteVideo: () => void;
  handleVideoUpdate: () => void; // Add the update handler prop
  content: {
    video_title: string;
    video_link: string;
    video_duration: string;
    pdf_title: string;
    pdf_link: string;
  };
  index: number;
}

const CourseContentcard: React.FC<CourseContentCardProps> = ({

  handleDeleteVideo,
  handleVideoUpdate, // Include handleVideoUpdate here
  content,
  index,
}) => {
  const {
    video_title = "",
    video_link = "",
    video_duration = "",
    pdf_title = "",
    pdf_link = "",
  } = content || {};

  return (
    <div className="mb-2 flex justify-between items-center bg-gray-800 p-2 rounded-lg">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-gray-300">{`Class ${index}: ${video_title}`}</span>
        <span className="text-gray-300">{`Duration: ${video_duration} mins`}</span>
        <a
          href={video_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Watch Video
        </a>
        {pdf_link && (
          <a
            href={pdf_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View PDF: {pdf_title}
          </a>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleVideoUpdate}
          className="text-yellow-500 hover:text-yellow-700"
        >
          <AiOutlineEdit size={20} />
        </button>
        <button
          onClick={handleDeleteVideo}
          className="text-red-500 hover:text-red-700"
        >
          <AiOutlineDelete size={20} />
        </button>
        {/* New button for updating the video */}
       
      </div>
    </div>
  );
};

export default CourseContentcard;
