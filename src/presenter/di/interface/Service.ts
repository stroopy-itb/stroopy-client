import { AuthService } from "../../../domain/service";
import { IAuthService, IUserService } from "../../../domain/service/interface";

export default interface Service {
  authService: IAuthService;
  userService: IUserService;
}