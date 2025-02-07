import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Transaction, User } from '@prisma/client'

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateTransactionDto) {
        return this.prisma.transaction.create({
            data: dto,
        })
    }

    async findAll() {
        return this.prisma.transaction.findMany()
    }

    async findAllForUser(userId: User['id']) {
        // Получаем все accountId, принадлежащие пользователю
        const accounts = await this.prisma.account.findMany({
            where: { userId },
            select: { id: true },
        })

        // Массив accountId
        const accountIds = accounts.map((account) => account.id)

        if (accountIds.length === 0) {
            return [] // Если у пользователя нет аккаунтов, возвращаем пустой массив
        }

        // Получаем все транзакции для этих аккаунтов
        return this.prisma.transaction.findMany({
            where: {
                accountId: { in: accountIds }, // Фильтруем по accountId
            },
        })
    }
    async findOne(id: Transaction['id']) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
        })
        if (!transaction) {
            throw new NotFoundException(`Transaction with ID ${id} not found`)
        }
        return transaction
    }

    async update(id: Transaction['id'], dto: UpdateTransactionDto) {
        return this.prisma.transaction.update({
            where: { id },
            data: dto,
        })
    }

    async remove(id: Transaction['id']) {
        return this.prisma.transaction.delete({
            where: { id },
        })
    }

    async validateUserTransaction(
        userId: User['id'],
        transactionId: Transaction['id'],
    ) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { account: true }, // Подтягиваем связанный аккаунт
        })

        if (!transaction || transaction.account.userId !== userId) {
            throw new NotFoundException(
                `Transaction not found or access denied`,
            )
        }

        return transaction
    }
}
