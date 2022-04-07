import { createReducer } from "@reduxjs/toolkit";
import { AnswerRecord, ErrorResponse, Result, TestResult } from "../../../domain/model";
import testResultMiddleware from "../middleware/TestResultMiddleware";

export interface TestResultState {
  loading: boolean;
  testResults?: TestResult[];
  selectedTestResult?: TestResult;
  testData?: TestResult;
  resultData?: (Result & {
    answerRecords: AnswerRecord[]
  });
  error?: ErrorResponse;
}

const initialState: TestResultState = {
  loading: false,
  testResults: undefined,
  selectedTestResult: undefined,
  testData: undefined,
  resultData: undefined,
  error: undefined
}

const TestResultReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(testResultMiddleware.getAll.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(testResultMiddleware.getAll.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      testResults: action.payload
    }))
    .addCase(testResultMiddleware.getAll.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(testResultMiddleware.getOne.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(testResultMiddleware.getOne.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedTestResult: action.payload
    }))
    .addCase(testResultMiddleware.getOne.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(testResultMiddleware.getOneById.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(testResultMiddleware.getOneById.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedTestResult: action.payload
    }))
    .addCase(testResultMiddleware.getOneById.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(testResultMiddleware.create.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(testResultMiddleware.create.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedTestResult: action.payload
    }))
    .addCase(testResultMiddleware.create.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(testResultMiddleware.delete.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(testResultMiddleware.delete.fulfilled, (state, action) => {
      const deletedTokenIdx = state.testResults?.findIndex((t) => t.id === action.meta.arg.id) as number;
      if (deletedTokenIdx !== -1) {
        state.testResults?.splice(deletedTokenIdx, 1);
      }
      state.loading = false;
    })
    .addCase(testResultMiddleware.delete.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(testResultMiddleware.setTestData, (state, action) => ({
      ...state,
      testData: action.payload
    }))
    .addCase(testResultMiddleware.removeTestData, (state) => ({
      ...state,
      testData: undefined
    }))
    .addCase(testResultMiddleware.setResultData, (state, action) => ({
      ...state,
      resultData: action.payload
    }))
    .addCase(testResultMiddleware.removeResultData, (state) => ({
      ...state,
      resultData: undefined
    }))
});

export default TestResultReducer;