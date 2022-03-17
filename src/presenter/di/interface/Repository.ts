import { IAuthRepository, IResearchRepository, IResearchTicketRepository, IResearchTokenRepository, IUserRepository } from "../../../adapter/repository/interface";

export default interface Repository {
  authRepository: IAuthRepository;
  userRepository: IUserRepository;
  researchTokenRepository: IResearchTokenRepository;
  researchRepository: IResearchRepository;
  researchTicketRepository: IResearchTicketRepository;
}