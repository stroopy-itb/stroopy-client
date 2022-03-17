import { BaseModel, ResearchSetup, ResearchToken, User } from ".";

export default interface Research extends BaseModel {
  groupToken: string;
  address: string;
  city: string;
  location: string;
  researchTokenId?: string;
  researcherId?: string;
  researcher?: User;
  researchToken?: ResearchToken;
  researchSetup: ResearchSetup;
}