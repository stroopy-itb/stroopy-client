import { CreateUserDto, UpdateUserDto } from "../../../adapter/dto";
import { User } from "../../model";

export default interface IUserService {
  getAll(size: number, page: number, filter?: Partial<User>): Promise<User[]>;
  getCurrentUser(): Promise<User | undefined>;
  getOne(id: string): Promise<User>;
  register(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserDto: UpdateUserDto): Promise<User>;
}