import { 
  IAuthRepository, 
  IResearchRepository, 
  IResearchSetupRepository, 
  IResearchTicketRepository, 
  IResearchTokenRepository, 
  ITestResultRepository, 
  IUserProfileRepository, 
  IUserRepository 
} from "../../../adapter/repository/interface";

export default interface Repository {
  authRepository: IAuthRepository;
  userRepository: IUserRepository;
  userProfileRepository: IUserProfileRepository;
  researchTokenRepository: IResearchTokenRepository;
  researchRepository: IResearchRepository;
  researchSetupRepository: IResearchSetupRepository;
  researchTicketRepository: IResearchTicketRepository;
  testResultRepository: ITestResultRepository;
}