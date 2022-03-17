import { ResearchTicket } from "../../../domain/model";
import { CreateResearchTicketDto } from "../../dto";

export default interface IResearchTicketRepository {
  getAll(filter?: Partial<ResearchTicket>): Promise<ResearchTicket[]>;
  getOneById(id: string): Promise<ResearchTicket>;
  create(createResearchTicketDto: CreateResearchTicketDto): Promise<ResearchTicket>;
  delete(id: string): Promise<void>;
}