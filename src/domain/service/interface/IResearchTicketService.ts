
import { CreateResearchTicketDto, ListResearchTicketResponseDto } from "../../../adapter/dto";
import { ResearchTicket } from "../../../domain/model";

export default interface IResearchTicketService {
  getAll(size: number, page: number, filter?: Partial<ResearchTicket>): Promise<ListResearchTicketResponseDto>;
  getOne(filter?: Partial<ResearchTicket>): Promise<ResearchTicket>;
  getOneById(id: string): Promise<ResearchTicket>;
  create(createResearchTicketDto: CreateResearchTicketDto): Promise<ResearchTicket>;
  delete(id: string): Promise<void>;
}