export default class CreateResearchDto {
  public groupToken: string;
  public address: string;
  public city: string;
  public location: string;
  public researchSetup: {
    rounds: number;
  }
  public researchTokenId: string;
  public researcherId: string;
}
