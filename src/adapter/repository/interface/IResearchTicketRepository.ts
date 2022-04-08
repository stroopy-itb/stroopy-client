import { ResearchTicket } from "../../../domain/model";
import { CreateResearchTicketDto } from "../../dto";

export default interface IResearchTicketRepository {
  getAll(size: number, page: number, filter?: Partial<ResearchTicket>): Promise<ResearchTicket[]>;
  getOne(filter?: Partial<ResearchTicket>): Promise<ResearchTicket>;
  getOneById(id: string): Promise<ResearchTicket>;
  create(createResearchTicketDto: CreateResearchTicketDto): Promise<ResearchTicket>;
  delete(id: string): Promise<void>;
}