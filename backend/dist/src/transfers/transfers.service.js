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
exports.TransfersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TransfersService = class TransfersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllForUser(userId) {
        const accounts = await this.prisma.account.findMany({
            where: { userId },
            select: { id: true },
        });
        const accountIds = accounts.map((account) => account.id);
        if (accountIds.length === 0) {
            return [];
        }
        return await this.prisma.transfer.findMany({
            where: {
                OR: [
                    { fromAccountId: { in: accountIds } },
                    { toAccountId: { in: accountIds } },
                ],
            },
        });
    }
    async createTransfer(createTransferDto, user) {
        const { fromAccountId, toAccountId, amount, comment, date } = createTransferDto;
        const fromAccount = await this.prisma.account.findUnique({
            where: { id: fromAccountId },
        });
        const toAccount = await this.prisma.account.findUnique({
            where: { id: toAccountId },
        });
        if (!fromAccount || !toAccount) {
            throw new common_1.NotFoundException('Один или оба счета не найдены');
        }
        if (fromAccount.id === toAccount.id) {
            throw new common_1.NotFoundException('Счета совпадают');
        }
        if (fromAccount.userId !== user.id || toAccount.userId !== user.id) {
            throw new common_1.BadRequestException('Вы не имеете доступа к этому счету');
        }
        if (fromAccount.balance < amount) {
            throw new common_1.BadRequestException('Недостаточно средств на счете');
        }
        const transaction = await this.prisma.$transaction(async (prisma) => {
            const updatedFromAccount = await prisma.account.update({
                where: { id: fromAccountId },
                data: { balance: fromAccount.balance - amount },
            });
            const updatedToAccount = await prisma.account.update({
                where: { id: toAccountId },
                data: { balance: toAccount.balance + amount },
            });
            const transfer = await prisma.transfer.create({
                data: {
                    fromAccountId,
                    toAccountId,
                    amount,
                    comment,
                    date,
                },
            });
            return { transfer, updatedFromAccount, updatedToAccount };
        });
        return transaction;
    }
    async deleteTransfer(transferId, user) {
        const transfer = await this.prisma.transfer.findUnique({
            where: { id: transferId },
        });
        if (!transfer) {
            throw new common_1.NotFoundException('Перевод не найден');
        }
        const fromAccount = await this.prisma.account.findUnique({
            where: { id: transfer.fromAccountId },
        });
        const toAccount = await this.prisma.account.findUnique({
            where: { id: transfer.toAccountId },
        });
        if (!fromAccount || !toAccount) {
            throw new common_1.NotFoundException('Один или оба счета не найдены');
        }
        if (fromAccount.userId !== user.id || toAccount.userId !== user.id) {
            throw new common_1.BadRequestException('Вы не имеете доступа к этому счету');
        }
        if (fromAccount.balance + transfer.amount < 0) {
            throw new common_1.BadRequestException('Отправляющий счет не может иметь отрицательный баланс после удаления перевода');
        }
        if (toAccount.balance - transfer.amount < 0) {
            throw new common_1.BadRequestException('Получающий счет не может иметь отрицательный баланс после удаления перевода');
        }
        const transaction = await this.prisma.$transaction(async (prisma) => {
            const updatedFromAccount = await prisma.account.update({
                where: { id: fromAccount.id },
                data: { balance: fromAccount.balance + transfer.amount },
            });
            const updatedToAccount = await prisma.account.update({
                where: { id: toAccount.id },
                data: { balance: toAccount.balance - transfer.amount },
            });
            await prisma.transfer.delete({ where: { id: transferId } });
            return {
                message: 'Перевод удален',
                updatedFromAccount,
                updatedToAccount,
            };
        });
        return transaction;
    }
};
exports.TransfersService = TransfersService;
exports.TransfersService = TransfersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransfersService);
//# sourceMappingURL=transfers.service.js.map