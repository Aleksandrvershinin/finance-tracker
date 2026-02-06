import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { RequestLoginCodeDto } from './dto/request-login-code.dto';
import { ConfirmLoginCodeDto } from './dto/confirm-login-code.dto';
import { MailService } from 'src/mail/mail.service';
import { MemoryCacheService } from 'src/cache/memory-cache.service';
export declare class AuthService {
    private readonly prisma;
    private readonly usersService;
    private readonly jwtService;
    private readonly mailService;
    private readonly cache;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService, mailService: MailService, cache: MemoryCacheService);
    validateUser(user: LoginUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        currencyId: number;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        loginCodeHash: string | null;
        loginCodeExpire: Date | null;
        loginAttempts: number;
        loginBlockedUntil: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(user: LoginUserDto): Promise<{
        accessToken: string;
        user: UserDto;
    }>;
    signup(signupUserDto: SignupUserDto): Promise<{
        accessToken: string;
        user: UserDto;
    }>;
    requestLoginCode(dto: RequestLoginCodeDto, ip: string): Promise<{
        success: boolean;
        message: string;
    }>;
    loginByCode(dto: ConfirmLoginCodeDto): Promise<{
        accessToken: string;
        user: UserDto;
    }>;
    private generateCode;
    private buildAuthResponse;
}
