import { Research } from "../../domain/model";
import { CreateResearchDto, UpdateResearchDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { IResearchRepository } from "./interface";

export default class ResearchRepository implements IResearchRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(filter?: (Partial<Research> & { full?: boolean })): Promise<Research[]> {
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

    return this.http.get(`research/list${query}`);
  }
  getOne(filter?: (Partial<Research> & { full?: boolean })): Promise<Research> {
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

    return this.http.get(`research${query}`);
  }
  getOneById(id: string): Promise<Research> {
    return this.http.get(`research/${id}`);
  }
  create(createResearchDto: CreateResearchDto): Promise<Research> {
    return this.http.post(`research/create`, createResearchDto);
  }
  update(updateResearchDto: UpdateResearchDto): Promise<Research> {
    return this.http.put(`research/update/${updateResearchDto.id}`, updateResearchDto);
  }
  delete(id: string): Promise<void> {
    return this.http.delete(`research/delete/${id}`);
  }
}