import { ResearchTicket } from "../../domain/model";
import { BaseListResponseDto } from "./BaseListResponseDto";

export default class ResearchTicketListResponseDto extends BaseListResponseDto {
  researchTickets: ResearchTicket[];
}