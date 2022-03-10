import { CreateUserDto } from "../../adapter/dto";
import { IUserRepository } from "../../adapter/repository/interface";
import { User } from "../model";
import { IUserService } from "./interface";

export default class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository
    ) { }

  public async find(): Promise<User[]> {
    return this.userRepository.find();
  }
  public async findCurrentUser(): Promise<User | undefined> {
    return this.userRepository.findCurrentUser();
  }
  public async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
  public async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.register(createUserDto);
  }
  
}