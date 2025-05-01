import { CreateAccountTagDto } from './dto/create-account-tag.dto';
import { UpdateAccountTagDto } from './dto/update-account-tag.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AccountTagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateAccountTagDto, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findAll(user: User): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }[]>;
    update(id: number, data: UpdateAccountTagDto, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(id: number, user: User): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
