import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startExamAction } from "../redux/questionReducer";
import { Data } from "../page/quizpage/Data";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface FetchState {
  isLoading: boolean;
  apiData: Question[];
  serverError: Error | null;
}

export const useFetchQuestions = (): FetchState => {
  const dispatch = useDispatch();
  const [fetchState, setFetchState] = useState<FetchState>({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchState((prev) => ({ ...prev, isLoading: true }));

        const questions: Question[] = await Data;
        if (questions.length > 0) {
          setFetchState({
            isLoading: false,
            apiData: questions,
            serverError: null,
          });
          dispatch(startExamAction({ question: questions }));
        } else {
          throw new Error("No Questions Available");
        }
      } catch (error) {
        setFetchState((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error as Error,
        }));
      }
    };

    fetchData();
  }, [dispatch]);

  return fetchState;
};
