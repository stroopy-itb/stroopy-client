import { BaseUpdateDto } from "./BaseUpdateDto";

export default class UpdateResearchSetupDto extends BaseUpdateDto {
  rounds: number;
  researchId: string;
}