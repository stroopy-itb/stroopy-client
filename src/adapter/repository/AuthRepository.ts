import { JwtTokens } from "../../domain/model";
import LoginDto from "../dto/LoginDto";
import { HttpClient, WebStorage } from "../infrastructure";
import { ACCESS_TOKEN_KEY } from "./constants";
import { IAuthRepository } from "./interface";

export default class AuthRepository implements IAuthRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly storage: WebStorage
  ) { }

  async login(loginDto: LoginDto): Promise<JwtTokens> {
    const response: JwtTokens = await this.http.post('auth/login', loginDto);

    if (response) {
      this.storage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
    }

    return response;
  }
  logout(): void {
    this.storage.removeItem(ACCESS_TOKEN_KEY);
  }

}