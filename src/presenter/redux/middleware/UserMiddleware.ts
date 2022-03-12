import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserDto } from "../../../adapter/dto";
import { User } from "../../../domain/model";
import di from "../../di";

export const userMiddleware = {
  register: createAsyncThunk<User, CreateUserDto>('[Auth] Register', async (createUserDto, thunkApi) => {
    try {
      return await di.service.userService.register(createUserDto);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ message: error.message });
    }
  }),
}