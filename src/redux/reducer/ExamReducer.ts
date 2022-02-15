import { createAction, createReducer } from "@reduxjs/toolkit";
import ColorPair from "../../model/ColorPair";
import { Result } from "../../model";

interface ExamState {
  setup: {
    pairs: ColorPair[];
    timeLimit: number;
    answerLimit: number;
  };
  result: Result;
}

const initialState: ExamState = {
  setup: {
    pairs: [
      {
        text: "Red",
        color: "#FF5555",
      },
      {
        text: "Green",
        color: "#58D95D",
      },
      {
        text: "Blue",
        color: "#4D74FF",
      },
      {
        text: "Yellow",
        color: "#FFB800",
      },
    ],
    timeLimit: 3,
    answerLimit: 50,
  },
  result: {
    corrects: 0,
    wrongs: 0,
    unanswered: 0,
    rtca: 0,
  },
};

const updateSetup = createAction<{
  pairs: ColorPair[];
  timeLimit: number;
  answerLimit: number;
}>("exam/update-setup");
const updateResult = createAction<Result>("exam/update-result");
const resetResult = createAction("exam/reset-result");

const ExamReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSetup, (state, action) => {
      state.setup = action.payload;
    })
    .addCase(updateResult, (state, action) => {
      state.result = action.payload;
    })
    .addCase(resetResult, (state, action) => {
      state.result = initialState.result;
    });
});

export default ExamReducer;
