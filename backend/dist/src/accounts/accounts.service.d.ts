import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { User } from '@prisma/client';
import { ReorderAccountDto } from './dto/reorder-account.dto';
export declare class AccountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(user: User): Promise<({
        currency: {
            symbol: string;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
        accountTag: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            order: number;
            color: string;
        } | null;
        accountGroup: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            order: number;
            isVisible: boolean;
        } | null;
    } & {
        id: number;
        name: string;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
        initialBalance: number;
        accountTagId: number | null;
        groupId: number | null;
        order: number;
    })[]>;
    create(data: CreateAccountDto, user: User): Promise<{
        id: number;
        name: string;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
        initialBalance: number;
        accountTagId: number | null;
        groupId: number | null;
        order: number;
    }>;
    update(id: number, data: UpdateAccountDto, user: User): Promise<{
        id: number;
        name: string;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
        initialBalance: number;
        accountTagId: number | null;
        groupId: number | null;
        order: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
        initialBalance: number;
        accountTagId: number | null;
        groupId: number | null;
        order: number;
    }>;
    reorder(dtos: ReorderAccountDto[], user: User): Promise<void>;
}
