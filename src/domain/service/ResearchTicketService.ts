import { CreateResearchTicketDto, ListResearchTicketResponseDto } from "../../adapter/dto";
import { IResearchTicketRepository } from "../../adapter/repository/interface";
import { ResearchTicket } from "../model";
import IResearchTicketService from "./interface/IResearchTicketService";

export default class ResearchTicketService implements IResearchTicketService {
  constructor(
    private readonly researchTicketRepository: IResearchTicketRepository
  ) { }

  public async getAll(size: number, page: number, filter?: Partial<ResearchTicket>): Promise<ListResearchTicketResponseDto> {
    return this.researchTicketRepository.getAll(size, page, filter);
  }
  public async getOne(filter?: Partial<ResearchTicket>): Promise<ResearchTicket> {
    return this.researchTicketRepository.getOne(filter);
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