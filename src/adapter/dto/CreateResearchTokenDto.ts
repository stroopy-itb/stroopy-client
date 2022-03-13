export default class CreateResearchTokenDto {
  public readonly token: string;
  public readonly expiredAt: Date | string;
}
