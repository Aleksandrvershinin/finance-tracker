// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service' // Модуль пользователей
import * as bcrypt from 'bcrypt'
import { getJwtSecret } from 'src/config/jwt.config'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class AuthService {
    constructor(
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
            const { password, ...result } = foundUser // Возвращаем пользователя без пароля
            return result
        }
        return null // Возвращаем null в случае неудачи
    }

    async login(user: LoginUserDto) {
        const validatedUser = await this.validateUser(user) // Передаем пользователя в validateUser
        if (!validatedUser) {
            throw new UnauthorizedException('Invalid credentials') // Ошибка при неправильных данных
        }

        const payload = {
            sub: validatedUser.id,
        }

        return {
            access_token: this.jwtService.sign(payload, {
                secret: getJwtSecret(),
            }),
        }
    }
}
