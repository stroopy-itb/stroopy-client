import { createReducer } from "@reduxjs/toolkit";
import { User } from "../../../domain/model";
import { authMiddleware } from "../middleware/AuthMiddleware";

interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
  error?: any;
}

const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  user: undefined,
  error: undefined
};

export const AuthReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(authMiddleware.login.pending, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .addCase(authMiddleware.login.fulfilled, (state, action) => ({
    ...state,
    loading: false,
    user: action.payload,
    isAuthenticated: true,
    error: undefined,
  }))
  .addCase(authMiddleware.login.rejected, (state, action) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
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
    user: undefined,
    error: undefined,
  }))
  .addCase(authMiddleware.logout.rejected, (state, action) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    user: undefined,
    error: action.error,
  }))
});

export default AuthReducer;
