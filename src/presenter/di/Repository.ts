import { 
  AuthRepository, 
  ResearchRepository, 
  ResearchSetupRepository, 
  ResearchTicketRepository, 
  ResearchTokenRepository, 
  UserRepository 
} from "../../adapter/repository";
import { Infrastructure, Repository } from "./interface";

export default (infrastructure: Infrastructure): Repository => ({
  authRepository: new AuthRepository(infrastructure.http, infrastructure.localStorage),
  userRepository: new UserRepository(infrastructure.http),
  researchTokenRepository: new ResearchTokenRepository(infrastructure.http),
  researchRepository: new ResearchRepository(infrastructure.http),
  researchSetupRepository: new ResearchSetupRepository(infrastructure.http),
  researchTicketRepository: new ResearchTicketRepository(infrastructure.http)
});
