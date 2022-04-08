import { BaseUpdateDto } from "./BaseUpdateDto";

export default class UpdateUserDto extends BaseUpdateDto {
  token?: string;
  username?: string;
  password?: string;
}
