// src/categories/categories.service.ts
import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async create(
        createCategoryDto: CreateCategoryDto,
        user: User,
    ): Promise<Category> {
        return this.prisma.category.create({
            data: { ...createCategoryDto, userId: user.id },
        })
    }

    async findAll(): Promise<Category[]> {
        return this.prisma.category.findMany()
    }

    async findAllForUser(user: User): Promise<Category[]> {
        return this.prisma.category.findMany({
            where: { userId: user.id },
        })
    }

    async findOne(
        categoryId: Category['id'],
        user: User,
    ): Promise<Category | null> {
        return this.validateUserCategory(user.id, categoryId)
    }

    async update(
        categoryId: Category['id'],
        updateCategoryDto: UpdateCategoryDto,
        user: User,
    ): Promise<Category> {
        const category = await this.validateUserCategory(user.id, categoryId)
        return this.prisma.category.update({
            where: { id: category.id },
            data: updateCategoryDto,
        })
    }

    async remove(categoryId: Category['id'], user: User): Promise<Category> {
        const category = await this.validateUserCategory(user.id, categoryId)
        return this.prisma.category.delete({
            where: { id: category.id },
        })
    }

    async validateUserCategory(userId: User['id'], categoryId: Category['id']) {
        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
        })

        if (!category) {
            throw new NotFoundException('Категория не найдена')
        }

        if (category.userId !== userId) {
            throw new ForbiddenException('Нет доступа к данной категории')
        }

        return category
    }
}
