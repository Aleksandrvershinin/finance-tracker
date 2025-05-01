import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto, user: User): Promise<Category>;
    findAll(): Promise<Category[]>;
    findAllForUser(user: User): Promise<Category[]>;
    findOne(categoryId: Category['id'], user: User): Promise<Category | null>;
    update(categoryId: Category['id'], updateCategoryDto: UpdateCategoryDto, user: User): Promise<Category>;
    remove(categoryId: Category['id'], user: User): Promise<Category>;
    validateUserCategory(userId: User['id'], categoryId: Category['id']): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        type: import(".prisma/client").$Enums.TransactionType;
    }>;
}
