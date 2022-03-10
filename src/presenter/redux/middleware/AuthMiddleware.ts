import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDto } from "../../../adapter/dto";
import { User } from "../../../domain/model";
import di from "../../di";

export const authMiddleware = {
  login: createAsyncThunk<User | undefined, LoginDto>('[Auth] Login', async (loginDto, thunkApi) => {
    try {
      await di.service.authService.login(loginDto);
      return await di.service.userService.findCurrentUser();
    } catch (error) {
      console.log(error);
      
      return thunkApi.rejectWithValue({ message: "error"});
    }
  }),
  logout: createAsyncThunk('[Auth] Logout', async (_arg, thunkApi) => {
    try {
      return di.service.authService.logout();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }),
};
