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
        order: number;
        userId: number;
        color: string;
    }>;
    findAll(user: User): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        userId: number;
        color: string;
    }[]>;
    update(id: string, updateAccountTagDto: UpdateAccountTagDto, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        userId: number;
        color: string;
    }>;
    remove(id: string, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        userId: number;
        color: string;
    }>;
}
