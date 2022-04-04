import { JwtTokens } from "../../../domain/model";
import LoginDto from "../../dto/LoginDto";

export default interface IAuthRepository {
  login(loginDto: LoginDto): Promise<JwtTokens>;
  logout(): void;
}