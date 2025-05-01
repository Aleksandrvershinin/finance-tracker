import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: LoginUserDto): Promise<{
        accessToken: string;
        user: import("../users/dto/user.dto").UserDto;
    }>;
    signup(signupUserDto: SignupUserDto): Promise<{
        accessToken: string;
        user: import("../users/dto/user.dto").UserDto;
    }>;
}
