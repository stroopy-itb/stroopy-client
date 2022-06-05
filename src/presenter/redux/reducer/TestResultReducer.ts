import { createReducer } from "@reduxjs/toolkit";
import { GetAnalyticsResponseDto } from "../../../adapter/dto";
import { AnswerRecord, ErrorResponse, Result, TestResult } from "../../../domain/model";
import testResultMiddleware from "../middleware/TestResultMiddleware";

export interface TestResultState {
  loading: boolean;
  analytics?: GetAnalyticsResponseDto,
  respondentResults?: TestResult[];
  testResults?: TestResult[];
  size: number;
  page: number;
  totalSize: number;
  selectedTestResult?: TestResult;
  testData?: TestResult;
  resultData?: (Result & {
    answerRecords: AnswerRecord[]
  });
  error?: ErrorResponse;
}

const initialState: TestResultState = {
  loading: false,
  analytics: undefined,
  testResults: undefined,
  size: 10,
  page: 1,
  totalSize: -1,
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
      testResults: action.payload.testResults,
      size: action.payload.size,
      page: action.payload.page,
      totalSize: action.payload.totalSize,
    }))
    .addCase(testResultMiddleware.getAll.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(testResultMiddleware.getRespondentResults.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(testResultMiddleware.getRespondentResults.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      respondentResults: action.payload,
    }))
    .addCase(testResultMiddleware.getRespondentResults.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(testResultMiddleware.getAnalytics.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(testResultMiddleware.getAnalytics.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      analytics: action.payload,
    }))
    .addCase(testResultMiddleware.getAnalytics.rejected, (state, action) => ({
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