import { Research } from "../../domain/model";
import { CreateResearchDto, ListResearchResponseDto, UpdateResearchDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { IResearchRepository } from "./interface";

export default class ResearchRepository implements IResearchRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  public async getAll(size: number, page: number, filter?: (Partial<Research> & { full?: boolean })): Promise<ListResearchResponseDto> {
    const query = queryMaker<Research>(filter, true);

    return this.http.get(`research/list?size=${size}&page=${page}${query}`);
  }
  public async getOne(filter?: (Partial<Research> & { full?: boolean })): Promise<Research> {
    const query = queryMaker<Research>(filter);

    return this.http.get(`research${query}`);
  }
  public async getOneById(id: string): Promise<Research> {
    return this.http.get(`research/${id}`);
  }
  public async create(createResearchDto: CreateResearchDto): Promise<Research> {
    return this.http.post(`research/create`, createResearchDto);
  }
  public async update(updateResearchDto: UpdateResearchDto): Promise<Research> {
    return this.http.put(`research/update/${updateResearchDto.id}`, updateResearchDto);
  }
  public async delete(id: string): Promise<void> {
    return this.http.delete(`research/delete/${id}`);
  }
}