// src/categories/categories.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles.decorator'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto)
    }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Category | null> {
        return this.categoriesService.findOne(Number(id))
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
        return this.categoriesService.update(Number(id), updateCategoryDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.remove(Number(id))
    }
}
