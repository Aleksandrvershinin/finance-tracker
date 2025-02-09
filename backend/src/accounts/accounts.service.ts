import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { User } from '@prisma/client'
import { IsUnique } from 'src/validators/is-unique/is-unique.decorator'

@Injectable()
export class AccountsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(user: User) {
        return this.prisma.account.findMany({
            where: {
                userId: user.id,
            },
            include: {
                currency: true,
            },
        })
    }

    async create(data: CreateAccountDto, user: User) {
        return this.prisma.account.create({
            data: { userId: user.id, balance: data.initialBalance, ...data },
        })
    }

    async update(id: number, data: UpdateAccountDto, user: User) {
        const account = await this.prisma.account.findUnique({
            where: { id },
        })

        if (!account) {
            throw new NotFoundException('Счет не найден')
        }

        if (account.userId !== user.id) {
            throw new ForbiddenException('Нет доступа к данному счету')
        }
        const uniqueAccount = await this.prisma.account.findFirst({
            where: {
                id: {
                    not: id,
                },
                name: data.name,
            },
        })
        if (uniqueAccount) {
            throw new BadRequestException(`${data.name} уже существует`)
        }
        // Проверка изменения начального баланса
        if (data.initialBalance !== undefined) {
            // Разница между новым и старым начальным балансом
            const initialBalanceDifference =
                data.initialBalance - account.initialBalance

            // Новый баланс будет старый баланс плюс разница
            const newBalance = account.balance + initialBalanceDifference

            // Проверка, что новый баланс не становится отрицательным
            if (newBalance < 0) {
                throw new BadRequestException('Balance cannot be negative')
            }
        }

        return this.prisma.account.update({
            where: { id },
            data: {
                ...data, // Передаем все поля из DTO
                balance:
                    account.balance +
                    (data.initialBalance || 0) -
                    account.initialBalance, // Расчет нового баланса
            },
        })
    }

    async remove(id: number) {
        return this.prisma.account.delete({
            where: { id },
        })
    }
}
