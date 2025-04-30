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

@Injectable()
export class AccountTagsService {
    constructor(private readonly prisma: PrismaService) {}

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
            },
        })
    }

    findAll(user: User) {
        return this.prisma.accountTag.findMany({
            where: {
                userId: user.id,
            },
        })
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
