import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

@Injectable()
export class AccountsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.account.findMany({
            include: {
                currency: true,
            },
        })
    }

    async create(createAccountDto: CreateAccountDto) {
        return this.prisma.account.create({
            data: createAccountDto,
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
