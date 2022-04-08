import { User } from "../../../domain/model";
import { CreateUserDto, UpdateUserDto } from "../../dto";

export default interface IUserRepository {
  getAll(size: number, page: number, filter?: Partial<User>): Promise<User[]>;
  getCurrentUser(): Promise<User | undefined>;
  getOne(id: string): Promise<User>;
  register(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserProfileDto: UpdateUserDto): Promise<User>;
}