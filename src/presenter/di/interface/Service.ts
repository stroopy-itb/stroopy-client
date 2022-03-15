import { IAuthService, IResearchService, IResearchTokenService, IUserService } from "../../../domain/service/interface";

export default interface Service {
  authService: IAuthService;
  userService: IUserService;
  researchTokenService: IResearchTokenService;
  researchService: IResearchService;
}