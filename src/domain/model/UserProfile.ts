import BaseModel from "./BaseModel";
import { Gender } from "./Gender";
import { InstitutionType } from "./InstitutionType";

export default interface UserProfile extends BaseModel {
  name: string;
  identityNumber: string;
  phone: string;
  email: string;
  dateOfBirth: Date | string;
  ethnicGroup: string;
  gender: Gender;
  job: string;
  institutionType: InstitutionType;
  institution: string;
  faculty: string;
  study: string;
  userId: string;
}