import { CreateResearchTicketDto } from "../../adapter/dto";
import { IResearchTicketRepository } from "../../adapter/repository/interface";
import { ResearchTicket } from "../model";
import IResearchTicketService from "./interface/IResearchTicketService";

export default class ResearchTicketService implements IResearchTicketService {
  constructor(
    private readonly researchTicketRepository: IResearchTicketRepository
  ) { }

  public async getAll(filter?: Partial<ResearchTicket>): Promise<ResearchTicket[]> {
    return this.researchTicketRepository.getAll(filter);
  }
  public async getOneById(id: string): Promise<ResearchTicket> {
    return this.researchTicketRepository.getOneById(id);
  }
  public async create(createResearchTicketDto: CreateResearchTicketDto): Promise<ResearchTicket> {
    return this.researchTicketRepository.create(createResearchTicketDto);
  }
  public async delete(id: string): Promise<void> {
    return this.researchTicketRepository.delete(id);
  }

}