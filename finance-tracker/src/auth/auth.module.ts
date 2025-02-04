import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module' // Предполагается, что есть модуль пользователей
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        UsersModule, // Импортируем модуль пользователей
        PassportModule, // Импортируем Passport для аутентификации
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'super-secret-key', // Настройки JWT
            signOptions: { expiresIn: '1h' }, // Токен будет действовать 1 час
        }),
    ],
    controllers: [AuthController], // Контроллер авторизации
    providers: [AuthService, JwtStrategy, JwtService], // Сервис и стратегия для авторизации
})
export class AuthModule {}
