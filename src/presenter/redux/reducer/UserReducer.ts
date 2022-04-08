import { createReducer } from "@reduxjs/toolkit";
import { ErrorResponse, User, UserProfile } from "../../../domain/model";
import { authMiddleware } from "../middleware";
import { userMiddleware } from "../middleware/UserMiddleware";

interface UserState {
  loading: boolean;
  user?: User;
  profile?: UserProfile;
  error?: ErrorResponse;
}

const initialState: UserState = {
  loading: false,
  user: undefined,
  profile: undefined,
  error: undefined
};

export const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userMiddleware.register.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(userMiddleware.register.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload
    }))
    .addCase(userMiddleware.register.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(userMiddleware.updatePassword.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(userMiddleware.updatePassword.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload
    }))
    .addCase(userMiddleware.updatePassword.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(userMiddleware.getProfile.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(userMiddleware.getProfile.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      profile: action.payload
    }))
    .addCase(userMiddleware.getProfile.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(userMiddleware.createProfile.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(userMiddleware.createProfile.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      profile: action.payload
    }))
    .addCase(userMiddleware.createProfile.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(userMiddleware.updateProfile.pending, (state) => ({
      ...state,
      loading: true,
      error: undefined
    }))
    .addCase(userMiddleware.updateProfile.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      profile: action.payload
    }))
    .addCase(userMiddleware.updateProfile.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload as ErrorResponse
    }))
    .addCase(authMiddleware.login.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload,
      profile: action.payload?.profile
    }))
    .addCase(authMiddleware.reauth.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload,
      profile: action.payload?.profile
    }))
})

export default UserReducer;
