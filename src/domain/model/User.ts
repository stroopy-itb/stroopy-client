import BaseModel from "./BaseModel";
import { UserRole } from "./UserRole";

export default interface User extends BaseModel {
  username: string;
  role: UserRole;
}
