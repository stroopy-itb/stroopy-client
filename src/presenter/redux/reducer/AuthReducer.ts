import { createReducer } from "@reduxjs/toolkit";
import { authMiddleware } from "../middleware";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error?: any;
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
    error: action.error,
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
    error: action.error,
  }))
});

export default AuthReducer;
