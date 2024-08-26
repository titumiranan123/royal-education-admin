import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      const { question, answers } = action.payload;
      return {
        ...state,
        queue: question,
        answers,
      };
    },
    moveNextAction: (state) => {
      const nextTrace = state.trace + 1;
      const newTrace = nextTrace < state.queue.length ? nextTrace : state.trace;
      return {
        ...state,
        trace: newTrace,
      };
    },
    movePrevAction: (state) => {
      const newTrace = state.trace > 0 ? state.trace - 1 : 0;
      return {
        ...state,
        trace: newTrace,
      };
    },
    resetAllAction: () => {
      return {
        queue: [],
        answers: [],
        trace: 0,
      };
    },
  },
});

export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  resetAllAction,
} = questionReducer.actions;

export default questionReducer.reducer;
