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
const mail_service_1 = require("../mail/mail.service");
const memory_cache_service_1 = require("../cache/memory-cache.service");
const THROTTLE_MS = 2 * 60 * 1000;
let AuthService = class AuthService {
    constructor(prisma, usersService, jwtService, mailService, cache) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.cache = cache;
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
        return this.buildAuthResponse(validatedUser.id);
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
        return this.buildAuthResponse(newUser.id);
    }
    async requestLoginCode(dto, ip) {
        const THROTTLE_TTL = 2 * 60 * 1000;
        const cacheKey = `login_code:${ip}`;
        if (this.cache.get(cacheKey)) {
            throw new common_1.BadRequestException('Повторная отправка возможна через 2 минуты');
        }
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            return { success: true, message: 'Код был отправлен' };
        }
        const code = this.generateCode();
        const codeHash = await bcrypt.hash(code, 10);
        await this.mailService.sendLoginCode(user.email, code);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                loginCodeHash: codeHash,
                loginCodeExpire: new Date(Date.now() + 10 * 60 * 1000),
            },
        });
        this.cache.set(cacheKey, true, THROTTLE_TTL);
        return { success: true, message: 'Код был отправлен' };
    }
    async loginByCode(dto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user || !user.loginCodeHash || !user.loginCodeExpire) {
            throw new common_1.UnauthorizedException('Invalid code');
        }
        if (user.loginBlockedUntil && user.loginBlockedUntil > new Date()) {
            const diff = Math.ceil((user.loginBlockedUntil.getTime() - Date.now()) / 60000);
            throw new common_1.UnauthorizedException(`Too many attempts. Try again in ${diff} min`);
        }
        if (user.loginCodeExpire < new Date()) {
            throw new common_1.UnauthorizedException('Code expired');
        }
        const isValid = await bcrypt.compare(dto.code, user.loginCodeHash);
        if (!isValid) {
            let loginAttempts = (user.loginAttempts || 0) + 1;
            let loginBlockedUntil = user.loginBlockedUntil;
            if (loginAttempts >= 3) {
                loginBlockedUntil = new Date(Date.now() + 10 * 60 * 1000);
                loginAttempts = 0;
            }
            await this.prisma.user.update({
                where: { id: user.id },
                data: { loginAttempts, loginBlockedUntil },
            });
            throw new common_1.UnauthorizedException('Invalid code');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                loginCodeHash: null,
                loginCodeExpire: null,
                loginAttempts: 0,
                loginBlockedUntil: null,
            },
        });
        return this.buildAuthResponse(user.id);
    }
    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async buildAuthResponse(userId) {
        const payload = { sub: userId };
        const userProfile = await this.prisma.user.findUnique({
            where: { id: userId },
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        memory_cache_service_1.MemoryCacheService])
], AuthService);
//# sourceMappingURL=auth.service.js.map