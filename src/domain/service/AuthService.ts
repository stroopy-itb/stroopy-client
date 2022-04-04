import { LoginDto } from "../../adapter/dto";
import { IAuthRepository } from "../../adapter/repository/interface";
import { JwtTokens } from "../model";
import { IAuthService } from "./interface";

export default class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository
  ) { }

  login(loginDto: LoginDto): Promise<JwtTokens> {
    return this.authRepository.login(loginDto);
  }
  logout(): void {
    return this.authRepository.logout();
  }
  
}