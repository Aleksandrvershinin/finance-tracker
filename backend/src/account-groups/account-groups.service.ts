import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAccountGroupDto } from './dto/create-account-group.dto'
import { UpdateAccountGroupDto } from './dto/update-account-group.dto'

@Injectable()
export class AccountGroupsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateAccountGroupDto, user: User) {
        const uniqueAccount = await this.prisma.accountGroup.findFirst({
            where: {
                userId: user.id,
                name: data.name,
            },
        })
        if (uniqueAccount) {
            throw new BadRequestException(`${data.name} уже существует`)
        }
        return this.prisma.accountGroup.create({
            data: {
                userId: user.id,
                name: data.name,
                isVisible: data.isVisible,
                order: data.order
            },
        })
    }

    findAll(user: User) {
        return this.prisma.accountGroup.findMany({
            where: {
                userId: user.id,
            },
        })
    }

    // findOne(id: number) {
    //     return `This action returns a #${id} accountTag`
    // }

    async update(id: number, data: UpdateAccountGroupDto, user: User) {
        const accountTag = await this.prisma.accountGroup.findUnique({
            where: { id },
        })
        if (!accountTag) {
            throw new NotFoundException('Группа не найден')
        }
        if (accountTag.userId !== user.id) {
            throw new ForbiddenException('Нет доступа к данной группе')
        }
        const uniqueAccountTag = await this.prisma.accountTag.findFirst({
            where: {
                id: {
                    not: id,
                },
                userId: user.id,
                name: data.name,
            },
        })
        if (uniqueAccountTag) {
            throw new BadRequestException(`${data.name} уже существует`)
        }
        return this.prisma.accountGroup.update({
            where: { id },
            data: {
                name: data.name,
                isVisible: data.isVisible,
                order: data.order
            },
        })
    }

    async remove(id: number, user: User) {
        const accountTag = await this.prisma.accountTag.findUnique({
            where: { id },
        })
        if (!accountTag) {
            throw new NotFoundException('Tag не найден')
        }
        if (accountTag.userId !== user.id) {
            throw new ForbiddenException('Нет доступа к данному Tag')
        }
        return this.prisma.accountTag.delete({
            where: { id: accountTag.id },
        })
    }
}
