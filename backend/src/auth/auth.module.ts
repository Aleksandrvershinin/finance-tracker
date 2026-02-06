import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module' // Предполагается, что есть модуль пользователей
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { MailModule } from 'src/mail/mail.module'
import { CacheModule } from 'src/cache/cache.module'

@Module({
    imports: [
        CacheModule,
        UsersModule, // Импортируем модуль пользователей
        PassportModule, // Импортируем Passport для аутентификации
        MailModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'super-secret-key', // Настройки JWT
        }),
    ],
    controllers: [AuthController], // Контроллер авторизации
    providers: [AuthService, JwtStrategy, JwtService],
})
export class AuthModule {}
