import { User } from ".";
import BaseModel from "./BaseModel";

export interface ResearchToken extends BaseModel {
  token: string;
  expiredAt: Date | string;
  researcher?: User;
}