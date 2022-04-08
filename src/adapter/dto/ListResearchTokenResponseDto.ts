import { ResearchToken } from "../../domain/model";
import { BaseListResponseDto } from "./BaseListResponseDto";

export default class ResearchTokenListResponseDto extends BaseListResponseDto {
  researchTokens: ResearchToken[];
}