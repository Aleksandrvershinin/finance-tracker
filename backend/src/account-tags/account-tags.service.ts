import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateAccountTagDto } from './dto/create-account-tag.dto'
import { UpdateAccountTagDto } from './dto/update-account-tag.dto'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { ReorderAccountTagDto } from './dto/reorder-account-tag.dto'

@Injectable()
export class AccountTagsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateAccountTagDto, user: User) {
        const uniqueAccount = await this.prisma.accountTag.findFirst({
            where: {
                userId: user.id,
                name: data.name,
            },
        })
        if (uniqueAccount) {
            throw new BadRequestException(`${data.name} уже существует`)
        }
        return this.prisma.accountTag.create({
            data: {
                userId: user.id,
                name: data.name,
                color: data.color,
                order: data.order
            },
        })
    }

    findAll(user: User) {
        return this.prisma.accountTag.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                order: 'asc',
            },
        });
    }

    // findOne(id: number) {
    //     return `This action returns a #${id} accountTag`
    // }

    async update(id: number, data: UpdateAccountTagDto, user: User) {
        const accountTag = await this.prisma.accountTag.findUnique({
            where: { id },
        })
        if (!accountTag) {
            throw new NotFoundException('Tag не найден')
        }
        if (accountTag.userId !== user.id) {
            throw new ForbiddenException('Нет доступа к данному Tag')
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
        return this.prisma.accountTag.update({
            where: { id },
            data: {
                name: data.name,
                color: data.color,
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

    async reorder(dtos: ReorderAccountTagDto[], user: User) {
        // используем транзакцию, чтобы все обновления были атомарными
        await this.prisma.$transaction(
            dtos.map(dto =>
                this.prisma.accountTag.update({
                    where: { id: dto.id, userId: user.id },
                    data: { ...dto },
                })
            )
        )
    }
}
