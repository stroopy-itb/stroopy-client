import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserDto, CreateUserProfileDto, UpdateUserDto, UpdateUserProfileDto } from "../../../adapter/dto";
import { ErrorResponse, User, UserProfile } from "../../../domain/model";
import di from "../../di";

export const userMiddleware = {
  register: createAsyncThunk<User, CreateUserDto>('[Auth] Register', async (createUserDto, thunkApi) => {
    try {
      return await di.service.userService.register(createUserDto);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error as ErrorResponse);
    }
  }),
  updatePassword: createAsyncThunk<User, { dto: UpdateUserDto }>
    ('[User] Update',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.userService.update(arg.dto);
          return {
            ...res,
            createdAt: res.createdAt.toLocaleString(),
            updatedAt: res.updatedAt.toLocaleString(),
          }
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  getProfile: createAsyncThunk<UserProfile, { userId: string }>
    ('[User] Get Profile',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.userProfileService.getOneById(arg.userId);
          return {
            ...res,
            createdAt: res.createdAt.toLocaleString(),
            updatedAt: res.updatedAt.toLocaleString(),
          }
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  createProfile: createAsyncThunk<UserProfile, { dto: CreateUserProfileDto }>
    ('[User] Create Profile',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.userProfileService.create(arg.dto);
          return {
            ...res,
            createdAt: res.createdAt.toLocaleString(),
            updatedAt: res.updatedAt.toLocaleString(),
          }
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
  updateProfile: createAsyncThunk<UserProfile, { dto: UpdateUserProfileDto }>
    ('[User] Update Profile',
      async (arg, thunkApi) => {
        try {
          const res = await di.service.userProfileService.update(arg.dto);
          return {
            ...res,
            createdAt: res.createdAt.toLocaleString(),
            updatedAt: res.updatedAt.toLocaleString(),
          }
        } catch (error: any) {
          return thunkApi.rejectWithValue(error as ErrorResponse);
        }
      }
    ),
}

export default userMiddleware;
