import { 
  IAuthService, 
  IResearchService, 
  IResearchSetupService, 
  IResearchTicketService, 
  IResearchTokenService, 
  IUserService 
} from "../../../domain/service/interface";

export default interface Service {
  authService: IAuthService;
  userService: IUserService;
  researchTokenService: IResearchTokenService;
  researchService: IResearchService;
  researchSetupService: IResearchSetupService;
  researchTicketService: IResearchTicketService;
}