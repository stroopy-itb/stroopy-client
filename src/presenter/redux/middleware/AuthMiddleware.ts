import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDto } from "../../../adapter/dto";
import { User } from "../../../domain/model";
import di from "../../di";

export const authMiddleware = {
  login: createAsyncThunk<User | undefined, LoginDto>('[Auth] Login', async (loginDto, thunkApi) => {
    try {
      await di.service.authService.login(loginDto);
      return await di.service.userService.findCurrentUser();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ message: error.message });
    }
  }),
  logout: createAsyncThunk('[Auth] Logout', async (_arg, thunkApi) => {
    try {
      return di.service.authService.logout();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ message: error.message });
    }
  }),
  reauth: createAsyncThunk('[Auth] Re-auth', async (_arg, thunkApi) => {
    try {
      return await di.service.userService.findCurrentUser();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ message: error.message });
    }
  })
};

export default authMiddleware;