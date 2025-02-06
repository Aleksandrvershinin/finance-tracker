import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { User } from '@prisma/client'

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
            data: { userId: user.id, ...data },
        })
    }

    async update(id: number, updateAccountDto: UpdateAccountDto) {
        return this.prisma.account.update({
            where: { id },
            data: updateAccountDto,
        })
    }

    async remove(id: number) {
        return this.prisma.account.delete({
            where: { id },
        })
    }
}
