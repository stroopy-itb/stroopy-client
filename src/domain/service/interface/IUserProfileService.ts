import { CreateUserProfileDto, UpdateUserProfileDto } from "../../../adapter/dto";
import { UserProfile } from "../../model";

export default interface IUserProfileTokenService {
  getOne(filter?: Partial<UserProfile> & { full?: boolean }): Promise<UserProfile>;
  getOneById(id: string): Promise<UserProfile>;
  create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile>;
  update(updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile>;
  delete(id: string): Promise<void>;
}