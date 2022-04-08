import BaseModel from "./BaseModel";
import UserProfile from "./UserProfile";
import { UserRole } from "./UserRole";

export default interface User extends BaseModel {
  username: string;
  role: UserRole;
  profile?: UserProfile;
}
