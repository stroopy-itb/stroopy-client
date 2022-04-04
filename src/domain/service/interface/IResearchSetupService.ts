import { ResearchSetup } from "../../model";
import { CreateResearchSetupDto, UpdateResearchSetupDto } from "../../../adapter/dto";

export default interface IResearchSetupService {
  create(createResearchSetupDto: CreateResearchSetupDto): Promise<ResearchSetup>;
  update(updateResearchSetupDto: UpdateResearchSetupDto): Promise<ResearchSetup>;
}
