import { ResearchSetup } from "../../domain/model";
import { CreateResearchSetupDto, UpdateResearchSetupDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { IResearchSetupRepository } from "./interface";

export default class ResearchSetupRepository implements IResearchSetupRepository {
  constructor(private readonly http: HttpClient) { }

  public async create(createResearchSetupDto: CreateResearchSetupDto): Promise<ResearchSetup> {
    return this.http.post('research-setup/create', createResearchSetupDto);
  }
  public async update(updateResearchSetupDto: UpdateResearchSetupDto): Promise<ResearchSetup> {
    return this.http.put(`research-setup/update/${updateResearchSetupDto.id}`, updateResearchSetupDto);
  }
}
