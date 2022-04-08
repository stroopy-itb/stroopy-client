import { UserProfile } from "../../domain/model";
import { CreateUserProfileDto, UpdateUserProfileDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { IUserProfileRepository } from "./interface";

export default class UserProfileRepository implements IUserProfileRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  public async getOne(filter?: (Partial<UserProfile> & { full?: boolean })): Promise<UserProfile> {
    let query: string = "";
    if (filter) {
      let i = 0;
      Object.entries(filter).forEach((item) => {
        if (item[1]) {
          const string = ((i === 0) ? `?${item[0]}=${item[1]}` : `&${item[0]}=${item[1]}`);
          query = `${query}${string}`;
          i++;
        }
      });
    }

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