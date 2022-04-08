import { CreateUserProfileDto, UpdateUserProfileDto } from "../../adapter/dto";
import { IUserProfileRepository } from "../../adapter/repository/interface";
import { UserProfile } from "../model";
import { IUserProfileService } from "./interface";

export default class UserProfileService implements IUserProfileService {
  constructor(
    private readonly userProfileRepository: IUserProfileRepository
  ) { }

  public async getOne(filter?: Partial<UserProfile> & { full?: boolean | undefined; }): Promise<UserProfile> {
    return this.userProfileRepository.getOne(filter);
  }
  public async getOneById(id: string): Promise<UserProfile> {
    return this.userProfileRepository.getOneById(id);
  }
  public async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    return this.userProfileRepository.create(createUserProfileDto);
  }
  public async update(updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile> {
    return this.userProfileRepository.update(updateUserProfileDto);
  }
  public async delete(id: string): Promise<void> {
    return this.userProfileRepository.delete(id);
  }
}
