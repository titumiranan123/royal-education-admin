import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  questions: [
    {
      id: "",
      question: "",
      options: [],
      answer: "",
      selectedOption: " ",
    },
  ],
  time: 0,
};

// Create the quiz slice
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectOption(state, action) {
      const { questionIndex, option } = action.payload;
      state.questions[questionIndex].selectedOption = option;
    },
    setQuizQuestions(state, action) {
      state.questions = action.payload.question;
      state.time = action.payload.time;
    },
    resetQuiz(state) {
      state.questions.forEach((question) => {
        question.selectedOption = "";
      });
    },
  },
});

// Export actions and reducer
export const { selectOption, setQuizQuestions, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
