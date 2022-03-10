import { User } from "../../../domain/model";
import { CreateUserDto } from "../../dto";

export default interface IUserRepository {
  find(): Promise<User[]>
  findCurrentUser(): Promise<User | undefined>
  findOne(id: string): Promise<User>
  register(createUserDto: CreateUserDto): Promise<User>
}