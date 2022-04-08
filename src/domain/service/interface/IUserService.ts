import { CreateUserDto, UpdateUserDto } from "../../../adapter/dto";
import { User } from "../../model";

export default interface IUserService {
  find(): Promise<User[]>
  findCurrentUser(): Promise<User | undefined>
  findOne(id: string): Promise<User>
  register(createUserDto: CreateUserDto): Promise<User>
  update(updateUserDto: UpdateUserDto): Promise<User>;
}