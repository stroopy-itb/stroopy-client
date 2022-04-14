import { createReducer } from "@reduxjs/toolkit";
import { AuthStatus, ErrorResponse } from "../../../domain/model";
import { authMiddleware } from "../middleware";

interface AuthState {
  authStatus: AuthStatus;
  loading: boolean;
  error?: ErrorResponse;
}

const initialState: AuthState = {
  authStatus: AuthStatus.UNAUTHENTICATED,
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
    authStatus: AuthStatus.AUTHENTICATED,
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
    authStatus: AuthStatus.LOGGEDOUT,
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
    authStatus: AuthStatus.AUTHENTICATED,
    error: undefined,
  }))
  .addCase(authMiddleware.reauth.rejected, (state) => ({
    ...state,
    loading: false,
    authStatus: AuthStatus.UNAUTHENTICATED,
    error: undefined,
  }))
});

export default AuthReducer;
