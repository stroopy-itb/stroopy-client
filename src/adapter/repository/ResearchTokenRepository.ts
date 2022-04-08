import { ResearchToken } from "../../domain/model";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { IResearchTokenRepository } from "./interface";

export default class ResearchTokenRepository implements IResearchTokenRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(size: number, page: number, filter?: (Partial<ResearchToken> & { full?: boolean })): Promise<ResearchToken[]> {
const query = queryMaker<ResearchToken>(filter, true);

    return this.http.get(`research-token/list?size=${size}&page=${page}${query}`);
  }
  getOne(filter?: (Partial<ResearchToken> & { full?: boolean })): Promise<ResearchToken> {
const query = queryMaker<ResearchToken>(filter);

    return this.http.get(`research-token${query}`);
  }
  getOneById(id: string): Promise<ResearchToken> {
    return this.http.get(`research-token/${id}`);
  }
  getOneByResearcherId(researcherId: string): Promise<ResearchToken> {
    return this.http.get(`research-token/researcher/${researcherId}`);
  }
  create(createResearchTokenDto: CreateResearchTokenDto): Promise<ResearchToken> {
    return this.http.post(`research-token/create`, createResearchTokenDto);
  }
  update(updateResearchTokenDto: UpdateResearchTokenDto): Promise<ResearchToken> {
    return this.http.put(`research-token/update/${updateResearchTokenDto.id}`, updateResearchTokenDto);
  }
  delete(id: string): Promise<void> {
    return this.http.delete(`research-token/delete/${id}`);
  }
}
