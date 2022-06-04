import { CreateUserDto, ListUserResponseDto, UpdatePasswordDto, UpdateUserDto } from "../../adapter/dto";
import { IUserRepository } from "../../adapter/repository/interface";
import { User } from "../model";
import { IUserService } from "./interface";

export default class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository
    ) { }

  public async getAll(size: number, page: number, filter?: Partial<User>): Promise<ListUserResponseDto> {
    return this.userRepository.getAll(size, page, filter);
  }
  public async getCurrentUser(): Promise<User | undefined> {
    return this.userRepository.getCurrentUser();
  }
  public async getOne(id: string): Promise<User> {
    return this.userRepository.getOne(id);
  }
  public async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.register(createUserDto);
  }
  public async update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(updateUserDto);
  }
  public async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<User> {
    return this.userRepository.updatePassword(updatePasswordDto);
  }
}