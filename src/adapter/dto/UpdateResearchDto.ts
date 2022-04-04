import { BaseUpdateDto } from "./BaseUpdateDto";

export default class UpdateResearchDto extends BaseUpdateDto {
  public groupToken: string;
  public address: string;
  public city: string;
  public location: string;
  public researchTokenId: string;
  public researcherId: string;
}
