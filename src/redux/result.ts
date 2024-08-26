import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a result item
interface ResultItem {
  trace: number;
  checked: boolean;
}

// Define the initial state type
interface InitialStateType {
  userId: string | null;
  result: ResultItem[];
}

// Define the initial state
const initialState: InitialStateType = {
  userId: null,
  result: [],
};

// Define the slice
export const resultReducer = createSlice({
  name: "result",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    pushResultAction: (state, action: PayloadAction<ResultItem>) => {
      state.result.push(action.payload);
    },
    updateResultAction: (
      state,
      action: PayloadAction<{ trace: number; checked: boolean }>
    ) => {
      const { trace, checked } = action.payload;
      if (trace >= 0 && trace < state.result.length) {
        state.result[trace].checked = checked;
      }
    },
    resetResultAction: () => {
      return initialState;
    },
  },
});

export const {
  setUserId,
  pushResultAction,
  resetResultAction,
  updateResultAction,
} = resultReducer.actions;

export default resultReducer.reducer;
