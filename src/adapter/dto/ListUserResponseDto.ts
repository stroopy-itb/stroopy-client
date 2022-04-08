import { User } from "../../domain/model";
import { BaseListResponseDto } from "./BaseListResponseDto";

export default class UserListResponseDto extends BaseListResponseDto {
  users: User[];
}