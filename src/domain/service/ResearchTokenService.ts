import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../../adapter/dto";
import { IResearchTokenRepository } from "../../adapter/repository/interface";
import { ResearchToken } from "../model/ResearchToken";
import { IResearchTokenService } from "./interface";

export default class ResearchTokenService implements IResearchTokenService {
  constructor(
    private readonly researchTokenRepository: IResearchTokenRepository
  ) { }

  getAll(): Promise<ResearchToken[]> {
    return this.researchTokenRepository.getAll();
  }
  getOne(id: string): Promise<ResearchToken> {
    return this.researchTokenRepository.getOne(id);
  }
  getOneByResearcherId(researcherId: string): Promise<ResearchToken> {
    return this.researchTokenRepository.getOneByResearcherId(researcherId);
  }
  create(createResearchTokenDto: CreateResearchTokenDto): Promise<ResearchToken> {
    return this.researchTokenRepository.create(createResearchTokenDto);
  }
  update(updateResearchTokenDto: UpdateResearchTokenDto): Promise<ResearchToken> {
    return this.researchTokenRepository.update(updateResearchTokenDto);
  }
  delete(id: string): Promise<void> {
    return this.researchTokenRepository.delete(id);
  }
}
