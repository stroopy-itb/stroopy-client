import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateResearchDto, UpdateResearchDto } from "../../../adapter/dto";
import { Research } from "../../../domain/model";
import di from "../../di";

const researchMiddleware = {
  getAll: createAsyncThunk<Research[], (Partial<Research> & { full?: boolean }) | undefined>
    ('[Research] Get all',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchService.getAll({ ...arg });
          return tokenRes.map((token) => {
            return serializeDate(token);
          });
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  getOneById: createAsyncThunk<Research, { id: string }>
    ('[Research] Get one',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchService.getOneById(arg.id);
          return serializeDate(tokenRes);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  create: createAsyncThunk<Research, { dto: CreateResearchDto }>
    ('[Research] Create',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchService.create(arg.dto);
          return serializeDate(tokenRes);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  update: createAsyncThunk<Research, { dto: UpdateResearchDto }>
    ('[Research] Update',
      async (arg, thunkApi) => {
        try {
          const tokenRes = await di.service.researchService.update(arg.dto);
          return serializeDate(tokenRes);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  delete: createAsyncThunk<void, { id: string }>
    ('[Research] Delete',
      async (arg, thunkApi) => {
        try {
          return await di.service.researchService.delete(arg.id);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
}

const serializeDate = (token: Research) => {
  return {
    ...token,
    createdAt: token.createdAt.toLocaleString(),
    updatedAt: token.updatedAt.toLocaleString(),
  }
}

export default researchMiddleware;
