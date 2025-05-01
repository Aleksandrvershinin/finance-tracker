import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, User } from '@prisma/client';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto, user: User): Promise<Category>;
    findAll(user: User): Promise<Category[]>;
    findOne(id: string, user: User): Promise<Category | null>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, user: User): Promise<Category>;
    remove(id: string, user: User): Promise<Category>;
}
