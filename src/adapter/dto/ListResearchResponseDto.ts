import { Research } from "../../domain/model";
import { BaseListResponseDto } from "./BaseListResponseDto";

export default class ResearchListResponseDto extends BaseListResponseDto {
  researches: Research[];
}