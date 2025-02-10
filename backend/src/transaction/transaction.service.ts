import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Transaction, TransactionType, User } from '@prisma/client'
import { TransactionDto } from './dto/transaction.dto'

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    async create(userId: User['id'], dto: CreateTransactionDto) {
        // Проверяем, принадлежит ли accountId пользователю и существует ли счет
        const account = await this.prisma.account.findUnique({
            where: { id: dto.accountId },
        })

        if (!account) {
            throw new NotFoundException('Счет не найден')
        }

        if (account.userId !== userId) {
            throw new ForbiddenException('Нет доступа к данному счету')
        }

        // Проверка наличия средств для расходных транзакций
        // if (
        //     dto.type === TransactionType.EXPENSE &&
        //     account.balance < dto.amount
        // ) {
        //     throw new BadRequestException('Недостаточно средств на счете')
        // }

        // Начинаем транзакцию
        const transaction = await this.prisma.$transaction(async (prisma) => {
            // Создаем транзакцию
            const createdTransaction = await prisma.transaction.create({
                data: dto,
            })

            // Обновляем баланс счета в зависимости от типа транзакции
            let balanceChange = 0
            if (dto.type === TransactionType.INCOME) {
                balanceChange = dto.amount
            } else if (dto.type === TransactionType.EXPENSE) {
                balanceChange = -dto.amount
            }

            if (balanceChange !== 0) {
                await prisma.account.update({
                    where: { id: dto.accountId },
                    data: { balance: { increment: balanceChange } },
                })
            }

            return createdTransaction
        })

        return transaction
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
            orderBy: {
                date: 'desc', // Сортировка по убыванию (от новых к старым)
            },
        })
    }
    async findOne(userId: User['id'], id: Transaction['id']) {
        return await this.validateUserTransaction(userId, id)
    }

    async update(
        userId: User['id'],
        id: Transaction['id'],
        dto: UpdateTransactionDto,
    ) {
        const prismaTransaction = await this.prisma.$transaction(
            async (prisma) => {
                // Валидируем, что транзакция принадлежит пользователю
                const existingTransaction = await this.validateUserTransaction(
                    userId,
                    id,
                )

                if (!existingTransaction) {
                    throw new NotFoundException('Транзакция не найдена')
                }

                // Получаем аккаунт, к которому относится транзакция
                const account = await prisma.account.findUnique({
                    where: { id: existingTransaction.accountId },
                })

                if (!account) {
                    throw new NotFoundException('Счет не найден')
                }

                let amountToCheck = 0
                let balanceUpdate = 0

                // Проверяем, достаточно ли средств на счете, если тип транзакции - расход
                // if (
                //     dto.amount &&
                //     existingTransaction.type === TransactionType.EXPENSE
                // ) {
                //     amountToCheck = dto.amount - existingTransaction.amount

                //     if (amountToCheck > 0 && account.balance < amountToCheck) {
                //         throw new ForbiddenException(
                //             'Недостаточно средств на счете',
                //         )
                //     }
                // }

                // Вычисляем разницу баланса
                if (existingTransaction.amount !== dto.amount) {
                    if (existingTransaction.type === TransactionType.INCOME) {
                        balanceUpdate = dto.amount - existingTransaction.amount
                    } else if (
                        existingTransaction.type === TransactionType.EXPENSE
                    ) {
                        balanceUpdate = existingTransaction.amount - dto.amount
                    }
                }

                // Обновляем баланс
                if (balanceUpdate !== 0) {
                    await prisma.account.update({
                        where: { id: account.id },
                        data: {
                            balance: {
                                increment: balanceUpdate,
                            },
                        },
                    })
                }

                // Обновляем транзакцию
                const updatedTransaction = await prisma.transaction.update({
                    where: { id },
                    data: dto,
                })

                return updatedTransaction
            },
        )

        return prismaTransaction
    }

    async remove(userId: User['id'], id: Transaction['id']) {
        // Валидируем, что транзакция принадлежит пользователю
        const existingTransaction = await this.validateUserTransaction(
            userId,
            id,
        )

        // Получаем информацию о счете, связанном с транзакцией
        const account = await this.prisma.account.findUnique({
            where: { id: existingTransaction.accountId },
        })

        if (!account) {
            throw new NotFoundException('Счет не найден')
        }

        // Начинаем транзакцию для удаления и обновления баланса
        const deletedTransaction = await this.prisma.$transaction(
            async (prisma) => {
                // Проверка баланса перед восстановлением средств
                let balanceChange = 0
                if (existingTransaction.type === TransactionType.EXPENSE) {
                    balanceChange = existingTransaction.amount // Восстанавливаем деньги
                } else if (
                    existingTransaction.type === TransactionType.INCOME
                ) {
                    balanceChange = -existingTransaction.amount // Снижаем баланс (если доход)
                }

                // Проверка, что баланс не станет отрицательным
                // if (existingTransaction.type === TransactionType.EXPENSE) {
                //     const newBalance = account.balance + balanceChange
                //     if (newBalance < 0) {
                //         throw new ForbiddenException(
                //             'Баланс не может быть отрицательным после удаления транзакции',
                //         )
                //     }
                // }

                // Обновляем баланс счета
                if (balanceChange !== 0) {
                    await prisma.account.update({
                        where: { id: existingTransaction.accountId },
                        data: { balance: { increment: balanceChange } },
                    })
                }

                // Удаляем транзакцию
                return await prisma.transaction.delete({
                    where: { id },
                })
            },
        )

        return deletedTransaction
    }

    async validateUserTransaction(
        userId: User['id'],
        transactionId: Transaction['id'],
    ) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { account: true }, // Подтягиваем связанный аккаунт
        })

        if (!transaction) {
            throw new NotFoundException('Транзакция не найдена')
        }

        if (transaction.account.userId !== userId) {
            throw new ForbiddenException('Нет доступа к данной транзакции')
        }

        return transaction
    }
}
