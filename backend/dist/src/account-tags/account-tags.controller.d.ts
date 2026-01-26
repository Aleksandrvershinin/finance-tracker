import { AccountTagsService } from './account-tags.service';
import { CreateAccountTagDto } from './dto/create-account-tag.dto';
import { UpdateAccountTagDto } from './dto/update-account-tag.dto';
import { User } from '@prisma/client';
export declare class AccountTagsController {
    private readonly accountTagsService;
    constructor(accountTagsService: AccountTagsService);
    create(createAccountTagDto: CreateAccountTagDto, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
    findAll(user: User): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }[]>;
    update(id: string, updateAccountTagDto: UpdateAccountTagDto, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
    remove(id: string, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
}
