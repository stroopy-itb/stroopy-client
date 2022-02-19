import { createAction, createReducer } from "@reduxjs/toolkit";
import { UserType } from "../../model/UserRole";

interface UserState {
  isAuthenticated: boolean;
  auth_token?: string;
  name?: string;
  type?: UserType;
}

const initialState: UserState = {
  isAuthenticated: false,
  auth_token: undefined,
  name: undefined,
  type: undefined,
};

export const setAuth = createAction<UserState>("auth/set-auth");

export const AuthReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuth, (state, action) => {
    state = action.payload;
  });
});

export default AuthReducer;
