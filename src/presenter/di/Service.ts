import { AuthService, ResearchService, ResearchTicketService, ResearchTokenService, UserService } from "../../domain/service";
import { Repository, Service } from "./interface";

export default (repository: Repository): Service => ({
  authService: new AuthService(repository.authRepository),
  userService: new UserService(repository.userRepository),
  researchTokenService: new ResearchTokenService(repository.researchTokenRepository),
  researchService: new ResearchService(repository.researchRepository),
  researchTicketService: new ResearchTicketService(repository.researchTicketRepository)
});
