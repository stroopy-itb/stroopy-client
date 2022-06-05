import { BaseModel } from ".";

export default interface ResearchSetup extends BaseModel {
  rounds: number;
  timeout: number;
  researchId: string;
}
