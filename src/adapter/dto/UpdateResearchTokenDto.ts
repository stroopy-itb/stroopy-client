import { BaseUpdateDto } from "./BaseUpdateDto";

export default class UpdateResearchTokenDto extends BaseUpdateDto {
  public readonly token: string;
  public readonly expiredAt: Date | string;
  public readonly researcherId?: string;
}
