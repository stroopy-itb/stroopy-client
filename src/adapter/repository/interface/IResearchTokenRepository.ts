import { ResearchToken } from "../../../domain/model/ResearchToken";
import { CreateResearchTokenDto, UpdateResearchTokenDto } from "../../dto";

export default interface IResearchRepository {
  getAll(): Promise<ResearchToken[]>;
  getOne(id: string): Promise<ResearchToken>;
  getOneByResearcherId(researcherId: string): Promise<ResearchToken>;
  create(createResearchTokenDto: CreateResearchTokenDto): Promise<ResearchToken>;
  update(updateResearchTokenDto: UpdateResearchTokenDto): Promise<ResearchToken>;
  delete(id: string): Promise<void>;
}