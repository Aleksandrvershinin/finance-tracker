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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AccountsService = class AccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(user) {
        return this.prisma.account.findMany({
            where: {
                userId: user.id,
            },
            include: {
                currency: true,
                accountTag: true,
            },
        });
    }
    async create(data, user) {
        const uniqueAccount = await this.prisma.account.findFirst({
            where: {
                userId: user.id,
                name: data.name,
            },
        });
        if (uniqueAccount) {
            throw new common_1.BadRequestException(`${data.name} уже существует`);
        }
        return this.prisma.account.create({
            data: {
                userId: 1,
                balance: data.initialBalance,
                currencyId: user.currencyId,
                ...data,
            },
        });
    }
    async update(id, data, user) {
        const account = await this.prisma.account.findUnique({
            where: { id },
        });
        if (!account) {
            throw new common_1.NotFoundException('Счет не найден');
        }
        if (account.userId !== user.id) {
            throw new common_1.ForbiddenException('Нет доступа к данному счету');
        }
        const uniqueAccount = await this.prisma.account.findFirst({
            where: {
                id: {
                    not: id,
                },
                userId: user.id,
                name: data.name,
            },
        });
        if (uniqueAccount) {
            throw new common_1.BadRequestException(`${data.name} уже существует`);
        }
        if (data.initialBalance !== undefined) {
            const initialBalanceDifference = data.initialBalance - account.initialBalance;
            const newBalance = account.balance + initialBalanceDifference;
            if (newBalance < 0) {
                throw new common_1.BadRequestException('Balance cannot be negative');
            }
        }
        return this.prisma.account.update({
            where: { id },
            data: {
                ...data,
                balance: account.balance +
                    (data.initialBalance || 0) -
                    account.initialBalance,
            },
        });
    }
    async remove(id) {
        return this.prisma.account.delete({
            where: { id },
        });
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map