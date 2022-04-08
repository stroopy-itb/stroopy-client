import { 
  IAuthService, 
  IResearchService, 
  IResearchSetupService, 
  IResearchTicketService, 
  IResearchTokenService, 
  ITestResultService, 
  IUserProfileService, 
  IUserService 
} from "../../../domain/service/interface";

export default interface Service {
  authService: IAuthService;
  userService: IUserService;
  userProfileService: IUserProfileService;
  researchTokenService: IResearchTokenService;
  researchService: IResearchService;
  researchSetupService: IResearchSetupService;
  researchTicketService: IResearchTicketService;
  testResultService: ITestResultService;
}