import { createReducer } from "@reduxjs/toolkit";
import { ResearchToken } from "../../../domain/model/ResearchToken";
import researchTokenMiddleware from "../middleware/ResearchTokenMiddleware";

export interface ResearchTokenState {
  loading: boolean;
  researchTokens?: ResearchToken[];
  researchersToken?: ResearchToken;
  selectedResearchToken?: ResearchToken;
  error?: any;
}

const initialState: ResearchTokenState = {
  loading: false,
  researchTokens: undefined,
  researchersToken: undefined,
  selectedResearchToken: undefined,
  error: undefined
}

const ResearchTokenReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(researchTokenMiddleware.getAll.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchTokenMiddleware.getAll.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      researchTokens: action.payload
    }))
    .addCase(researchTokenMiddleware.getAll.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchTokenMiddleware.getOne.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchTokenMiddleware.getOne.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedResearchToken: action.payload
    }))
    .addCase(researchTokenMiddleware.getOne.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchTokenMiddleware.getOneByResearcherId.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchTokenMiddleware.getOneByResearcherId.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      researchersToken: action.payload
    }))
    .addCase(researchTokenMiddleware.getOneByResearcherId.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchTokenMiddleware.create.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchTokenMiddleware.create.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedResearchToken: action.payload
    }))
    .addCase(researchTokenMiddleware.create.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchTokenMiddleware.update.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchTokenMiddleware.update.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedResearchToken: action.payload
    }))
    .addCase(researchTokenMiddleware.update.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchTokenMiddleware.delete.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchTokenMiddleware.delete.fulfilled, (state, action) => ({
      ...state,
      loading: false,
    }))
    .addCase(researchTokenMiddleware.delete.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
});

export default ResearchTokenReducer;