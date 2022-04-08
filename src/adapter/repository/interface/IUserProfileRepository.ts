import { UserProfile } from "../../../domain/model";
import { CreateUserProfileDto, UpdateUserProfileDto } from "../../dto";

export default interface IUserProfileRepository {
  getOne(filter?: Partial<UserProfile> & { full?: boolean }): Promise<UserProfile>;
  getOneById(id: string): Promise<UserProfile>;
  create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile>;
  update(updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile>;
  delete(id: string): Promise<void>;
}