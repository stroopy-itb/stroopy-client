import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTestResultDto } from "../../../adapter/dto";
import { AnswerRecord, ErrorResponse, Result, TestResult } from "../../../domain/model";
import di from "../../di";

const testResultMiddleware = {
  getAll: createAsyncThunk<TestResult[], Partial<TestResult> | undefined>
    ('[Test Result] Get all',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.testResultService.getAll({ ...arg });
          return res.map((item) => {
            return serializeDate(item);
          });
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  getOne: createAsyncThunk<TestResult, Partial<TestResult> | undefined>
    ('[Test Result] Get one',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.testResultService.getOne({ ...arg });
          return serializeDate(res);
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  getOneById: createAsyncThunk<TestResult, { id: string }>
    ('[Test Result] Get one by id',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.testResultService.getOneById(arg.id);
          return serializeDate(res);
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  create: createAsyncThunk<TestResult, { dto: CreateTestResultDto }>
    ('[Test Result] Create',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.testResultService.create(arg.dto);
          return serializeDate(res);
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  delete: createAsyncThunk<void, { id: string }>
    ('[Test Result] Delete',
      async (arg, thunkApi) => {
        try {
          return await di.service.testResultService.delete(arg.id);
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  setTestData: createAction<TestResult>('[Test Result] Set Test Data'),
  removeTestData: createAction('[Test Result] Remove Test Data'),
  setResultData: createAction<(Result & { answerRecords: AnswerRecord[] })>('[Test Result] Set Result Data'),
  removeResultData: createAction('[Test Result] Remove Result Data')
}

const serializeDate = (item: TestResult): TestResult => {
  return {
    ...item,
    createdAt: item.createdAt.toLocaleString(),
    updatedAt: item.updatedAt.toLocaleString(),
  }
}

export default testResultMiddleware;
