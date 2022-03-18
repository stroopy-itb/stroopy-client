import { ResearchSetup } from "../../../domain/model";
import { CreateResearchSetupDto, UpdateResearchSetupDto } from "../../dto";

export default interface IResearchSetupRepository {
  create(createResearchSetupDto: CreateResearchSetupDto): Promise<ResearchSetup>;
  update(updateResearchSetupDto: UpdateResearchSetupDto): Promise<ResearchSetup>;
}