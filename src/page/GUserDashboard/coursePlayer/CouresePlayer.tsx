import React, { useState } from "react";
import ReactPlayer from "react-player";
import Accordion from "../../admin/utils/Accordian";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import CustomScrollbar from "../../../components/customscrolbar/CustomScrollbar";
import { useDispatch } from "react-redux";
import { setQuizQuestions } from "../../../redux/quizSlice";
import Quiz from "../Question/quiz/Quiz";
const CouresePlayer: React.FC = () => {
  const [video, setVideo] = useState("");
  const [exam, setExam] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="max-w-[1340px] mx-auto">
      <div>
        <div className="mt-20">
          <div className="grid lg:grid-cols-6 grid-cols-1">
            <div className="lg:col-span-4  bg-[#160929]">
              <div>
                <CustomScrollbar>
                  <div className="h-[500px]">
                    {video ? (
                      <ReactPlayer
                        url={video}
                        width="100%"
                        height="100%"
                        config={{
                          youtube: {
                            playerVars: {
                              modestbranding: 1,
                              rel: 0,
                              showinfo: 0,
                              iv_load_policy: 3,
                              disablekb: 1,
                              controls: 1,
                            },
                          },
                        }}
                      />
                    ) : (
                      <>
                        {exam !== "written" ? (
                          <Quiz />
                        ) : (
                          <div className="text-white">written</div>
                        )}
                      </>
                    )}
                  </div>
                </CustomScrollbar>
              </div>
            </div>
            <div className="lg:col-span-2 ">
              <CustomScrollbar>
                <div className=" h-[500px]  border border-[#572f92] rounded-lg py-10 px-5">
                  <div className="w-full">
                    <div>
                      {subject.subjects.map((chapter) => (
                        <Accordion
                          key={chapter.id}
                          title={chapter.title}
                          content={
                            <div>
                              <div>
                                {chapter.videos.map((video, index) => (
                                  <div
                                    className="bg-[#201235] text-white font-semibold text-[16px] rounded-lg py-3 px-5 mt-1"
                                    key={index}
                                  >
                                    <p
                                      className="cursor-pointer flex items-center gap-2 text-[16px]"
                                      onClick={() => {
                                        setExam("");
                                        setVideo(video.videoLink);
                                      }}
                                    >
                                      <MdOutlineVideoLibrary className="text-[20px]" />
                                      {video.title}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div>
                                {chapter.exams &&
                                  chapter.exams.map((exam, index) => (
                                    <div
                                      key={index}
                                      className="bg-[#201235] text-white font-semibold text-[16px] rounded-lg py-3 px-5 mt-1"
                                    >
                                      <p onClick={() => {}}>
                                        {exam.type !== "written" ? (
                                          <div
                                            onClick={() => {
                                              setVideo("");
                                              setExam(exam?.type);
                                              dispatch(
                                                setQuizQuestions({
                                                  question: exam?.questions,
                                                  "to,e": exam.time,
                                                })
                                              );
                                            }}
                                            className="flex gap-2 items-center"
                                          >
                                            <span className="text-[20px]">
                                              ?
                                            </span>

                                            {exam.type}
                                          </div>
                                        ) : (
                                          <div
                                            onClick={() => {
                                              setVideo("");
                                              setExam(exam?.type);
                                            }}
                                            className="flex gap-2 items-center"
                                          >
                                            <FaFilePen className="text-[20px]" />
                                            {exam.type}
                                          </div>
                                        )}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CustomScrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const subject = {
  subjects: [
    {
      title: "Physics",
      videos: [
        {
          title: "Lecture 1",
          videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          title: "Lecture 2",
          videoLink: "https://youtu.be/l3pO9D5NW5s?si=lGUrvuw8zqXPPCAF",
        },
        {
          title: "Lecture 3",
          videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          title: "Lecture 4",
          videoLink: "https://youtu.be/l3pO9D5NW5s?si=lGUrvuw8zqXPPCAF",
        },
      ],
      exams: [
        {
          type: "mcq",
          time: 20,
          questions: [
            {
              id: 1,
              question: "What is the capital of France?",
              options: ["Paris", "London", "Berlin", "Rome"],
              answer: "Paris",
            },
            {
              id: 2,
              question: "Which planet is known as the Red Planet?",
              options: ["Mars", "Jupiter", "Earth", "Saturn"],
              answer: "Mars",
            },
            {
              id: 3,
              question: "What is the largest ocean on Earth?",
              options: [
                "Atlantic Ocean",
                "Arctic Ocean",
                "Indian Ocean",
                "Pacific Ocean",
              ],
              answer: "Pacific Ocean",
            },
            {
              id: 4,
              question: "Who painted the Mona Lisa?",
              options: [
                "Vincent van Gogh",
                "Leonardo da Vinci",
                "Pablo Picasso",
                "Claude Monet",
              ],
              answer: "Leonardo da Vinci",
            },
            {
              id: 5,
              question: "Which country is famous for its tulip fields?",
              options: ["Netherlands", "Italy", "Japan", "Australia"],
              answer: "Netherlands",
            },
          ],
        },
        { type: "written", questions: ["Question 1", "Question 2"] },
      ],
    },
    {
      id: 1,
      title: "Chemistry",
      videos: [
        {
          title: "Introduction to Algebra",
          videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          title: "Solving Equations",
          videoLink: "https://youtu.be/l3pO9D5NW5s?si=lGUrvuw8zqXPPCAF",
        },
      ],
    },
  ],
};

export default CouresePlayer;
