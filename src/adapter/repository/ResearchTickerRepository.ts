import { ResearchTicket } from "../../domain/model";
import { CreateResearchTicketDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { IResearchTicketRepository } from "./interface";

export default class ResearchTicketRepository implements IResearchTicketRepository {
  constructor(
     private readonly http: HttpClient
  ) { }

  public async getAll(filter?: Partial<ResearchTicket>): Promise<ResearchTicket[]> {
    return this.http.get('research-ticket/list')
  }
  public async getOneById(id: string): Promise<ResearchTicket> {
    return this.http.get(`research-ticket/${id}`);
  }
  public async create(createResearchTicketDto: CreateResearchTicketDto): Promise<ResearchTicket> {
    return this.http.post('research-ticket/create', createResearchTicketDto);
  }
  public async delete(id: string): Promise<void> {
    return this.http.delete(`research-ticket/${id}`);
  }
  
}