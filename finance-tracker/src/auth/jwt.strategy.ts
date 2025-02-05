// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { getJwtSecret } from 'src/config/jwt.config'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Берём токен из заголовка
            secretOrKey: getJwtSecret(),
        })
    }

    // Извлекаем пользователя из токена
    async validate(payload: any) {
        const user = await this.usersService.findById(payload.sub) // Получаем пользователя по id
        if (!user) {
            throw new Error('User not found')
        }
        return user // Возвращаем пользователя для дальнейшего использования
    }
}
