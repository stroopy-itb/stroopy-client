import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateResearchDto, CreateResearchSetupDto, CreateResearchTicketDto, UpdateResearchDto, UpdateResearchSetupDto } from "../../../adapter/dto";
import { ColorPair, Research, ResearchSetup, ResearchTicket } from "../../../domain/model";
import di from "../../di";

const researchMiddleware = {
  getAll: createAsyncThunk<Research[], (Partial<Research> & { full?: boolean }) | undefined>
    ('[Research] Get all',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchService.getAll({ ...arg });
          return res.map((item) => {
            return serializeDate(item);
          });
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  getAllByTickets: createAsyncThunk<Research[], Partial<ResearchTicket> | undefined>
    ('[Research] Get all by Tickets',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchTicketService.getAll({ ...arg });
          const extractedResearch: Research[] = [];
          res.forEach((item) => {
            if (item.research) {
              extractedResearch.push(serializeDate(item.research));
            }
          });

          return extractedResearch;
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  getOneById: createAsyncThunk<Research, { id: string }>
    ('[Research] Get one',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchService.getOneById(arg.id);
          return serializeDate(res);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  create: createAsyncThunk<Research, { dto: CreateResearchDto }>
    ('[Research] Create',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchService.create(arg.dto);
          return serializeDate(res);
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  update: createAsyncThunk<Research, { dto: UpdateResearchDto }>
    ('[Research] Update',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchService.update(arg.dto);
          return serializeDate(res);
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
  createResearchSetup: createAsyncThunk<ResearchSetup, { dto: CreateResearchSetupDto }>
    ('[Research] Create Setup',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchSetupService.create(arg.dto);
          return {
            ...res,
            createdAt: res.createdAt.toLocaleString(),
            updatedAt: res.updatedAt.toLocaleString(),
          }
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  updateResearchSetup: createAsyncThunk<ResearchSetup, { dto: UpdateResearchSetupDto }>
    ('[Research] Update Setup',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchSetupService.update(arg.dto);
          return {
            ...res,
            createdAt: res.createdAt.toLocaleString(),
            updatedAt: res.updatedAt.toLocaleString(),
          }
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
  updateLocalSetup: createAction<{
    pairs: ColorPair[];
    timeLimit: number;
    answerLimit: number;
  }>('[Research] Update Local Setup'),
  createResearchTicket: createAsyncThunk<ResearchTicket, { dto: CreateResearchTicketDto }>
    ('[Research] Create Research Ticket',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchTicketService.create(arg.dto);
          return {
            ...res,
            createdAt: res.createdAt.toLocaleString(),
            updatedAt: res.updatedAt.toLocaleString(),
          }
        } catch (error: any) {
          return thunkApi.rejectWithValue({ message: error.message });
        }
      }
    ),
}

const serializeDate = (item: Research): Research => {
  return {
    ...item,
    createdAt: item.createdAt.toLocaleString(),
    updatedAt: item.updatedAt.toLocaleString(),
  }
}

export default researchMiddleware;
