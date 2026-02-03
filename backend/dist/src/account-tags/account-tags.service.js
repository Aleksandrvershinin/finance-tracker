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
exports.AccountTagsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AccountTagsService = class AccountTagsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, user) {
        const uniqueAccount = await this.prisma.accountTag.findFirst({
            where: {
                userId: user.id,
                name: data.name,
            },
        });
        if (uniqueAccount) {
            throw new common_1.BadRequestException(`${data.name} уже существует`);
        }
        return this.prisma.accountTag.create({
            data: {
                userId: user.id,
                name: data.name,
                color: data.color,
                order: data.order
            },
        });
    }
    findAll(user) {
        return this.prisma.accountTag.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                order: 'asc',
            },
        });
    }
    async update(id, data, user) {
        const accountTag = await this.prisma.accountTag.findUnique({
            where: { id },
        });
        if (!accountTag) {
            throw new common_1.NotFoundException('Tag не найден');
        }
        if (accountTag.userId !== user.id) {
            throw new common_1.ForbiddenException('Нет доступа к данному Tag');
        }
        const uniqueAccountTag = await this.prisma.accountTag.findFirst({
            where: {
                id: {
                    not: id,
                },
                userId: user.id,
                name: data.name,
            },
        });
        if (uniqueAccountTag) {
            throw new common_1.BadRequestException(`${data.name} уже существует`);
        }
        return this.prisma.accountTag.update({
            where: { id },
            data: {
                name: data.name,
                color: data.color,
                order: data.order
            },
        });
    }
    async remove(id, user) {
        const accountTag = await this.prisma.accountTag.findUnique({
            where: { id },
        });
        if (!accountTag) {
            throw new common_1.NotFoundException('Tag не найден');
        }
        if (accountTag.userId !== user.id) {
            throw new common_1.ForbiddenException('Нет доступа к данному Tag');
        }
        return this.prisma.accountTag.delete({
            where: { id: accountTag.id },
        });
    }
    async reorder(dtos, user) {
        await this.prisma.$transaction(dtos.map(dto => this.prisma.accountTag.update({
            where: { id: dto.id, userId: user.id },
            data: { ...dto },
        })));
    }
};
exports.AccountTagsService = AccountTagsService;
exports.AccountTagsService = AccountTagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountTagsService);
//# sourceMappingURL=account-tags.service.js.map