// src/auth/auth.controller.ts
import {
    Controller,
    Post,
    Body,
    Req,
    BadRequestException,
    UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { SignupUserDto } from './dto/signup-user.dto'
import { RequestLoginCodeDto } from './dto/request-login-code.dto'
import { ConfirmLoginCodeDto } from './dto/confirm-login-code.dto'
import { Request } from 'express'
import { RecaptchaGuard } from 'src/recaptcha/recaptcha.guard'
import { Recaptcha } from 'src/recaptcha/recaptcha.decorator'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(RecaptchaGuard)
    @Post('login')
    @Recaptcha('login')
    async login(@Body() user: LoginUserDto) {
        return this.authService.login(user)
    }

    @UseGuards(RecaptchaGuard)
    @Recaptcha('signup')
    @Post('signup')
    async signup(@Body() signupUserDto: SignupUserDto) {
        return this.authService.signup(signupUserDto)
    }

    @UseGuards(RecaptchaGuard)
    @Post('login/code/request')
    @Recaptcha('loginCodeRequest')
    requestCode(@Body() dto: RequestLoginCodeDto, @Req() req: Request) {
        const ip = req.ip
        if (!ip) {
            throw new BadRequestException('Не удалось определить IP')
        }
        return this.authService.requestLoginCode(dto, ip)
    }

    @UseGuards(RecaptchaGuard)
    @Recaptcha('loginCodeConfirm')
    @Post('login/code/confirm')
    loginByCode(@Body() dto: ConfirmLoginCodeDto) {
        return this.authService.loginByCode(dto)
    }
}
