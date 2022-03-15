import { AuthRepository, ResearchTokenRepository, UserRepository } from "../../adapter/repository";
import ResearchRepository from "../../adapter/repository/ResearchRepository";
import { Infrastructure, Repository } from "./interface";

export default (infrastructure: Infrastructure): Repository => ({
  authRepository: new AuthRepository(infrastructure.http, infrastructure.localStorage),
  userRepository: new UserRepository(infrastructure.http),
  researchTokenRepository: new ResearchTokenRepository(infrastructure.http),
  researchRepository: new ResearchRepository(infrastructure.http)
});
