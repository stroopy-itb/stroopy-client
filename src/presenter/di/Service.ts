import { AuthService, UserService } from "../../domain/service";
import ResearchService from "../../domain/service/ResearchService";
import ResearchTokenService from "../../domain/service/ResearchTokenService";
import { Repository, Service } from "./interface";

export default (repository: Repository): Service => ({
  authService: new AuthService(repository.authRepository),
  userService: new UserService(repository.userRepository),
  researchTokenService: new ResearchTokenService(repository.researchTokenRepository),
  researchService: new ResearchService(repository.researchRepository)
});
