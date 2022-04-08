import BaseModel from "./BaseModel";
import { InstitutionType } from "./InstitutionType";

export default interface UserProfile extends BaseModel {
  name: string;
  identityNumber: string;
  phone: string;
  email: string;
  institutionType: InstitutionType;
  institution: string;
  faculty: string;
  study: string;
  userId: string;
}