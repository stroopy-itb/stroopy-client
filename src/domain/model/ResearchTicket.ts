import { BaseModel, Research, User } from ".";

export default interface ResearchTicket extends BaseModel {
  researchId: string;
  respondentId: string;
  research?: Research;
  respondent?: User;
}
