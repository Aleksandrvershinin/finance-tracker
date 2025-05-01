"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const jwt_config_1 = require("../config/jwt.config");
const class_transformer_1 = require("class-transformer");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const user_dto_1 = require("../users/dto/user.dto");
let AuthService = class AuthService {
    constructor(prisma, usersService, jwtService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(user) {
        const foundUser = await this.usersService.findByEmail(user.email);
        if (foundUser &&
            (await bcrypt.compare(user.password, foundUser.password))) {
            return foundUser;
        }
        return null;
    }
    async login(user) {
        const validatedUser = await this.validateUser(user);
        if (!validatedUser) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const payload = {
            sub: validatedUser.id,
        };
        const userProfile = await this.prisma.user.findUnique({
            where: { id: validatedUser.id },
            include: { currency: true },
        });
        const userDto = (0, class_transformer_1.plainToClass)(user_dto_1.UserDto, userProfile);
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: (0, jwt_config_1.getJwtSecret)(),
                expiresIn: '24h',
            }),
            user: userDto,
        };
    }
    async signup(signupUserDto) {
        const hashedPassword = bcrypt.hashSync(signupUserDto.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                currencyId: signupUserDto.currencyId,
                name: signupUserDto.name,
                email: signupUserDto.email,
                password: hashedPassword,
            },
        });
        const payload = {
            sub: newUser.id,
        };
        const userProfile = await this.prisma.user.findUnique({
            where: { id: newUser.id },
            include: { currency: true },
        });
        const userDto = (0, class_transformer_1.plainToClass)(user_dto_1.UserDto, userProfile);
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: (0, jwt_config_1.getJwtSecret)(),
            }),
            user: userDto,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map