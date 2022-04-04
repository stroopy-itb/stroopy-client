import { createReducer } from "@reduxjs/toolkit";
import { User } from "../../../domain/model";
import { authMiddleware } from "../middleware";
import { userMiddleware } from "../middleware/UserMiddleware";

interface UserState {
  loading: boolean;
  user?: User;
  error?: any;
}

const initialState: UserState = {
  loading: false,
  user: undefined,
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
      error: action.error
    }))
    .addCase(authMiddleware.login.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload
    }))
    .addCase(authMiddleware.reauth.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      user: action.payload
    }))
})

export default UserReducer;
