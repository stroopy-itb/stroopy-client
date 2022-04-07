import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDto } from "../../../adapter/dto";
import { ErrorResponse, User } from "../../../domain/model";
import di from "../../di";

export const authMiddleware = {
  login: createAsyncThunk<User | undefined, LoginDto>('[Auth] Login', async (loginDto, thunkApi) => {
    try {
      await di.service.authService.login(loginDto);
      return await di.service.userService.findCurrentUser();
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error as ErrorResponse);
    }
  }),
  logout: createAsyncThunk('[Auth] Logout', async (_arg, thunkApi) => {
    try {
      return di.service.authService.logout();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error as ErrorResponse);
    }
  }),
  reauth: createAsyncThunk('[Auth] Re-auth', async (_arg, thunkApi) => {
    try {
      return await di.service.userService.findCurrentUser();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error as ErrorResponse);
    }
  })
};

export default authMiddleware;