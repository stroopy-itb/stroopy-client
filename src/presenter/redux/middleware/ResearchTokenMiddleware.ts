import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../../../adapter/dto";
import { ResearchToken } from "../../../domain/model/ResearchToken";
import di from "../../di";

export const researchTokenMiddleware = {
  getAll: createAsyncThunk<ResearchToken[], (Partial<ResearchToken> & { full?: boolean })>
    ('[Research Token] Get all',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchTokenService.getAll({ token: arg.token, full: arg.full });
          return tokenRes.map((token) => {
            return serializeDate(token);
          });
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  getOne: createAsyncThunk<ResearchToken, { id: string }>
    ('[Research Token] Get one',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchTokenService.getOneById(arg.id);
          return serializeDate(tokenRes);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  getOneByResearcherId: createAsyncThunk<ResearchToken, { researcherId: string }>
    ('[Research Token] Get one by researcher id',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchTokenService.getOneByResearcherId(arg.researcherId);
          return serializeDate(tokenRes);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  create: createAsyncThunk<ResearchToken, { dto: CreateResearchTokenDto }>
    ('[Research Token] Create',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchTokenService.create(arg.dto);
          return serializeDate(tokenRes);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  update: createAsyncThunk<ResearchToken, { dto: UpdateResearchTokenDto }>
    ('[Research Token] Update',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchTokenService.update(arg.dto);
          return serializeDate(tokenRes);
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

const serializeDate = (token: ResearchToken) => {
  return {
    ...token,
    expiredAt: token.expiredAt.toLocaleString(),
    createdAt: token.createdAt.toLocaleString(),
    updatedAt: token.updatedAt.toLocaleString(),
  }
}

export default researchTokenMiddleware;
