import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateResearchDto, CreateResearchSetupDto, CreateResearchTicketDto, ListResearchResponseDto, UpdateResearchDto, UpdateResearchSetupDto } from "../../../adapter/dto";
import { ColorPair, ErrorResponse, Research, ResearchSetup, ResearchTicket } from "../../../domain/model";
import di from "../../di";

const researchMiddleware = {
  getAll: createAsyncThunk<ListResearchResponseDto, { size: number, page: number, filter: (Partial<Research> & { full?: boolean }) | undefined }>
    ('[Research] Get all',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchService.getAll(arg.size, arg.page, arg.filter);
          const researches = res.researches.map((item) => {
            return serializeDate(item);
          });

          return { researches: researches, size: res.size, page: res.page, totalSize: res.totalSize };
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  getAllByTickets: createAsyncThunk<ListResearchResponseDto, { size: number, page: number, filter: (Partial<ResearchTicket>) | undefined }>
    ('[Research] Get all by Tickets',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.researchTicketService.getAll(arg.size, arg.page, arg.filter);
          const extractedResearch: Research[] = [];
          res.researchTickets.forEach((item) => {
            if (item.research) {
              extractedResearch.push(serializeDate(item.research));
            }
          });

          return { researches: extractedResearch, size: res.size, page: res.page, totalSize: res.totalSize };
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
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
          return thunkApi.rejectWithValue(error as ErrorResponse);
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
          return thunkApi.rejectWithValue(error as ErrorResponse);
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
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  delete: createAsyncThunk<void, { id: string }>
    ('[Research] Delete',
      async (arg, thunkApi) => {
        try {
          return await di.service.researchService.delete(arg.id);
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
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
          return thunkApi.rejectWithValue(error as ErrorResponse);
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
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  updateLocalSetup: createAction<{
    pairs: ColorPair[];
    timeout: number;
    answerLimit: number;
    rounds: number;
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
          return thunkApi.rejectWithValue(error as ErrorResponse);
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
