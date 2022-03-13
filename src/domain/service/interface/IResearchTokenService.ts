import { ResearchToken } from "../../../domain/model/ResearchToken";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../../../adapter/dto";

export default interface IResearchRepository {
  getAll(filter?: Partial<ResearchToken> & { full?: boolean }): Promise<ResearchToken[]>;
  getOne(filter?: Partial<ResearchToken> & { full?: boolean }): Promise<ResearchToken>;
  getOneById(id: string): Promise<ResearchToken>;
  getOneByResearcherId(researcherId: string): Promise<ResearchToken>;
  create(createResearchTokenDto: CreateResearchTokenDto): Promise<ResearchToken>;
  update(updateResearchTokenDto: UpdateResearchTokenDto): Promise<ResearchToken>;
  delete(id: string): Promise<void>;
}