// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service' // Модуль пользователей
import { getJwtSecret } from 'src/config/jwt.config'
import { LoginUserDto } from './dto/login-user.dto'
import { UserOutputDto } from 'src/users/dto/user-output.dto'
import { plainToClass } from 'class-transformer'
import { PrismaService } from 'src/prisma/prisma.service'
import { SignupUserDto } from './dto/signup-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService, // Инжектируем сервис пользователей
        private readonly jwtService: JwtService, // Инжектируем JWT сервис
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

        const payload = {
            sub: validatedUser.id,
        }
        const userDto = plainToClass(UserOutputDto, validatedUser)
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: getJwtSecret(),
                expiresIn: '60m',
            }),
            user: userDto,
        }
    }

    async signup(user: SignupUserDto) {
        // Хешируем пароль перед сохранением
        const hashedPassword = bcrypt.hashSync(user.password, 10)

        // Создаём пользователя в базе
        const newUser = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
            },
        })
        const payload = {
            sub: newUser.id,
        }
        const userDto = plainToClass(UserOutputDto, newUser)
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: getJwtSecret(),
            }),
            user: userDto,
        }
    }
}
