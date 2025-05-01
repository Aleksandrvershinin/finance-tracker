import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly usersService;
    private readonly jwtService;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService);
    validateUser(user: LoginUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        currencyId: number;
        password: string;
        role: import(".prisma/client").$Enums.Role;
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
}
