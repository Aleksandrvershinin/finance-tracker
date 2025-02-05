// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { SignupUserDto } from './dto/signup-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user: LoginUserDto) {
        return this.authService.login(user)
    }

    @Post('signup')
    async signup(@Body() user: SignupUserDto) {
        return this.authService.signup(user)
    }
}
