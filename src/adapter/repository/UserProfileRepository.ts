import { UserProfile } from "../../domain/model";
import { CreateUserProfileDto, UpdateUserProfileDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { IUserProfileRepository } from "./interface";

export default class UserProfileRepository implements IUserProfileRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  public async getOne(filter?: (Partial<UserProfile> & { full?: boolean })): Promise<UserProfile> {
    const query = queryMaker<UserProfile>(filter);

    return this.http.get(`user-profile${query}`);
  }
  public async getOneById(id: string): Promise<UserProfile> {
    return this.http.get(`user-profile/${id}`);
  }
  public async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    return this.http.post(`user-profile/create`, createUserProfileDto);
  }
  public async update(updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile> {
    return this.http.put(`user-profile/update/${updateUserProfileDto.id}`, updateUserProfileDto);
  }
  public async delete(id: string): Promise<void> {
    return this.http.delete(`user-profile/delete/${id}`);
  }
}