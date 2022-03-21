import { 
  IAuthRepository, 
  IResearchRepository, 
  IResearchSetupRepository, 
  IResearchTicketRepository, 
  IResearchTokenRepository, 
  ITestResultRepository, 
  IUserRepository 
} from "../../../adapter/repository/interface";

export default interface Repository {
  authRepository: IAuthRepository;
  userRepository: IUserRepository;
  researchTokenRepository: IResearchTokenRepository;
  researchRepository: IResearchRepository;
  researchSetupRepository: IResearchSetupRepository;
  researchTicketRepository: IResearchTicketRepository;
  testResultRepository: ITestResultRepository;
}