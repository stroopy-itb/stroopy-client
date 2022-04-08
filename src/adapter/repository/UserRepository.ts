import { User } from "../../domain/model";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { IUserRepository } from "./interface";

export default class UserRepository implements IUserRepository {
  constructor(
    private readonly http: HttpClient,
  ) { }

  public async getAll(size: number, page: number, filter?: (Partial<User> & { full?: boolean })): Promise<User[]> {
    const query = queryMaker<User>(filter, true);

    return this.http.get(`users/list?size=${size}&page=${page}${query}`);
  }
  public async getCurrentUser(): Promise<User | undefined> {
    return this.http.get('users');
  }
  public async getOne(id: string): Promise<User> {
    return this.http.get(`users/${id}`);
  }
  public async register(createUserDto: CreateUserDto): Promise<User> {
    return this.http.post('users/register', createUserDto);
  }
  public async update(updateUserProfileDto: UpdateUserDto): Promise<User> {
    return this.http.put(`users/update/${updateUserProfileDto.id}`, updateUserProfileDto);
  }
}