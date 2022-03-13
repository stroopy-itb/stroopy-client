import { IAuthService, IResearchTokenService, IUserService } from "../../../domain/service/interface";

export default interface Service {
  authService: IAuthService;
  userService: IUserService;
  researchTokenService: IResearchTokenService;
}