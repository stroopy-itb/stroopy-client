import { CreateResearchSetupDto, UpdateResearchSetupDto } from "../../adapter/dto";
import { IResearchSetupRepository } from "../../adapter/repository/interface";
import { ResearchSetup } from "../model";
import { IResearchSetupService } from "./interface";

export default class ResearchSetupService implements IResearchSetupService {
  constructor(private readonly researchSetupRepository: IResearchSetupRepository) { }

  public async create(createResearchSetupDto: CreateResearchSetupDto): Promise<ResearchSetup> {
    return this.researchSetupRepository.create(createResearchSetupDto);
  }
  public async update(updateResearchSetupDto: UpdateResearchSetupDto): Promise<ResearchSetup> {
    return this.researchSetupRepository.update(updateResearchSetupDto);
  }
}
