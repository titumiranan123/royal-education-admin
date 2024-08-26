/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { selectOption } from "../../../../redux/quizSlice";

const Quiz: React.FC = () => {
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const time = useSelector((state: RootState) => state.quiz.time);
  const dispatch = useDispatch();
  const [showResults, setShowResults] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  // Timer related states
  const [timeRemaining, setTimeRemaining] = useState(time); // 20 minutes in seconds

  useEffect(() => {
    // Start the timer when component mounts
    if (!isExamCompleted && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime: number) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(interval); // Clean up timer on component unmount
      };
    } else if (!isExamCompleted && timeRemaining === 0) {
      // Auto-submit exam when time is up
      handleSubmitQuiz();
    }
  }, [isExamCompleted, timeRemaining]);

  const handleOptionSelect = (questionIndex: number, option: string) => {
    dispatch(selectOption({ questionIndex, option }));
  };

  const handleSubmitQuiz = () => {
    setIsExamCompleted(true);
    setShowResults(true);
  };

  const calculateScore = (): number => {
    return questions.reduce((score, question) => {
      return question.selectedOption === question.answer ? score + 1 : score;
    }, 0);
  };
  const calculatemark = calculateScore();
  const disappointingMark = calculatemark === questions.length * 0.4;
  const good = calculatemark === questions.length * 0.8;
  const best = calculatemark === questions.length;
  const verySad = calculatemark === 0;
  // const handleRestartQuiz = () => {
  //   dispatch(resetQuiz());
  //   setShowResults(false);
  //   setIsExamCompleted(false);
  //   setTimeRemaining(20 * 60);
  // };

  return (
    <div className="p-4 flex justify-center flex-col ">
      {!showResults && (
        <>
          <h1 className="text-2xl font-bold montserrat text-white mb-4">
            First Exam :
          </h1>
          {questions.map((question, index) => (
            <div key={index} className="mb-4 ">
              <p className=" text-white montserrat text-[19px] font-semibold">
                {index + 1}. {question.question}
              </p>
              <div className="mt-2 grid md:grid-cols-2 grid-cols-1">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className=" cursor-pointer montserrat text-[#aaa4a4]"
                  >
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={option}
                      checked={question.selectedOption === option}
                      onChange={() => handleOptionSelect(index, option)}
                      className="mr-2 cursor-pointer text-white"
                      disabled={isExamCompleted || showResults}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmitQuiz}
            className="bg  mt-5 text-white font-bold py-2 px-4 rounded"
            disabled={isExamCompleted || showResults || timeRemaining <= 0}
          >
            Submit
          </button>
        </>
      )}
      {showResults && (
        <div className="w-full h-[400px] ">
          <div
            className={`flex w-[900px] -ms-6 h-[500px] -mt-4 justify-center ${
              disappointingMark && "bg-orange-400"
            } ${best && "bg-green-500"} ${
              verySad && "bg-red-500"
            } bg-opacity-10 flex-col items-center`}
          >
            <div
              className={`round w-36 h-36 rounded-full  flex justify-center items-center  ${
                (disappointingMark && "border-orange-400") ||
                best ||
                (good && "border-green-500") ||
                (verySad && "border-red-500")
              } border-[3px]`}
            >
              <div className="small_rounded h-28 w-28 rounded-full flex justify-center items-center relative text-xl font-bold   text-black bg-white">
                <p className="z-40 montserrat font-bold text-green-500 text-2xl">
                  {calculateScore()} / {questions.length}
                </p>
                <div
                  className={`h-28 w-28 absolute ${
                    (disappointingMark && "bg-orange-400") ||
                    best ||
                    (good && "bg-green-500") ||
                    (verySad && "bg-red-500")
                  } blur-3xl`}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-white justify-center items-center mt-10">
              <p className="text-xl  font-bold">
                {disappointingMark && (
                  <p className="text-orange-500">Very Disappointing !!!</p>
                )}
                {best && <p className="text-green-500">Great Job !!!</p>}
                {good && <p className="text-green-500">Great Job !!!</p>}
              </p>
              <p>
                You have completed the Exam and achieve{" "}
                <span className="text-xl">3</span> Marks !
              </p>
            </div>
          </div>
        </div>
      )}
      {/* {showResults && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <p className="mb-4">
            Your Score: {calculateScore()} / {questions.length}
          </p>
          <ul>
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                <strong>{question.question}</strong>
                <br />
                <span>
                  Your Answer: {question.selectedOption || "No answer selected"}
                  <br />
                  Correct Answer: {question.answer}
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleRestartQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Restart Quiz
          </button>
        </div>
      )} */}

      {!showResults && (
        <p className="mt-4">
          Time Remaining: {Math.floor(timeRemaining / 60)}:
          {(timeRemaining % 60).toString().padStart(2, "0")}
        </p>
      )}
    </div>
  );
};

export default Quiz;
