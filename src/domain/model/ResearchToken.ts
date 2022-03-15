import { User } from ".";
import BaseModel from "./BaseModel";

export default interface ResearchToken extends BaseModel {
  token: string;
  expiredAt: Date | string;
  researcher?: User;
}