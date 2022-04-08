import { ResearchToken } from "../../../domain/model";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../../dto";

export default interface IResearchTokenRepository {
  getAll(size: number, page: number, filter?: Partial<ResearchToken> & { full?: boolean }): Promise<ResearchToken[]>;
  getOne(filter?: Partial<ResearchToken> & { full?: boolean }): Promise<ResearchToken>;
  getOneById(id: string): Promise<ResearchToken>;
  getOneByResearcherId(researcherId: string): Promise<ResearchToken>;
  create(createResearchTokenDto: CreateResearchTokenDto): Promise<ResearchToken>;
  update(updateResearchTokenDto: UpdateResearchTokenDto): Promise<ResearchToken>;
  delete(id: string): Promise<void>;
}