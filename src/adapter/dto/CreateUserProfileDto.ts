import { InstitutionType } from "../../domain/model";

export default class CreateUserProfileDto {
  public name: string;
  public identityNumber: string;
  public phone: string;
  public email: string;
  public institutionType: InstitutionType;
  public institution: string;
  public faculty: string;
  public study: string;
  public userId: string;
}
