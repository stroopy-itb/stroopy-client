import { AuthRepository, UserRepository } from "../../adapter/repository";
import { Infrastructure, Repository } from "./interface";

export default (infrastructure: Infrastructure): Repository => ({
  authRepository: new AuthRepository(infrastructure.http, infrastructure.localStorage),
  userRepository: new UserRepository(infrastructure.http),
});
