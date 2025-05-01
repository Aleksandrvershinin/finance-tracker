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
exports.CreateTransferDto = void 0;
const class_validator_1 = require("class-validator");
const is_exist_decorator_1 = require("../../validators/is-exist/is-exist.decorator");
class CreateTransferDto {
}
exports.CreateTransferDto = CreateTransferDto;
__decorate([
    (0, is_exist_decorator_1.IsExist)('account', 'id'),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTransferDto.prototype, "fromAccountId", void 0);
__decorate([
    (0, is_exist_decorator_1.IsExist)('account', 'id'),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTransferDto.prototype, "toAccountId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTransferDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", Date)
], CreateTransferDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "comment", void 0);
//# sourceMappingURL=create-transfer.dto.js.map