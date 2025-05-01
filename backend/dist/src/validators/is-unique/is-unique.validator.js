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
exports.IsUniqueConstraint = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const class_validator_1 = require("class-validator");
let IsUniqueConstraint = class IsUniqueConstraint {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validate(value, args) {
        const [tableName, fieldName] = args.constraints;
        const model = this.prisma[tableName];
        if (!model ||
            !('findUnique' in model) ||
            typeof model.findUnique !== 'function') {
            throw new Error(`Модель ${tableName} не поддерживает метод findUnique`);
        }
        const record = await model.findUnique({
            where: { [fieldName]: value },
        });
        return !record;
    }
    defaultMessage(args) {
        return `${args.value} уже существует`;
    }
};
exports.IsUniqueConstraint = IsUniqueConstraint;
exports.IsUniqueConstraint = IsUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IsUniqueConstraint);
//# sourceMappingURL=is-unique.validator.js.map