import { ResearchTicket } from "../../domain/model";
import { CreateResearchTicketDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { IResearchTicketRepository } from "./interface";

export default class ResearchTicketRepository implements IResearchTicketRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  public async getAll(size: number, page: number, filter?: Partial<ResearchTicket>): Promise<ResearchTicket[]> {
    const query = queryMaker<ResearchTicket>(filter, true);
    return this.http.get(`research-ticket/list?size=${size}&page=${page}${query}`)
  }
  public async getOne(filter?: Partial<ResearchTicket>): Promise<ResearchTicket> {
    const query = queryMaker<ResearchTicket>(filter);

    return this.http.get(`research-ticket/${query}`)
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