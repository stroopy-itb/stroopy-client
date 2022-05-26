import { Gender, InstitutionType } from "../../domain/model";
import { BaseUpdateDto } from "./BaseUpdateDto";

export default class UpdateUserProfileDto extends BaseUpdateDto {
  public name?: string;
  public identityNumber?: string;
  public phone?: string;
  public email?: string;
  public dateOfBirth?: Date | string;
  public ethnicGroup?: string;
  public gender?: Gender;
  public job?: string;
  public institutionType?: InstitutionType;
  public institution?: string;
  public faculty?: string;
  public study?: string;
  public userId?: string;
}
