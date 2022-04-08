import { Research } from "../../domain/model";
import { CreateResearchDto, UpdateResearchDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { IResearchRepository } from "./interface";

export default class ResearchRepository implements IResearchRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(size: number, page: number, filter?: (Partial<Research> & { full?: boolean })): Promise<Research[]> {
const query = queryMaker<Research>(filter, true);

    return this.http.get(`research/list?size=${size}&page=${page}${query}`);
  }
  getOne(filter?: (Partial<Research> & { full?: boolean })): Promise<Research> {
const query = queryMaker<Research>(filter);

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