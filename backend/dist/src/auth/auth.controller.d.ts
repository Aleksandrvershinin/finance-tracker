import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { RequestLoginCodeDto } from './dto/request-login-code.dto';
import { ConfirmLoginCodeDto } from './dto/confirm-login-code.dto';
import { Request } from 'express';
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
    requestCode(dto: RequestLoginCodeDto, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    loginByCode(dto: ConfirmLoginCodeDto): Promise<{
        accessToken: string;
        user: import("../users/dto/user.dto").UserDto;
    }>;
}
