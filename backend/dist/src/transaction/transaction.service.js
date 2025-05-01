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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TransactionService = class TransactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const account = await this.prisma.account.findUnique({
            where: { id: dto.accountId },
        });
        if (!account) {
            throw new common_1.NotFoundException('Счет не найден');
        }
        if (account.userId !== userId) {
            throw new common_1.ForbiddenException('Нет доступа к данному счету');
        }
        const transaction = await this.prisma.$transaction(async (prisma) => {
            const createdTransaction = await prisma.transaction.create({
                data: dto,
            });
            let balanceChange = 0;
            if (dto.type === client_1.TransactionType.INCOME) {
                balanceChange = dto.amount;
            }
            else if (dto.type === client_1.TransactionType.EXPENSE) {
                balanceChange = -dto.amount;
            }
            if (balanceChange !== 0) {
                await prisma.account.update({
                    where: { id: dto.accountId },
                    data: { balance: { increment: balanceChange } },
                });
            }
            return createdTransaction;
        });
        return transaction;
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
        return this.prisma.transaction.findMany({
            where: {
                accountId: { in: accountIds },
            },
            orderBy: {
                date: 'desc',
            },
        });
    }
    async findOne(userId, id) {
        return await this.validateUserTransaction(userId, id);
    }
    async update(userId, id, dto) {
        const prismaTransaction = await this.prisma.$transaction(async (prisma) => {
            const existingTransaction = await this.validateUserTransaction(userId, id);
            if (!existingTransaction) {
                throw new common_1.NotFoundException('Транзакция не найдена');
            }
            const account = await prisma.account.findUnique({
                where: { id: existingTransaction.accountId },
            });
            if (!account) {
                throw new common_1.NotFoundException('Счет не найден');
            }
            let amountToCheck = 0;
            let balanceUpdate = 0;
            if (existingTransaction.amount !== dto.amount) {
                if (existingTransaction.type === client_1.TransactionType.INCOME) {
                    balanceUpdate = dto.amount - existingTransaction.amount;
                }
                else if (existingTransaction.type === client_1.TransactionType.EXPENSE) {
                    balanceUpdate = existingTransaction.amount - dto.amount;
                }
            }
            if (balanceUpdate !== 0) {
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        balance: {
                            increment: balanceUpdate,
                        },
                    },
                });
            }
            const updatedTransaction = await prisma.transaction.update({
                where: { id },
                data: dto,
            });
            return updatedTransaction;
        });
        return prismaTransaction;
    }
    async remove(userId, id) {
        const existingTransaction = await this.validateUserTransaction(userId, id);
        const account = await this.prisma.account.findUnique({
            where: { id: existingTransaction.accountId },
        });
        if (!account) {
            throw new common_1.NotFoundException('Счет не найден');
        }
        const deletedTransaction = await this.prisma.$transaction(async (prisma) => {
            let balanceChange = 0;
            if (existingTransaction.type === client_1.TransactionType.EXPENSE) {
                balanceChange = existingTransaction.amount;
            }
            else if (existingTransaction.type === client_1.TransactionType.INCOME) {
                balanceChange = -existingTransaction.amount;
            }
            if (balanceChange !== 0) {
                await prisma.account.update({
                    where: { id: existingTransaction.accountId },
                    data: { balance: { increment: balanceChange } },
                });
            }
            return await prisma.transaction.delete({
                where: { id },
            });
        });
        return deletedTransaction;
    }
    async validateUserTransaction(userId, transactionId) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { account: true },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Транзакция не найдена');
        }
        if (transaction.account.userId !== userId) {
            throw new common_1.ForbiddenException('Нет доступа к данной транзакции');
        }
        return transaction;
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map