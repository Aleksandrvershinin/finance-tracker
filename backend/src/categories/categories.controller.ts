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
import { Category, User } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @GetUser() user: User,
    ): Promise<Category> {
        return this.categoriesService.create(createCategoryDto, user)
    }

    @Get()
    findAll(@GetUser() user: User): Promise<Category[]> {
        return this.categoriesService.findAllForUser(user)
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<Category | null> {
        return this.categoriesService.findOne(Number(id), user)
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @GetUser() user: User,
    ): Promise<Category> {
        return this.categoriesService.update(
            Number(id),
            updateCategoryDto,
            user,
        )
    }

    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: User): Promise<Category> {
        return this.categoriesService.remove(Number(id), user)
    }
}
