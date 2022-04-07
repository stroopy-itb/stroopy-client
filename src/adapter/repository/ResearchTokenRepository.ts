import { ResearchToken } from "../../domain/model";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { IResearchTokenRepository } from "./interface";

export default class ResearchTokenRepository implements IResearchTokenRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(filter?: (Partial<ResearchToken> & { full?: boolean })): Promise<ResearchToken[]> {
    let query: string = "";
    if (filter) {
      let i = 0;
      Object.entries(filter).forEach((item) => {
        if (item[1]) {
          const string = ((i === 0) ? `?${item[0]}=${item[1]}` : `&${item[0]}=${item[1]}`);
          query = `${query}${string}`;
          i++;
        }
      });
    }

    return this.http.get(`research-token/list${query}`);
  }
  getOne(filter?: (Partial<ResearchToken> & { full?: boolean })): Promise<ResearchToken> {
    let query: string = "";
    if (filter) {
      let i = 0;
      Object.entries(filter).forEach((item) => {
        if (item[1]) {
          const string = ((i === 0) ? `?${item[0]}=${item[1]}` : `&${item[0]}=${item[1]}`);
          query = `${query}${string}`;
          i++;
        }
      });
    }

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
