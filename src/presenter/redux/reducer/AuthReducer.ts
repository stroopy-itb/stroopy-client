import { createReducer } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../domain/model";
import { authMiddleware } from "../middleware";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error?: ErrorResponse;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: undefined
};

export const AuthReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(authMiddleware.login.pending, (state) => ({
    ...state,
    loading: true,
    user: undefined,
    error: undefined,
  }))
  .addCase(authMiddleware.login.fulfilled, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    error: undefined,
  }))
  .addCase(authMiddleware.login.rejected, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload as ErrorResponse,
  }))
  .addCase(authMiddleware.logout.pending, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .addCase(authMiddleware.logout.fulfilled, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error: undefined,
  }))
  .addCase(authMiddleware.logout.rejected, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload as ErrorResponse,
  }))
  .addCase(authMiddleware.reauth.pending, (state) => ({
    ...state,
    loading: true,
  }))
  .addCase(authMiddleware.reauth.fulfilled, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    error: undefined,
  }))
});

export default AuthReducer;
