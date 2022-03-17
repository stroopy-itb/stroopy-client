import { BaseModel } from ".";

export default interface ResearchSetup extends BaseModel {
  rounds: number;
  researchId: string;
}
