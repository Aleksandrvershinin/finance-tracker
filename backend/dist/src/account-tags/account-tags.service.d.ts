import { CreateAccountTagDto } from './dto/create-account-tag.dto';
import { UpdateAccountTagDto } from './dto/update-account-tag.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AccountTagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateAccountTagDto, user: User): Promise<{
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
    update(id: number, data: UpdateAccountTagDto, user: User): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
    remove(id: number, user: User): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        isVisible: boolean;
        order: number;
    }>;
}
