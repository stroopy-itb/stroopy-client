import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../../../adapter/dto";
import { ResearchToken } from "../../../domain/model/ResearchToken";
import di from "../../di";

export const researchTokenMiddleware = {
  getAll: createAsyncThunk<ResearchToken[]>
    ('[Research Token] Get all',
      async (_arg, thunkApi) => {
        try {
          return await di.service.researchTokenService.getAll();
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  getOne: createAsyncThunk<ResearchToken, { id: string }>
    ('[Research Token] Get one',
      async (arg, thunkApi) => {
        try {
          return await di.service.researchTokenService.getOne(arg.id);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  getOneByResearcherId: createAsyncThunk<ResearchToken, { researcherId: string }>
    ('[Research Token] Get one by researcher id',
      async (arg, thunkApi) => {
        try {
          return await di.service.researchTokenService.getOneByResearcherId(arg.researcherId);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  create: createAsyncThunk<ResearchToken, { dto: CreateResearchTokenDto }>
    ('[Research Token] Create',
      async (arg, thunkApi) => {
        try {
          return await di.service.researchTokenService.create(arg.dto);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  update: createAsyncThunk<ResearchToken, { dto: UpdateResearchTokenDto }>
    ('[Research Token] Update',
      async (arg, thunkApi) => {
        try {
          return await di.service.researchTokenService.update(arg.dto);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  delete: createAsyncThunk<void, { id: string }>
    ('[Research Token] Delete',
      async (arg, thunkApi) => {
        try {
          return await di.service.researchTokenService.delete(arg.id);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
}

export default researchTokenMiddleware;
