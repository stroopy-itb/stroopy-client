import { User } from "../../../domain/model";
import { CreateUserDto, UpdateUserDto } from "../../dto";

export default interface IUserRepository {
  find(): Promise<User[]>
  findCurrentUser(): Promise<User | undefined>
  findOne(id: string): Promise<User>
  register(createUserDto: CreateUserDto): Promise<User>
  update(updateUserProfileDto: UpdateUserDto): Promise<User>;
}