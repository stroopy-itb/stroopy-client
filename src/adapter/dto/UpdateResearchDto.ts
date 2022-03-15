import { BaseUpdateDto } from "./BaseUpdateDto";

export default class UpdateResearchDto extends BaseUpdateDto {
  public readonly groupToken: string;
  public readonly address: string;
  public readonly city: string;
  public readonly location: string;
  public readonly researchTokenId: string;
  public readonly researcherId: string;
}
