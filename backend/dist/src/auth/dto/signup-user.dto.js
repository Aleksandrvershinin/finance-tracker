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
exports.SignupUserDto = void 0;
const class_validator_1 = require("class-validator");
const is_exist_decorator_1 = require("../../validators/is-exist/is-exist.decorator");
const is_unique_decorator_1 = require("../../validators/is-unique/is-unique.decorator");
class SignupUserDto {
}
exports.SignupUserDto = SignupUserDto;
__decorate([
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupUserDto.prototype, "password", void 0);
__decorate([
    (0, is_unique_decorator_1.IsUnique)('user', 'email'),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, is_exist_decorator_1.IsExist)('currency', 'id'),
    __metadata("design:type", Number)
], SignupUserDto.prototype, "currencyId", void 0);
//# sourceMappingURL=signup-user.dto.js.map