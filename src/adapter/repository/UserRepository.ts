import { User } from "../../domain/model";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { IUserRepository } from "./interface";

export default class UserRepository implements IUserRepository {
  constructor(
    private readonly http: HttpClient,
    ) { }

  public async find(): Promise<User[]> {
    return this.http.get('users/list');
  }
  public async findCurrentUser(): Promise<User | undefined> {
    return this.http.get('users');
  }
  public async findOne(id: string): Promise<User> {
    return this.http.get(`users/${id}`);
  }
  public async register(createUserDto: CreateUserDto): Promise<User> {
    return this.http.post('users/register', createUserDto);
  }
  public async update(updateUserProfileDto: UpdateUserDto): Promise<User> {
    return this.http.put(`users/update/${updateUserProfileDto.id}`, updateUserProfileDto);
  }
}