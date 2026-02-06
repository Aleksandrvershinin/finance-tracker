// src/auth/auth.service.ts
import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service' // Модуль пользователей
import { getJwtSecret } from 'src/config/jwt.config'
import { LoginUserDto } from './dto/login-user.dto'
import { plainToClass } from 'class-transformer'
import { PrismaService } from 'src/prisma/prisma.service'
import { SignupUserDto } from './dto/signup-user.dto'
import * as bcrypt from 'bcrypt'
import { UserDto } from 'src/users/dto/user.dto'
import { RequestLoginCodeDto } from './dto/request-login-code.dto'
import { ConfirmLoginCodeDto } from './dto/confirm-login-code.dto'
import { MailService } from 'src/mail/mail.service'
import { MemoryCacheService } from 'src/cache/memory-cache.service'
const THROTTLE_MS = 2 * 60 * 1000
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService, // Инжектируем сервис пользователей
        private readonly jwtService: JwtService, // Инжектируем JWT сервис
        private readonly mailService: MailService,
        private readonly cache: MemoryCacheService,
    ) {}

    // Валидация пользователя (проверка email и пароля)
    async validateUser(user: LoginUserDto) {
        const foundUser = await this.usersService.findByEmail(user.email) // Ищем пользователя по email
        if (
            foundUser &&
            (await bcrypt.compare(user.password, foundUser.password))
        ) {
            return foundUser
        }
        return null
    }

    async login(user: LoginUserDto) {
        const validatedUser = await this.validateUser(user) // Передаем пользователя в validateUser
        if (!validatedUser) {
            throw new UnauthorizedException('Invalid password') // Ошибка при неправильных данных
        }
        return this.buildAuthResponse(validatedUser.id)
    }

    async signup(signupUserDto: SignupUserDto) {
        // Хешируем пароль перед сохранением
        const hashedPassword = bcrypt.hashSync(signupUserDto.password, 10)

        // Создаём пользователя в базе
        const newUser = await this.prisma.user.create({
            data: {
                currencyId: signupUserDto.currencyId,
                name: signupUserDto.name,
                email: signupUserDto.email,
                password: hashedPassword,
            },
        })
        return this.buildAuthResponse(newUser.id)
    }

    async requestLoginCode(dto: RequestLoginCodeDto, ip: string) {
        const THROTTLE_TTL = 2 * 60 * 1000
        const cacheKey = `login_code:${ip}`

        if (this.cache.get(cacheKey)) {
            throw new BadRequestException(
                'Повторная отправка возможна через 2 минуты',
            )
        }

        const user = await this.usersService.findByEmail(dto.email)
        if (!user) {
            return { success: true, message: 'Код был отправлен' }
        }

        const code = this.generateCode()
        const codeHash = await bcrypt.hash(code, 10)

        await this.mailService.sendLoginCode(user.email, code)
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                loginCodeHash: codeHash,
                loginCodeExpire: new Date(Date.now() + 10 * 60 * 1000), // 10 минут
            },
        })
        this.cache.set(cacheKey, true, THROTTLE_TTL)
        return { success: true, message: 'Код был отправлен' }
    }

    async loginByCode(dto: ConfirmLoginCodeDto) {
        const user = await this.usersService.findByEmail(dto.email)
        if (!user || !user.loginCodeHash || !user.loginCodeExpire) {
            throw new UnauthorizedException('Invalid code')
        }

        if (user.loginBlockedUntil && user.loginBlockedUntil > new Date()) {
            const diff = Math.ceil(
                (user.loginBlockedUntil.getTime() - Date.now()) / 60000,
            )
            throw new UnauthorizedException(
                `Too many attempts. Try again in ${diff} min`,
            )
        }

        if (user.loginCodeExpire < new Date()) {
            throw new UnauthorizedException('Code expired')
        }

        const isValid = await bcrypt.compare(dto.code, user.loginCodeHash)

        if (!isValid) {
            // увеличиваем счетчик попыток
            let loginAttempts = (user.loginAttempts || 0) + 1
            let loginBlockedUntil = user.loginBlockedUntil

            if (loginAttempts >= 3) {
                loginBlockedUntil = new Date(Date.now() + 10 * 60 * 1000) // бан на 10 минут
                loginAttempts = 0 // сбрасываем счетчик после блокировки
            }

            await this.prisma.user.update({
                where: { id: user.id },
                data: { loginAttempts, loginBlockedUntil },
            })

            throw new UnauthorizedException('Invalid code')
        }

        // если код правильный, сбрасываем счетчик
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                loginCodeHash: null,
                loginCodeExpire: null,
                loginAttempts: 0,
                loginBlockedUntil: null,
            },
        })

        return this.buildAuthResponse(user.id)
    }

    private generateCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    private async buildAuthResponse(userId: number) {
        const payload = { sub: userId }

        const userProfile = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { currency: true },
        })

        const userDto = plainToClass(UserDto, userProfile)

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: getJwtSecret(),
                expiresIn: '24h',
            }),
            user: userDto,
        }
    }
}
