import { 
  AuthRepository, 
  ResearchRepository, 
  ResearchSetupRepository, 
  ResearchTicketRepository, 
  ResearchTokenRepository, 
  UserRepository 
} from "../../adapter/repository";
import TestResultRepository from "../../adapter/repository/TestResultRepository";
import UserProfileRepository from "../../adapter/repository/UserProfileRepository";
import { Infrastructure, Repository } from "./interface";

export default (infrastructure: Infrastructure): Repository => ({
  authRepository: new AuthRepository(infrastructure.http, infrastructure.localStorage),
  userRepository: new UserRepository(infrastructure.http),
  userProfileRepository: new UserProfileRepository(infrastructure.http),
  researchTokenRepository: new ResearchTokenRepository(infrastructure.http),
  researchRepository: new ResearchRepository(infrastructure.http),
  researchSetupRepository: new ResearchSetupRepository(infrastructure.http),
  researchTicketRepository: new ResearchTicketRepository(infrastructure.http),
  testResultRepository: new TestResultRepository(infrastructure.http),
});
