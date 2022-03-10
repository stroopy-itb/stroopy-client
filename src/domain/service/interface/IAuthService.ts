import { LoginDto } from "../../../adapter/dto";
import { JwtTokens } from "../../model";

export default interface IAuthService {
  login(loginDto: LoginDto): Promise<JwtTokens>;
  logout(): void;
}