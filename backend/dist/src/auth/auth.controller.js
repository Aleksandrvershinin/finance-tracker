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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_user_dto_1 = require("./dto/login-user.dto");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const request_login_code_dto_1 = require("./dto/request-login-code.dto");
const confirm_login_code_dto_1 = require("./dto/confirm-login-code.dto");
const recaptcha_guard_1 = require("../recaptcha/recaptcha.guard");
const recaptcha_decorator_1 = require("../recaptcha/recaptcha.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(user) {
        return this.authService.login(user);
    }
    async signup(signupUserDto) {
        return this.authService.signup(signupUserDto);
    }
    requestCode(dto, req) {
        const ip = req.ip;
        if (!ip) {
            throw new common_1.BadRequestException('Не удалось определить IP');
        }
        return this.authService.requestLoginCode(dto, ip);
    }
    loginByCode(dto) {
        return this.authService.loginByCode(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(recaptcha_guard_1.RecaptchaGuard),
    (0, common_1.Post)('login'),
    (0, recaptcha_decorator_1.Recaptcha)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(recaptcha_guard_1.RecaptchaGuard),
    (0, recaptcha_decorator_1.Recaptcha)('signup'),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.SignupUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.UseGuards)(recaptcha_guard_1.RecaptchaGuard),
    (0, common_1.Post)('login/code/request'),
    (0, recaptcha_decorator_1.Recaptcha)('loginCodeRequest'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_login_code_dto_1.RequestLoginCodeDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "requestCode", null);
__decorate([
    (0, common_1.UseGuards)(recaptcha_guard_1.RecaptchaGuard),
    (0, recaptcha_decorator_1.Recaptcha)('loginCodeConfirm'),
    (0, common_1.Post)('login/code/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_login_code_dto_1.ConfirmLoginCodeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginByCode", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map