// src/categories/categories.service.ts
import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.prisma.category.create({
            data: createCategoryDto,
        })
    }

    async findAll(): Promise<Category[]> {
        return this.prisma.category.findMany()
    }

    async findOne(id: number): Promise<Category | null> {
        return this.prisma.category.findUnique({
            where: { id },
        })
    }

    async update(
        id: number,
        updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
        return this.prisma.category.update({
            where: { id },
            data: updateCategoryDto,
        })
    }

    async remove(id: number): Promise<Category> {
        return this.prisma.category.delete({
            where: { id },
        })
    }
}
