import { createReducer } from "@reduxjs/toolkit";
import { ColorPair, ErrorResponse, Research } from "../../../domain/model";
import researchMiddleware from "../middleware/ResearchMiddleware";

export interface ResearchState {
  loading: boolean;
  researches?: Research[];
  size: number;
  page: number;
  totalSize?: number;
  selectedResearch?: Research;
  localSetup: {
    pairs: ColorPair[];
    timeLimit: number;
  };
  error?: ErrorResponse;
}

const initialState: ResearchState = {
  loading: false,
  researches: undefined,
  size: 10,
  page: 1,
  totalSize: undefined,
  selectedResearch: undefined,
  localSetup: {
    pairs: [
      {
        text: "Merah",
        color: "#FF5555",
      },
      {
        text: "Hijau",
        color: "#58D95D",
      },
      {
        text: "Biru",
        color: "#4D74FF",
      },
      {
        text: "Kuning",
        color: "#FFB800",
      },
    ],
    timeLimit: 3,
  },
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
      researches: action.payload.researches,
      size: action.payload.size,
      page: action.payload.page,
      totalSize: action.payload.totalSize,
    }))
    .addCase(researchMiddleware.getAll.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(researchMiddleware.getAllByTickets.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.getAllByTickets.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      researches: action.payload.researches,
      size: action.payload.size,
      page: action.payload.page,
      totalSize: action.payload.totalSize,
    }))
    .addCase(researchMiddleware.getAllByTickets.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
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
      error: action.payload as ErrorResponse
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
      error: action.payload as ErrorResponse
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
      error: action.payload as ErrorResponse
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
      error: action.payload as ErrorResponse
    }))
    .addCase(researchMiddleware.createResearchSetup.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.createResearchSetup.fulfilled, (state, action) => {
      state.loading = false;
      if (state.selectedResearch) {
        state.selectedResearch = {
          ...state.selectedResearch,
          researchSetup: action.payload
        };
      }
    })
    .addCase(researchMiddleware.createResearchSetup.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(researchMiddleware.updateResearchSetup.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.updateResearchSetup.fulfilled, (state, action) => {
      state.loading = false;
      if (state.selectedResearch) {
        state.selectedResearch = {
          ...state.selectedResearch,
          researchSetup: action.payload
        };
      }
    })
    .addCase(researchMiddleware.updateResearchSetup.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(researchMiddleware.createResearchTicket.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(researchMiddleware.createResearchTicket.fulfilled, (state, action) => ({
      ...state,
      loading: false,
    }))
    .addCase(researchMiddleware.createResearchTicket.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(researchMiddleware.updateLocalSetup, (state, action) => ({
      ...state,
      localSetup: action.payload,
    }))
});

export default ResearchReducer;