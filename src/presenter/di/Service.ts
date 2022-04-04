import { 
  AuthService, 
  ResearchService, 
  ResearchSetupService, 
  ResearchTicketService, 
  ResearchTokenService, 
  UserService 
} from "../../domain/service";
import TestResultService from "../../domain/service/TestResultService";
import { Repository, Service } from "./interface";

export default (repository: Repository): Service => ({
  authService: new AuthService(repository.authRepository),
  userService: new UserService(repository.userRepository),
  researchTokenService: new ResearchTokenService(repository.researchTokenRepository),
  researchService: new ResearchService(repository.researchRepository),
  researchSetupService: new ResearchSetupService(repository.researchSetupRepository),
  researchTicketService: new ResearchTicketService(repository.researchTicketRepository),
  testResultService: new TestResultService(repository.testResultRepository),
});
