import { createReducer } from "@reduxjs/toolkit";
import { Research } from "../../../domain/model";
import researchMiddleware from "../middleware/ResearchMiddleware";

export interface ResearchState {
  loading: boolean;
  researches?: Research[];
  selectedResearch?: Research;
  error?: any;
}

const initialState: ResearchState = {
  loading: false,
  researches: undefined,
  selectedResearch: undefined,
  error: undefined
}

const ResearchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(researchMiddleware.getAll.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.getAll.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      researches: action.payload
    }))
    .addCase(researchMiddleware.getAll.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchMiddleware.getAllByTickets.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.getAllByTickets.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      researches: action.payload
    }))
    .addCase(researchMiddleware.getAllByTickets.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchMiddleware.getOneById.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.getOneById.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedResearch: action.payload
    }))
    .addCase(researchMiddleware.getOneById.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchMiddleware.create.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.create.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      selectedResearch: action.payload
    }))
    .addCase(researchMiddleware.create.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchMiddleware.update.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.update.fulfilled, (state, action) => {
      const updatedTokenIdx = state.researches?.findIndex((t) => t.id === action.payload.id) as number;
      if (state.researches && updatedTokenIdx !== -1) {
        state.researches[updatedTokenIdx] = action.payload;
      }
      state.loading = false;
    })
    .addCase(researchMiddleware.update.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
    .addCase(researchMiddleware.delete.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.delete.fulfilled, (state, action) => {
      const deletedTokenIdx = state.researches?.findIndex((t) => t.id === action.meta.arg.id) as number;
      if (deletedTokenIdx !== -1) {
        state.researches?.splice(deletedTokenIdx, 1);
      }
      state.loading = false;
    })
    .addCase(researchMiddleware.delete.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    }))
});

export default ResearchReducer;