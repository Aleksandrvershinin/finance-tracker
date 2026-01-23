import { AccountTagsService } from './account-tags.service';
import { CreateAccountTagDto } from './dto/create-account-tag.dto';
import { UpdateAccountTagDto } from './dto/update-account-tag.dto';
import { User } from '@prisma/client';
export declare class AccountTagsController {
    private readonly accountTagsService;
    constructor(accountTagsService: AccountTagsService);
    create(createAccountTagDto: CreateAccountTagDto, user: User): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
    findAll(user: User): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }[]>;
    update(id: string, updateAccountTagDto: UpdateAccountTagDto, user: User): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
    remove(id: string, user: User): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
}
