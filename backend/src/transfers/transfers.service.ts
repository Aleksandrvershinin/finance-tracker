import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTransferDto } from './dto/create-transfer.dto'
import { User } from '@prisma/client'

@Injectable()
export class TransfersService {
    constructor(private readonly prisma: PrismaService) {}

    async createTransfer(
        createTransferDto: CreateTransferDto,
        user: User,
    ): Promise<any> {
        const { fromAccountId, toAccountId, amount, comment, date } =
            createTransferDto

        // Проверка наличия счетов и принадлежности текущего пользователя к отправляющему счету
        const fromAccount = await this.prisma.account.findUnique({
            where: { id: fromAccountId },
        })
        const toAccount = await this.prisma.account.findUnique({
            where: { id: toAccountId },
        })

        if (!fromAccount || !toAccount) {
            throw new NotFoundException('Один или оба счета не найдены')
        }
        if (fromAccount.id === toAccount.id) {
            throw new NotFoundException('Счета совпадают')
        }
        if (fromAccount.userId !== user.id || toAccount.userId !== user.id) {
            throw new BadRequestException('Вы не имеете доступа к этому счету')
        }

        // Проверка баланса на отправляемом счете
        if (fromAccount.balance < amount) {
            throw new BadRequestException('Недостаточно средств на счете')
        }

        // Начало транзакции
        const transaction = await this.prisma.$transaction(async (prisma) => {
            // Обновление баланса отправляющего и получающего счетов в рамках одной транзакции
            const updatedFromAccount = await prisma.account.update({
                where: { id: fromAccountId },
                data: { balance: fromAccount.balance - amount },
            })

            const updatedToAccount = await prisma.account.update({
                where: { id: toAccountId },
                data: { balance: toAccount.balance + amount },
            })

            // Создание перевода
            const transfer = await prisma.transfer.create({
                data: {
                    fromAccountId,
                    toAccountId,
                    amount,
                    comment,
                    date,
                },
            })

            // Возвращаем результат транзакции
            return { transfer, updatedFromAccount, updatedToAccount }
        })

        return transaction
    }

    async deleteTransfer(transferId: number, user: User): Promise<any> {
        const transfer = await this.prisma.transfer.findUnique({
            where: { id: transferId },
        })

        if (!transfer) {
            throw new NotFoundException('Перевод не найден')
        }

        const fromAccount = await this.prisma.account.findUnique({
            where: { id: transfer.fromAccountId },
        })
        const toAccount = await this.prisma.account.findUnique({
            where: { id: transfer.toAccountId },
        })

        if (!fromAccount || !toAccount) {
            throw new NotFoundException('Один или оба счета не найдены')
        }

        // Проверка, что пользователь может удалить перевод с этих счетов
        if (fromAccount.userId !== user.id || toAccount.userId !== user.id) {
            throw new BadRequestException('Вы не имеете доступа к этому счету')
        }
        // Проверка, что восстановление баланса не приведет к отрицательному балансу
        if (fromAccount.balance + transfer.amount < 0) {
            throw new BadRequestException(
                'Отправляющий счет не может иметь отрицательный баланс после удаления перевода',
            )
        }

        if (toAccount.balance - transfer.amount < 0) {
            throw new BadRequestException(
                'Получающий счет не может иметь отрицательный баланс после удаления перевода',
            )
        }
        // Начало транзакции для отмены перевода
        const transaction = await this.prisma.$transaction(async (prisma) => {
            // Восстановление баланса при удалении перевода
            const updatedFromAccount = await prisma.account.update({
                where: { id: fromAccount.id },
                data: { balance: fromAccount.balance + transfer.amount },
            })

            const updatedToAccount = await prisma.account.update({
                where: { id: toAccount.id },
                data: { balance: toAccount.balance - transfer.amount },
            })

            // Удаление перевода
            await prisma.transfer.delete({ where: { id: transferId } })

            // Возвращаем результат транзакции
            return {
                message: 'Перевод удален',
                updatedFromAccount,
                updatedToAccount,
            }
        })

        return transaction
    }
}
