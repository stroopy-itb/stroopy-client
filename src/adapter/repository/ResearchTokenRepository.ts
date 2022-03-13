import { ResearchToken } from "../../domain/model/ResearchToken";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { IResearchTokenRepository } from "./interface";

export default class ResearchTokenRepository implements IResearchTokenRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(): Promise<ResearchToken[]> {
    return this.http.get('research-token');
  }
  getOne(id: string): Promise<ResearchToken> {
    return this.http.get(`research-token/${id}`);
  }
  getOneByResearcherId(researcherId: string): Promise<ResearchToken> {
    return this.http.get(`research-token/researcher/${researcherId}`);
  }
  create(createResearchTokenDto: CreateResearchTokenDto): Promise<ResearchToken> {
    return this.http.post(`research-token/create`, createResearchTokenDto);
  }
  update(updateResearchTokenDto: UpdateResearchTokenDto): Promise<ResearchToken> {
    return this.http.put(`research-token/${updateResearchTokenDto.id}`, updateResearchTokenDto);
  }
  delete(id: string): Promise<void> {
    return this.http.delete(`research-token/${id}`);
  }
}
