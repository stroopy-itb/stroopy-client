import { BaseUpdateDto } from "./BaseUpdateDto";

export default class UpdateResearchTokenDto extends BaseUpdateDto {
  public token: string;
  public expiredAt: Date | string;
  public researcherId?: string;
}
